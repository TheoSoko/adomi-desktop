"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { app, BrowserWindow, ipcMain } = require('electron');
const requests_1 = require("./backend/requests");
const path_1 = __importDefault(require("path"));
const createWindow = () => {
    ipcMain.handle('gopher', requests_1.getGopher);
    ipcMain.handle('ping', () => 'pong');
    ipcMain.handle('localRessources', () => path_1.default.join(__dirname, "..", 'ressources'));
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js')
        }
    });
    win.loadFile('./html/main.html');
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
});
