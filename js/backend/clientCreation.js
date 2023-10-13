"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientCreation = void 0;
const axios = require('axios');
const storageSettings = require('electron-settings');
const apiBase = "http://localhost:8000";
async function clientCreation(personal_info) {
    console.log(personal_info);
    let agency = await storageSettings.get('user.data').then((user) => {
        console.log(user);
        return user.id_agency;
    });
    personal_info.id_agency = agency;
    // var data:UserProfile[] = []
    // data = agency.concat(personal_info)
    console.log(agency);
    return axios.post('http://localhost:8000/customers', personal_info).then(() => console.log('ok'));
}
exports.clientCreation = clientCreation;
