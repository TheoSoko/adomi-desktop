


interface clientInterface{
    first_name: string,
    last_name: string,
    email: string,
    phone:string,
    street_name: string,
    street_number:number,
    post_code:string,
    city:string
}

interface employeeInterface {
    first_name: string,
    last_name: string,
    email: string
}

interface missionInterface {
    id: number,
    startDate: string,
    startHour: string,
    endHour: string,
    streetName: string,
    streetNumber: number,
    postCode: string,
    city:string,
    validated: boolean,
    client: clientInterface,
    employee : employeeInterface,
    recurence: string
}

interface missionsInterface {
    
}

const missions: Array<missionInterface> = [
    {
        id: 1,
        startDate: "25-08-2023",
        startHour: "14:00",
        endHour: "15:00",
        streetName: "place de la république",
        streetNumber: 4,
        postCode: "78000",
        city:"Versailles",
        validated: true,
        client:{
            first_name: 'John',
            last_name: 'Doe',
            email: 'example@example.com',
            phone:'0610101010',
            street_name:'rue Jean Jaures',
            street_number:3,
            post_code:'78000',
            city:'Versailles',

        },
        employee:{
            first_name: 'emplo',
            last_name: 'yee',
            email: 'example@example.com',
        },
        recurence:"weekly"
    },
    {
        id: 2,
        startDate: "28-08-2023",
        startHour: "16:00",
        endHour: "17:00",
        streetName: "rue de la gare",
        streetNumber: 12,
        postCode: "78000",
        city:"Versailles",
        validated: true,
        client:{
            first_name: 'John',
            last_name: 'Doe2',
            email: 'example@example.com',
            phone:'0610101010',
            street_name:'rue Jean Jaures',
            street_number:3,
            post_code:'78000',
            city:'Versailles',
        },
        employee:{
            first_name: 'emplo',
            last_name: 'yee2',
            email: 'example@example.com',
        },
        recurence:"bi-weekly"
    }
]




missions.forEach(mission => {

    const containerMissions = document.getElementById("container-cards-lundi") as HTMLInputElement;
    let html = containerMissions.innerHTML;

    console.log(html)

    html +='<div class="missionCard shadow">'
            +'<p class="missionCardContributeur">Avec : <b>'+mission.client.first_name+' '+mission.client.last_name+'</b></p>'
            +'<p class="missionCardHoraire">De: '+mission.startHour+' À: '+mission.endHour+'</p>'
            +'<div class="missionCardAdresse">'
                +'<p>'+mission.streetNumber+' '+mission.streetName+'</p>'
                +'<p>'+mission.postCode+' '+mission.city+'</p>'
            +'</div>'
            +'<div class="missionCardButton">'
                +'<button class="btn btn-info">Voir</button>'
            +'</div>'
        +'</div>';


    containerMissions.innerHTML = html;

});


console.log(missions)