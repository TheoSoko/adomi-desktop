const { app, BrowserWindow, ipcMain } = require('electron')
const storageSettings = require('electron-settings');
import { userSignIn, userSignOut, getProfile, searchProfiles, fetchProfileData, fetchMissions, getMissionActors, createNewMission} from './backend/requests'
import path from "path"

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

interface UserLog {
    username: string,
    password: string
}

interface Payload{
    status: number,
    data:{
        id: number,
        token: string
        message: string
    }
}
interface MissionInterface{
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
const createWindow = (connexion: boolean) => {
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('localRessources', () => path.join(__dirname, "..",  'ressources'))
    ipcMain.handle('searchProfiles', searchProfiles)
    ipcMain.handle('mainDirPath', () => __dirname)
    ipcMain.handle('fetchProfileData', fetchProfileData)
    ipcMain.handle("fetchMissions", fetchMissions)
    
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

    ipcMain.handle('form-data', async (event:any, arg:UserLog) => {
        return userSignIn(arg).then((response: Payload | any) => {
            if (response.statusText === "OK") {

                return getProfile().then(async (result) => {
                    storageSettings.unsetSync();
                    connectionStatus = true;
                    await storageSettings.set("user", {data: result})

                    // storageSettings.get('user.data').then((profile:any)=>console.log(profile))
                    
                    return true
                })
            }
            else {
                return response.message
            }
        })
    })

    ipcMain.handle('getUserProfile', async ()=>await storageSettings.get('user.data'))


    //La valeur de connectionStatus change passe de false à true si la connexion est réussie
    ipcMain.handle('connectionStatus', ()=>connectionStatus)

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

    ipcMain.handle('createNewMission', (event:any, arg:MissionInterface)=>{
        storageSettings.get('user.data').then((user:any)=>{
            arg.idEmployee = user.id;
            console.log(arg)
            return createNewMission(arg);
        })
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow(connectionStatus)
    })
    createWindow(connectionStatus)
})

