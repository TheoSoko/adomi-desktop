console.log("navbar_include script loaded");

interface Window {
    exposeProfileData: any,
    userLogout : any
}


window.exposeProfileData.connectionStatus().then((value:boolean)=> {

    const connectionStatus = value;
    (connectionStatus)? console.log("utilisateur connecté !"): console.log("Aucun utilisateur connecté..")
    
    let navbar = fetch("../html/navbar.html")
        .then(async (res) => {
            const navbar = await res.text()
                //var parser = new DOMParser();
                //var parsedNav = parser.parseFromString(navbar, 'text/html');
            document.body.insertAdjacentHTML("afterbegin", navbar)

            if (connectionStatus){
                console.log("connectionStatus")
                let btnProfile = document.getElementById('btn_profil') as HTMLElement;
                let btnConnection = document.getElementById("btn_connect") as HTMLElement;
                btnProfile.style.display = 'block'
                btnConnection.innerText = "Déconnexion"
                btnConnection.setAttribute('href', "../html/home.html");

                btnConnection.addEventListener("click", ()=>{
                    window.userLogout.logout().then(()=>{
                        btnProfile.style.display = 'none'
                        // btnConnection.textContent = "Connexion";
                    }).catch((err:any) =>{
                        console.log(err)
                    })
                })
            }

        })
        .catch((err) => { 
            console.log(err)
            document.body.insertAdjacentHTML("afterend", `<p>${err}/p>`)
        })

    window.addEventListener("click", (e) => {
        if ((e.target as any).id == "create_profile" ){
            modalForNav()
        }
    })
}).catch((err:any)=>{console.log(err)});


function modalForNav(){
    let modal = document.getElementById("creation_dropdown_modal") as HTMLElement
    console.log("modal", modal)
    if (modal.style.display == "block"){
        modal.style.display = "none"
        return
    }

    let isBigWindow = window.innerWidth > 1366
    let ismallWindow = window.innerWidth < 992

    const profileSearchPos = document.querySelector('#create_profile')?.getBoundingClientRect().left as number

    modal.style.left = profileSearchPos + (isBigWindow ? 0 : 0 ) + "px"
    modal.style.top = (isBigWindow ? "96px" : "96px")

    modal.style.display = "block"

    const profileCreatePos =  document.querySelector('#create_profile')?.getBoundingClientRect().left
}

window.addEventListener("resize", () => document.getElementById("creation_dropdown_modal")!.style.display = "none")




