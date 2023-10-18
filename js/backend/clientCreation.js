"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientCreation = void 0;
const axios = require('axios');
const storageSettings = require('electron-settings');
const apiBase = "https://adomi-api.onrender.com";
const authHeader = async () => ({ "Authorization": "bearer " + await storageSettings.get('token.data') });
async function clientCreation(personal_info) {
    console.log('client personal_info ', personal_info);
    let user = await storageSettings.get('user.data');
    console.log(user);
    personal_info.id_agency = user.id_agency;
    console.log("personal_info.id_agency : ", personal_info.id_agency);
    try {
        const res = await fetch(apiBase + '/customers', {
            method: 'POST',
            headers: {
                ...await authHeader(),
                "content-type": "application/json"
            },
            body: JSON.stringify(personal_info)
        });
        if (res.ok) {
            return [true, undefined];
        }
        const json = await res.json();
        console.log("res.status", res.status);
        console.log("res ", res);
        console.log("res json", json);
        return [false, json.message || (json.errorMessages && json.errorMessages[0]) || 'Une erreur est survenue, vérifiez les données envoyées'];
    }
    catch (err) {
        console.log(err);
        return [false, 'Désolé, une erreur inconnue est survenue, veuillez réessayer ultérieurement'];
    }
}
exports.clientCreation = clientCreation;
