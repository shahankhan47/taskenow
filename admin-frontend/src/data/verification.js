import { getAdminData, getAllUsers, getTechnicianData } from "./api"

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
        return "email not proper"
    }

    if (Number.isNaN(Number(data.phoneNumber)) || Number.isNaN(Number(data.zip))) {
        return "Phone and zip must be a number"
    }

    const admins = await getAdminData();
    const dataId = data._id ? data._id : "new";
    const adminExists = admins.data?.find(admin => admin.email === data.email && admin._id !== dataId)
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
        return "email not proper"
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
    const userExists = users.data?.find(user => user.email === data.email && user._id !== dataId)
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
        return "email not proper"
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
    const technicianExists = technicians.data?.find(technician => technician.email === data.email && technician._id !== dataId)
    if (technicianExists) {
        return "Email already exists"
    }

    return "OK"
}

const isNotANumber = (field) => {
    return Number.isNaN(Number(field))
}
