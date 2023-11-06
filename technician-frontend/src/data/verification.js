import { getAdminData, getAllUsers, getTechnicianData, getTechnicianByTasknowId, getUserByDetails } from "./api"

export const adminVerificationAddOrUpdate = async (data) => {
    if (!data.firstName) {
        return "first name field required"
    }
    if (!data.lastName) {
        return "last name field required"
    }
    if (!data.email) {
        return "email field required"
    }
    if (!data.phoneNumber) {
        return "phone number field required"
    }
    if (!data.password) {
        return "password field required"
    }
    if (!data.zip) {
        return "zip field required"
    }

    const emailOK = data.email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if(emailOK == null) {
        return "Invalid Email"
    }

    if (Number.isNaN(Number(data.phoneNumber)) || Number.isNaN(Number(data.zip))) {
        return "Phone and zip must be a number"
    }

    const admins = await getAdminData();
    const dataId = data._id ? data._id : "new";
    const adminExists = admins.data?.find(admin => admin.email?.toLowerCase() === data.email?.toLowerCase() && admin._id !== dataId)
    if (adminExists) {
        return "Email already exists"
    }

    return "OK"
}

export const userVerificationAddOrUpdate = async (data) => {
    if (!data.firstName) {
        return "first name field required"
    }
    if (!data.lastName) {
        return "last name field required"
    }
    if (!data.email) {
        return "email field required"
    }
    if (!data.phoneNumber) {
        return "phone number field required"
    }
    if (!data.password) {
        return "password field required"
    }
    if (!data.zip) {
        return "zip field required"
    }

    const emailOK = data.email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if(emailOK == null) {
        return "Invalid Email"
    }

    if (isNotANumber(data.phoneNumber) || isNotANumber(data.zip)) {
        return "Phone and zip must be a number"
    }

    if (data.AccountNumber != null && isNotANumber(data.AccountNumber)) {
        return "Account number must be a number"
    }
    if (data.ssn != null) {
        if (isNotANumber(data.ssn)) {
            return "SSN must be a number"
        }
        else if (data.ssn.length > 4) {
            return "SSN must be a 4 digit number"
        }
    }
    if (data.routingNumber !=null && isNotANumber(data.routingNumber)) {
        return "Routing Number must be a number"
    }

    const users = await getAllUsers();
    const dataId = data._id ? data._id : "new";
    const userExists = users.data?.find(user => user.email?.toLowerCase() === data.email?.toLowerCase() && user._id !== dataId)
    if (userExists) {
        return "Email already exists"
    }

    return "OK"
}

export const technicianVerificationAddOrUpdate = async (data) => {
    if (!data.firstName) {
        return "first name field required"
    }
    if (!data.lastName) {
        return "last name field required"
    }
    if (!data.email) {
        return "email field required"
    }
    if (!data.phoneNumber) {
        return "phone number field required"
    }
    if (!data.password) {
        return "password field required"
    }
    if (!data.zip) {
        return "zip field required"
    }

    const emailOK = data.email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if(emailOK == null) {
        return "Invalid Email"
    }

    if (isNotANumber(data.phoneNumber) || isNotANumber(data.zip)) {
        return "Phone and zip must be a number"
    }

    if (data.AccountNumber != null && isNotANumber(data.AccountNumber)) {
        return "Account number must be a number"
    }
    if (data.ssn != null) {
        if (isNotANumber(data.ssn)) {
            return "SSN must be a number"
        }
        else if (data.ssn.length > 4) {
            return "SSN must be a 4 digit number"
        }
    }
    if (data.routingNumber !=null && isNotANumber(data.routingNumber)) {
        return "Routing Number must be a number"
    }

    const technicians = await getTechnicianData();
    const dataId = data._id ? data._id : "new";
    const technicianExists = technicians.data?.find(technician => technician.email?.toLowerCase() === data.email?.toLowerCase() && technician._id !== dataId)
    if (technicianExists) {
        return "Email already exists"
    }

    return "OK"
}

export const jobVerification = async (data) => {
    if (isNotANumber(data.cost)) {
        return "Cost should be a number"
    }

    if (isNotANumber(data.zip)) {
        return "Zip should be valid"
    }

    if (data.jobStatus !== "Unassigned") {
        if (data.technicianId == null) {
            return "Technician Id is required for assigned jobs";
        }
        if (data.technicianPhoneNumber != null && isNotANumber(data.technicianPhoneNumber)) {
            return "Technician phone number is required for assigned jobs and should be a number"
        }
        const emailOK = data.technicianEmail.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    
        if(emailOK == null) {
            return "Invalid Email"
        }
        const technician = (await getTechnicianByTasknowId(data.technicianId)).data;
        if (technician == null) {
            return "Technician not found. Please enter correct technician id."
        }
    }

    const {customerFirstName, customerLastName, customerEmail, customerPhone} = data;
    if (!customerFirstName || !customerLastName || !customerEmail || !customerPhone || !data.date || !data.time_start || !data.time_end) {
        return "All customer details along with date and tme are required and customer should be registered"
    }

    const emailOK = customerEmail.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if(emailOK == null) {
        return "Invalid Email"
    }

    if (isNotANumber(customerPhone)) {
        return "Phone number should be a valid number"
    }

    const user = (await getUserByDetails({
        firstName: customerFirstName, 
        lastName: customerLastName, 
        email: customerEmail?.toLowerCase(), 
        phone: customerPhone})).data
    if (user == null) {
        return "Customer not found"
    }

    return "OK"
}

const isNotANumber = (field) => {
    return Number.isNaN(Number(field))
}
