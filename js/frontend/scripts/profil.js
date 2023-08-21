"use strict";
const userCard = document.getElementById("userTable");
let userCardText = "";
window.submitForm.getUserProfile().then((profile) => {
    for (let data in profile) {
        if (data !== 'id') {
            userCardText += `<tr><td><b>${data}</b></td><td>${profile[data]}</td></tr>`;
        }
    }
    userCard.innerHTML = userCardText;
});
