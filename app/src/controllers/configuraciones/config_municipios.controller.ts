import { json, Request, Response } from "express";
import db from "../../database";
import { Iconfig_municipios } from "../../interfaces/configuraciones/configuraciones.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM config_municipios where estatus=1";    
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
    let consulta = "SELECT config_estados.nombre AS nombreEstado, config_municipios.idConfigMunicipio, config_municipios.nombre As nombreMunicipio, config_municipios.idConfigEstado FROM config_estados INNER JOIN config_municipios ON config_municipios.idConfigEstado = config_estados.idConfigEstado";
    let municipio = {
        idConfigMunicipio: req.params.Id,
        nombreMunicipio: req.params.nombreMunicipio,          
        idConfigEstado: req.params.idConfigEstado,
        nombreEstado: req.params.nombreEstado
    }
    let where: string[] = [];
    
    if (municipio.idConfigMunicipio!="NULL" || municipio.nombreMunicipio!="NULL" || municipio.idConfigEstado!="NULL" || municipio.nombreEstado!="NULL"){        
        if (municipio.idConfigMunicipio!="NULL"){
           where.push( " idConfigMunicipio =" + municipio.idConfigMunicipio);
        }

        if(municipio.nombreMunicipio!="NULL"){
            where.push( " LOWER(config_municipios.nombre) LIKE LOWER('%" + municipio.nombreMunicipio + "%')");
        }                

        if (municipio.idConfigEstado!="NULL"){
            where.push( " config_municipios.idConfigEstado =" + municipio.idConfigEstado);
        } 
        
        if(municipio.nombreEstado!="NULL"){
            where.push( " LOWER(config_estados.nombre) LIKE LOWER('%" + municipio.nombreEstado + "%')");
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
    let newPost: Iconfig_municipios = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO config_municipios SET ?", [newPost]);    
        newPost.idConfigMunicipio = result.insertId;
        return resp.status(201).json(newPost.idConfigMunicipio);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iconfig_municipios = req.body;

    let consulta = ("UPDATE config_municipios SET ? WHERE idConfigMunicipio = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Municipio actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE config_municipios SET estatus=0 WHERE idConfigMunicipio = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Municipio eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}