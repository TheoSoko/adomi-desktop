"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMission = exports.getMissionData = exports.fetchOneGeneralRequest = exports.fetchPendingMissions = exports.fetchGeneralRequests = exports.fetchMissions = exports.createNewMission = exports.getRolesList = exports.getAgenciesList = exports.getMissionActors = exports.updateEmployee = exports.userSignOut = exports.fetchProfileData = exports.getProfile = exports.userSignIn = exports.searchProfiles = void 0;
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
        const id = await storageSettings.get('id.data');
        const profile = await fetchProfileData(0, id);
        if (profile[0] == false) {
            console.log("err at getProfile / fetchProfileData", profile[1]);
            return false;
        }
        console.log(profile[1]);
        return profile[1];
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
async function userSignOut() {
    //On vide totalement le localStorage
    await storageSettings.unsetSync();
    return true;
}
exports.userSignOut = userSignOut;
async function updateEmployee(id, profileData) {
    try {
        return axios.patch('http://localhost:8000/employees/' + id, profileData).then(async (response) => {
            if (!response) {
                return [false, 'erreur requête API'];
            }
            if (response.status != 200) {
                return [false, await response.statusMessage];
            }
            return [true, await response.data];
        }).catch((err) => console.log(err));
    }
    catch (err) {
        console.log(err);
    }
}
exports.updateEmployee = updateEmployee;
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
async function getAgenciesList() {
    return axios.get('http://localhost:8000/agencies').then(async (response) => {
        return response.data;
    }).catch((err) => console.log(err));
}
exports.getAgenciesList = getAgenciesList;
async function getRolesList() {
    return axios.get('http://localhost:8000/roles').then(async (response) => {
        return response.data;
    }).catch((err) => console.log(err));
}
exports.getRolesList = getRolesList;
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
async function fetchMissions(event, userId, role) {
    const data = await fetch(`http://localhost:8000/users/${userId}/missions?role=${role}`)
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
exports.fetchMissions = fetchMissions;
async function fetchGeneralRequests() {
    const data = await fetch(`http://localhost:8000/general-requests`)
        .catch(err => {
        console.log(err);
        return null;
    });
    if (!data) {
        return Promise.reject("Erreur à la requête HTTP");
    }
    const res = await data.json();
    if (data.status != 200) {
        console.log("ERR at fetchGeneralRequests, status code is ", data.status, "res is ", res);
        return [false, res];
    }
    console.log(res);
    return [true, res];
}
exports.fetchGeneralRequests = fetchGeneralRequests;
async function fetchPendingMissions() {
    const data = await fetch(`http://localhost:8000/missions?filter=validated&value=0`)
        .catch(err => {
        console.log(err);
        return null;
    });
    if (!data) {
        return Promise.reject("Erreur à la requête HTTP");
    }
    const res = await data.json();
    if (data.status != 200) {
        return [false, res];
    }
    return [true, res];
}
exports.fetchPendingMissions = fetchPendingMissions;
async function fetchOneGeneralRequest(event, id) {
    const data = await fetch(`http://localhost:8000/general-requests/${id}`)
        .catch(err => {
        console.log(err);
        return null;
    });
    if (!data) {
        return Promise.reject("Erreur à la requête HTTP");
    }
    const res = await data.json();
    if (data.status != 200) {
        console.log("ERR at fetchOneGeneralRequest, status code is ", data.status, "res is ", res);
        return [false, res];
    }
    console.log(res);
    return [true, res];
}
exports.fetchOneGeneralRequest = fetchOneGeneralRequest;
async function getMissionData(event, missionId) {
    const data = await fetch(`http://localhost:8000/missions/${missionId}`)
        .catch(err => {
        console.log("erreur caught");
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
exports.getMissionData = getMissionData;
async function updateMission(mission) {
    console.log("passe dans updateMission desktop");
    try {
        // console.log(mission)
        return axios.patch('http://localhost:8000/missions/' + mission.id, mission).then((response) => {
            console.log('update réussie');
        }).catch((err) => console.log(err));
    }
    catch (err) {
        console.log(err);
    }
}
exports.updateMission = updateMission;
