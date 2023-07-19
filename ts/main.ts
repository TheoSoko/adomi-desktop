const { app, BrowserWindow, ipcMain } = require('electron')
import { getGopher } from './backend/requests'
import path from "path"


const createWindow = () => {
    ipcMain.handle('gopher', getGopher)
    ipcMain.handle('ping', () => 'pong')
    ipcMain.handle('localRessources', () => path.join(__dirname, "..",  'ressources'))

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

