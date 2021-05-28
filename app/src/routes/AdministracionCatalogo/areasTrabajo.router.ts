import { Router } from "express";
import { SelectREcordAll, SelectRecordFilter, createRecord, updateRecord, deleteRecord } from '../../controllers/administracionCatalogo/adm_areas_trabajo.controller';
import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAll);
router.get('/filtrar/:Id/:nombre/:idGenAreaNegocio', verifyToken, SelectRecordFilter);
router.post('/insertar', verifyToken, createRecord);
router.put('/actualizar/:IdRec', verifyToken, updateRecord);
router.delete('/eliminar/:IdRec', deleteRecord);


export default router;