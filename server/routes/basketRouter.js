import {Router} from "express";
import BasketController from "../controllers/basketController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = new Router();

router.post('/',BasketController.addDevice)
router.get('/',BasketController.getDevices)
router.delete('/:id', BasketController.deleteDevice)
export default router
