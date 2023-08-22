"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("navbar_include script loaded");

window.exposeProfileData.connectionStatus().then((value) => {
    const connectionStatus = value;
    (connectionStatus) ? console.log("utilisateur connecté !") : console.log("Aucun utilisateur connecté..");
    let navbar = fetch("../html/navbar.html")
        .then(async (res) => {
        const navbar = await res.text();
        //var parser = new DOMParser();
        //var parsedNav = parser.parseFromString(navbar, 'text/html');
        document.body.insertAdjacentHTML("afterbegin", navbar);
        let btnConnection = document.getElementById("btn_connect");
        if (connectionStatus) {
            let btnProfile = document.getElementById('btn_profil');
            btnProfile.style.display = 'block';
            btnConnection.textContent = "Déconnexion";
            btnConnection.setAttribute('href', "../html/home.html");
            btnConnection.addEventListener("click", () => {
                window.userLogout.logout().then(() => {
                    btnProfile.style.display = 'none';
                    // btnConnection.textContent = "Connexion";
                }).catch((err) => {
                    console.log(err);
                });
            });
        }
    })
        .catch((err) => {
        console.log(err);
        document.body.insertAdjacentHTML("afterend", `<p>${err}/p>`);
    });
    window.addEventListener("click", (e) => {
        if (e.target.id == "search_profile") {
            modalForNav();
        }
    });
}).catch((err) => { console.log(err); });

const path = await window.exposed.mainDirPath();
console.log("path of main: ", path);
console.log("path: ", path + "../html/navbar.html");
fetch(path + "/../html/navbar.html")
    .then(async (res) => {
    const navbar = await res.text();
    //var parser = new DOMParser();
    //var parsedNav = parser.parseFromString(navbar, 'text/html');
    document.body.insertAdjacentHTML("afterbegin", navbar);
})
    .catch((err) => {
    console.log(err);
    document.body.insertAdjacentHTML("afterend", `<p>${err}/p>`);
});

function modalForNav() {
    let creationDiv = document.getElementById("creation_dropdown_modal");
    console.log("searchDiv", creationDiv);
    if (creationDiv.style.display == "block") {
        creationDiv.style.display = "none";
        return;
    }
    let isBigWindow = window.innerWidth > 1366;
    let ismallWindow = window.innerWidth < 992;
    const profileSearchPos = document.querySelector('#search_profile')?.getBoundingClientRect().left;

    const profileCreatePos = document.querySelector('#create_profile')?.getBoundingClientRect().left;
    //if (!profileSearchPos) return
    //if (ismallWindow) return
    creationDiv.style.left = profileCreatePos - (isBigWindow ? 11 : 26) + "px";
    creationDiv.style.top = ( /*isBigWindow ? "79px" : */"95px");
    creationDiv.style.display = "block";
}
window.addEventListener("click", (e) => {
    if (e.target.id == "create_profile" && window.innerWidth >= 992) {
        modalForNav();
    }
});
window.addEventListener("resize", (e) => {
    document.getElementById("creation_dropdown_modal").style.display = "none";
});

