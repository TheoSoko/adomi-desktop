const etatCivilCard = document.getElementById("bloc_etat_civil") as HTMLInputElement;
const contactCard = document.getElementById("bloc_contact") as HTMLInputElement;
const profile_first_nameInput = document.getElementById('first_name') as HTMLInputElement
const profile_last_nameInput = document.getElementById('last_name') as HTMLInputElement
const profile_user_nameInput = document.getElementById('user_name') as HTMLInputElement
const profile_emailInput = document.getElementById('email') as HTMLInputElement
const profile_phoneInput = document.getElementById('phone') as HTMLInputElement
const  profile_street_nameInput = document.getElementById('street_name') as HTMLInputElement
const  profile_street_numberInput = document.getElementById('street_number') as HTMLInputElement
const  profile_post_codeInput = document.getElementById('post_code') as HTMLInputElement
const  profile_city_Input = document.getElementById('city') as HTMLInputElement
const  profile_id_roleList = document.getElementById('id_role') as HTMLInputElement
const  profile_id_agencyList = document.getElementById('id_agency') as HTMLInputElement
const btn_profilEdit = document.getElementById('profil_btn') as HTMLElement
const btn_submit = document.getElementById('btn_edit_submit') as HTMLElement
const btn_cancelEdit = document.getElementById('btn_cancel_edit') as HTMLElement

interface UserProfile{
    first_name: string,
    last_name: string,
    user_name: string,
    email: string,
    phone: string,
    street_name: string,
    street_number: number,
    post_code: string,
    city: string,
    id_role: number,
    id_agency: number
    role: {label:string},
    agency: {name: string, adress: string}
}

(<any>window).submitForm.getUserProfile().then(async (profile:UserProfile) => {

    const civilCardText = addProfileData([profile.first_name, profile.last_name, profile.user_name, profile.role.label], ['Nom', 'Prénom', 'Pseudo', 'Statut'])

    const contactCardText = addProfileData([profile.email, profile.street_number + ', ' + profile.street_name, profile.city + ' '+ profile.post_code, profile.phone, profile.agency.name + ', '+ profile.agency.adress], ['Email', 'Adresse','Ville', 'Téléphone', 'Agence'])

    etatCivilCard.innerHTML = civilCardText;
    contactCard.innerHTML = contactCardText;

    const profilSynthese = document.getElementById('profil_synthese') as HTMLElement;
    const profilEditForm = document.getElementById('profil_form_edit') as HTMLElement;
    let title = document.getElementById('profil_page_title') as HTMLElement;
    const agencies = await (<any>window).exposeActors.getAgencies();
    const roles = await (<any>window).exposeActors.getRoles();

    btn_profilEdit.addEventListener('click', ()=>{

        profilSynthese.style.display = 'none'
        title.innerText="Modification de profil"
        profilEditForm.style.display = 'flex'
        displayProfileForm(profile, agencies, roles)

        profilEditForm.addEventListener('change', profileFormControl);

        btn_submit.addEventListener('click', ()=>{
            (<any>window).exposeProfileData.updateProfile()
        })
    })

    btn_cancelEdit.addEventListener('click', ()=>{
        (<any>window).location.href = "./profile_page.html";
    })
});

function addProfileData(profileTab:(string | number)[], labelTab:string[]){
    let text = "";
    for(let data in profileTab){
        text += `<div class='datarow'><p class='col-2'><b>${labelTab[data]}</b></p><p class='col-9'>${profileTab[data]}</p></div>`
    }
    return text;
}

function displayProfileForm(profileData:UserProfile, agencies:any, roles:any){

    profile_first_nameInput.value = profileData.first_name;
    profile_last_nameInput.value = profileData.last_name
    profile_user_nameInput.value = profileData.user_name
    profile_phoneInput.value = profileData.phone
    profile_emailInput.value = profileData.email
    profile_city_Input.value = profileData.city
    profile_street_nameInput.value = profileData.street_name
    profile_street_numberInput.value = profileData.street_number.toString()
    profile_post_codeInput.value = profileData.post_code

    roles.forEach((data:any)=>{
        let select = (data.id === profileData.id_role) ? 'selected' : "";
        profile_id_roleList.innerHTML += `<option value='${data.id}' ${select}>${data.label}</option>`
    })

    agencies.forEach((data:any)=>{
        let select = (data.id === profileData.id_agency) ? 'selected' : "";
        profile_id_agencyList.innerHTML += `<option value='${data.id}' ${select}>${data.name}, ${data.adress}</option>`
    }) 
}

