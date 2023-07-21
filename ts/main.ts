const { app, BrowserWindow, ipcMain } = require('electron')
const storageSettings = require('electron-settings');
import { searchClients } from "./backend/requests"
import path from "path"
import { userSignIn, getProfile } from './backend/requests'

interface UserLog {
    username: string,
    password: string
}

const createWindow = () => {
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('localRessources', () => path.join(__dirname, "..",  'ressources'))
    ipcMain.handle('searchClients', searchClients)

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

    ipcMain.on('form-data', (event:any, arg:UserLog)=>{

        userSignIn(arg);
    })

    if(storageSettings.has('id') && storageSettings.has('token')){

        storageSettings.get('id.data').then((value:string)=>{

            const userData = getProfile(value).then((data)=>{
                ipcMain.handle('profileData', ()=>data)
            })

        }).catch((err:any)=>console.log(err))
    }
    else{
        return false
    }
})

