const userCard = document.getElementById("userCard") as HTMLInputElement;
let userCardText = "";

(<any>window).submitForm.getUserProfile().then((profile:string[])=>{
    for (let data in profile){
        userCardText +=  `<p>${data} : ${profile[data]}</p>`
    }
    userCard.innerHTML = userCardText
});
