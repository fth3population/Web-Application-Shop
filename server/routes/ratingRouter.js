import {Router} from "express";
import deviceController from "../controllers/deviceController.js";
import checkRole from "../middlewares/checkRoleMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import ratingController from "../controllers/ratingController.js";
const router = new Router();

router.post('/', authMiddleware, ratingController.addRating)

router.post('/check-rating', authMiddleware,  ratingController.checkRating);

export default router