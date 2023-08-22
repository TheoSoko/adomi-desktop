"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMissions = exports.userSignOut = exports.fetchProfileData = exports.getProfile = exports.userSignIn = exports.searchProfiles = void 0;

const axios = require('axios');
const storageSettings = require('electron-settings');
const apiBase = "http://localhost:8000";
const searchProfiles = async (event, role, query, page) => {
    //console.log("query to send : ", "http://localhost:8000/customers/search?q="+query+"&page="+page)
    let res = await fetch(apiBase + "/" + role + "/search?q=" + query + "&page=" + page)
        .catch(err => {
        console.log("err from fetch", err);
    });
    if (!res) {
        return Promise.reject("err from fetch");
    }
    /*
        Retourne une promesse de [booléen, réponse]
        Le booléen indique si la requête HTTP a fonctionné normalement
        Le deuxième élément, est un tableau d'users OU un objet d'erreur standard
        Le booléen indique ce qu'il se trouve dans l'autre élément.
    */
    if (res.status < 200 || res.status > 299) {
        //console.log('http err, resolve with array')
        return Promise.resolve([false, await res.json()]);
    }
    return Promise.resolve([true, await res.json()]);
};
exports.searchProfiles = searchProfiles;
async function userSignIn(login) {
    return axios.post('http://localhost:8000/sign-in', login)
        .then((response) => {
        if (response.status >= 200 || response.status <= 299) {
            return setDataStorage(response.data.id.toString(), response.data.token, true).
                then(() => {
                return response;
            })
                .catch((err) => {
                console.warn(err);
            });
        }
        else {
            return response;
        }
    })
        .catch((err) => {
        const errObj = { status: err.response.status, statusText: err.response.statusText, message: err.response.data.message };
        return errObj;
    });
}
exports.userSignIn = userSignIn;
async function setDataStorage(id, token, connectStatus) {
    await storageSettings.unsetSync();
    await storageSettings.set('id', { data: id });
    await storageSettings.set('token', { data: token });
  
    let storageObj = { id, token };
    storageSettings.get('id.data').then((value) => storageObj.id = value);
    storageSettings.get('token.data').then((value) => storageObj.token = value);
    return storageObj;
}
async function getProfile() {
    if (storageSettings.has('id') && storageSettings.has('token')) {
        return storageSettings.get('id.data').then((value) => {
            return fetchProfileData(0, value).then((data) => {
                return data;
            });
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }
    else {
        console.log('err storage');
        return false;
    }
}
exports.getProfile = getProfile;
async function fetchProfileData(event, userId) {
    const data = await fetch(`http://localhost:8000/users/${userId}`)
        .catch(err => {
        console.log(err);
        return null;
    });
    if (!data) {
        return Promise.reject("Erreur à la requête HTTP");
    }
    if (data.status != 200) {
        return [false, await data.json()];
    }
    return [true, await data.json()];
}
exports.fetchProfileData = fetchProfileData;
async function fetchMissions(event, userId, role) {
    const data = await fetch(`http://localhost:8000/users/${userId}/missions?role=${role}`)
        .catch(err => {
        console.log(err);
        return null;
    });
    if (!data) {
        return Promise.reject("Erreur à la requête HTTP");

async function userSignOut() {
    //On vide totalement le localStorage
    await storageSettings.unsetSync();
    return true;
}
exports.userSignOut = userSignOut;

async function fetchProfileData(userId) {
    try {
        const data = await fetch(`http://localhost:8000/users/${userId}`);
        const json = await data.json();
        if (data.ok) {
            return json;
        }
        else {
            return false;
        }
    }
    if (data.status != 200) {
        return [false, await data.json()];
    }
    return [true, await data.json()];
}
exports.fetchMissions = fetchMissions;
