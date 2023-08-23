"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewMission = exports.getMissionActors = exports.userSignOut = exports.getProfile = exports.userSignIn = exports.searchProfiles = void 0;
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
    await storageSettings.set('connectStatus', { data: connectStatus });
    let storageObj = { id, token };
    storageSettings.get('id.data').then((value) => storageObj.id = value);
    storageSettings.get('token.data').then((value) => storageObj.token = value);
    return storageObj;
}
async function getProfile() {
    if (storageSettings.has('id') && storageSettings.has('token')) {
        return storageSettings.get('id.data').then((value) => {
            return fetchProfileData(value).then((data) => {
                console.log(data);
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
async function userSignOut() {
    //On vide totalement le localStorage
    await storageSettings.unsetSync();
    return true;
}
exports.userSignOut = userSignOut;
async function getMissionActors() {
    return axios.get('http://localhost:8000/customers').then(async (response) => {
        let actorsList = [];
        const clientList = response.data;
        actorsList.push(clientList);
        return axios.get('http://localhost:8000/carers').then(async (response) => {
            const CarerList = response.data;
            actorsList.push(CarerList);
            return actorsList;
        }).catch((err) => console.warn(err));
    }).catch((err) => { console.warn(err); });
}
exports.getMissionActors = getMissionActors;
async function createNewMission(mission) {
    try {
        // console.log(mission)
        return axios.post('http://localhost:8000/missions', mission).then((response) => {
            console.log('insertion réussie');
        }).catch((err) => console.log(err));
    }
    catch (err) {
        console.log(err);
    }
}
exports.createNewMission = createNewMission;
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
    catch (err) {
        console.warn(err);
    }
}
