const { app, BrowserWindow, ipcMain } = require('electron')
const storageSettings = require('electron-settings');
import { searchClients } from "./backend/requests"
import path from "path"
import { userSignIn, getProfile } from './backend/requests'

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

    ipcMain.handle('form-data', async (event:any, arg:UserLog)=>{
        return userSignIn(arg).then((response: Payload | any) => {

            if(response.statusText === "OK"){

                return getProfile().then(async (result) => {
                    await storageSettings.set("user", {data: result})
                    return true
                })
            }
            else{
                return response.message
            }
        })        
    })

    const profile = storageSettings.get('user.data').then((profile:UserProfile)=>profile)

    ipcMain.handle('getUserProfile', ()=>profile)
})

