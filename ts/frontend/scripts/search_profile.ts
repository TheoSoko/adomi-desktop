console.log("search_profile script loaded")

type backResponse = [ boolean, (User[]|apiError) ]

interface User {
    id: string
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    user_name:string;
    phone:string;
    street_name:string;
    street_number:number;
    post_code: string;
    city:string;
}

type apiError = {
    statusCode: number,
    error: string,
    message: string
}


let searchInput = document.getElementById("search_person_input") as HTMLInputElement
searchInput.addEventListener("keydown", (e) => e.key == "Enter" && sendInput())

let searchBtn = document.getElementById("search_btn") as HTMLElement
searchBtn.addEventListener("click", (e) => sendInput())


async function sendInput(){
    const role = (document.getElementById("client_carer_toggle") as HTMLSelectElement).value as "customers"|"carers"

    let clientsDiv = document.getElementById("client_list") as HTMLElement
    clientsDiv.innerHTML = "" // clear the div

    let input = document.getElementById("search_person_input") as HTMLInputElement
    if (!input) return
    if (input.value.length == 0) return

    let res: backResponse = await (window as any).exposed.searchProfiles(role, input.value, 1)
    if (!res) return
    if (res[0] == false) {
        const err = res[1] as apiError
        document.getElementsByClassName("error_message")[0].innerHTML = "Erreur " + err.statusCode + ", " + err.message
        return
    }

    const clients = res[1] as User[]


    if (clients.length == 0) {
        clientsDiv.insertAdjacentHTML("afterbegin",
        `<p>Nous n'avons trouvé aucun ${role}, désolé</p>`)
    }

    for (const client of clients){
        clientsDiv.insertAdjacentHTML("afterbegin", `
            <div class="col-3 col-lg-2 search_result">
                <p class="search_result_text"> ${client.first_name} ${client.last_name} </p>
                <p class="search_result_text">${client.phone}</p>
                <p class="search_result_text">${client.post_code} ${client.city}</p>
                <a id="client_profile_link" href="./${role == "customers" ? "client_profile" : "carer_profile"}.html?profileId=${client.id}">Profile</a>
            </div>
        `)
    }
}
