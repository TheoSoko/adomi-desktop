export {}


const connectionStatus = await (window as any).exposeProfileData.connectionStatus() as boolean
if (!connectionStatus) {
    window.location.href = './sign_in.html'
}
