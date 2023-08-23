const { app, BrowserWindow, ipcMain } = require('electron')
const storageSettings = require('electron-settings');
import { userSignIn, getProfile, searchProfiles } from './backend/requests'
import path from "path"
import {clientCreation} from './backend/clientCreation'

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
    city: string
}

const createWindow = () => {
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('localRessources', () => path.join(__dirname, "..",  'ressources'))
    ipcMain.handle('searchProfiles', searchProfiles)

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('./html/home.html')
}

app.whenReady().then(() => {
    createWindow()

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
                    await storageSettings.set("user", {data: result})
                    return true
                })
            }
            else {
                return response.message
            }
        })        
    })

    
    if (storageSettings.has('user')) {
        const profile = storageSettings.get('user.data').then((profile:UserProfile)=>profile)
        ipcMain.handle('getUserProfile', ()=>profile)
    }
    
    ipcMain.handle('input-info', async (event:any, arg:UserProfileInterface)=> { 
        console.log("input-info");
        console.log(arg)
        return clientCreation(arg)
    })
})

