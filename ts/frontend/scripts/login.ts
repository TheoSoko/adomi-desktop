const usernameInput = document.querySelector("[name='username']") as HTMLInputElement;
const passwordInput = document.querySelector("[name='password']")  as HTMLInputElement;
const loginFormBtn = document.getElementById("submitButton") as HTMLElement;
const errMess = document.getElementById("errMess") as HTMLElement;

interface UserProfile{
    first_name: string,
    last_name: string,
    user_name: string,
    email: string,
    phone: string,
    street_name: string,
    street_number: number,
    post_code: string,
    city: string
}

interface UserLog {
    username: string,
    password: string
}

loginFormBtn.addEventListener('click', function(e){
    e.preventDefault();

    if(usernameInput.value.length && passwordInput.value.length){
        let formData:UserLog = {username: usernameInput.value, password: passwordInput.value};
        (<any>window).submitForm.sendFormData(formData).then((data: boolean | string) => {

            if(typeof data == "string"){
                errMess.innerText = data
            }
            else{
                errMess.innerText = "";
                (<any>window).location.href = "../html/profile_page.html";
            }
            // return true
        }).catch((err:any)=>{console.log(err)})
    }
    else{
        console.log("renseignez tous les champs");
    }
});