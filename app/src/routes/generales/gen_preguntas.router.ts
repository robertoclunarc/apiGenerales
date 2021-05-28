import { Router } from "express";
import { SelectREcordAll } from '../../controllers/generales/gen_preguntas.controller';

const router: Router= Router();

router.get('/consultar', SelectREcordAll);

export default router;