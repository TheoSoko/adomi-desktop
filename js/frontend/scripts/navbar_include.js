"use strict";
console.log("navbar_include script loaded");
let navbar = fetch("../html/navbar.html")
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
    let searchDiv = document.getElementById("search_div_modal");
    console.log("searchDiv", searchDiv);
    if (searchDiv.style.display == "block") {
        searchDiv.style.display = "none";
        return;
    }
    let isBigWindow = window.innerWidth > 1366;
    let ismallWindow = window.innerWidth < 992;
    const profileSearchPos = document.querySelector('#search_profile')?.getBoundingClientRect().left;
    //if (!profileSearchPos) return
    //if (ismallWindow) return
    searchDiv.style.left = profileSearchPos + (isBigWindow ? 0 : -5) + "px";
    searchDiv.style.top = (isBigWindow ? "79px" : "95px");
    searchDiv.style.display = "block";
    const profileCreatePos = document.querySelector('#create_profile')?.getBoundingClientRect().left;
}
window.addEventListener("click", (e) => {
    if (e.target.id == "search_profile") {
        modalForNav();
    }
});
