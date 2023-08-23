const { app, BrowserWindow, ipcMain } = require('electron')
const storageSettings = require('electron-settings');
import { userSignIn, userSignOut, getProfile, searchProfiles, fetchProfileData, fetchMissions} from './backend/requests'
import path from "path"

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

const createWindow = () => {
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

    win.loadFile('./html/home.html')
}

app.whenReady().then(() => {
    createWindow()

    let connectionStatus = false;

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

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
                    return true
                })
            }
            else {
                return response.message
            }
        })        
    })

    if(storageSettings.has('user')){

        const profile = storageSettings.get('user.data').then((profile:UserProfile)=>profile)
        ipcMain.handle('getUserProfile', ()=>profile)
    }

    //La valeur de connectionStatus change passe de false à true si la connexion est réussie
    ipcMain.handle('connectionStatus', ()=>connectionStatus)

    //déconnexion
    ipcMain.handle('logout', async ()=>{
        return userSignOut().then(()=>{
            connectionStatus = false;
        })   
    });
})

