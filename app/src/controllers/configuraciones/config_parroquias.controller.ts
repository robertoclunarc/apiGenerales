import { json, Request, Response } from "express";
import db from "../../database";
import { Iconfig_parroquias } from "../../interfaces/configuraciones/configuraciones.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM config_parroquias estatus=1";    
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
    let consulta = "SELECT config_parroquias.idConfigParroquia, config_parroquias.nombre AS nombreParroquia, config_parroquias.idConfigMunicipio, config_municipios.nombre AS nombreMunicipio, config_municipios.idConfigEstado FROM config_parroquias INNER JOIN config_municipios ON config_parroquias.idConfigMunicipio = config_municipios.idConfigMunicipio";
    let parroquia = {
        idConfigParroquia: req.params.Id,
        nombreParroquia: req.params.nombreParroquia,          
        idConfigMunicipio: req.params.idConfigMunicipio,
        nombreMunicipio: req.params.nombreMunicipio,
        idConfigEstado: req.params.idConfigEstado
    }
    let where: string[] = [];
    
    if (parroquia.idConfigParroquia!="NULL" || parroquia.nombreParroquia!="NULL" || parroquia.idConfigMunicipio!="NULL" || parroquia.nombreMunicipio!="NULL" || parroquia.idConfigEstado!="NULL"){        
        if (parroquia.idConfigParroquia!="NULL"){
           where.push( " idConfigParroquia =" + parroquia.idConfigParroquia);
        }

        if(parroquia.nombreParroquia!="NULL"){
            where.push( " LOWER(config_parroquias.nombre) LIKE LOWER('%" + parroquia.nombreParroquia + "%')");
        }                

        if (parroquia.idConfigEstado!="NULL"){
            where.push( " config_municipios.idConfigEstado =" + parroquia.idConfigEstado);
        } 
        
        if(parroquia.idConfigMunicipio!="NULL"){
            where.push( " config_parroquias.idConfigMunicipio =" + parroquia.idConfigMunicipio);
        }

        if(parroquia.nombreMunicipio!="NULL"){
            where.push( " LOWER(config_municipios.nombre) LIKE LOWER('%" + parroquia.nombreMunicipio + "%')");
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
    let newPost: Iconfig_parroquias = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO config_parroquias SET ?", [newPost]);    
        newPost.idConfigParroquia = result.insertId;
        return resp.status(201).json(newPost.idConfigParroquia);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iconfig_parroquias = req.body;

    let consulta = ("UPDATE config_parroquias SET ? WHERE idConfigParroquia = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Parroquia actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE config_parroquias SET estatus=0 WHERE idConfigParroquia = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Parroquia eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}