import path from "path"

export const searchClients = async () => {
    let customers = await fetch("http://localhost:8000/customers")
    .then(async (res)=> await res.json())
    .catch(err => {
        console.log(err)
    })

    if (customers) {
        return customers
    }
}