import {Router} from "express";
import deviceController from "../controllers/deviceController.js";
import checkRole from "../middlewares/checkRoleMiddleware.js";
import adminController from "../controllers/adminController.js";
const router = new Router();

router.get('/search', adminController.getSearchAllDeviceByName)

export default router