import { Router } from "express";
import { SelectRecordAll, SelectRecordFilter } from '../../controllers/compras/compras_productos.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar',  SelectRecordAll);
router.get('/filtrar/:codigo?', SelectRecordFilter);
/*
router.get('/sinfiltro',  SelectRecordNoFilter);
router.get('/empresacomprasgerencia/:Id/:idarea',empresacomprasgerencia)

router.post('/insertar', createRecord);
router.put('/actualizar/:IdRec',  updateRecord);
router.delete('/eliminar/:IdRec',  deleteRecord);
*/
export default router;