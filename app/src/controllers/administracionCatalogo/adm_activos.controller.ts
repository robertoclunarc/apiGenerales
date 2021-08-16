import { json, Request, Response } from "express";
import db from "../../database";
import { Iadm_activos } from "../../interfaces/AdministracionCatalogo/AdmCatalogo.interface";
import {  Iconfig_activos_areas_negocios, Iconfig_activos_gerencias } from "../../interfaces/configuraciones/configuraciones.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM adm_activos where activo=1";  
     
    try {
        const result = await db.querySelect(consulta);
        
        if (result.length <= 0) {
            return resp.status(201).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectREcordJoins = async (req: Request, resp: Response) => {
    let consulta = "SELECT adm_activos.idAdmActivo,	adm_activos.nombre,	adm_activos.descripcion,	adm_activos.fechaAlta,	adm_activos.fechaModificacion,	adm_activos.serial,	adm_activos.idAdmProducto,	adm_activos.idComprasEmpresa,	tp.idAdmTipoActivo, tp.descripcion as tipo,	adm_activos.activo,	adm_activos.IdEmpresaPropietaria,	adm_activos.IdAreaNegocio,	adm_activos.IdactivoPadre,	grpgcia.nombre_gerencia,	gen_area_negocio.nombre AS nombre_area_negocio,	compras_empresa.nombre_empresa,	gen_empresa.nombre_empresa AS empresa_propietaria,	activosPadres.nombre AS nombreActivoPadre, config_gerencias.descripcion AS gciaCreado FROM	adm_activos LEFT JOIN (	SELECT	cag.idAdmActivo,	GROUP_CONCAT(cg.nombre SEPARATOR ' | ') AS nombre_gerencia	FROM config_activos_gerencias cag	INNER JOIN config_gerencias cg ON cag.idConfigGerencia = cg.idConfigGerencia	AND cag.activo = 1	GROUP BY	cag.idAdmActivo) grpgcia ON grpgcia.idAdmActivo = adm_activos.idAdmActivo LEFT JOIN config_activos_areas_negocios ON config_activos_areas_negocios.idAdmActivo = adm_activos.idAdmActivo AND config_activos_areas_negocios.activo = 1 LEFT JOIN gen_area_negocio ON config_activos_areas_negocios.idGenAreaNegocio = gen_area_negocio.idGenAreaNegocio AND config_activos_areas_negocios.activo = 1 LEFT JOIN compras_empresa ON compras_empresa.IdComprasEmpresa = adm_activos.idComprasEmpresa LEFT JOIN compras_empresa AS gen_empresa ON adm_activos.IdEmpresaPropietaria = gen_empresa.IdComprasEmpresa LEFT JOIN (	SELECT	a.idAdmActivo,	a.nombre FROM	adm_activos a) AS activosPadres ON activosPadres.idAdmActivo = adm_activos.IdactivoPadre LEFT JOIN config_gerencias ON adm_activos.idGciaCreado = config_gerencias.idConfigGerencia INNER JOIN adm_tipos_activos tp ON tp.idAdmTipoActivo= adm_activos.tipo WHERE adm_activos.activo = 1 GROUP BY adm_activos.idAdmActivo";  
     
    try {
        const result = await db.querySelect(consulta);
        
        if (result.length <= 0) {
            return resp.status(201).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const selectActivosGcia = async (req: Request, resp: Response) => {    
    let consulta = "SELECT config_activos_gerencias.idConfigActivoGcia,  config_activos_gerencias.idAdmActivo,    config_activos_gerencias.idConfigGerencia,  config_activos_gerencias.activo  FROM    config_activos_gerencias  WHERE  config_activos_gerencias.activo=1 and config_activos_gerencias.idAdmActivo=?";     
    try {
        const result: Iconfig_activos_gerencias[] = await db.querySelect(consulta, [req.params.Id]);
        
        if (result.length <= 0) {            
            return resp.status(201).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const selectActivosAreaNegocios = async (req: Request, resp: Response) => {
    
    let consulta = "SELECT config_activos_areas_negocios.idConfigActivoAreaNegocio,  config_activos_areas_negocios.idAdmActivo,    config_activos_areas_negocios.idGenAreaNegocio,  config_activos_areas_negocios.activo FROM config_activos_areas_negocios  WHERE config_activos_areas_negocios.activo = 1 AND  config_activos_areas_negocios.idAdmActivo = ?";  
     
    try {
        const result = await db.querySelect(consulta, [req.params.Id]);
        
        if (result.length <= 0) {
            let areas: Iconfig_activos_areas_negocios = { idAdmActivo: -1, idConfigActivoAreaNegocio:-1, idGenAreaNegocio:-1, activo: 0}
            return resp.status(200).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM adm_activos";
    let Act = {
        idAdmActivo: req.params.Id == 'null' ? null : req.params.Id,
        nombre: req.params.nombre == 'null' ? null : req.params.nombre,
        descripcion: req.params.descripcion == 'null' ? null : req.params.descripcion,
        serial: req.params.serial == 'null' ? null : req.params.serial,
        idAdmProducto: req.params.idAdmProducto == 'null' ? null : req.params.idAdmProducto,
        idComprasEmpresa: req.params.idComprasEmpresa == 'null' ? null : req.params.idComprasEmpresa,
        idGciaCreado: req.params.idGciaCreado == 'null' ? null : req.params.idGciaCreado,
    }
    let where: string[] = [];
    
    if (Act.idAdmActivo || Act.nombre || Act.descripcion || Act.serial || Act.idAdmProducto || Act.idComprasEmpresa || Act.idGciaCreado){        
        if (Act.idAdmActivo){
           where.push( " idAdmActivo =" + Act.idAdmActivo);
        }

        if(Act.nombre){
            where.push( " LOWER(nombre) LIKE LOWER('%" + Act.nombre + "%')");
        }

        if(Act.descripcion){
            where.push( " LOWER(descripcion) LIKE LOWER('%" + Act.descripcion + "%')");
        }

        if (Act.serial){
            where.push( " LOWER(serial) LIKE LOWER('%" + Act.serial + "%')");
        }

        if (Act.idAdmProducto){
            where.push( " idAdmProducto =" + Act.idAdmProducto);
        }

        if (Act.idComprasEmpresa){
            where.push( " idComprasEmpresa =" + Act.idComprasEmpresa);
        }

        if (Act.idGciaCreado){
            where.push( " idGciaCreado =" + Act.idGciaCreado);
        }

        where.forEach(function(where, index) {
            if (index==0){
                consulta = consulta + " WHERE " + where;
            }else{
                consulta = consulta + " OR " + where;
            }

        });        
        console.log(consulta);
    }
    try {
        const result = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(201).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: Iadm_activos = req.body;
    newPost.activo=1;
    try {
        const result = await db.querySelect("INSERT INTO adm_activos SET ?", [newPost]);    
        newPost.idAdmActivo = result.insertId;
        console.log(newPost);
        return resp.status(201).json(newPost);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const createRecordAreaNegocio = async (req: Request, resp: Response) => {
    let newPost: Iconfig_activos_areas_negocios = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO config_activos_areas_negocios SET ?", [newPost]);    
        newPost.idConfigActivoAreaNegocio = result.insertId;
        return resp.status(201).json(newPost.idConfigActivoAreaNegocio);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const deleteAreaNegocio = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;    
    
    let consulta = ("UPDATE config_activos_areas_negocios SET activo=0 WHERE idAdmActivo = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Areas Negocios deshabilitada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const createRecordActivosGerencias = async (req: Request, resp: Response) => {
    let newPost: Iconfig_activos_gerencias = req.body; 
       
    try {
        const result = await db.querySelect("INSERT INTO config_activos_gerencias SET ?", [newPost]);    
        newPost.idConfigActivoGcia  = result.insertId;
        return resp.status(201).json(newPost.idConfigActivoGcia );

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const deleteActivoGerencia = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;    
    
    let consulta = ("UPDATE config_activos_gerencias SET activo=0 WHERE idAdmActivo = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Gerecias deshabilitada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iadm_activos = req.body;
    
    let consulta = ("UPDATE adm_activos SET ? WHERE idAdmActivo = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Activo actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE adm_activos SET activo=0 WHERE idAdmActivo = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Activo eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}