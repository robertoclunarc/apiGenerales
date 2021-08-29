import { Router } from "express";
import { SelectREcordAll, areasTrabajo, SelectRecordFilter, gerenciasSinActual, createRecord, updateRecord, deleteRecord } from '../../controllers/configuraciones/config_gerencias.controller';
//import { verifyToken } from "../../controllers/auth.controller";
import {
    getAllServiciosGerencia,
    getOneServicioGerencia,
    getPorGerencia,
} from './../../controllers/gerencias/servicios-gerencias';
const router: Router= Router();

router.get('/consultar',  SelectREcordAll);
router.get('/:Id/areasTrabajo',areasTrabajo);
router.get('/gerenciassinactual/:Id',gerenciasSinActual);
router.get('/filtrar/:Id/:nombre/:descripcion',  SelectRecordFilter);
router.post('/insertar',  createRecord);
router.put('/actualizar/:IdRec',  updateRecord);
router.delete('/eliminar/:IdRec',  deleteRecord);

// AGREGADO YAMIL 2708
router.get('/serviciosgerencias', getAllServiciosGerencia);
router.get('/serviciosgerencias/:idServicio', getOneServicioGerencia);
router.get('/serviciosgerencias/porgerencia/:idGerencia', getPorGerencia);

export default router;