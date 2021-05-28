import { Router } from "express";
import { SelectREcord, SelectRecordFilter, createRecord } from '../../controllers/generales/gen_respuestas.controller';

const router: Router= Router();

router.get('/consultar', SelectREcord);
router.get('/filtrar/:Id/:idRefServicio', SelectRecordFilter);
router.post('/insertar', createRecord);


export default router;