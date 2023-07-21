"use strict";
const userCard = document.getElementById("userCard");
let userCardText = "";
window.submitForm.getUserProfile().then((profile) => {
    for (let data in profile) {
        userCardText += `<p>${data} : ${profile[data]}</p>`;
    }
    userCard.innerHTML = userCardText;
});
