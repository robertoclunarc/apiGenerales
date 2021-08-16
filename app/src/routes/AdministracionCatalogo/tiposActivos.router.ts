import { Router } from "express";
import { SelectREcordAll, createRecord, updateRecord, deleteRecord } from '../../controllers/administracionCatalogo/adm_tiposActivos.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAll);
router.post('/insertar', createRecord);
router.put('/actualizar/:IdRec', updateRecord);
router.delete('/eliminar/:IdRec', deleteRecord);

export default router;