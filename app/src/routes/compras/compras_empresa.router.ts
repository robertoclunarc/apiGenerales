import { Router } from "express";
import { SelectRecordAll , SelectRecordNoFilter, empresacomprasgerencia, createRecord, updateRecord, deleteRecord, SelectRecordFilter } from '../../controllers/compras/compra_empresa.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar',  SelectRecordAll);
router.get('/sinfiltro',  SelectRecordNoFilter);
router.get('/empresacomprasgerencia/:Id/:idarea',empresacomprasgerencia)
router.get('/filtrar/:Id?/:nombre?/:rif?/:bd?/:dirfiscal?/:cerrada?', SelectRecordFilter);
router.post('/insertar', createRecord);
router.put('/actualizar/:IdRec',  updateRecord);
router.delete('/eliminar/:IdRec',  deleteRecord);

export default router;