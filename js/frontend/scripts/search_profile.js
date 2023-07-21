"use strict";
console.log("search_profile script loaded");
let searchInput = document.getElementById("search_person_input");
searchInput.addEventListener("keydown", (e) => e.key == "Enter" && sendInput());
let searchBtn = document.getElementById("search_btn");
searchBtn.addEventListener("click", (e) => sendInput());
const role = "customers";
async function sendInput() {
    let input = document.getElementById("search_person_input");
    if (!input)
        return;
    if (input.value.length == 0)
        return;
    let res = await window.exposed.searchProfiles(role, input.value, 1);
    if (!res)
        return;
    if (res[0] == false) {
        console.log(res[1]);
        return;
    }
    const clients = res[1];
    let clientsDiv = document.getElementById("client_list");
    clientsDiv.innerHTML = ""; // clear the div
    if (clients.length == 0) {
        clientsDiv.insertAdjacentHTML("afterbegin", `<p>Nous n'avons trouvé aucun client, désolé</p>`);
    }
    for (const client of clients) {
        clientsDiv.insertAdjacentHTML("afterbegin", `<p>${client.first_name}</p>`);
    }
}
