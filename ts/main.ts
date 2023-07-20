const { app, BrowserWindow, ipcMain } = require('electron')
import path from "path"
import { searchClients } from "./backend/requests"


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
})

