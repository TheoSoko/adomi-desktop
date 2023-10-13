"use strict";
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('exposed', {
    ping: () => ipcRenderer.invoke('ping'),
    localRessources: ipcRenderer.invoke('localRessources'),
    mainDirPath: () => ipcRenderer.invoke('mainDirPath'),
    searchProfiles: (role, query, page) => ipcRenderer.invoke('searchProfiles', role, query, page),
    fetchProfileData: (id) => ipcRenderer.invoke('fetchProfileData', id),
    fetchMissions: (userId, role) => ipcRenderer.invoke('fetchMissions', userId, role),
    fetchGeneralRequests: () => ipcRenderer.invoke('fetchGeneralRequests'),
    fetchPendingMissions: () => ipcRenderer.invoke('fetchPendingMissions'),
    fetchOneGeneralRequest: (id) => ipcRenderer.invoke('fetchOneGeneralRequest', id),
});
contextBridge.exposeInMainWorld('submitForm', {
    sendFormData: (formData) => ipcRenderer.invoke('form-data', formData),
    getUserProfile: () => ipcRenderer.invoke('getUserProfile')
});
contextBridge.exposeInMainWorld('exposeProfileData', {
    profileData: () => ipcRenderer.invoke('profileData'),
    connectionStatus: () => ipcRenderer.invoke('connectionStatus'),
    updateProfile: (formData) => ipcRenderer.invoke('updateProfile', formData)
});
contextBridge.exposeInMainWorld('exposeMissionData', {
    getMissionData: (missionId) => ipcRenderer.invoke('getMissionData', missionId)
});
contextBridge.exposeInMainWorld('userLogout', {
    logout: () => ipcRenderer.invoke('logout')
});
contextBridge.exposeInMainWorld('exposeActors', {
    getActors: () => ipcRenderer.invoke('getActors'),
    getAgencies: () => ipcRenderer.invoke('getAgencies'),
    getRoles: () => ipcRenderer.invoke('getRoles')
});
contextBridge.exposeInMainWorld('createMission', {
    createNewMission: (formData) => ipcRenderer.invoke('createNewMission', formData)
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
contextBridge.exposeInMainWorld('updateMission', {
    updateMission: (formData) => ipcRenderer.invoke('updateMission', formData)
});
