import { Router } from "express";
import { SelectRecordAll, createRecord, updateRecord, deleteRecord, SelectRecordFilter } from '../../controllers/compras/compra_proveedor.controller';

const router: Router= Router();

router.get('/consultar', SelectRecordAll);
router.get('/filtrar/:Id/:nombre/:rif/:direccion/:valoracion/:telefono/:observaciones/:contacto', SelectRecordFilter);
router.post('/insertar', createRecord);
router.put('/actualizar/:IdRec', updateRecord);
router.delete('/eliminar/:IdRec', deleteRecord);

export default router;