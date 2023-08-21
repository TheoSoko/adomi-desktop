console.log("search_profile script loaded")

interface User{
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

let searchInput = document.getElementById("search_person_input") as HTMLInputElement
searchInput.addEventListener("keydown", (e) => e.key == "Enter" && sendInput())

let searchBtn = document.getElementById("search_btn") as HTMLElement
searchBtn.addEventListener("click", (e) => sendInput())

// "customers"|"carers"
const role = (document.getElementById("client_carer_toggle") as HTMLSelectElement).value

async function sendInput(){
    let input = document.getElementById("search_person_input") as HTMLInputElement
    if (!input) return
    if (input.value.length == 0) return

    let res = await (window as any).exposed.searchProfiles(role, input.value, 1)

    if (!res) return
    if (res[0] == false) {
        console.log(res[1])
        return
    }

    const clients: User[] = res[1]

    let clientsDiv = document.getElementById("client_list") as HTMLElement
    clientsDiv.innerHTML = "" // clear the div

    if (clients.length == 0) {
        clientsDiv.insertAdjacentHTML("afterbegin",
        `<p>Nous n'avons trouvé aucun ${role}, désolé</p>`)
    }

    for (const client of clients){
        clientsDiv.insertAdjacentHTML("afterbegin", `
            <div class="col-3 col-lg-2 search_result">
                <p class="search_result_text"> ${client.first_name} ${client.last_name} </p>
                <p class="search_result_text">${client.phone}</p>
                <p class="search_result_text">${client.city}</p>
                <a id="client_profile_link" href="./client_profile.html">Profile</a>
            </div>
        `)
    }
}
