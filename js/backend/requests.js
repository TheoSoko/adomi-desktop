"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClients = void 0;
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