function profileFormControl(){

    let profile_first_nameVal = profile_first_nameInput.value
    let profile_last_nameVal = profile_last_nameInput.value
    let profile_user_nameVal = profile_user_nameInput.value
    let profile_phoneVal = profile_phoneInput.value
    let profile_street_nameVal = profile_street_nameInput.value
    let profile_street_numberVal = profile_street_numberInput.value
    let profile_post_codeVal = profile_post_codeInput.value
    let profile_id_roleVal = profile_id_roleList.value
    let profile_id_agencyVal = profile_id_agencyList.value

    let errfirstName = false;
    let errlastName = false;
    let errphone = false;
    let errstreet = false;
    let errstreetNb = false;
    let errposteCode = false;
    
    let errFirstNameMess = document.getElementById('err_nom') as HTMLElement;
    let errLastNameMess = document.getElementById('err_prenom') as HTMLElement;
    let errPhoneMess = document.getElementById('err_phone') as HTMLElement;
    let errStreetMess = document.getElementById('err_street') as HTMLElement;
    let errStreetNbMess = document.getElementById('err_street_nb') as HTMLElement;
    let errPosteCodeMess = document.getElementById('err_postal') as HTMLElement;

    if(profile_first_nameVal.length > 0){
        if(isNaN(parseInt(profile_first_nameVal))){
            errfirstName = false;
            errFirstNameMess.style.display = 'none'
        }
        else{
            errfirstName = true;
            errFirstNameMess.style.display = 'block'
        }

    }
    else{
        errfirstName = false;
        errFirstNameMess.style.display = 'none'
    }

    if(profile_last_nameVal.length > 0){
        if(isNaN(parseInt(profile_last_nameVal))){
            errlastName = false;
            errLastNameMess.style.display = 'none'
        }
        else{
            errlastName = true;
            errLastNameMess.style.display = 'block'
        }

    }
    else{
        errlastName = false;
        errLastNameMess.style.display = 'none'
    }
    
    if(profile_phoneVal.length > 0){

        if(profile_phoneVal.length > 10){
            errphone = true;
            errPhoneMess.style.display = 'block'
        }
        else{
            errphone = false;
            errPhoneMess.style.display = 'none'
        }
    }
    else{
        errphone = false;
        errPhoneMess.style.display = 'none'
    }

    if(profile_street_nameVal.length > 0){
        if(isNaN(parseInt(profile_street_nameVal))){
            errstreet = false;
            errStreetMess.style.display = 'none'
        }
        else{
            errstreet = true;
            errStreetMess.style.display = 'block'
        }

    }
    else{
        errstreet = false;
        errStreetMess.style.display = 'none'
    }

    if(profile_street_numberVal.length > 0){

        if(!isNaN(parseInt(profile_street_numberVal))){
            errstreetNb = false;
            errStreetNbMess.style.display = 'none'
        }
        else{
            errstreetNb = true;
            errStreetNbMess.style.display = 'block'
        }
    }
    else{
        errstreetNb = false;
        errStreetNbMess.style.display = 'none'
    }


    if(profile_post_codeVal.length > 0){

        if(profile_post_codeVal.length  === 5){

            if(!isNaN(parseInt(profile_post_codeVal))){
                errposteCode = false;
                errPosteCodeMess.style.display = 'none'

            }
            else{
                errposteCode = true;
                errPosteCodeMess.style.display = 'block'
            }
        }
        else{
            errposteCode = true;
            errPosteCodeMess.style.display = 'block'
        }
    }
    else{
        errposteCode = false;
        errPosteCodeMess.style.display = 'none'
    }

    if(!errfirstName && !errlastName && !errphone && !errstreet && !errstreetNb && !errposteCode){
        btn_submit.removeAttribute('disabled')
    }
    else{
        btn_submit.setAttribute('disabled', 'true');
    }

}
