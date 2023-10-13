import path from "path"
import { User, apiError } from "../types"
const axios = require('axios');
const storageSettings = require('electron-settings');

type UserLog = {
    username: string,
    password: string
}

type Payload = {
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

type stdError = {
    statusCode: number,
    error: string,
    message: string,
}



const apiBase = "https://adomi-api.onrender.com"
const authHeader = async () => ( {"Authorization": "bearer " + await storageSettings.get('token.data') } )


/**
    Retourne une promesse de [booléen, réponse]
    Le booléen indique si la requête HTTP a fonctionné normalement
    Le deuxième élément, est un tableau d'users OU un objet d'erreur standard
    Le booléen indique ce qu'il se trouve dans l'autre élément.
*/
export const searchProfiles = async (event: unknown, role: "customers"|"carers", query: string, page: string): Promise<[boolean, (User[]|apiError)]> => {
    let res = await fetch(apiBase+"/"+role+"/search?q="+query+"&page="+page, {headers: {... await authHeader()}})
        .catch(err => {
            console.log("err from fetch", err)
        })

    if (!res) return Promise.reject("err from fetch")

    if (!res.ok) return Promise.resolve([false, await res.json()])

    else return Promise.resolve([true, await res.json()])
}


export async function userSignIn(login: UserLog) {
    const res = await fetch(apiBase+'/sign-in', {
        method: 'POST',
        headers: { "content-type": "application/json"},
        body: JSON.stringify(login)
    })    
    .catch((err:any) => { console.log("err at sign-in", err) })

    if (!res) return Promise.reject("Une erreur inconnue est survenue")

    if (res.status == 401) {
        let json = await res.json() as unknown as stdError
        return Promise.reject(json.message)
    }
    if (!res.ok) {
        console.log("res.status, res.message", (res.status, '\n', await res.json() as any).message)
        return Promise.reject("Une erreur inconnue est survenue")
    }

    let json = await res.json().catch(err => { console.log(err); return null })
    if (!json) return Promise.reject("Une erreur inconnue est survenue")

    await setDataStorage(json.id.toString(), json.token, true)

    return Promise.resolve()
}

async function setDataStorage(id:string, token:string, connectStatus: boolean) {
    await storageSettings.unsetSync();
    await storageSettings.set('id', {data : id});
    await storageSettings.set('token', {data: token});
    await storageSettings.set('connectStatus', {data: connectStatus});

    let storageObj = {id, token};
    storageSettings.get('id.data').then((value:string)=>storageObj.id = value)
    storageSettings.get('token.data').then((value:string)=>storageObj.token = value)

    return storageObj
}



export async function fetchProfileData(event: unknown, userId: string): Promise<[boolean, (User | apiError)]> {
    const data = await fetch(`${apiBase}/users/${userId}`, {
        headers: {
            ... await authHeader()
        }
    })
    .catch(err => {
        console.log(err)
    })
    
    if (!data) {
        return Promise.reject("Erreur à la requête HTTP")
    }

    if (data.status != 200) {
        return [false, await data.json()]
    }

    return [true, await data.json()]
}
  

export async function userSignOut() {
    //On vide totalement le localStorage
    await storageSettings.unsetSync();
    return true
}

export async function getMissionActors() {
    let actorsList:any = []
    
    const customers = await fetch(apiBase+'/customers', { headers: {... await authHeader()} })
    .catch((err) => {console.log("err at getMissionActors when fetching customers")})

    const carers = await fetch(apiBase+'/carers', { headers: {... await authHeader()} })
    .catch((err) => {console.log("err at getMissionActors when fetching carers")})

    actorsList.push(await customers!.json())
    actorsList.push(await carers!.json())

    console.log(actorsList)
    return actorsList
}


export async function createNewMission(mission:MissionInterface){
    try{
        // console.log(mission)
        return axios.post(apiBase+'/missions', mission).then((response:any)=>{
            console.log('insertion réussie')
        }).catch((err:any)=>console.log(err))
    }
    catch(err){
        console.log(err);
    }
}

export async function fetchMissions(event: unknown, userId: string, role: "client"|"carer"|"employee"){
        const data = await fetch(`${apiBase}/users/${userId}/missions?role=${role}`, {
            headers: { 
                ... await authHeader() 
            }
        })
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

export async function fetchGeneralRequests(){
    const data = await fetch(`${apiBase}/general-requests`, {
        headers: { ... await authHeader() }
    })
        .catch(err => {
            console.log(err)
            return null
        })
    
    if (!data){
        return Promise.reject("Erreur à la requête HTTP")
    }

    const res = await data.json()

    if (data.status != 200){
        console.log("ERR at fetchGeneralRequests, status code is ", data.status, "res is ", res)
        return  [false, res]
    }

    console.log(res)
    return [true, res]
}

export async function fetchPendingMissions() {
    const data = await fetch(`${apiBase}/missions?filter=validated&value=0`, {
        headers: {... await authHeader()}
    })
        .catch(err => {
            console.log(err)
            return null
        })
    
    if (!data){
        return Promise.reject("Erreur à la requête HTTP")
    }

    const res = await data.json()

    if (data.status != 200){
        return  [false, res]
    }

    return [true, res]
}

export async function fetchOneGeneralRequest(event: unknown | unknown, id: number) {
    const res = await fetch(`${apiBase}/general-requests/${id}`, { headers: {... await authHeader()} })
        .catch(err => {
            console.log(err)
            return null
        })
    
    if (!res) {
        return Promise.reject("Erreur à la requête HTTP")
    }

    const json = await res.json()

    if (!res.ok) {
        console.log("ERR at fetchOneGeneralRequest, status code is ", json.status, "res is ", res)
        return  [false, res]
    }

    console.log(res)
    return [true, res]

}

export async function getMissionData(event: Event, missionId: number) {

    const res = await fetch(`${apiBase}/missions/${missionId}`, {headers: {... await authHeader() }})
    .catch(err => {
        console.log("err à getMissionData", err)
    })

    if (!res){
        return Promise.reject("Erreur à la requête HTTP")
    }

    if (!res.ok) {
        return [false, await res.json()]
    }
    return [true, await res.json()]
}

export async function updateMission(mission:MissionInterface) {
    const res = await fetch(apiBase+'/missions', { headers: {... await authHeader() } })
        .catch((err) => {console.log("err dans updateMission", err)})

    return await res!.json()
}