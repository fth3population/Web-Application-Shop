import {Router} from "express";
import typeController from "../controllers/typeController.js";
import checkRole from '../middlewares/checkRoleMiddleware.js'
const router = new Router();


router.post('/',checkRole('ADMIN'),typeController.create)
router.get('/',typeController.getAll)
router.delete('/:id', checkRole("ADMIN"), typeController.delete);
export default router