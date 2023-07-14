import ApiError from "../exceptions/ApiError.js";
import * as uuid from 'uuid';
import * as path from 'path';
import {BasketDevice, Brand, Device, DeviceInfo, Type} from "../models/models.js";
import {Op} from "sequelize";

class DeviceController{
    async create(req,res, next){
        try{
            let {name, price, typeId, brandId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            await img.mv(path.resolve('static',fileName))
            const device = await Device.create({name, price, typeId, brandId, img:fileName})
            if(info){
                info = JSON.parse(info)
                info.forEach(i=>
                    DeviceInfo.create({
                        title:i.title,
                        description:i.description,
                        deviceId:device.id,
                    })
                )
            }
            return res.json(device)
        }catch (e){
            next(ApiError.BadRequest(e.message))
        }
    }
    async getOne(req,res, next){
        try {
            const {id} = req.params;
            let devices = await Device.findOne({
                where: {id},
                include: [
                    {model: DeviceInfo, as: 'info'},
                    {model: Type},
                    {model: Brand},
                ]
            });
            return res.json(devices);
        } catch (e) {
            next(ApiError.BadRequest(e.message));
        }
    }

    async getAll(req,res){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1;
        limit = +(limit || 9);
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit,offset})
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where: {brandId},limit,offset})
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId}, limit,offset})
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit,offset})
        }
        return res.json(devices)
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {brandId, typeId, name, price, info} = req.body;

            await Device.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        let newVal = {};
                        brandId ? newVal.brandId = brandId : false;
                        typeId ? newVal.typeId = typeId : false;
                        name ? newVal.name = name : false;
                        price ? newVal.price = price : false;

                        if(req.files) {
                            const {img} = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            img.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newVal.img = fileName;
                        }

                        if(info) {
                            const parseInfo = JSON.parse(info);
                            for (const item of parseInfo) {
                                await DeviceInfo.findOne({where:{id: item.id}}).then( async data => {
                                    if(data) {
                                        await DeviceInfo.update({
                                            title: item.title,
                                            description: item.description
                                        }, {where:{id: item.id}})
                                    } else {
                                        await DeviceInfo.create({
                                            title: item.title,
                                            description: item.description,
                                            deviceId: id
                                        })
                                    }
                                })
                            }
                        }

                        await Device.update({
                            ...newVal
                        }, {where:{id}} ).then(() => {
                            return res.json("Device updated");
                        })
                    } else {
                        return res.json("This Device doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            await Device.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Device.destroy({where:{id}}).then(() => {
                            return res.json("Device deleted");
                        })
                    } else {
                        return res.json("This Device doesn't exist in DB");
                    }

                    //await OrderDevice.destroy({where:{deviceId: id}})
                    await BasketDevice.destroy({where:{deviceId: id}})
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

export default new DeviceController()