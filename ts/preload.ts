const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('exposed', {
    ping: () => ipcRenderer.invoke('ping'),
    localRessources: ipcRenderer.invoke('localRessources'),
    mainDirPath: () => ipcRenderer.invoke('mainDirPath'),
    searchProfiles: (role: string, query: string, page: number) => {
        //console.log(" args from preload thing \n", query, " ",page)
        return ipcRenderer.invoke('searchProfiles', role, query, page)
    },
    fetchProfileData: (id: string) => ipcRenderer.invoke('fetchProfileData', id),
    fetchMissions: (userId: string, role: "client"|"carer"|"employee") => ipcRenderer.invoke('fetchMissions', userId, role),
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
window.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById("hello")
    if (element) element.innerText = "Hello from the other side"
})

interface UserProfileInterface{
    first_name: string,
    last_name: string,
    user_name: string,
    password: string,
    email: string,
    phone: string,
    street_name: string,
    street_number: number,
    post_code: string,
    city: string
}

contextBridge.exposeInMainWorld('submitInfo', {
    createCustomer: (inputInfo: UserProfileInterface) => ipcRenderer.invoke('input-info', inputInfo),
    // createCustomer: (inputInfo: UserProfileInterface) => console.log(inputInfo),
})