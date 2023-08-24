"use strict";
const startDateInput = document.getElementById('startDate');
const startHourInput = document.getElementById('startHour');
const endHourInput = document.getElementById('endHour');
const streetNameInput = document.getElementById('streetName');
const streetNumberInput = document.getElementById('streetNumber');
const postCodeInput = document.getElementById('postCode');
const cityInput = document.getElementById('city');
const validatedInput = document.querySelector("[name='validated']");
const idClientInput = document.getElementById('idClient');
const recurrenceInput = document.getElementById('recurrence');
const ValidationBtn = document.getElementById('btn_mission');
const list = window.exposeActors.getActors().then((response) => {
    let clientInputList = document.getElementById('idClient');
    let carerInputList = document.getElementById('idCarer');
    response[0].forEach((data) => {
        clientInputList.innerHTML = `<option value=${data.id}>${data.first_name}</option>`;
    });
    response[1].forEach((data) => {
        carerInputList.innerHTML = `<option value=${data.id}>${data.first_name}</option>`;
    });
    ValidationBtn.addEventListener('click', async () => {
        let startDateVal = startDateInput.value;
        let startHourVal = startHourInput.value;
        let endHourVal = endHourInput.value;
        let streetNameVal = streetNameInput.value;
        let streetNumberVal = parseInt(streetNumberInput.value);
        let postCodeVal = postCodeInput.value;
        let cityVal = cityInput.value;
        let validatedVal = parseInt(validatedInput.value);
        let idClientVal = parseInt(idClientInput.value);
        let idRecurrenceVal = parseInt(recurrenceInput.value);
        const mission = { startDate: startDateVal, startHour: startHourVal, endHour: endHourVal, streetName: streetNameVal, streetNumber: streetNumberVal, postCode: postCodeVal, city: cityVal, validated: validatedVal, idClient: idClientVal, idRecurence: idRecurrenceVal };
        window.createMission.createNewMission(mission).then(() => {
            window.location.href = "../html/home.html";
            return true;
        }).catch((err) => console.log(err));
    });
});
document.getElementById("missionForm")?.addEventListener('change', missionFormControl);
//WIP
function missionFormControl() {
    let startDateVal = startDateInput.value;
    let startHourVal = startHourInput.value;
    let endHourVal = endHourInput.value;
    let streetNameVal = streetNameInput.value;
    let streetNumberVal = streetNumberInput.value;
    let postCodeVal = postCodeInput.value;
    let cityVal = cityInput.value;
    const err_hour = document.getElementById('err_hour');
    const err_rue = document.getElementById('err_rue');
    const err_ville = document.getElementById('err_ville');
    const err_nb_rue = document.getElementById('err_nb_rue');
    const err_postal = document.getElementById('err_postal');
    let errHour = false;
    let errRue = false;
    let errVille = false;
    let errNbRue = false;
    let errPostal = false;
    if (endHourVal.length > 0) {
        if (endHourVal < startHourVal) {
            err_hour.style.display = "block";
            errHour = true;
        }
        else {
            err_hour.style.display = "none";
            errHour = false;
        }
    }
    else {
        err_hour.style.display = 'none';
        errHour = false;
    }
    if (streetNameVal.length > 0) {
        if (!isNaN(parseInt(streetNameVal))) {
            err_rue.style.display = "block";
            errRue = true;
        }
        else {
            err_rue.style.display = "none";
            errRue = false;
        }
    }
    else {
        err_rue.style.display = "none";
        errRue = false;
    }
    if (cityVal.length > 0) {
        if (!isNaN(parseInt(cityVal))) {
            err_ville.style.display = "block";
            errVille = true;
        }
        else {
            err_ville.style.display = "none";
            errVille = false;
        }
    }
    else {
        err_ville.style.display = "none";
        errVille = false;
    }
    if (streetNumberVal.length > 0) {
        if (isNaN(parseInt(streetNumberVal))) {
            err_nb_rue.style.display = "block";
            errNbRue = true;
        }
        else {
            err_nb_rue.style.display = "none";
            errNbRue = false;
        }
    }
    else {
        err_nb_rue.style.display = "none";
        errNbRue = false;
    }
    if (postCodeVal.length > 0) {
        if (postCodeVal.length === 5) {
            if (isNaN(parseInt(postCodeVal))) {
                err_postal.style.display = "block";
                errPostal = true;
            }
            else {
                err_postal.style.display = "none";
                errPostal = false;
            }
        }
        else {
            err_postal.style.display = "block";
            errPostal = true;
        }
    }
    else {
        err_postal.style.display = "none";
        errPostal = false;
    }
    if (!errHour && !errRue && !errVille && !errNbRue && !errPostal) {
        ValidationBtn.removeAttribute('disabled');
    }
    else {
        ValidationBtn.setAttribute('disabled', 'true');
    }
}
