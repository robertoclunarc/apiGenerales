import { json, Request, Response } from "express";
import db from "../../database";
import { Iconfig_zonas_postales } from "../../interfaces/configuraciones/configuraciones.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM config_zonas_postales where estatus=1";    
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
    let consulta = "SELECT config_zonas_postales.idConfigZonaPostal, config_zonas_postales.nombre AS nombreZonaPostal, config_zonas_postales.idConfigEstado,    config_zonas_postales.codigoPostal, config_estados.nombre AS nombreEstado FROM config_estados INNER JOIN config_zonas_postales ON config_zonas_postales.idConfigEstado = config_estados.idConfigEstado";
    let zonapost = {
        idConfigZonaPostal: req.params.Id,
        nombreZonaPostal: req.params.nombreZonaPostal,          
        codigoPostal: req.params.codigoPostal,
        idConfigEstado: req.params.idConfigEstado,
        nombreEstado: req.params.nombreEstado
    }
    let where: string[] = [];
    
    if (zonapost.idConfigZonaPostal!="NULL" || zonapost.nombreZonaPostal!="NULL" || zonapost.codigoPostal!="NULL" || zonapost.idConfigEstado!="NULL" || zonapost.nombreEstado!="NULL"){        
        if (zonapost.idConfigZonaPostal!="NULL"){
           where.push( " idConfigZonaPostal =" + zonapost.idConfigZonaPostal);
        }

        if(zonapost.nombreZonaPostal!="NULL"){
            where.push( " LOWER(config_zonas_postales.nombre) LIKE LOWER('%" + zonapost.nombreZonaPostal + "%')");
        }                

        if (zonapost.idConfigEstado!="NULL"){
            where.push( " config_zonas_postales.idConfigEstado =" + zonapost.idConfigEstado);
        } 
        
        if(zonapost.nombreEstado!="NULL"){
            where.push( " LOWER(config_estados.nombre) LIKE LOWER('%" + zonapost.nombreEstado + "%')");
        }

        if(zonapost.codigoPostal!="NULL"){
            where.push( " LOWER(config_zonas_postales.codigoPostal) LIKE LOWER('%" + zonapost.codigoPostal + "%')");
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

export const createRecord = async (req: Request, resp: Response) => {
    let newPost: Iconfig_zonas_postales = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO config_zonas_postales SET ?", [newPost]);    
        newPost.idConfigZonaPostal = result.insertId;
        return resp.status(201).json(newPost.idConfigZonaPostal);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iconfig_zonas_postales = req.body;

    let consulta = ("UPDATE config_zonas_postales SET ? WHERE idConfigZonaPostal = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Zona Postal actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE config_zonas_postales SET estatus=0 WHERE idConfigZonaPostal = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Zona Postal eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error " : error })
    }   
}