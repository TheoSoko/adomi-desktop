"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMission = exports.getMissionData = exports.fetchOneGeneralRequest = exports.fetchPendingMissions = exports.fetchGeneralRequests = exports.fetchMissions = exports.createNewMission = exports.getRolesList = exports.getAgenciesList = exports.getMissionActors = exports.updateEmployee = exports.userSignOut = exports.fetchProfileData = exports.userSignIn = exports.searchProfiles = void 0;
const axios = require('axios');
const storageSettings = require('electron-settings');
const apiBase = "https://adomi-api.onrender.com";
const authHeader = async () => ({ "Authorization": "bearer " + await storageSettings.get('token.data') });
/**
    Retourne une promesse de [booléen, réponse]
    Le booléen indique si la requête HTTP a fonctionné normalement
    Le deuxième élément, est un tableau d'users OU un objet d'erreur standard
    Le booléen indique ce qu'il se trouve dans l'autre élément.
*/
const searchProfiles = async (event, role, query, page) => {
    let res = await fetch(apiBase + "/" + role + "/search?q=" + query + "&page=" + page, { headers: { ...await authHeader() } })
        .catch(err => {
        console.log("err from fetch", err);
    });
    if (!res)
        return Promise.reject("err from fetch");
    if (!res.ok)
        return Promise.resolve([false, await res.json()]);
    else
        return Promise.resolve([true, await res.json()]);
};
exports.searchProfiles = searchProfiles;
async function userSignIn(login) {
    const res = await fetch(apiBase + '/sign-in', {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify(login)
    })
        .catch((err) => { console.log("err at sign-in", err); });
    if (!res)
        return Promise.reject("Une erreur inconnue est survenue");
    if (res.status == 401) {
        let json = await res.json();
        return Promise.reject(json.message);
    }
    if (!res.ok) {
        console.log("res.status, res.message", (res.status, '\n', await res.json()).message);
        return Promise.reject("Une erreur inconnue est survenue");
    }
    let json = await res.json().catch(err => { console.log(err); return null; });
    if (!json)
        return Promise.reject("Une erreur inconnue est survenue");
    await setDataStorage(json.id.toString(), json.token, true);
    return Promise.resolve();
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
async function fetchProfileData(event, userId) {
    const data = await fetch(`${apiBase}/users/${userId}`, {
        headers: {
            "content-type": "application/json",
            ...await authHeader()
        }
    })
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
        return axios.patch(apiBase + '/employees/' + id, profileData).then(async (response) => {
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
    let actorsList = [];
    const customers = await fetch(apiBase + '/customers', { headers: { ...await authHeader() } })
        .catch((err) => { console.log("err at getMissionActors when fetching customers"); });
    const carers = await fetch(apiBase + '/carers', { headers: { ...await authHeader() } })
        .catch((err) => { console.log("err at getMissionActors when fetching carers"); });
    actorsList.push(await customers.json());
    actorsList.push(await carers.json());
    return [true, actorsList];
}
exports.getMissionActors = getMissionActors;
async function getAgenciesList() {
    return fetch(apiBase + '/agencies', { headers: await authHeader() })
        .then((response) => response.data).
        catch((err) => { console.log(err); });
}
exports.getAgenciesList = getAgenciesList;
async function getRolesList() {
    return fetch(apiBase + '/roles', { headers: await authHeader() })
        .then((response) => response.data).
        catch((err) => { console.log(err); });
}
exports.getRolesList = getRolesList;
async function createNewMission(mission) {
    try {
        const res = await fetch(apiBase + '/missions', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                ...await authHeader(),
            },
            body: JSON.stringify(mission)
        });
        if (!res.ok) {
            const json = await res.json();
            return [false, json.message || json.errorMessages && json.errorMessages[0] || "Une erreur inconnue est survenue"];
        }
        console.log("createNewMission res : ", await res.json());
        return [true, undefined];
    }
    catch (err) {
        console.log(err);
        Promise.reject();
    }
}
exports.createNewMission = createNewMission;
async function fetchMissions(event, userId, role) {
    const data = await fetch(`${apiBase}/users/${userId}/missions?role=${role}`, {
        headers: {
            ...await authHeader()
        }
    })
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
    const data = await fetch(`${apiBase}/general-requests`, {
        headers: { ...await authHeader() }
    })
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
    return [true, res];
}
exports.fetchGeneralRequests = fetchGeneralRequests;
async function fetchPendingMissions() {
    const data = await fetch(`${apiBase}/missions?filter=validated&value=0`, {
        headers: { ...await authHeader() }
    })
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
    const res = await fetch(`${apiBase}/general-requests/${id}`, { headers: { ...await authHeader() } })
        .catch(err => {
        console.log(err);
        return null;
    });
    if (!res) {
        return Promise.reject("Erreur à la requête HTTP");
    }
    const json = await res.json();
    if (!res.ok) {
        console.log("ERR at fetchOneGeneralRequest, status code is ", json.status, "res is ", res);
        return [false, json];
    }
    return [true, json];
}
exports.fetchOneGeneralRequest = fetchOneGeneralRequest;
async function getMissionData(event, missionId) {
    const res = await fetch(`${apiBase}/missions/${missionId}`, { headers: { ...await authHeader() } })
        .catch(err => {
        console.log("err à getMissionData", err);
    });
    if (!res) {
        return Promise.reject("Erreur à la requête HTTP");
    }
    if (!res.ok) {
        return [false, await res.json()];
    }
    return [true, await res.json()];
}
exports.getMissionData = getMissionData;
async function updateMission(mission) {
    const res = await fetch(apiBase + '/missions', { headers: { ...await authHeader(), "content-type": "application/json" } })
        .catch((err) => { console.log("err dans updateMission", err); });
    return await res.json();
}
exports.updateMission = updateMission;
