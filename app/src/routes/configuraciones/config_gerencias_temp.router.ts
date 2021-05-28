import { Router } from "express";
import { SelectREcordAll, SelectRecordFilter, createRecord, updateRecord, deleteRecord, gerenciastempnousuario } from '../../controllers/configuraciones/config_gerencias_temp.controller';
import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', verifyToken, SelectREcordAll);
router.get('/filtrar/:idSegUsuario/:usuario/:nombre/:descripcion/:idConfigGerencia', verifyToken, SelectRecordFilter);
router.get('/gerenciastempnousuario/:idUsuario/:idcargo', verifyToken, gerenciastempnousuario);
router.post('/insertar', verifyToken, createRecord);
router.put('/actualizar/:IdRec', verifyToken, updateRecord);
router.delete('/eliminar/:IdRec', verifyToken, deleteRecord);

export default router;