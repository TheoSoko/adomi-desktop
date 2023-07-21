const usernameInput = document.querySelector("[name='username']") as HTMLInputElement;
const passwordInput = document.querySelector("[name='password']")  as HTMLInputElement;
const submitBtn = document.getElementById("submitButton") as HTMLElement;

interface UserLog {
    username: string,
    password: string
}

 function  getProfileData(){
    console.log('ok')
    const response = (<any>window).profileDataTest.profileData
    console.log(response);
    return response
}

submitBtn.addEventListener('click', function(e){
    e.preventDefault();

    if(usernameInput.value.length && passwordInput.value.length){
        let formData:UserLog = {username: usernameInput.value, password: passwordInput.value};
        (<any>window).submitForm.sendFormData(formData)
        const response = (<any>window).profileDataTest.profileData().then((data:any)=>console.log(data))
    }
    else{
        console.log("renseignez tous les champs");
    }
});