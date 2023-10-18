export {} ;

const query = new URLSearchParams(window.location.search);
let id = (query as any).get("id") as string;
(document.getElementById("intro_message") as HTMLParagraphElement).innerText = "Demande n°"+id as string


(window as any).exposed.fetchOneGeneralRequest(id).then((req: [boolean, any]) => {
    if (req    [0] == false) {
        (document.getElementById("error_message") as HTMLParagraphElement).innerText = "http code " + req[1].statusCode + " - " + req[1].message
    }
    if (req    [0] == true) {
        document.getElementsByClassName("big_card_text_container")[0].insertAdjacentHTML('beforeend', `
            <p class="request_display_text pt-1 fw-6 my-3"> 
                Utilisateur : 
                <span class="fw-normal">${req[1].user ? req[1].user.first_name + " " + req[1].user.last_name : "non-inscrit"}</span> 
            </p>
            <p class="request_display_text py-1 my-3"> 
                Envoyée le 
                <span class="fw-normal">${new Date(req[1].created_at).toLocaleDateString()}</span>  
            </p>

            <p class="request_display_text py-1 mt-4 mb-0"> Message :  </p>
            <p class="request_display_text py-1 mb-4 mt-0 fw-normal"> ${req[1].request_string} </p> 

            <p class="request_display_text pt-1 my-3"> 
                Référent : 
                <span class="fw-normal">${req[1].referrer ? req[1].referrer.first_name + " " + req[1].referrer.last_name : "Aucun"}</span> 
            </p>
            <p class="request_display_text py-1 my-3"> 
                Complétée : 
                <span class="fw-normal">${req[1].done ? "Oui" : "Non"}</span> 
            </p>
        `)
    }
})
