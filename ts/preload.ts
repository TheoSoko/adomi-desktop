const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('exposed', {
    ping: () => ipcRenderer.invoke('ping'),
    localRessources: ipcRenderer.invoke('localRessources'),
    mainDirPath: () => ipcRenderer.invoke('mainDirPath'),
    searchProfiles: (role: string, query: string, page: number) => {
        //console.log(" args from preload thing \n", query, " ",page)
        return ipcRenderer.invoke('searchProfiles', role, query, page)
    }
    
})


contextBridge.exposeInMainWorld('submitForm', {
    sendFormData: (formData: string[]) => ipcRenderer.invoke('form-data', formData),
    getUserProfile: () => ipcRenderer.invoke('getUserProfile')
})

contextBridge.exposeInMainWorld('exposeProfileData', {
    profileData: () => ipcRenderer.invoke('profileData'),
    connectionStatus: () => ipcRenderer.invoke('connectionStatus')
})

contextBridge.exposeInMainWorld('userLogout', {
    logout: ()=>ipcRenderer.invoke('logout')
})

contextBridge.exposeInMainWorld('exposeActors', {
    getActors: ()=> ipcRenderer.invoke('getActors')
})

contextBridge.exposeInMainWorld('createMission', {
    createNewMission: (formData: (string | number)[])=> ipcRenderer.invoke('createNewMission', formData)
})
window.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById("hello")
    if (element) element.innerText = "Hello from the other side"
})