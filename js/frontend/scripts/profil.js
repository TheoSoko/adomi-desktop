"use strict";
const etatCivilCard = document.getElementById("bloc_etat_civil");
const contactCard = document.getElementById("bloc_contact");
const profile_first_nameInput = document.getElementById('first_name');
const profile_last_nameInput = document.getElementById('last_name');
const profile_user_nameInput = document.getElementById('user_name');
const profile_emailInput = document.getElementById('email');
const profile_phoneInput = document.getElementById('phone');
const profile_street_nameInput = document.getElementById('street_name');
const profile_street_numberInput = document.getElementById('street_number');
const profile_post_codeInput = document.getElementById('post_code');
const profile_city_Input = document.getElementById('city');
const profile_id_roleList = document.getElementById('id_role');
const profile_id_agencyList = document.getElementById('id_agency');
const btn_profilEdit = document.getElementById('profil_btn');
const btn_submit = document.getElementById('btn_edit_submit');
const btn_cancelEdit = document.getElementById('btn_cancel_edit');
window.submitForm.getUserProfile().then(async (profile) => {
    const civilCardText = addProfileData([profile.first_name, profile.last_name, profile.user_name, profile.role.label], ['Nom', 'Prénom', 'Pseudo', 'Statut']);
    const contactCardText = addProfileData([profile.email, profile.street_number + ', ' + profile.street_name, profile.city + ' ' + profile.post_code, profile.phone, profile.agency.name + ', ' + profile.agency.adress], ['Email', 'Adresse', 'Ville', 'Téléphone', 'Agence']);
    etatCivilCard.innerHTML = civilCardText;
    contactCard.innerHTML = contactCardText;
    const profilSynthese = document.getElementById('profil_synthese');
    const profilEditForm = document.getElementById('profil_form_edit');
    let title = document.getElementById('profil_page_title');
    const agencies = await window.exposeActors.getAgencies();
    const roles = await window.exposeActors.getRoles();
    btn_profilEdit.addEventListener('click', () => {
        profilSynthese.style.display = 'none';
        title.innerText = "Modification de profil";
        profilEditForm.style.display = 'flex';
        displayProfileForm(profile, agencies, roles);
        profilEditForm.addEventListener('change', profileFormControl);
    });
    btn_submit.addEventListener('click', () => {
        let editedProfile = { first_name: profile_first_nameInput.value, last_name: profile_last_nameInput.value, user_name: profile_user_nameInput.value, email: profile_emailInput.value, phone: profile_phoneInput.value, street_name: profile_street_nameInput.value, street_number: profile_street_numberInput.value, post_code: profile_post_codeInput.value, city: profile_city_Input.value, id_role: profile_id_roleList.value, id_agency: profile_id_agencyList.value };
        return window.exposeProfileData.updateProfile(editedProfile);
    });
    btn_cancelEdit.addEventListener('click', () => {
        window.location.href = "./profile_page.html";
    });
});
function addProfileData(profileTab, labelTab) {
    let text = "";
    for (let data in profileTab) {
        text += `<div class='datarow'><p class='col-2'><b>${labelTab[data]}</b></p><p class='col-9'>${profileTab[data]}</p></div>`;
    }
    return text;
}
function displayProfileForm(profileData, agencies, roles) {
    profile_first_nameInput.value = profileData.first_name;
    profile_last_nameInput.value = profileData.last_name;
    profile_user_nameInput.value = profileData.user_name;
    profile_phoneInput.value = profileData.phone;
    profile_emailInput.value = profileData.email;
    profile_city_Input.value = profileData.city;
    profile_street_nameInput.value = profileData.street_name;
    profile_street_numberInput.value = profileData.street_number.toString();
    profile_post_codeInput.value = profileData.post_code;
    roles.forEach((data) => {
        let select = (data.id === profileData.id_role) ? 'selected' : "";
        profile_id_roleList.innerHTML += `<option value='${data.id}' ${select}>${data.label}</option>`;
    });
    agencies.forEach((data) => {
        let select = (data.id === profileData.id_agency) ? 'selected' : "";
        profile_id_agencyList.innerHTML += `<option value='${data.id}' ${select}>${data.name}, ${data.adress}</option>`;
    });
}
function profileFormControl() {
    let profile_first_nameVal = profile_first_nameInput.value;
    let profile_last_nameVal = profile_last_nameInput.value;
    let profile_user_nameVal = profile_user_nameInput.value;
    let profile_phoneVal = profile_phoneInput.value;
    let profile_street_nameVal = profile_street_nameInput.value;
    let profile_street_numberVal = profile_street_numberInput.value;
    let profile_post_codeVal = profile_post_codeInput.value;
    let profile_id_roleVal = profile_id_roleList.value;
    let profile_id_agencyVal = profile_id_agencyList.value;
    let errfirstName = false;
    let errlastName = false;
    let errphone = false;
    let errstreet = false;
    let errstreetNb = false;
    let errposteCode = false;
    let errFirstNameMess = document.getElementById('err_nom');
    let errLastNameMess = document.getElementById('err_prenom');
    let errPhoneMess = document.getElementById('err_phone');
    let errStreetMess = document.getElementById('err_street');
    let errStreetNbMess = document.getElementById('err_street_nb');
    let errPosteCodeMess = document.getElementById('err_postal');
    if (profile_first_nameVal.length > 0) {
        if (isNaN(parseInt(profile_first_nameVal))) {
            errfirstName = false;
            errFirstNameMess.style.display = 'none';
        }
        else {
            errfirstName = true;
            errFirstNameMess.style.display = 'block';
        }
    }
    else {
        errfirstName = false;
        errFirstNameMess.style.display = 'none';
    }
    if (profile_last_nameVal.length > 0) {
        if (isNaN(parseInt(profile_last_nameVal))) {
            errlastName = false;
            errLastNameMess.style.display = 'none';
        }
        else {
            errlastName = true;
            errLastNameMess.style.display = 'block';
        }
    }
    else {
        errlastName = false;
        errLastNameMess.style.display = 'none';
    }
    if (profile_phoneVal.length > 0) {
        if (profile_phoneVal.length > 10) {
            errphone = true;
            errPhoneMess.style.display = 'block';
        }
        else {
            errphone = false;
            errPhoneMess.style.display = 'none';
        }
    }
    else {
        errphone = false;
        errPhoneMess.style.display = 'none';
    }
    if (profile_street_nameVal.length > 0) {
        if (isNaN(parseInt(profile_street_nameVal))) {
            errstreet = false;
            errStreetMess.style.display = 'none';
        }
        else {
            errstreet = true;
            errStreetMess.style.display = 'block';
        }
    }
    else {
        errstreet = false;
        errStreetMess.style.display = 'none';
    }
    if (profile_street_numberVal.length > 0) {
        if (!isNaN(parseInt(profile_street_numberVal))) {
            errstreetNb = false;
            errStreetNbMess.style.display = 'none';
        }
        else {
            errstreetNb = true;
            errStreetNbMess.style.display = 'block';
        }
    }
    else {
        errstreetNb = false;
        errStreetNbMess.style.display = 'none';
    }
    if (profile_post_codeVal.length > 0) {
        if (profile_post_codeVal.length === 5) {
            if (!isNaN(parseInt(profile_post_codeVal))) {
                errposteCode = false;
                errPosteCodeMess.style.display = 'none';
            }
            else {
                errposteCode = true;
                errPosteCodeMess.style.display = 'block';
            }
        }
        else {
            errposteCode = true;
            errPosteCodeMess.style.display = 'block';
        }
    }
    else {
        errposteCode = false;
        errPosteCodeMess.style.display = 'none';
    }
    if (!errfirstName && !errlastName && !errphone && !errstreet && !errstreetNb && !errposteCode) {
        btn_submit.removeAttribute('disabled');
    }
    else {
        btn_submit.setAttribute('disabled', 'true');
    }
}
