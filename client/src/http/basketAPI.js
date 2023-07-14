import {$authHost, $host} from "./index";

export const addToBasket = async (id) => {
    const {data} = await $authHost.post('api/basket', {id})
    return data
}

export const fetchBasketDevices = async (email) => {
    const {data} = await $host.get('api/basket', {params: {
            email: email
        }})
    return data
}