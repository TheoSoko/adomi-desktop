export {}

const userData = await (window as any).submitForm.getUserProfile()

document.getElementById("intro_message")!.innerText = `Monsieur.dame employé.ée (${userData.first_name})`

document.getElementById("intro_2")!.innerText = `Bon courage ${userData.first_name} !`
