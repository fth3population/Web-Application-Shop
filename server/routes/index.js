import {Router} from "express";
import deviceRouter from "./deviceRouter.js";
import brandRouter from "./brandRouter.js";
import typeRouter from "./typeRouter.js";
import userRouter from "./userRouter.js";
import basketRouter from "./basketRouter.js";
import ratingRouter from "./ratingRouter.js";
import adminRouter from "./adminRouter.js";


const router = new Router();

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand',brandRouter)
router.use('/device',deviceRouter)
router.use('/basket', basketRouter)
router.use('/rating',ratingRouter)
router.use('/admin', adminRouter)

export default router