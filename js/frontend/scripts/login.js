"use strict";
const usernameInput = document.querySelector("[name='username']");
const passwordInput = document.querySelector("[name='password']");
const loginFormBtn = document.getElementById("submitButton");
const errMess = document.getElementById("errMess");
loginFormBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (usernameInput.value.length && passwordInput.value.length) {
        let formData = { username: usernameInput.value, password: passwordInput.value };
        window.submitForm.sendFormData(formData)
            .then((data) => {
            if (typeof data == "string") {
                errMess.innerText = data;
            }
            else {
                errMess.innerText = "";
                window.location.href = "../html/profile_page.html";
            }
        }).catch((err) => { console.log(err); });
    }
    else {
        alert("Veuillez renseignez tous les champs, svp");
    }
});
