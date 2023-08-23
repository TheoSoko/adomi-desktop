"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientCreation = void 0;
const axios = require('axios');
const apiBase = "http://localhost:8000";
async function clientCreation(personal_info) {
    console.log(personal_info);
    return axios.post('http://localhost:8000/customers', personal_info).then(() => console.log('ok'));
}
exports.clientCreation = clientCreation;
