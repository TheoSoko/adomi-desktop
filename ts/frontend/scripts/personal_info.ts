const nomInput = document.querySelector("[name='nom']") as HTMLInputElement;
const prenomInput = document.querySelector("[name='prenom']") as HTMLInputElement;
const utilisateurInput = document.querySelector("[name='utilisateur']") as HTMLInputElement;
const passWordInput = document.querySelector("[name='password']") as HTMLInputElement;
const emailInput = document.querySelector("[name='email']") as HTMLInputElement;
const teleInput = document.querySelector("[name='tele']") as HTMLInputElement;
const numInput = document.querySelector("[name='num']") as HTMLInputElement;
const rueInput = document.querySelector("[name='rue']") as HTMLInputElement;
const villeInput = document.querySelector("[name='ville']") as HTMLInputElement;
const codePostalInput = document.querySelector("[name='codepostal']") as HTMLInputElement;
const submitButton = document.querySelector("[type='submit']") as HTMLInputElement;


interface UserProfileInterface{
    first_name: string,
    last_name: string,
    user_name: string,
    password: string,
    email: string,
    phone: string,
    street_name: string,
    street_number: number,
    post_code: string,
    city: string,
    id_agency: number,
}
interface Window {
    userProfile: UserProfileInterface,
    submitInfo: any,
    submitForm: any,
}


submitButton.addEventListener('click', function(e){
    e.preventDefault();
    console.log(nomInput.value);
    if(nomInput.value.length && prenomInput.value.length && utilisateurInput.value.length && emailInput.value.length && teleInput.value.length && rueInput.value.length && villeInput.value.length && codePostalInput.value.length){
        console.log('condition ok')
        window.submitForm.getUserProfile().then((client:any) =>{
            console.log(client);
            
            let inputInfo:UserProfileInterface = {first_name: prenomInput.value, last_name: nomInput.value, user_name:utilisateurInput.value,password:passWordInput.value, email: emailInput.value, phone: teleInput.value, street_name:rueInput.value, street_number:parseInt(numInput.value) ,post_code:codePostalInput.value, city:villeInput.value, id_agency:client.id_agency};
        console.log(inputInfo.first_name)
        window.submitInfo.createCustomer(inputInfo).catch((err:any)=>{console.log(err)})});
    }else{
        console.log("something went wrong");
    }
})
