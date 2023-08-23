const userCard = document.getElementById("userTable") as HTMLInputElement;
let userCardText = "";

(<any>window).submitForm.getUserProfile().then((profile:string[]) => {
    console.log("profile: ", profile)
    for (let data in profile){
        if (data !== 'id') {
            userCardText +=  `<tr><td><b>${data}</b></td><td>${profile[data]}</td></tr>`
        }
    }
    userCard.innerHTML = userCardText;
});
