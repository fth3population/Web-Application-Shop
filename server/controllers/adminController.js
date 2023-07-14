import ApiError from "../exceptions/ApiError.js";
import * as uuid from 'uuid';
import * as path from 'path';
import {Brand, Device, DeviceInfo, Type} from "../models/models.js";
import {Op} from "sequelize";

class AdminController{
    async getSearchAllDeviceByName(req, res, next) {
        try {
            let {limit, page, name, filter} = req.query;

            page = page || 1;
            limit = limit || 7;
            let offset = page * limit - limit
            if(filter === "All") {
                const devices =  await Device.findAndCountAll({
                    attributes: ["name", "price", "img", "id"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            }
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Brand
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })
                console.log(devices)
                return res.json(devices);
            } else {
                const devices =  await Device.findAndCountAll({
                    attributes: ["name", "price", "img", "id", "brandId", "typeId"],
                    where:
                        {
                            name: {
                                [Op.like]: `%${name}%`
                            },
                            [Op.or]: [
                                {
                                    brandId: null,
                                },
                                {
                                    typeId: null,
                                },
                            ],
                        },
                    include: [
                        {
                            attributes: ["name"],
                            model: Brand
                        },
                        {
                            attributes: ["name"],
                            model: Type
                        },
                    ],
                    limit,
                    offset,
                })

                console.log(devices)
                return res.json(devices);
            }
        } catch (e) {
            next(ApiError.BadRequest(e.message));
        }
    }
}

export default new AdminController()