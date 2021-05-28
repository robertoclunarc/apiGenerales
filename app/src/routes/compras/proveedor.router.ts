import { Router } from "express";
import { SelectRecordAll, createRecord, updateRecord, deleteRecord, SelectRecordFilter } from '../../controllers/compras/compra_proveedor.controller';
import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', verifyToken, SelectRecordAll);
router.get('/filtrar/:Id/:nombre/:rif/:direccion/:valoracion/:telefono/:observaciones/:contacto', verifyToken, SelectRecordFilter);
router.post('/insertar', verifyToken, createRecord);
router.put('/actualizar/:IdRec', verifyToken, updateRecord);
router.delete('/eliminar/:IdRec', verifyToken,  deleteRecord);

export default router;