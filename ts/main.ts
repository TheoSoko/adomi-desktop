const { app, BrowserWindow, ipcMain } = require('electron')
const storageSettings = require('electron-settings');
import { userSignIn, 
        userSignOut, 
        searchProfiles,
        fetchProfileData, 
        fetchMissions, 
        fetchGeneralRequests, 
        fetchPendingMissions, 
        fetchOneGeneralRequest,
        getMissionActors, 
        createNewMission,
        getMissionData,
        updateMission,
        getAgenciesList, 
        getRolesList, 
        updateEmployee
  } from './backend/requests'

import path from "path"
import {clientCreation} from './backend/clientCreation'

interface UserProfile {
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
    role: {label:string},
    agency: {name: string, adress: string}
}

type UserLog = {
    username: string,
    password: string
}

interface Payload {
    status: number,
    data:{
        id: number,
        token: string
        message: string
    }
}
interface MissionInterface {
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

interface UserProfileInterface{
    first_name: string,
    last_name: string,
    user_name: string,
    password: string,
    email: string,
    phone: string,
    street_name: string,
    street_number: number,
    post_code: string,
    city: string,
    id_agency: number,
}

const createWindow = (connexion: boolean) => {
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('localRessources', () => path.join(__dirname, "..",  'ressources'))
    ipcMain.handle('searchProfiles', searchProfiles)
    ipcMain.handle('mainDirPath', () => __dirname)
    ipcMain.handle('fetchProfileData', fetchProfileData)
    ipcMain.handle("fetchMissions", fetchMissions)
    ipcMain.handle("fetchGeneralRequests", fetchGeneralRequests)
    ipcMain.handle("fetchPendingMissions", fetchPendingMissions)
    ipcMain.handle("fetchOneGeneralRequest", fetchOneGeneralRequest)
    ipcMain.handle("getMissionData",getMissionData)
    
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    connexion 
    ? win.loadFile('./html/home.html')
    : win.loadFile('./html/sign_in.html')
}

app.whenReady().then(() => {
    let connectionStatus = false;

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

<<<<<<< HEAD
    ipcMain.handle('form-data', async (event:any, loginInfo: UserLog) => {
        return await userSignIn(loginInfo)
        .then(async () => {
            const id = await storageSettings.get('id.data')
            const profileRes = await fetchProfileData(null, id)
            if (profileRes[0] == false) {
                console.log("error when fetching profile data", profileRes[1])
                return false
=======
    ipcMain.handle('form-data', async (event:any, arg:UserLog) => {
        return userSignIn(arg).then((response: Payload | any) => {
            if (response.statusText === "OK") {

                return getProfile().then(async (result) => {
                    storageSettings.unsetSync();
                    connectionStatus = true;
                    await storageSettings.set("user", {data: result})
                    
                    return true
                })
            }
            else {
                return response.message
>>>>>>> ae391fe56d657614c2d60c858fb10ba78eccc2f2
            }
            connectionStatus = true;
            await storageSettings.set("user", {data: profileRes[1]})
            return true
        })
        .catch((err) => {
            console.log("erreur dans form-data", err)
            return err
        })
    })

    ipcMain.handle('getUserProfile', async () => await storageSettings.get('user.data'))


    //La valeur de connectionStatus change passe de false à true si la connexion est réussie
    ipcMain.handle('connectionStatus', () => connectionStatus)

    //déconnexion
    ipcMain.handle('logout', async ()=>{
        return userSignOut().then(()=>{
            connectionStatus = false;
        })   
    })

    ipcMain.handle('getActors', ()=>{
        return getMissionActors().then((response)=>{
            return response
        })
    })

    ipcMain.handle('getRoles', ()=>{
        return getRolesList().then((response)=>{
            return response
        })
    })

    ipcMain.handle('getAgencies', ()=>{
        return getAgenciesList().then((response)=>{
            return response
        })
    })

    ipcMain.handle('createNewMission', (event:any, arg:MissionInterface)=>{
        storageSettings.get('user.data').then((user:any)=>{
            arg.idEmployee = user.id;
            console.log(arg)
            return createNewMission(arg);
        })
    })


    ipcMain.handle('updateProfile', async (event:any, arg:UserProfile)=>{
        storageSettings.get('user.data').then((user:any)=>{
            return updateEmployee(user.id, arg).then(async (response:[boolean, (UserProfile | string)])=>{
                if(response[0] === true){
                    return userSignOut().then(()=>{
                        connectionStatus = false;
                    })  
                    
                }
                else{
                    console.log('erreur requete : ', response)
                }
            });
        })
    })

    ipcMain.handle('updateMission',(event:any, arg:MissionInterface)=>{
        storageSettings.get('user.data').then((user:any)=>{
            arg.idEmployee = user.id;
            console.log(arg)
            return updateMission(arg);
        })
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow(connectionStatus)
    })
    createWindow(connectionStatus)

    ipcMain.handle('input-info', async (event:any,arg:UserProfileInterface)=>{
        return await clientCreation(arg)
    })
})
    
