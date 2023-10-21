import { getAdminData } from "./api"

export const adminVerificationAddOrUpdate = async (data, type) => {
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