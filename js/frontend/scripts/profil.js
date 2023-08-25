"use strict";
const etatCivilCard = document.getElementById("bloc_etat_civil");
const contactCard = document.getElementById("bloc_contact");
window.submitForm.getUserProfile().then((profile) => {
    console.log("profile: ", profile);
    const civilCardText = addProfileData([profile.first_name, profile.last_name, profile.user_name, profile.role.label], ['Nom', 'Prénom', 'Pseudo', 'Statut']);
    const contactCardText = addProfileData([profile.email, profile.street_number + ', ' + profile.street_name, profile.city + ' ' + profile.post_code, profile.phone, profile.agency.name + ', ' + profile.agency.adress], ['Email', 'Adresse', 'Ville', 'Téléphone', 'Agence']);
    etatCivilCard.innerHTML = civilCardText;
    contactCard.innerHTML = contactCardText;
});
function addProfileData(profileTab, labelTab) {
    let text = "";
    for (let data in profileTab) {
        text += `<div class='datarow'><p class='col-2'><b>${labelTab[data]}</b></p><p class='col-9'>${profileTab[data]}</p></div>`;
    }
    return text;
}
