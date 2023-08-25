import path from "path"
import { User, apiError } from "../types"
const axios = require('axios');
const storageSettings = require('electron-settings');

const apiBase = "http://localhost:8000"

export const searchProfiles = async (event: unknown, role: "customers"|"carers", query: string, page: string): Promise<[boolean, (User[]|apiError)]> => {
    //console.log("query to send : ", "http://localhost:8000/customers/search?q="+query+"&page="+page)
    
    let res = await fetch(apiBase+"/"+role+"/search?q="+query+"&page="+page)
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
    return Promise.resolve([true, await res.json()])
}

interface UserLog {
    username: string,
    password: string
}

interface Payload{
    status: number,
    statusText: string
    data:{
        id: number,
        token: string
        message: string
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
    city: string,
    id_role: number,
    id_agency: number
}

interface MissionInterface{
    id?:number
    startDate: string,
    startHour: string
    endHour: string,
    streetName: string,
    streetNumber: number,
    postCode: string,
    city: string,
    validated: number,
    idClient: number,
    idEmployee?: number,
    idCarer?: number,
    idRecurence: number
}

export async function userSignIn(login: UserLog){

    return axios.post('http://localhost:8000/sign-in', login)
        .then((response:Payload) => {
            if (response.status >= 200 || response.status <= 299) {
                return setDataStorage(response.data.id.toString(), response.data.token, true).
                    then(()=>{
                        return response;})
                    .catch((err?:any) => {console.warn(err)
                    })
            }
            else {
                return response
            }
        })
        .catch((err:any) => {
            const errObj = {status: err.response.status, statusText: err.response.statusText, message: err.response.data.message}
            return errObj
        })
}

async function setDataStorage(id:string, token:string, connectStatus: boolean){
    await storageSettings.unsetSync();
    await storageSettings.set('id', {data : id});
    await storageSettings.set('token', {data: token});
    await storageSettings.set('connectStatus', {data: connectStatus});

    let storageObj = {id, token};
    storageSettings.get('id.data').then((value:string)=>storageObj.id = value)
    storageSettings.get('token.data').then((value:string)=>storageObj.token = value)

    return storageObj
}

export async function getProfile() {
    if (storageSettings.has('id') && storageSettings.has('token')) {
        const id = await storageSettings.get('id.data')
        const profile = await fetchProfileData(0, id)
        if (profile[0] == false){
            console.log("err at getProfile / fetchProfileData", profile[1])
            return false
        }
        return profile[1]
    } else {
        console.log('err storage')
        return false;
    }
}

type wtf = unknown
export async function fetchProfileData(event: wtf, userId: string): Promise<[boolean, (User[]|apiError)]>{
    const data = await fetch(`http://localhost:8000/users/${userId}`)
        .catch(err => {
            console.log(err)
        })
    
    if (!data){
        return Promise.reject("Erreur à la requête HTTP")
    }

    if (data.status != 200){
        return [false, await data.json()]
    }

    return [true, await data.json()]
}
  

export async function userSignOut() {
    //On vide totalement le localStorage
    await storageSettings.unsetSync();
    return true
}

export async function getMissionActors(){
    return axios.get('http://localhost:8000/customers').then(async (response:any)=>{
        let actorsList:any = []
        const clientList = response.data;
        actorsList.push(clientList);

        return axios.get('http://localhost:8000/carers').then(async (response:any)=>{
            const CarerList = response.data;
            actorsList.push(CarerList);
            return actorsList;

        }).catch((err:any)=>console.warn(err))

    }).catch((err:any)=>{console.warn(err)})
}

export async function createNewMission(mission:MissionInterface){

    try{
        // console.log(mission)
        return axios.post('http://localhost:8000/missions', mission).then((response:any)=>{
            console.log('insertion réussie')
        }).catch((err:any)=>console.log(err))
    }
    catch(err){
        console.log(err);
    }
}

export async function fetchMissions(event: wtf, userId: string, role: "client"|"carer"|"employee"){
        const data = await fetch(`http://localhost:8000/users/${userId}/missions?role=${role}`)
            .catch(err => {
                console.log(err)
                return null
            })
        
        if (!data){
            return Promise.reject("Erreur à la requête HTTP")
        }

        if (data.status != 200){
            return  [false, await data.json()]
        }
        return [true, await data.json()]
}

export async function getMissionData(event: Event, missionId: number){

    const data = await fetch(`http://localhost:8000/missions/${missionId}`)
    .catch(err => {
        console.log("erreur caught")
        console.log(err)
        return null
    })

    if(!data){
        return Promise.reject("Erreur à la requête HTTP")
    }

    if(data.status != 200){
        return [false, await data.json()]
    }
    return [true, await data.json()]
}

export async function updateMission(mission:MissionInterface){
    console.log("passe dans updateMission desktop")
    try{
        // console.log(mission)
        return axios.patch('http://localhost:8000/missions/'+mission.id, mission).then((response:any)=>{
            console.log('update réussie')
        }).catch((err:any)=>console.log(err))
    }
    catch(err){
        console.log(err);
    }
}