"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchClients = void 0;
const searchClients = async () => {
    let customers = await fetch("http://localhost:8000/customers")
        .then(async (res) => await res.json())
        .catch(err => {
        console.log(err);
    });
    if (customers) {
        return customers;
    }
};
exports.searchClients = searchClients;
