import ApiError from "../exceptions/ApiError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Basket, Device, Rating, User} from "../models/models.js";

const generateJwt = (id, email, role)=>{
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req,res, next){
        const {email, password, role} = req.body;
        if(!email || !password){
            return next(ApiError.BadRequest("Некорректный email или пароль"))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.BadRequest("Пользователь с таким email существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password:hashPassword})
        const basket = await Basket.create({userId:user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req,res, next){
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.Internal('Пользователь с таким email не найден'))
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if(!isPasswordEquals){
            return next(ApiError.Internal('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getRating(req,res,next){
        try {
            const {deviceId} = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const rate = await Rating.findOne({where: {deviceId: deviceId, userId: user.id}});
            return res.json(rate);
        } catch (e) {
            return res.status(401).json(e.message);
        }
    }
}

export default new UserController()