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
    ipcMain.handle("fetchGeneralRequests", requests_1.fetchGeneralRequests);
    ipcMain.handle("fetchPendingMissions", requests_1.fetchPendingMissions);
    ipcMain.handle("fetchOneGeneralRequest", requests_1.fetchOneGeneralRequest);
    ipcMain.handle("getMissionData", requests_1.getMissionData);
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
    ipcMain.handle('form-data', async (event, loginInfo) => {
        return await (0, requests_1.userSignIn)(loginInfo)
            .then(async () => {
            const id = await storageSettings.get('id.data');
            const profileRes = await (0, requests_1.fetchProfileData)(null, id);
            if (profileRes[0] == false) {
                console.log("error when fetching profile data", profileRes[1]);
                return false;
            }
            connectionStatus = true;
            await storageSettings.set("user", { data: profileRes[1] });
            return true;
        })
            .catch((err) => {
            console.log("erreur dans form-data", err);
            return err;
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
    ipcMain.handle('getRoles', () => {
        return (0, requests_1.getRolesList)().then((response) => {
            return response;
        });
    });
    ipcMain.handle('getAgencies', () => {
        return (0, requests_1.getAgenciesList)().then((response) => {
            return response;
        });
    });
    ipcMain.handle('createNewMission', async (event, arg) => {
        let user = await storageSettings.get('user.data');
        arg.idEmployee = user.id;
        return await (0, requests_1.createNewMission)(arg);
    });
    ipcMain.handle('updateProfile', async (event, arg) => {
        storageSettings.get('user.data').then((user) => {
            return (0, requests_1.updateEmployee)(user.id, arg).then(async (response) => {
                if (response[0] === true) {
                    return (0, requests_1.userSignOut)().then(() => {
                        connectionStatus = false;
                    });
                }
                else {
                    console.log('erreur requete : ', response);
                }
            });
        });
    });
    ipcMain.handle('updateMission', (event, arg) => {
        storageSettings.get('user.data').then((user) => {
            arg.idEmployee = user.id;
            console.log(arg);
            return (0, requests_1.updateMission)(arg);
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
