import { Router } from "express";
import { SelectREcordAll, areasTrabajo, SelectRecordFilter, gerenciasSinActual, createRecord, updateRecord, deleteRecord } from '../../controllers/configuraciones/config_gerencias.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar',  SelectREcordAll);
router.get('/:Id/areasTrabajo',areasTrabajo);
router.get('/gerenciassinactual/:Id',gerenciasSinActual);
router.get('/filtrar/:Id/:nombre/:descripcion',  SelectRecordFilter);
router.post('/insertar',  createRecord);
router.put('/actualizar/:IdRec',  updateRecord);
router.delete('/eliminar/:IdRec',  deleteRecord);

export default router;