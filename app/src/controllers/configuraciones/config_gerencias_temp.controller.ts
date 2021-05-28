import { json, Request, Response } from "express";
import db from "../../database";
import { Iconfig_gerencias_temporales } from "../../interfaces/configuraciones/configuraciones.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM config_gerencias_temporales where estatus=1";    
    try {
        const result = await db.querySelect(consulta);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "SELECT  gere.idConfigGerencia, gere.nombre,  gere.descripcion,  gtemp.idSegUsuario,  seg_usuarios.usuario FROM config_gerencias_temporales AS gtemp  INNER JOIN config_gerencias AS gere ON gtemp.idConfigGerencia = gere.idConfigGerencia  INNER JOIN seg_usuarios ON seg_usuarios.idSegUsuario = gtemp.idSegUsuario";
    let filtro = {
        idSegUsuario: req.params.idSegUsuario,
        usuario : req.params.usuario,
        nombre: req.params.nombre,
        descripcion: req.params.descripcion,
        idConfigGerencia: req.params.idConfigGerencia
    }

    let where: string[] = [];
    
    if (filtro.idSegUsuario!="NULL" || filtro.usuario!="NULL" || filtro.nombre!="NULL" || filtro.descripcion!="NULL" || filtro.idConfigGerencia){        
        if (filtro.idSegUsuario!="NULL"){
           where.push( " gtemp.idSegUsuario =" + filtro.idSegUsuario);
        }

        if(filtro.usuario!="NULL"){
            where.push( " LOWER(seg_usuarios.usuario) LIKE LOWER('%" + filtro.usuario + "%')");
        }

        if(filtro.nombre!="NULL"){
            where.push( " LOWER(gere.nombre) LIKE LOWER('%" + filtro.nombre + "%')");
        }

        if(filtro.descripcion!="NULL"){
            where.push( " LOWER(gere.descripcion) LIKE LOWER('%" + filtro.descripcion + "%')");
        }        

        if (filtro.idConfigGerencia!="NULL"){
            where.push( " gere.idConfigGerencia =" + filtro.idConfigGerencia);
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
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const gerenciastempnousuario = async (req: Request, resp: Response) => {
    let consulta = "SELECT gere.idConfigGerencia, gere.nombre FROM config_gerencias gere LEFT JOIN (SELECT idSegUsuario, idConfigGerencia FROM config_gerencias_temporales t WHERE t.idSegUsuario = ?) tge ON gere.idConfigGerencia = tge.idConfigGerencia WHERE tge.idSegUsuario IS NULL AND gere.idConfigGerencia <> (SELECT c.idConfigGerencia FROM config_cargos c WHERE idConfigCargo = ?)";
    let filtro = {
        idUsuario: req.params.idUsuario,
        idcargo : req.params.idcargo
        
    }  
    try {
        const result = await db.querySelect(consulta, [filtro.idUsuario, filtro.idcargo]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: Iconfig_gerencias_temporales = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO config_gerencias_temporales SET ?", [newPost]);    
        newPost.idConfigGenTemp = result.insertId;
        return resp.status(201).json(newPost.idConfigGenTemp);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iconfig_gerencias_temporales = req.body;

    let consulta = ("UPDATE config_gerencias_temporales SET ? WHERE idConfigGenTemp = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Cargo actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE config_gerencias_temporales SET estatus=0 WHERE idConfigGenTemp = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Cargo eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}