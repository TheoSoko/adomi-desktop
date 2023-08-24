import path from "path"
const axios = require('axios');

const storageSettings = require('electron-settings');

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
    city: string,
    id_agency?: number
}

export async function clientCreation (personal_info:UserProfile) {
    console.log(personal_info)
    let agency = await storageSettings.get('user.data').then((user:any)=>{
        console.log(user);
        
        return user[1].id_agency
    } )
    personal_info.id_agency = agency;
    // var data:UserProfile[] = []
    // data = agency.concat(personal_info)
    console.log(agency);
    
    return axios.post('http://localhost:8000/customers', personal_info).then(() =>console.log('ok'))
}