# Script en nodejs, typescript para los insert, update, delete y consultas de registros de Proveedores, Cargos y Cctivos de la BD del sistema sisglobal.

## Tablas:
- compras_proveedores
- config_cargos
- adm_activos
- adm_areas_trabajo
- config_gerencias
- config_ciudades
- config_estados
- config_municipios
- config_zonas_postales
- config_parroquias
- config_noticias

## Variables de entorno:
```
- APP_PORT
- JWT_SECRET
- MYSQL_SERVER
- MYSQL_USER
- MYSQL_PW
- MYSQL_DB
- MYSQL_PORT
```

## TOKEN
Para acceder a cualquiera de las rutas especificadas se requiere crear el token, para esto se debe ir a la siguiente ruta y pasar como parametro el usuario
- get "/token/:login"

## Administracion Catalogo
- get "api/adm/activos/consultar"
- get "api/adm/activos/filtrar/:Id/:nombre/:descripcion/:serial/:idAdmProducto/:idComprasEmpresa"
- get "api/adm/consultarjoins"
- get "api/activosporgerecias/:Id"
- get "api/activosporareas/:Id"
- post "api/adm/activos/insertar"
- post "api/insertarareanegocio"
- post "api/insertaractivogerencia"
- put "api/adm/activos/actualizar/:Id"
- delete "api/eliminargerencias/:IdRec"
- delete "api/eliminarareasnegocio/:IdRec"
- delete "api/adm/activos/eliminar/:Id"

- get "api/adm/areasTrabajo/consultar"
- get "api/adm/areasTrabajo/filtrar/:IdAreaTrabajo/:nombre/:idGenAreaNegocio"
- post "api/adm/areasTrabajo/insertar"
- put "api/adm/areasTrabajo/actualizar/:IdAreaTrabajo"
- delete "api/adm/areasTrabajo/eliminar/:IdAreaTrabajo"

- get "api/adm/unidadmedidas/consultar"
- get "api/adm/unidadmedidas/filtrar/:Id"
- post "api/adm/unidadmedidas/insertar"
- put "api/adm/unidadmedidas/actualizar/:IdAreaTrabajo"
- delete "api/adm/unidadmedidas/eliminar/:IdAreaTrabajo"

## Compras
### Estos accesos estan deshabilitados
 - ~~get "api/compras/proveedores/consultar"~~
 - ~~get "api/compras/proveedores/filtrar/:Id/:nombre/:rif/:direccion/:valoracion/:telefono/:observaciones/:contacto"~~
 - ~~post "api/compras/proveedores/insertar"~~
 - ~~put "api/compras/proveedores/actualizar/:IdProv"~~
 - ~~delete "api/compras/proveedores/eliminar/:IdProv"~~

 - get "api/compras/empresas/consultar"
 - get "api/compras/empresas/sinfiltro" 
 - get "api/compras/filtrar/:Id/:nombre/:rif/:bd/:dirfiscal:/cerrada"
 - get "api/compras/empresacomprasgerencia/:Id/:idarea"
 - post "api/compras/proveedores/insertar"
 - post "api/compras/insertarareanegocio"
 - post "api/compras/insertaractivogerencia"
 - put "api/compras/proveedores/actualizar/::IdRec"
 - delete "api/compras/proveedores/eliminar/::IdRec"

## Configuraciones
- get "api/config/cargos/consultar"
- get "api/config/cargos/filtrar/:Idcargo/:nombre/:descripcion/:idGerencia"
- get "api/config/cargos/cargosgerencias/:idGerencia/:nombreCargo"
- post "api/config/cargos/insertar"
- put "api/config/cargos/actualizar/:IdCargo"
- delete "api/config/cargos/eliminar/:IdCargo"

- get "api/config/gerencias/consultar"
- get "api/config/gerencias/:Id/areasTrabajo"
- get "api/config/gerencias/gerenciassinactual/:Id"
- get "api/config/gerencias/filtrar/:IdGerencia/:nombre/:descripcion"
- post "api/config/gerencias/insertar"
- put "api/config/gerencias/actualizar:/IdGerenecia"
- delete "api/config/gerencias/eliminar/:IdGerencia"

- get "api/config/ciudades/consultar"
- get "api/config/ciudades/filtrar/:IdCiudad/:nombreCiudad/:idConfigEstado/:nombreEstado"
- post "api/config/ciudades/insertar"
- put "api/config/ciudades/actualizar/:IdCiudad"
- delete "api/config/ciudades/eliminar/:IdCiudad"

