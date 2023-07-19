const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('exposed', {
    ping: () => ipcRenderer.invoke('ping'),
    gopher: () => ipcRenderer.invoke('gopher'),
    localRessources: ipcRenderer.invoke('localRessources'),
})


window.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById("hello")
    if (element) element.innerText = "Hello from the other side"
})