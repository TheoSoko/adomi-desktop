"use strict";
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('exposed', {
    ping: () => ipcRenderer.invoke('ping'),
    localRessources: ipcRenderer.invoke('localRessources'),
    mainDirPath: () => ipcRenderer.invoke('mainDirPath'),
    searchProfiles: (role, query, page) => {
        //console.log(" args from preload thing \n", query, " ",page)
        return ipcRenderer.invoke('searchProfiles', role, query, page);
    },
    fetchProfileData: (id) => ipcRenderer.invoke('fetchProfileData', id),
    fetchMissions: (userId, role) => ipcRenderer.invoke('fetchMissions', userId, role),
});
contextBridge.exposeInMainWorld('submitForm', {
    sendFormData: (formData) => ipcRenderer.invoke('form-data', formData),
    getUserProfile: () => ipcRenderer.invoke('getUserProfile')
});
contextBridge.exposeInMainWorld('profileDataTest', {
    profileData: () => ipcRenderer.invoke('profileData')
});
window.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById("hello");
    if (element)
        element.innerText = "Hello from the other side";
});
