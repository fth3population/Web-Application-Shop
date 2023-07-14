import ApiError from "../exceptions/ApiError.js";
import * as uuid from 'uuid';
import * as path from 'path';
import {Basket, BasketDevice, Device, DeviceInfo, User} from "../models/models.js";
import {Op} from "sequelize";
import jwt from "jsonwebtoken";

class BasketController {
    async addDevice(req, res) {
        try {
            const {id} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const basket = await Basket.findOne({where: {userId: user.id}});
            const basketDevice = await BasketDevice.findOne({where:{basketId : basket.id, deviceId: id}})
            if(basketDevice){
                await BasketDevice.update(
                    {cnt: basketDevice.cnt + 1},
                    {where: {basketId: basket.id, deviceId:id}}
                );
            }
            else{
                await BasketDevice.create({basketId : basket.id, deviceId: id})
            }
            return res.json("Product added in card");
        } catch (e) {
            console.error(e);
        }
    }

    async getDevices(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const {id} = await Basket.findOne({where: {userId: user.id}});
            const basket = await BasketDevice.findAll({where: {basketId: id}});

            const basketArr = [];
            for(let i = 0; i < basket.length; i++) {
                const basketDevice = await Device.findOne({
                    where: {
                        id: basket[i].deviceId,

                    },
                    include: {
                        model: DeviceInfo, as: "info",
                        where: {
                            deviceId: basket[i].deviceId,
                            [Op.or]: [
                                {
                                    deviceId: {
                                        [Op.not]: null
                                    }
                                }
                            ],
                        },
                        required: false}
                });
                basketDevice.dataValues.cnt = basket[i].cnt
                basketArr.push(basketDevice);
            }

            return res.json(basketArr);
        } catch (e) {
            console.error(e);
        }
    }

    async deleteDevice(req, res) {
        try {
            let {key} = req.query
            const {id} = req.params;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);

            const userBasket = await Basket.findOne({where: {userId: user.id}})
            if(userBasket.userId === user.id) {
                if(key === 'all'){
                    await BasketDevice.destroy({where: {basketId: userBasket.id, deviceId: id}})
                }
                else{
                    const device = await BasketDevice.findOne({where:{basketId: userBasket.id, deviceId: id}})
                    if(device.cnt === 1){
                        await BasketDevice.destroy({where: {basketId: userBasket.id, deviceId: id}})
                    }
                    else{
                        await BasketDevice.update(
                            {cnt: device.cnt-1},
                            {where: {basketId: userBasket.id, deviceId: id}}
                        );
                    }
                }
            }
            else{
                return res.json(`You haven't access for delete the device(${id}) from basket that didn't belong to you`);
            }
            return res.json("Product deleted form your card");
        } catch (e) {
            console.log(e.message)
        }
    }
}

export default new BasketController()