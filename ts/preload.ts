const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('exposed', {
    ping: () => ipcRenderer.invoke('ping'),
    localRessources: ipcRenderer.invoke('localRessources'),
    searchProfiles: (role: string, query: string, page: number) => {
        //console.log(" args from preload thing \n", query, " ",page)
        return ipcRenderer.invoke('searchProfiles', role, query, page)
    }
})


contextBridge.exposeInMainWorld('submitForm', {
    sendFormData: (formData: string[]) => ipcRenderer.invoke('form-data', formData),
    getUserProfile: () => ipcRenderer.invoke('getUserProfile')
})

contextBridge.exposeInMainWorld('profileDataTest', {
    profileData: () => ipcRenderer.invoke('profileData')
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