interface Window{
    exposeMissionData: any,
    updateMission:any
}

interface dayMapInterface {
    [key: number]: string;
}

const recurenceMap = [
    [1,"hebdomadaire"],
    [2,"mensuelle"],
    [3,"bi-mensuelle"],
]

const dayMap : dayMapInterface= {
    1:"lundi",
    2:"mardi",
    3:"mercredi",
    4:"jeudi",
    5:"vendredi",
    6:"samedi",
    7:"dimanche"
}

interface MissionInterface{
    id?: number,
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

const error_message = document.getElementById('error_message') as HTMLInputElement

const startDateInput = document.getElementById('startDate') as HTMLInputElement
const startHourInput = document.getElementById('startHour') as HTMLInputElement
const endHourInput = document.getElementById('endHour') as HTMLInputElement
const streetNameInput = document.getElementById('streetName') as HTMLInputElement
const streetNumberInput = document.getElementById('streetNumber') as HTMLInputElement
const postCodeInput = document.getElementById('postCode') as HTMLInputElement
const cityInput = document.getElementById('city') as HTMLInputElement
const validatedInput = document.querySelector("[name='validated']") as HTMLInputElement
const idClientInput = document.getElementById('idClient') as HTMLInputElement
const idCarerInput = document.getElementById('idCarer') as HTMLInputElement
const recurrenceInput = document.getElementById('recurrence') as HTMLInputElement
const missionIDInput = document.getElementById('missionId') as HTMLInputElement


const missionId = new URLSearchParams(window.location.search).get("id")
console.log("mission Id : "+missionId)

async function fillForm() {

    const resultatMission = await window.exposeMissionData.getMissionData(missionId);
    console.log(resultatMission)

    if(resultatMission[0] == false){
        error_message.innerText = "Erreur " + resultatMission[1].statusCode + ", " + resultatMission[1].message;
    }
    if(resultatMission[0] == true){

        const mission = resultatMission[1]
        const resultatListeActors = await window.exposeActors.getActors();
    
        const listeClients = resultatListeActors[0]
        const listeCarers = resultatListeActors[1]
    
        console.log(listeClients);
        console.log(listeCarers);
    
        // console.log(mission.startdate)


        startDateInput.value = mission.startdate
        startHourInput.value = mission.startHour
        endHourInput.value = mission.endHour
        streetNameInput.value = mission.streetName
        streetNumberInput.value = mission.streetNumber
        cityInput.value = mission.city
        postCodeInput.value = mission.postCode
        missionIDInput.value = mission.id


        listeClients.forEach((data:any)=>{
            if(data.id == mission.idClient){
                idClientInput.insertAdjacentHTML("beforeend",`<option value="${data.id}" selected>${data.first_name} ${data.last_name}</option>`)
            }else{
                idClientInput.insertAdjacentHTML("beforeend",`<option value="${data.id}">${data.first_name} ${data.last_name}</option>`)
            }
        })

        console.log("carer id : "+ mission.idCarer)
        listeCarers.forEach((data:any)=>{
            console.log("liste carer id : "+data.id);
            
            if(data.id == mission.idCarer){
                idCarerInput.insertAdjacentHTML("beforeend",`<option value="${data.id}" selected>${data.first_name} ${data.last_name}</option>`)
            }else{
                idCarerInput.insertAdjacentHTML("beforeend",`<option value="${data.id}">${data.first_name} ${data.last_name}</option>`)
            }
        })

        recurenceMap.forEach((data:any) => {
            if(mission.recurence.id == data[0]){
                recurrenceInput.insertAdjacentHTML("beforeend",`<option value="${data[0]}" selected>${data[1]}</option>`)
            }else{
                recurrenceInput.insertAdjacentHTML("beforeend",`<option value="${data[0]}">${data[1]}</option>`)
            }
        });

        const ValidationBtn = document.getElementById('btn_mission') as HTMLElement;

        ValidationBtn.addEventListener('click', async (e)=>{

            // e.preventDefault(); 
            // missionFormControl()
            let idVal = parseInt(missionIDInput.value)
            let startDateVal = startDateInput.value
            let startHourVal = startHourInput.value
            let endHourVal = endHourInput.value
            let streetNameVal = streetNameInput.value
            let streetNumberVal = parseInt(streetNumberInput.value)
            let postCodeVal = postCodeInput.value
            let cityVal = cityInput.value
            let validatedVal = parseInt(validatedInput.value)
            let idClientVal = parseInt(idClientInput.value)
            let idCarerVal = parseInt(idCarerInput.value)
            let idRecurrenceVal = parseInt(recurrenceInput.value)

            const mission: MissionInterface = {id: idVal,startDate: startDateVal, startHour: startHourVal, endHour: endHourVal, streetName: streetNameVal, streetNumber: streetNumberVal,postCode: postCodeVal, city: cityVal, validated: validatedVal, idClient: idClientVal,idCarer: idCarerVal, idRecurence: idRecurrenceVal}

            window.updateMission.updateMission(mission).then(()=>{
                window.location.href = "./mission.html?id="+idVal
                return true;
            })
        })
    
    }
    
    

}

fillForm();




