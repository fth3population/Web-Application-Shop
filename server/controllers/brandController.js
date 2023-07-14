import ApiError from "../exceptions/ApiError.js";
import {Brand, Type} from "../models/models.js";

class BrandController{
    async create(req,res, next){
        const {name} = req.body;
        if(!name){
            return next(ApiError.BadRequest("Не указано имя"))
        }
        const brand = await Brand.create({name:name})
        return res.json(brand)
    }
    async getAll(req,res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delete(req, res) {
        try {
            const {id} = req.params;

            await Brand.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Brand.destroy({where:{id}}).then(() => {
                            return res.json("Brand deleted");
                        })
                    } else {
                        return res.json("This Brand doesn't exist in DB");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

export default new BrandController()