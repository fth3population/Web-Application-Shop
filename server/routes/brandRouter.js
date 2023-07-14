import {Router} from "express";
import brandController from "../controllers/brandController.js";
import checkRole from "../middlewares/checkRoleMiddleware.js";
const router = new Router();

router.post('/', checkRole('ADMIN'),brandController.create)
router.get('/',brandController.getAll)
router.delete('/:id', checkRole("ADMIN"), brandController.delete);
export default router