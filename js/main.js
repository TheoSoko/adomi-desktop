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
    ipcMain.handle('searchClients', requests_1.searchClients);
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
    ipcMain.on('form-data', (event, arg) => {
        (0, requests_2.userSignIn)(arg);
    });
    if (storageSettings.has('id') && storageSettings.has('token')) {
        storageSettings.get('id.data').then((value) => {
            const userData = (0, requests_2.getProfile)(value).then((data) => {
                ipcMain.handle('profileData', () => data);
            });
        }).catch((err) => console.log(err));
    }
    else {
        return false;
    }
});
