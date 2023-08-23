"use strict";
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
function modalForNav() {
    let searchDiv = document.getElementById("search_div_modal");
    console.log("searchDiv", searchDiv);
    if (searchDiv.style.display == "block") {
        searchDiv.style.display = "none";
        return;
    }
    let isBigWindow = window.innerWidth > 1366;
    let ismallWindow = window.innerWidth < 992;
    const profileSearchPos = document.querySelector('#search_profile')?.getBoundingClientRect().left;
    searchDiv.style.left = profileSearchPos + (isBigWindow ? 0 : -5) + "px";
    searchDiv.style.top = (isBigWindow ? "79px" : "95px");
    searchDiv.style.display = "block";
    const profileCreatePos = document.querySelector('#create_profile')?.getBoundingClientRect().left;
}
