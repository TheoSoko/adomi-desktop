import path from "path"
const axios = require('axios');

const storageSettings = require('electron-settings');

const apiBase = "https://adomi-api.onrender.com"
const authHeader = async () => ( {"Authorization": "bearer " + await storageSettings.get('token.data') } )




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
    city: string,
    id_agency?: number
}

export async function carerCreation (personal_info:UserProfile) {
    console.log('carer personal_info ', personal_info)
    let user = await storageSettings.get('user.data')
    personal_info.id_agency = user.agency;

    console.log("personal_info.id_agency : ", personal_info.id_agency)
    
    return axios.post(apiBase+'/carers', personal_info).then(() =>console.log('ok'))
}