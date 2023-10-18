"use strict";
console.log("HEOHEO HEO HEO");
const _startDateInput = document.getElementById('startDate');
const _startHourInput = document.getElementById('startHour');
const _endHourInput = document.getElementById('endHour');
const _streetNameInput = document.getElementById('streetName');
const _streetNumberInput = document.getElementById('streetNumber');
const _postCodeInput = document.getElementById('postCode');
const _cityInput = document.getElementById('city');
const _validatedInput = document.querySelector("[name='validated']");
const _idClientInput = document.getElementById('idClient');
const _recurrenceInput = document.getElementById('recurrence');
const ValidationBtn = document.getElementById('btn_mission');
const _errCreation = document.querySelector(".err_creation_global");
const list = window.exposeActors.getActors().then((response) => {
    let clientInputList = document.getElementById('idClient');
    let carerInputList = document.getElementById('idCarer');
    if (!response) {
        console.log("getActors response is " + typeof response);
    }
    response[0].forEach((data) => {
        clientInputList.innerHTML = `<option value=${data.id}>${data.first_name}</option>`;
    });
    response[1].forEach((data) => {
        carerInputList.innerHTML = `<option value=${data.id}>${data.first_name}</option>`;
    });
    ValidationBtn.addEventListener('click', async () => {
        let startDateVal = _startDateInput.value;
        let startHourVal = _startHourInput.value;
        let endHourVal = _endHourInput.value;
        let streetNameVal = _streetNameInput.value;
        let streetNumberVal = parseInt(_streetNumberInput.value);
        let postCodeVal = _postCodeInput.value;
        let cityVal = _cityInput.value;
        let validatedVal = parseInt(_validatedInput.value);
        let idClientVal = parseInt(_idClientInput.value);
        let idRecurrenceVal = parseInt(_recurrenceInput.value);
        const mission = { startDate: startDateVal, startHour: startHourVal, endHour: endHourVal, streetName: streetNameVal, streetNumber: streetNumberVal, postCode: postCodeVal, city: cityVal, validated: validatedVal, idClient: idClientVal, idRecurence: idRecurrenceVal };
        window.createMission.createNewMission(mission).then((res) => {
            console.log("res[1] ", res[1]);
            if (res[0] == false) {
                _errCreation.innerText = res[1];
            }
            else {
                window.location.href = "../../../html/home.html";
            }
        })
            .catch(() => _errCreation.innerText = "Désolé, une erreur inconue est survenue");
    });
});
document.getElementById("missionForm")?.addEventListener('change', missionFormControl);
//WIP
function missionFormControl() {
    let startDateVal = _startDateInput.value;
    let startHourVal = _startHourInput.value;
    let endHourVal = _endHourInput.value;
    let streetNameVal = _streetNameInput.value;
    let streetNumberVal = _streetNumberInput.value;
    let postCodeVal = _postCodeInput.value;
    let cityVal = _cityInput.value;
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
