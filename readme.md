# Script en nodejs, typescript para los insert, update, delete y consultas de registros de Proveedores, Cargos y Cctivos de la BD del sistema sisglobal.

## Tablas:
- compras_proveedores
- config_cargos
- adm_activos

## Variables de entorno:
- PORT
- JWT_SECRET
- MYSQL_SERVER
- MYSQL_USER
- MYSQL_PW
- MYSQL_DB
- MYSQL_PORT

## Muestra la data de la tabla Proveedores
get "/proveedores/consultar"

## Muestra la data de la tabla Activos
get "/activos/consultar"

## Muestra la data de la tabla Cargos
get "/cargos/consultar"
