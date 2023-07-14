import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get(`api/device/${id}`)
    return data
}

export const fetchDeleteDevice = async (id) => {
    const {data} = await $authHost.delete(`api/device/${id}`);
    return data;
}

export const updateDevices = async (id, body) => {
    const {data} = await $authHost.put(`api/device/${id}`, body);
    return data;
}

export const getAllDevicesInAdminPage = async (name = "asd", page = 1, filter = "All") => {

    const {data} = await $authHost.get(`api/admin/search`,{params: {
            name,
            page,
            filter
        }});
    return data;
}

export const addDeviceToBasket = async (device) => {
    const {data} = await $authHost.post('api/basket', device);
    return data;
}
export const deleteBrand = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/brand/'+id});
    return data;
}

export const deleteType = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/type/'+id});
    return data;
}

export const getDeviceFromBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}

export const deleteDeviceFromBasket = async (id, key = 'all') => {
    const {data} = await $authHost.delete(`api/basket/${id}`, {params: {
            key
        }});
    return data;
}

export const addRating = async(rate, deviceId)=>{
    const {data} = await $authHost.post('api/rating', {rate, deviceId})
}


