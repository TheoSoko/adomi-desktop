const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('exposed', {
    ping: () => ipcRenderer.invoke('ping'),
    localRessources: ipcRenderer.invoke('localRessources'),
    searchClients: () => ipcRenderer.invoke('searchClients'),
})


window.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById("hello")
    if (element) element.innerText = "Hello from the other side"
})