import { Router } from "express";
import { SelectREcordAll, SelectRecordFilter, createRecord, updateRecord, deleteRecord } from '../../controllers/generales/gen_area_negocio.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar',  SelectREcordAll);
router.get('/filtrar/:Id/:nombre/:codigo/:descripcion/:idConfigGerencia/:idAdmTipo', SelectRecordFilter);
router.post('/insertar', createRecord);
router.put('/actualizar/:IdRec',  updateRecord);
router.delete('/eliminar/:IdRec',  deleteRecord);

export default router;