import { Router } from "express";
import { SelectREcordAll, SelectRecordFilter, createRecord, updateRecord, deleteRecord } from '../../controllers/configuraciones/config_parroquias.controller';
import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', verifyToken, SelectREcordAll);
router.get('/filtrar/:Id/:nombreParroquia/:idConfigMunicipio/:nombreMunicipio/:idConfigEstado', verifyToken, SelectRecordFilter);
router.post('/insertar', verifyToken, createRecord);
router.put('/actualizar/:IdRec', verifyToken, updateRecord);
router.delete('/eliminar/:IdRec', verifyToken, deleteRecord);

export default router;