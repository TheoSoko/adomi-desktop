const nomCarerInput = document.querySelector("[name='nom']") as HTMLInputElement;
const prenomCarerInput = document.querySelector("[name='prenom']") as HTMLInputElement;
const utilisateurCarerInput = document.querySelector("[name='utilisateur']") as HTMLInputElement;
const passWordCarerInput = document.querySelector("[name='password']") as HTMLInputElement;
const emailCarerInput = document.querySelector("[name='email']") as HTMLInputElement;
const teleCarerInput = document.querySelector("[name='tele']") as HTMLInputElement;
const numCarerInput = document.querySelector("[name='num']") as HTMLInputElement;
const rueCarerInput = document.querySelector("[name='rue']") as HTMLInputElement;
const villeCarerInput = document.querySelector("[name='ville']") as HTMLInputElement;
const codePostalCarerInput = document.querySelector("[name='codepostal']") as HTMLInputElement;
const submitCarerButton = document.querySelector("[type='submit']") as HTMLInputElement;

interface UserProfileInterfaces{
    first_name: string,
    last_name: string,
    user_name: string,
    password: string,
    email: string,
    phone: string,
    street_name: string,
    street_number: number,
    post_code: string,
    city: string
}
interface Window {
    userProfile: UserProfileInterfaces,
    submitInfo: any,
}


submitButton.addEventListener('click', function(e){
    e.preventDefault();
    console.log(nomCarerInput.value);
    if(nomCarerInput.value.length && prenomCarerInput.value.length && utilisateurCarerInput.value.length && emailCarerInput.value.length && teleCarerInput.value.length && rueCarerInput.value.length && villeCarerInput.value.length && codePostalCarerInput.value.length){
        console.log('condition ok')
        let inputInfo:UserProfileInterfaces = {first_name: prenomCarerInput.value, last_name: nomCarerInput.value, user_name:utilisateurCarerInput.value,password:passWordCarerInput.value, email: emailCarerInput.value, phone: teleCarerInput.value, street_name:rueCarerInput.value, street_number:parseInt(numCarerInput.value) ,post_code:codePostalCarerInput.value, city:villeCarerInput.value};
        console.log(inputInfo.first_name)
        window.submitInfo.createCustomer(inputInfo).catch((err:any)=>{console.log(err)})
    }else{
        console.log("something went wrong");
    }
})

document.getElementById("Client-Form")?.addEventListener('change', creationFrom)

function creationFrom() {
    
    let passwordVal =   passWordCarerInput.value;
    let emailVal = emailCarerInput.value;
    let teleVal = teleCarerInput.value;
    let codePostalVal = codePostalCarerInput.value;

    const err_password = document.getElementById('err_password') as HTMLInputElement;
    const err_email = document.getElementById('err_email') as HTMLInputElement;
    const err_tele = document.getElementById('err_tele') as HTMLInputElement;
    const err_codepostal = document.getElementById('err_codepostal') as HTMLInputElement;

    let errPassword = false;
    let errEmail = false;
    let errTele = false;
    let errCodePostal = false;


    const regexPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&µ£\/\\~|\-])[\wÀ-ÖØ-öø-ÿ@$!%*#?&µ£~|\-]{8,255}$/)
    const regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    const regexTele = new RegExp(/^0[0-9].*$/)

    if(passwordVal.length > 0){
    if(!(passwordVal as string).match(regexPassword)) {
        err_password.style.display = 'block';
        errPassword = true;
    }else{
        err_password.style.display = 'none';
        errPassword = false;
    }
}else{
    err_password.style.display = 'none';
        errPassword = false;
}

    if(emailVal.length > 0){ 
    if(!(emailVal as string).match(regexEmail)) {
        err_email.style.display = 'Block';
        errEmail = true;
    }else{
        err_email.style.display = 'none';
        errEmail = false;
    }
}else{
    err_email.style.display = 'none';
        errEmail = false;
}

    if(teleVal.length > 0){ 
    if(!(teleVal as string).match(regexTele)){
        err_tele.style.display = 'Block';
        errTele = true;
    }else{
        err_tele.style.display = 'none';
        errTele = false;
    }
}else{
    err_tele.style.display = 'none';
        errTele = false;
}
    
    if(codePostalVal.length > 0){   
    if(codePostalVal.length === 5){

        if(isNaN(parseInt(codePostalVal))){
            err_codepostal.style.display = "block";
            errCodePostal = true;  
        }
        else{
            err_codepostal.style.display = "none";
            errCodePostal = false;
        }
    }
    else{
        err_codepostal.style.display = "block";
        errCodePostal = true;
    }
}
else{
    err_codepostal.style.display = "none";
    errCodePostal = false;
}

if(!errPassword && !errCodePostal && !errTele && !errEmail){
    submitButton.removeAttribute("disabled");
}else{
    submitButton.setAttribute('disabled','true');
}

}
