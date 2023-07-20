"use strict";
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('exposed', {
    ping: () => ipcRenderer.invoke('ping'),
    localRessources: ipcRenderer.invoke('localRessources'),
    searchClients: (query, page) => {
        //console.log(" args from preload thing \n", query, " ",page)
        return ipcRenderer.invoke('searchClients', query, page);
    }
});
window.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById("hello");
    if (element)
        element.innerText = "Hello from the other side";
});
