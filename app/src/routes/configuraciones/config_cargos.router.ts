import { Router } from "express";
import { SelectREcordAll, SelectRecordFilter, usuariosPorCargoGcia, createRecord, updateRecord, deleteRecord } from '../../controllers/configuraciones/config_cargos.controller';
import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAll);
router.get('/filtrar/:Id/:nombre/:descripcion/:idGerencia', SelectRecordFilter);
router.get('/cargosgerencias/:idGerencia/:nombreCargo',usuariosPorCargoGcia);
router.post('/insertar', createRecord);
router.put('/actualizar/:IdRec', updateRecord);
router.delete('/eliminar/:IdRec', deleteRecord);

export default router;