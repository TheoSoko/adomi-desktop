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
const list = window.exposeActors.getActors().then((response) => {
    let clientInputList = document.getElementById('idClient');
    let carerInputList = document.getElementById('idCarer');
    response[0].forEach((data) => {
        clientInputList.innerHTML = `<option value=${data.id}>${data.first_name}</option>`;
    });
    response[1].forEach((data) => {
        carerInputList.innerHTML = `<option value=${data.id}>${data.first_name}</option>`;
    });
    const ValidationBtn = document.getElementById('btn_mission');
    ValidationBtn.addEventListener('click', async (e) => {
        // e.preventDefault(); 
        // missionFormControl()
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
            return true;
        });
    });
});
// document.getElementById("missionForm")?.addEventListener('change', missionFormControl)
//WIP
function missionFormControl() {
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
    const errHour = document.getElementById('err_hour');
}
