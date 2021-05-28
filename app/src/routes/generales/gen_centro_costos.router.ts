import { Router } from "express";
import { SelectREcord, SelectRecordFilter, createRecordCcosto, empreccgerencia, updateRecord, deleteRecord } from '../../controllers/generales/gen_centro_costos.controller';
import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar/:Id', verifyToken, SelectREcord);
router.get('/filtrar/:Id/:codigo/:descripcion/:IdComprasEmpresa/:idGerencia', verifyToken, SelectRecordFilter);
router.post('/insertarCcosto', verifyToken, createRecordCcosto);
router.post('/empreccgerencia', verifyToken, empreccgerencia);
router.put('/actualizar/:IdRec', verifyToken, updateRecord);
router.delete('/eliminar/:IdRec', verifyToken, deleteRecord);

export default router;