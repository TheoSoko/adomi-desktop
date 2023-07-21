import path from "path"
import { User, apiError } from "../types"
const axios = require('axios');
const storageSettings = require('electron-settings');

export const searchClients = async (event: unknown, query: string, page: string): Promise<[boolean, (User[]|apiError)]> => {
    //console.log("query to send : ", "http://localhost:8000/customers/search?q="+query+"&page="+page)

    let res = await fetch("http://localhost:8000/customers/search?q="+query+"&page="+page)
        .catch(err => {
            console.log("err from fetch", err)
        })

    if (!res){
        return Promise.reject("err from fetch")
    }

    /* 
        Retourne une promesse de [booléen, réponse]
        Le booléen indique si la requête HTTP a fonctionné normalement
        Le deuxième élément, est un tableau d'users OU un objet d'erreur standard
        Le booléen indique ce qu'il se trouve dans l'autre élément.
    */

    if (res.status < 200 || res.status > 299) {
        //console.log('http err, resolve with array')
        return Promise.resolve([false, await res.json()])
    }

    //console.log('http success, resolve with array')
    return Promise.resolve([true, await res.json()])
}

interface UserLog {
    username: string,
    password: string
}

interface Payload{
    data:{
        id: number,
        token: string
    }
}

interface UserProfile{
    first_name: string,
    last_name: string,
    user_name: string,
    email: string,
    phone: string,
    street_name: string,
    street_number: number,
    post_code: string,
    city: string
}

export function userSignIn(login: UserLog){

    axios.post('http://localhost:8000/sign-in', login)
        .then((response:Payload) => {

            setDataStorage(response.data.id.toString(), response.data.token).then((storageData)=>{
                console.log(`Local storage id : ${storageData.id}\nLocal storage token : ${storageData.token}`);
                const testData = getProfile(storageData.id).then((data:UserProfile)=>{
                    console.log(data)
                    //redirection (window.location marche pas)
                
                })
            }
            ).catch((err?:any) => {console.warn(err)})
        })
        .catch((err?:any) => {
            console.warn(err)
        })
}

async function setDataStorage(id:string, token:string){

    storageSettings.unsetSync();
    storageSettings.get('id.data').then((value:string)=>console.log('localStorage id after unset: ' + value))

    await storageSettings.set('id', {data : id});
    await storageSettings.set('token', {data: token});

    let storageObj = {id, token};
    storageSettings.get('id.data').then((value:string)=>storageObj.id = value)
    storageSettings.get('token.data').then((value:string)=>storageObj.token = value)

    return storageObj
}

export async function getProfile(userId: string){

    const data = await fetch(`http://localhost:8000/users/${userId}`);
    const json = await data.json();

    if(data.ok){
        return json
    }
    else{
        return false
    }
}