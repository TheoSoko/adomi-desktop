import path from "path"
const axios = require('axios');

const apiBase = "http://localhost:8000"




interface UserProfile{
    first_name: string,
    last_name: string,
    user_name: string,
    password: string,
    email: string,
    phone: string,
    street_name: string,
    street_number: number,
    post_code: string,
    city: string
}

export async function clientCreation (personal_info:UserProfile) {
    console.log(personal_info)
    return axios.post('http://localhost:8000/customers', personal_info).then(() =>console.log('ok'))
}