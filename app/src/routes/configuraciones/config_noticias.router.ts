import { Router } from "express";
import multer from "../../libs/multer";
import { SelectREcordAll, SelectRecordFilter, createRecord, updateRecord, deleteRecord, subirimagen } from '../../controllers/configuraciones/config_noticias.controller';
import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', verifyToken, SelectREcordAll);
router.get('/filtrar/:Id/:titulo/:descripcion/:fechaAlta/:activo', verifyToken, SelectRecordFilter);
router.post('/insertar', verifyToken, createRecord);
router.post('/subirimagen', verifyToken, multer.single('image'), subirimagen);
router.put('/actualizar/:IdRec', verifyToken, updateRecord);
router.delete('/eliminar/:IdRec', verifyToken, deleteRecord);

export default router;