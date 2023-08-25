interface Window {
    exposeActors: any
    createMission: any

}

interface MissionInterface{
    id?:number,
    startDate: string,
    startHour: string
    endHour: string,
    streetName: string,
    streetNumber: number,
    postCode: string,
    city: string,
    validated: number,
    idClient: number,
    idEmployee?: number,
    idCarer?: number,
    idRecurence: number
}

const startDateInput = document.getElementById('startDate') as HTMLInputElement
const startHourInput = document.getElementById('startHour') as HTMLInputElement
const endHourInput = document.getElementById('endHour') as HTMLInputElement
const streetNameInput = document.getElementById('streetName') as HTMLInputElement
const streetNumberInput = document.getElementById('streetNumber') as HTMLInputElement
const postCodeInput = document.getElementById('postCode') as HTMLInputElement
const cityInput = document.getElementById('city') as HTMLInputElement
const validatedInput = document.querySelector("[name='validated']") as HTMLInputElement
const idClientInput = document.getElementById('idClient') as HTMLInputElement
const recurrenceInput = document.getElementById('recurrence') as HTMLInputElement

const list = window.exposeActors.getActors().then((response:any)=>{
    let clientInputList = document.getElementById('idClient') as HTMLElement
    let carerInputList = document.getElementById('idCarer') as HTMLElement

    response[0].forEach((data:any)=>{
        clientInputList.innerHTML = `<option value=${data.id}>${data.first_name}</option>`
    })

    response[1].forEach((data:any)=>{
        carerInputList.innerHTML = `<option value=${data.id}>${data.first_name}</option>`
    })

    const ValidationBtn = document.getElementById('btn_mission') as HTMLElement;

    ValidationBtn.addEventListener('click', async (e)=>{

        // e.preventDefault(); 
        // missionFormControl()
        let startDateVal = startDateInput.value
        let startHourVal = startHourInput.value
        let endHourVal = endHourInput.value
        let streetNameVal = streetNameInput.value
        let streetNumberVal = parseInt(streetNumberInput.value)
        let postCodeVal = postCodeInput.value
        let cityVal = cityInput.value
        let validatedVal = parseInt(validatedInput.value)
        let idClientVal = parseInt(idClientInput.value)
        let idRecurrenceVal = parseInt(recurrenceInput.value)

        const mission: MissionInterface = {startDate: startDateVal, startHour: startHourVal, endHour: endHourVal, streetName: streetNameVal, streetNumber: streetNumberVal,postCode: postCodeVal, city: cityVal, validated: validatedVal, idClient: idClientVal, idRecurence: idRecurrenceVal}

        window.createMission.createNewMission(mission).then(()=>{
            return true;
        })
    })


})

// document.getElementById("missionForm")?.addEventListener('change', missionFormControl)
//WIP
function missionFormControl(){

    let startDateVal = startDateInput.value
    let startHourVal = startHourInput.value
    let endHourVal = endHourInput.value
    let streetNameVal = streetNameInput.value
    let streetNumberVal = parseInt(streetNumberInput.value)
    let postCodeVal = postCodeInput.value
    let cityVal = cityInput.value
    let validatedVal = parseInt(validatedInput.value)
    let idClientVal = parseInt(idClientInput.value)
    let idRecurrenceVal = parseInt(recurrenceInput.value)

    const errHour = document.getElementById('err_hour') as HTMLElement;

}