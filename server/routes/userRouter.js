import {Router} from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = new Router();

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth', authMiddleware,userController.check)
router.post('/rate',authMiddleware,userController.getRating)
export default router