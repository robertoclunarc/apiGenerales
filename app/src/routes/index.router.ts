import  express  from 'express'

//import provRoutes from "./compras/proveedor.router";
import activoRoutes from "./AdministracionCatalogo/activos.router";
import areasTrabajoRouter from './AdministracionCatalogo/areasTrabajo.router';
import cargoRouters from './configuraciones/config_cargos.router';
import gerenciasRouter from './configuraciones/config_gerencias.router'
import ciudadesRouter from './configuraciones/config_ciudades.router';
import estadosRouter from './configuraciones/config_estados.router';
import municipioRouter from './configuraciones/config_municipios.router';
import zonapostRouter from './configuraciones/config_zonapost.router';
import parroquiaRouter from './configuraciones/config_parroquia.router';
import noticiaRouter from './configuraciones/config_noticias.router';
import gen_emp_areaRouter from './generales/gen_emp_area.router';
import sergenRouter from './configuraciones/config_serv_ger.router';
import paramsistemRouter from './configuraciones/config_param_sist.router';
import gerenciasTempRouter from './configuraciones/config_gerencias_temp.router';
import empresaRouter from './generales/gen_empresa.router';
import areanegocioRouter from './generales/gen_area_negocio.router';
import ccostoRouter from './generales//gen_centro_costos.router';
import preguntasRouter from './generales/gen_preguntas.router';
import respuestasRouter from './generales/gen_respuestas.router';

import {createToken} from '../controllers/signin.controller';

//setting
const routers = express();

//routers.use('/compras/proveedores',provRoutes); <-----deshabilitado el 28/05/2021

routers.use('/adm/activos',activoRoutes);
routers.use('/adm/areasTrabajo', areasTrabajoRouter);

routers.use('/config/cargos',cargoRouters);
routers.use('/config/gerencias', gerenciasRouter);
routers.use('/config/ciudades', ciudadesRouter);
routers.use('/config/estados', estadosRouter);
routers.use('/config/municipios', municipioRouter);
routers.use('/config/zonaspostales', zonapostRouter);
routers.use('/config/parroquias', parroquiaRouter);
routers.use('/config/noticias',noticiaRouter);
routers.use('/config/servgen', sergenRouter);
routers.use('/config/paramsistem', paramsistemRouter);
routers.use('/config/gerenciastemp',gerenciasTempRouter);

routers.use('/generales/empresas',empresaRouter);
routers.use('/generales/gen_emp', gen_emp_areaRouter);
routers.use('/generales/area_negocio', areanegocioRouter);
routers.use('/generales/ccosto', ccostoRouter);
routers.use('/generales/preguntas', preguntasRouter);
routers.use('/generales/respuestas', respuestasRouter);

export default routers;