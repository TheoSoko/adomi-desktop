"use strict";
const usernameInput = document.querySelector("[name='username']");
const passwordInput = document.querySelector("[name='password']");
const submitBtn = document.getElementById("submitButton");
function getProfileData() {
    console.log('ok');
    const response = window.profileDataTest.profileData;
    console.log(response);
    return response;
}
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (usernameInput.value.length && passwordInput.value.length) {
        let formData = { username: usernameInput.value, password: passwordInput.value };
        window.submitForm.sendFormData(formData);
        const response = window.profileDataTest.profileData().then((data) => console.log(data));
    }
    else {
        console.log("renseignez tous les champs");
    }
});
