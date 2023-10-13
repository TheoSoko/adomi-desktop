export {}

const userData = await (window as any).submitForm.getUserProfile()

document.getElementById("intro_message")!.innerText = `${userData.first_name} ${userData.last_name}`

document.getElementById("intro_2")!.innerText = `Bon courage ${userData.first_name} !`;


/** MISSIONS */
const pendingMissions = await (window as any).exposed.fetchPendingMissions()
if (pendingMissions[0] == false) {
    console.log(pendingMissions[1]) // log err
}
if (pendingMissions[0] == true) {
    let list = document.getElementById("missions_list") as HTMLElement
    
    for (const mission of pendingMissions[1]){
        // Propriétés d'adresse dans mission ou dans mission.client
        const [street_number, street_name, post_code, city] =  // Syntaxe de décomposition 
            ( mission.streetName )
                ?  [mission.streetNumber, mission.streetName, mission.postCode, mission.city] // Si l'adresse est dans mission
                :  [mission.client.street_number, mission.client.street_name, mission.client.post_code, mission.client.city] // Sinon

        list.insertAdjacentHTML("beforeend", `
            <div class="col-3 dashboard_card py-3 px-3">
                <p class="dash_card_text py-1 my-1"> Client : <span class="fw-lighter"> ${mission.client.first_name + " " + mission.client.last_name} </span> </p>
                <p class="dash_card_text py-1 my-1"> Commence le : <span class="fw-lighter"> ${mission.startDate} </span> </p>
                <p class="dash_card_text py-1 my-1"> De : <span class="fw-lighter">${mission.startHour}</span> à <span class="fw-lighter">${mission.endHour}</span> </p>
                <p class="dash_card_text py-1 my-1"> Lieu : <span class="fw-lighter">${street_number}  ${street_name} </span> </p>
                <p class="dash_card_text py-1 my-1"> <span class="fw-lighter"> ${post_code}, ${city} </span></p>
                <p class="link-button"> <a href="./mission.html?id=${mission.id}" class="text-white text-decoration-none"> Voir la mission </a> </p>
            `)
    }
}

/** DEMANDES */
const generalRequests = await (window as any).exposed.fetchGeneralRequests()
if (generalRequests[0] == false) {
    console.log(generalRequests[1])
}
if (generalRequests[0] == true) {
    //console.log(generalRequests[1])
    let list = document.getElementById("requests_list") as HTMLElement
    for (const req of generalRequests[1]) {
        let shortText = (req.request_string as string).slice(0, 103)
        if (shortText != req.request_string) shortText += "..."
        list.insertAdjacentHTML("beforeend", `
            <div class="col-3 dashboard_card py-3 px-3">
                <p class="dash_card_text py-1 my-1"> Utilisateur : ${req.user ? req.user.first_name + " " + req.user.last_name : "non inscrit"}  </p>
                <p class="dash_card_text py-1 my-1"> Créée à : ${req.created_at} </p>
                <p class="dash_card_text py-1 my-1"> Référent : ${req.referrer ? req.referrer.first_name + " " + req.referrer.last_name : "aucun" }  </p>
                <p class="dash_card_text pt-2 my-2"> Demande: </p>
                <p class="dash_card_text pt-1 my-1" id="short_text"> ${shortText} </p>
                <p class="link-button"> <a href="./general_request.html?id=${req.id}" class="text-white text-decoration-none"> Voir la demande </a> </p>
            </div>
        `)
    }
}


const missionsTemplate = [
    {
        "id": 69,
        "startdate": "2023-08-30",
        "startHour": "10:00:00",
        "endHour": "12:00:00",
        "streetName": null,
        "streetNumber": null,
        "postCode": null,
        "city": null,
        "validated": false,
        "idClient": 9,
        "idEmployee": 10,
        "client": {
            "first_name": "Raymond",
            "last_name": "Saint-Michel",
            "user_name": "raymond.saintmichel",
            "street_name": "Rte du Pré au Moine",
            "street_number": 7,
            "post_code": "35610",
            "city": "Roz-sur-Couesnon"
        },
        "carer": {
            "first_name": "Genko",
            "last_name": "Ishida",
            "user_name": "genko.ishida"
        },
        "employee": {
            "first_name": "Mikhail",
            "last_name": "Sardovitch",
            "user_name": "mikhail.sardovitch"
        },
        "recurence": {
            "recurence_type": "weekly"
        }
    },
]


const generalRequestsTemplate = [
    {
        "id": 1,
        "request_string": "Bonjour, je souhaiterais annuler mon rdv du mercredi 30 août en raison d'un empêchement. Cordialement.",
        "user_id": 1,
        "referrer_id": null,
        "done": false,
        "created_at": "2023-08-24T12:26:12.000Z",
        "user": {
            "first_name": "John",
            "last_name": "Doe"
        },
        "referrer": null
    },
]
