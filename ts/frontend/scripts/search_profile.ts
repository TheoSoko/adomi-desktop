console.log("search_profile script loaded")

let searchInput = document.getElementById("search_person_input") as HTMLInputElement
searchInput.addEventListener("keydown", (e) => e.key == "Enter" && sendInput())

let searchBtn = document.getElementById("search_btn") as HTMLElement
searchBtn.addEventListener("click", (e) => sendInput())



async function sendInput(){
    let input = document.getElementById("search_person_input") as HTMLInputElement
    if (!input) return
    if (input.value.length == 0) return

    console.log(input.value)

    let w = window as any
    const clients = await w.exposed.searchClients()
    console.log(clients)
    document.body.insertAdjacentHTML("afterend",`<p>${clients[0].first_name}</p>`)
}