- get "api/config/estados/consultar"
- get "api/config/estados/filtrar/IdEstado/:nombre"
- post "api/config/estados/insertar"
- put "api/config/estados/actualizar/:IdEstado"
- delete "api/config/estados/eliminar/:IdEstado"

- get "api/config/municipios/consultar"
- get "api/config/municipios/filtrar/:IdMunicipio/:nombreMunicipio/:idConfigEstado/:nombreEstado"
- post "api/config/municipios/insertar"
- put "api/config/municipios/actualizar/:IdMunicipio"
- delete "api/config/municipios/eliminar/:IdMunicipio"

- get "api/config/zonaspostales/consultar"
- get "api/config/zonaspostales/filtrar/:IdZonaPostal/:nombreZonaPostal/:codigoPostal/:idConfigEstado/:nombreEstado"
- post "api/config/zonaspostales/insertar"
- put "api/config/zonaspostales/actualizar/:IdZonaPostal"
- delete "api/config/zonaspostales/eliminar/:IdZonaPostal"

- get "api/config/parroquias/consultar"
- get "api/config/parroquias/filtrar/:IdParroquia/:nombreParroquia/:idConfigMunicipio/:nombreMunicipio/:idConfigEstado"
- post "api/config/parroquias/insertar"
- put "api/config/parroquias/actualizar/:IdParroquia"
- delete "api/config/parroquias/eliminar/:IdParroquia"

- get "api/config/noticias/consultar"
- get "api/config/noticias/filtrar/:IdNoticia/:titulo/:descripcion/:fechaAlta/:activo"
- post "api/config/noticias/insertar"
- post "api/config/noticias/subirimagen"
- put "api/config/noticias/actualizar/:IdNoticia"
- delete "api/config/noticias/eliminar/:IdNoticia"

- get "api/config/servgen/consultar"
- get "api/config/servgen/filtrar/:IdServGral/:nombre/:descripcion/:idGerencia"
- post "api/config/servgen/insertar"
- put "api/config/servgen/actualizar/:IdServGral"
- delete "api/config/servgen/eliminar/:IdServGral"

- get "api/paramsistem/consultar"
- put "api/paramsistem/actualizar"

- get "api/config/gerenciastemp/consultar"
- get "api/config/gerenciastemp/filtrar/:usuario/:nombre/:descripcion/:idConfigGerencia"
- post "api/config/gerenciastemp/insertar"
- put "api/config/gerenciastemp/actualizar/:IdGciaTemp"
- delete "api/config/gerenciastemp/eliminar/:IdGciaTemp"

## Generales
- get "api/generales/gen_emp/empresagerenciaarea"
- get "api/generales/gen_emp/consultaSiIngresado/:empre/:geren/:area"
- post "api/generales/gen_emp/insertar"
- delete "api/generales/gen_emp/eliminar/:IdEmpresaGcia"

- get "api/generales/empresas/consultar"
- get "api/generales/empresas/filtrar/:IdEmpresa/:nombre/:rif/:base_datos/:fecha/:cerrada"
- post "api/generales/empresas/insertar"
- put "api/generales/empresas/actualizar/:IdEmpresa"
- delete "api/generales/empresas/eliminar/:IdEmpresa"

- get "api/generales/area_negocio/consultar"
- get "api/generales/area_negocio/filtrar/:IdAreaNeg/:nombre/:codigo/:descripcion/:idConfigGerencia/:idAdmTipo"
- post "api/generales/area_negocio/insertar"
- put "api/generales/area_negocio/actualizar/:IdAreaNeg"
- delete "api/generales/area_negocio/eliminar/:IdAreaNeg"

- get "api/generales/ccosto/consultar/:IdCosto"
- get "api/generales/ccosto/filtrar/:IdCosto/:codigo/:descripcion/:IdComprasEmpresa/:idGerencia"
- post "api/generales/ccosto/insertar"
- post "api/generales/ccosto/empreccgerencia"
- post "api/generales/ccosto/actualizar/:IdCosto"
- delete "api/generales/ccosto/eliminar/:IdCosto"

- get "api/generales/preguntas/consultar"

- get "api/generales/respuestas/consultar"
- get "api/generales/respuestas/filtrar/:IdResp/:idRefServicio"
- post "api/generales/respuestas/insertar"

- get "api/usuarios/consultar"
- get "api/usuarios/filtrar/:getId/:pNombre/:sNombre/:pApellido/:sApellido/:login/:estatus/:idConfigCargo"
- get "api/usuarios/direcciones/:getId"
- get "api/usuarios/telefonos/:getId"
- get "api/usuarios/correos/:getId"