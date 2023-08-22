export { }

console.log("navbar_include script loaded")

const path = await (window as any).exposed.mainDirPath()

console.log("path of main: ", path)
console.log("path: ", path + "../html/navbar.html")
fetch(path + "/../html/navbar.html")
    .then(async (res) => {
        const navbar = await res.text()
        //var parser = new DOMParser();
        //var parsedNav = parser.parseFromString(navbar, 'text/html');
        document.body.insertAdjacentHTML("afterbegin", navbar)
    })
    .catch((err) => {
        console.log(err)
        document.body.insertAdjacentHTML("afterend", `<p>${err}/p>`)
    })


function modalForNav() {
    let creationDiv = document.getElementById("creation_dropdown_modal") as HTMLElement
    console.log("searchDiv", creationDiv)
    if (creationDiv.style.display == "block") {
        creationDiv.style.display = "none"
        return
    }

    let isBigWindow = window.innerWidth > 1366
    let ismallWindow = window.innerWidth < 992

    const profileSearchPos = document.querySelector('#search_profile')?.getBoundingClientRect().left as number
    const profileCreatePos = document.querySelector('#create_profile')?.getBoundingClientRect().left as number

    //if (!profileSearchPos) return
    //if (ismallWindow) return

    creationDiv.style.left = profileCreatePos - (isBigWindow ? 11 : 26) + "px"
    creationDiv.style.top = (/*isBigWindow ? "79px" : */"95px")
    creationDiv.style.display = "block"

}


window.addEventListener("click", (e) => {
    if ((e.target as Element).id == "create_profile" && window.innerWidth >= 992) {
        modalForNav()
    }
})

window.addEventListener("resize", (e) => {
    document.getElementById("creation_dropdown_modal")!.style.display = "none"
})







