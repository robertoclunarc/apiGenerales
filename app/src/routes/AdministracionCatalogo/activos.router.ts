import { Router } from "express";
import { SelectREcordAll, SelectRecordFilter, SelectREcordJoins, selectActivosGcia, selectActivosAreaNegocios, createRecord, createRecordAreaNegocio, createRecordActivosGerencias, updateRecord, deleteRecord, deleteAreaNegocio, deleteActivoGerencia } from '../../controllers/administracionCatalogo/adm_activos.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', SelectREcordAll);
router.get('/consultarjoins', SelectREcordJoins);
router.get('/activosporgerecias/:Id', selectActivosGcia);
router.get('/activosporareas/:Id', selectActivosAreaNegocios);
router.get('/filtrar/:Id?/:nombre?/:descripcion?/:serial?/:idAdmProducto?/:idComprasEmpresa?', SelectRecordFilter);
router.post('/insertar', createRecord);
router.post('/insertarareanegocio', createRecordAreaNegocio);
router.post('/insertaractivogerencia', createRecordActivosGerencias);
router.put('/actualizar/:IdRec', updateRecord);
router.delete('/eliminargerencias/:IdRec', deleteActivoGerencia);
router.delete('/eliminarareasnegocio/:IdRec', deleteAreaNegocio);
router.delete('/eliminar/:IdRec', deleteRecord);

export default router;