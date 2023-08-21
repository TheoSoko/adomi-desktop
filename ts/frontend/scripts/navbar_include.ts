console.log("navbar_include script loaded")


let navbar = fetch("../html/navbar.html")
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


    function modalForNav(){
        let searchDiv = document.getElementById("search_div_modal") as HTMLElement
        console.log("searchDiv", searchDiv )
        if (searchDiv.style.display == "block"){
            searchDiv.style.display = "none"
            return
        }

        let isBigWindow = window.innerWidth > 1366
        let ismallWindow = window.innerWidth < 992

        const profileSearchPos = document.querySelector('#search_profile')?.getBoundingClientRect().left as number
        
        //if (!profileSearchPos) return
        //if (ismallWindow) return

        searchDiv.style.left = profileSearchPos - (isBigWindow ? 9 : 18 ) + "px"
        searchDiv.style.top = (/*isBigWindow ? "79px" : */"95px")
        searchDiv.style.display = "block"

        const profileCreatePos =  document.querySelector('#create_profile')?.getBoundingClientRect().left
    }
    

    window.addEventListener("click", (e) => {
        if ((e.target as Element).id == "search_profile" && window.innerWidth >= 992){
            modalForNav()
        }
    })

    window.addEventListener("resize", (e) => {
        document.getElementById("search_div_modal")!.style.display = "none"
    })




