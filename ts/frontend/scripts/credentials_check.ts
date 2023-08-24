export {}

console.log("heyo")

const connectionStatus = await (window as any).exposeProfileData.connectionStatus()
if (!connectionStatus) {
    window.location.href = './sign_in.html'
}
