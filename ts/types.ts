export interface User{
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    user_name:string;
    phone:string;
    street_name:string;
    street_number:number;
    post_code: string;
    city:string;
}

// Une erreur standard de l'api
export type apiError = {
    statusCode: number,
    error: string,
    message: string
}
  