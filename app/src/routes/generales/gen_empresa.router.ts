import { Router } from "express";
import { SelectREcordAll, SelectRecordFilter, createRecord, updateRecord, deleteRecord } from '../../controllers/generales/gen_empresa.controller';
import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', verifyToken, SelectREcordAll);
router.get('/filtrar/:Id/:nombre/:rif/:base_datos/:fecha/:cerrada', verifyToken, SelectRecordFilter);
router.post('/insertar', verifyToken, createRecord);
router.put('/actualizar/:IdRec', verifyToken, updateRecord);
router.delete('/eliminar/:IdRec', verifyToken, deleteRecord);

export default router;