"use strict";
const nomInput = document.querySelector("[name='nom']");
const prenomInput = document.querySelector("[name='prenom']");
const utilisateurInput = document.querySelector("[name='utilisateur']");
const passWordInput = document.querySelector("[name='password']");
const emailInput = document.querySelector("[name='email']");
const teleInput = document.querySelector("[name='tele']");
const numInput = document.querySelector("[name='num']");
const rueInput = document.querySelector("[name='rue']");
const villeInput = document.querySelector("[name='ville']");
const codePostalInput = document.querySelector("[name='codepostal']");
const submitButton = document.querySelector("[type='submit']");
submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(nomInput.value);
    if (nomInput.value.length && prenomInput.value.length && utilisateurInput.value.length && emailInput.value.length && teleInput.value.length && rueInput.value.length && villeInput.value.length && codePostalInput.value.length) {
        console.log('condition ok');
        let inputInfo = { first_name: prenomInput.value, last_name: nomInput.value, user_name: utilisateurInput.value, password: passWordInput.value, email: emailInput.value, phone: teleInput.value, street_name: rueInput.value, street_number: parseInt(numInput.value), post_code: codePostalInput.value, city: villeInput.value };
        console.log(inputInfo.first_name);
        window.submitInfo.createCustomer(inputInfo).catch((err) => { console.log(err); });
    }
    else {
        console.log("something went wrong");
    }
});
document.getElementById("Client-Form")?.addEventListener('change', creationFrom);
function creationFrom() {
    let passwordVal = passWordInput.value;
    let emailVal = emailInput.value;
    let teleVal = teleInput.value;
    let codePostalVal = codePostalInput.value;
    const err_password = document.getElementById('err_password');
    const err_email = document.getElementById('err_email');
    const err_tele = document.getElementById('err_tele');
    const err_codepostal = document.getElementById('err_codepostal');
    let errPassword = false;
    let errEmail = false;
    let errTele = false;
    let errCodePostal = false;
    const regexPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&µ£\/\\~|\-])[\wÀ-ÖØ-öø-ÿ@$!%*#?&µ£~|\-]{8,255}$/);
    const regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    const regexTele = new RegExp(/^0[0-9].*$/);
    if (passwordVal.length > 0) {
        if (!passwordVal.match(regexPassword)) {
            err_password.style.display = 'block';
            errPassword = true;
        }
        else {
            err_password.style.display = 'none';
            errPassword = false;
        }
    }
    else {
        err_password.style.display = 'none';
        errPassword = false;
    }
    if (emailVal.length > 0) {
        if (!emailVal.match(regexEmail)) {
            err_email.style.display = 'Block';
            errEmail = true;
        }
        else {
            err_email.style.display = 'none';
            errEmail = false;
        }
    }
    else {
        err_email.style.display = 'none';
        errEmail = false;
    }
    if (teleVal.length > 0) {
        if (!teleVal.match(regexTele)) {
            err_tele.style.display = 'Block';
            errTele = true;
        }
        else {
            err_tele.style.display = 'none';
            errTele = false;
        }
    }
    else {
        err_tele.style.display = 'none';
        errTele = false;
    }
    if (codePostalVal.length > 0) {
        if (codePostalVal.length === 5) {
            if (isNaN(parseInt(codePostalVal))) {
                err_codepostal.style.display = "block";
                errCodePostal = true;
            }
            else {
                err_codepostal.style.display = "none";
                errCodePostal = false;
            }
        }
        else {
            err_codepostal.style.display = "block";
            errCodePostal = true;
        }
    }
    else {
        err_codepostal.style.display = "none";
        errCodePostal = false;
    }
    if (!errPassword && !errCodePostal && !errTele && !errEmail) {
        submitButton.removeAttribute("disabled");
    }
    else {
        submitButton.setAttribute('disabled', 'true');
    }
}
