"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.userSignIn = exports.searchClients = void 0;
const axios = require('axios');
const storageSettings = require('electron-settings');
const searchClients = async (event, query, page) => {
    //console.log("query to send : ", "http://localhost:8000/customers/search?q="+query+"&page="+page)
    let res = await fetch("http://localhost:8000/customers/search?q=" + query + "&page=" + page)
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
    //console.log('http success, resolve with array')
    return Promise.resolve([true, await res.json()]);
};
exports.searchClients = searchClients;
function userSignIn(login) {
    axios.post('http://localhost:8000/sign-in', login)
        .then((response) => {
        setDataStorage(response.data.id.toString(), response.data.token).then((storageData) => {
            console.log(`Local storage id : ${storageData.id}\nLocal storage token : ${storageData.token}`);
            const testData = getProfile(storageData.id).then((data) => {
                console.log(data);
                //redirection (window.location marche pas)
            });
        }).catch((err) => { console.warn(err); });
    })
        .catch((err) => {
        console.warn(err);
    });
}
exports.userSignIn = userSignIn;
async function setDataStorage(id, token) {
    storageSettings.unsetSync();
    storageSettings.get('id.data').then((value) => console.log('localStorage id après unset: ' + value));
    await storageSettings.set('id', { data: id });
    await storageSettings.set('token', { data: token });
    let storageObj = { id, token };
    storageSettings.get('id.data').then((value) => storageObj.id = value);
    storageSettings.get('token.data').then((value) => storageObj.token = value);
    return storageObj;
}
async function getProfile(userId) {
    const data = await fetch(`http://localhost:8000/users/${userId}`);
    const json = await data.json();
    if (data.ok) {
        return json;
    }
    else {
        return false;
    }
}
exports.getProfile = getProfile;
