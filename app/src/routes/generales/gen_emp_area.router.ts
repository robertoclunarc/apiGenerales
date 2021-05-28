import { Router } from "express";
import { empresagerenciaarea, consultaSiIngresado, createRecord, deleteRecord } from '../../controllers/generales/gen_emp_area.controller';
import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/empresagerenciaarea', verifyToken, empresagerenciaarea);
router.get('/consultaSiIngresado/:empre/:geren/:area', verifyToken, consultaSiIngresado);
router.post('/insertar', verifyToken, createRecord);
router.delete('/eliminar/:IdRec', verifyToken, deleteRecord);

export default router;