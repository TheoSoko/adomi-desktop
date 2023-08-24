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
