import { Router } from "express";
import { usuarios,  SelectRecordFilter,   direcciones,  telefonos,  correos } from '../../controllers/usuarios/usuarios.controller';
//import { verifyToken } from "../../controllers/auth.controller";
const router: Router= Router();

router.get('/consultar', usuarios);
router.get('/filtrar/:getId/:pNombre/:sNombre/:pApellido/:sApellido/:login/:estatus/:idConfigCargo',  SelectRecordFilter);
router.get('/direcciones/:getId', direcciones);
router.get('/telefonos/:getId', telefonos);
router.get('/correos/:getId', correos);

export default router;