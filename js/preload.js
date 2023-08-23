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
contextBridge.exposeInMainWorld('exposeProfileData', {
    profileData: () => ipcRenderer.invoke('profileData'),
    connectionStatus: () => ipcRenderer.invoke('connectionStatus')
});
contextBridge.exposeInMainWorld('userLogout', {
    logout: () => ipcRenderer.invoke('logout')
});
window.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById("hello");
    if (element)
        element.innerText = "Hello from the other side";
});
contextBridge.exposeInMainWorld('submitInfo', {
    createCustomer: (inputInfo) => ipcRenderer.invoke('input-info', inputInfo),
    // createCustomer: (inputInfo: UserProfileInterface) => console.log(inputInfo),
});
