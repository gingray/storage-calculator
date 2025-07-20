import Alpine from "alpinejs";
import {storeUnit} from "./storage.js";
const usersUnit = {
    'DAU': 1,
    'MAU': 30,
}

const requestUnit = {
    'RPS': 1,
    'RPM': 1.0/60,
    'RPD': 1.0/(60 * 60 * 24)
}


const initUsers = () => {
    Alpine.store('users', {
        usersAmount: null,
        usersAmountUnit: Object.keys(usersUnit)[0],
        requestPerUser: null,
        requestUnit: Object.keys(requestUnit)[0],
        requestSize: null,
        requestStoreUnit: Object.keys(storeUnit)[0],
    })

}

export {initUsers}