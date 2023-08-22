"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { app, BrowserWindow, ipcMain } = require('electron');
const storageSettings = require('electron-settings');
const requests_1 = require("./backend/requests");
const path_1 = __importDefault(require("path"));
const requests_2 = require("./backend/requests");
const createWindow = () => {
    ipcMain.handle('ping', () => 'pong');
    ipcMain.handle('localRessources', () => path_1.default.join(__dirname, "..", 'ressources'));
    ipcMain.handle('searchProfiles', requests_2.searchProfiles);
    ipcMain.handle('mainDirPath', () => __dirname);
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js')
        }
    });
    win.loadFile('./html/home.html');
};
app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.quit();
    });
    ipcMain.handle('form-data', async (event, arg) => {
        return (0, requests_1.userSignIn)(arg).then((response) => {
            if (response.statusText === "OK") {
                return (0, requests_1.getProfile)().then(async (result) => {
                    await storageSettings.set("user", { data: result });
                    return true;
                });
            }
            else {
                return response.message;
            }
        });
    });
    if (storageSettings.has('user')) {
        const profile = storageSettings.get('user.data').then((profile) => profile);
        ipcMain.handle('getUserProfile', () => profile);
    }
});
