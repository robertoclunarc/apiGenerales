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
- get "/adm/activos/consultar"
- get "/adm/activos/filtrar/:Id/:nombre/:descripcion/:serial/:idAdmProducto/:idComprasEmpresa"
- post "/adm/activos/insertar"
- put "/adm/activos/actualizar/:Id"
- delete "/adm/activos/eliminar/:Id"

- get "/adm/areasTrabajo/consultar"
- get "/adm/areasTrabajo/filtrar/:IdAreaTrabajo/:nombre/:idGenAreaNegocio"
- post "/adm/areasTrabajo/insertar"
- put "/adm/areasTrabajo/actualizar/:IdAreaTrabajo"
- delete "/adm/areasTrabajo/eliminar/:IdAreaTrabajo"

## Compras
### Estos accesos estan deshabilitados
 - ~~get "/compras/proveedores/consultar"~~
 - ~~get "/compras/proveedores/filtrar/:Id/:nombre/:rif/:direccion/:valoracion/:telefono/:observaciones/:contacto"~~
 - ~~post "/compras/proveedores/insertar"~~
 - ~~put "/compras/proveedores/actualizar/:IdProv"~~
 - ~~delete "/compras/proveedores/eliminar/:IdProv"~~

## Configuraciones
- get "/config/cargos/consultar"
- get "/config/cargos/filtrar/:Idcargo/:nombre/:descripcion/:idGerencia"
- post "/config/cargos/insertar"
- put "/config/cargos/actualizar/:IdCargo"
- delete "/config/cargos/eliminar/:IdCargo"

- get "/config/gerencias/consultar"
- get "/config/gerencias/filtrar/:IdGerencia/:nombre/:descripcion"
- post "/config/gerencias/insertar"
- put "/config/gerencias/actualizar:/IdGerenecia"
- delete "/config/gerencias/eliminar/:IdGerencia"

- get "/config/ciudades/consultar"
- get "/config/ciudades/filtrar/:IdCiudad/:nombreCiudad/:idConfigEstado/:nombreEstado"
- post "/config/ciudades/insertar"
- put "/config/ciudades/actualizar/:IdCiudad"
- delete "/config/ciudades/eliminar/:IdCiudad"

- get "/config/estados/consultar"
- get "/config/estados/filtrar/IdEstado/:nombre"
- post "/config/estados/insertar"
- put "/config/estados/actualizar/:IdEstado"
- delete "/config/estados/eliminar/:IdEstado"

- get "/config/municipios/consultar"
- get "/config/municipios/filtrar/:IdMunicipio/:nombreMunicipio/:idConfigEstado/:nombreEstado"
- post "/config/municipios/insertar"
- put "/config/municipios/actualizar/:IdMunicipio"
- delete "/config/municipios/eliminar/:IdMunicipio"

- get "/config/zonaspostales/consultar"
- get "/config/zonaspostales/filtrar/:IdZonaPostal/:nombreZonaPostal/:codigoPostal/:idConfigEstado/:nombreEstado"
- post "/config/zonaspostales/insertar"
- put "/config/zonaspostales/actualizar/:IdZonaPostal"
- delete "/config/zonaspostales/eliminar/:IdZonaPostal"

- get "/config/parroquias/consultar"
- get "/config/parroquias/filtrar/:IdParroquia/:nombreParroquia/:idConfigMunicipio/:nombreMunicipio/:idConfigEstado"
- post "/config/parroquias/insertar"
- put "/config/parroquias/actualizar/:IdParroquia"
- delete "/config/parroquias/eliminar/:IdParroquia"

- get "/config/noticias/consultar"
- get "/config/noticias/filtrar/:IdNoticia/:titulo/:descripcion/:fechaAlta/:activo"
- post "/config/noticias/insertar"
- post "/config/noticias/subirimagen"
- put "/config/noticias/actualizar/:IdNoticia"
- delete "/config/noticias/eliminar/:IdNoticia"

- get "/config/servgen/consultar"
- get "/config/servgen/filtrar/:IdServGral/:nombre/:descripcion/:idGerencia"
- post "/config/servgen/insertar"
- put "/config/servgen/actualizar/:IdServGral"
- delete "/config/servgen/eliminar/:IdServGral"

- get "/paramsistem/consultar"
- put "/paramsistem/actualizar"

- get "/config/gerenciastemp/consultar"
- get "/config/gerenciastemp/filtrar/:usuario/:nombre/:descripcion/:idConfigGerencia"
- post "/config/gerenciastemp/insertar"
- put "/config/gerenciastemp/actualizar/:IdGciaTemp"
- delete "/config/gerenciastemp/eliminar/:IdGciaTemp"

## Generales
- get "/generales/gen_emp/empresagerenciaarea"
- get "/generales/gen_emp/consultaSiIngresado/:empre/:geren/:area"
- post "/generales/gen_emp/insertar"
- delete "/generales/gen_emp/eliminar/:IdEmpresaGcia"

- get "/generales/empresas/consultar"
- get "/generales/empresas/filtrar/:IdEmpresa/:nombre/:rif/:base_datos/:fecha/:cerrada"
- post "/generales/empresas/insertar"
- put "/generales/empresas/actualizar/:IdEmpresa"
- delete "/generales/empresas/eliminar/:IdEmpresa"

- get "/generales/area_negocio/consultar"
- get "/generales/area_negocio/filtrar/:IdAreaNeg/:nombre/:codigo/:descripcion/:idConfigGerencia/:idAdmTipo"
- post "/generales/area_negocio/insertar"
- put "/generales/area_negocio/actualizar/:IdAreaNeg"
- delete "/generales/area_negocio/eliminar/:IdAreaNeg"

- get "/generales/ccosto/consultar/:IdCosto"
- get "/generales/ccosto/filtrar/:IdCosto/:codigo/:descripcion/:IdComprasEmpresa/:idGerencia"
- post "/generales/ccosto/insertar"
- post "/generales/ccosto/empreccgerencia"
- post "/generales/ccosto/actualizar/:IdCosto"
- delete "/generales/ccosto/eliminar/:IdCosto"

- get "/generales/preguntas/consultar"

- get "/generales/respuestas/consultar"
- get "/generales/respuestas/filtrar/:IdResp/:idRefServicio"
- post "/generales/respuestas/insertar"