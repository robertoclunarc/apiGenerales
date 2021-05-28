import { Router } from "express";
import { SelectREcordAll, updateRecord } from '../../controllers/configuraciones/config_param_sist.controller';
import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', verifyToken, SelectREcordAll);
router.put('/actualizar', verifyToken, updateRecord);

export default router;