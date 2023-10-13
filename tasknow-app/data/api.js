import axios from "axios";


export const makeRequest = (url,method,body) => {
    return axios({
        method,
        // url: `https://installer-backend.vercel.app${url}`,
        url: `https://testing2-8t7u.vercel.app${url}`,
        data: body,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};