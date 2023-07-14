import {Router} from "express";
import deviceController from "../controllers/deviceController.js";
import checkRole from "../middlewares/checkRoleMiddleware.js";
const router = new Router();

router.post('/',checkRole('ADMIN'),deviceController.create)
    .get('/',deviceController.getAll)
    .get('/:id',deviceController.getOne)
    .put('/:id', checkRole("ADMIN"), deviceController.update)
    .delete('/:id', checkRole("ADMIN"), deviceController.delete)

export default router