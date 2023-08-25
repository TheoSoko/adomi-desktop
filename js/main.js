"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { app, BrowserWindow, ipcMain } = require('electron');
const storageSettings = require('electron-settings');
const requests_1 = require("./backend/requests");
const path_1 = __importDefault(require("path"));
const clientCreation_1 = require("./backend/clientCreation");
const createWindow = (connexion) => {
    ipcMain.handle('ping', () => 'pong');
    ipcMain.handle('localRessources', () => path_1.default.join(__dirname, "..", 'ressources'));
    ipcMain.handle('searchProfiles', requests_1.searchProfiles);
    ipcMain.handle('mainDirPath', () => __dirname);
    ipcMain.handle('fetchProfileData', requests_1.fetchProfileData);
    ipcMain.handle("fetchMissions", requests_1.fetchMissions);
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js')
        }
    });
    connexion
        ? win.loadFile('./html/home.html')
        : win.loadFile('./html/sign_in.html');
};
app.whenReady().then(() => {
    let connectionStatus = false;
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.quit();
    });
    ipcMain.handle('form-data', async (event, arg) => {
        return (0, requests_1.userSignIn)(arg).then((response) => {
            if (response.statusText === "OK") {
                return (0, requests_1.getProfile)().then(async (result) => {
                    storageSettings.unsetSync();
                    connectionStatus = true;
                    await storageSettings.set("user", { data: result });
                    // storageSettings.get('user.data').then((profile:any)=>console.log(profile))
                    return true;
                });
            }
            else {
                return response.message;
            }
        });
    });
    ipcMain.handle('getUserProfile', async () => await storageSettings.get('user.data'));
    //La valeur de connectionStatus change passe de false à true si la connexion est réussie
    ipcMain.handle('connectionStatus', () => connectionStatus);
    //déconnexion
    ipcMain.handle('logout', async () => {
        return (0, requests_1.userSignOut)().then(() => {
            connectionStatus = false;
        });
    });
    ipcMain.handle('getActors', () => {
        return (0, requests_1.getMissionActors)().then((response) => {
            return response;
        });
    });
    ipcMain.handle('createNewMission', (event, arg) => {
        storageSettings.get('user.data').then((user) => {
            arg.idEmployee = user.id;
            console.log(arg);
            return (0, requests_1.createNewMission)(arg);
        });
    });
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow(connectionStatus);
    });
    createWindow(connectionStatus);
    ipcMain.handle('input-info', async (event, arg) => {
        return await (0, clientCreation_1.clientCreation)(arg);
    });
});
