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
