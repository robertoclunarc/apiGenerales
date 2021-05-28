import { json, Request, Response } from "express";
import db from "../../database";
import { Iconfig_ciudades } from "../../interfaces/configuraciones/configuraciones.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT idConfigCiudad, nombre, esCapital FROM config_ciudades where estatus=1";    
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
    let consulta = "SELECT config_ciudades.idConfigCiudad, config_ciudades.nombre AS nombreCiudad, config_ciudades.esCapital, config_ciudades.idConfigEstado, config_estados.nombre AS nombreEstado FROM config_ciudades INNER JOIN config_estados ON config_ciudades.idConfigEstado = config_estados.idConfigEstado";
    let ciudad = {
        idConfigCiudad: req.params.Id,
        nombreCiudad: req.params.nombreCiudad,          
        idConfigEstado: req.params.idConfigEstado,
        nombreEstado: req.params.nombreEstado
    }
    let where: string[] = [];
    
    if (ciudad.idConfigCiudad!="NULL" || ciudad.nombreCiudad!="NULL" || ciudad.idConfigEstado!="NULL" || ciudad.nombreEstado!="NULL"){        
        if (ciudad.idConfigCiudad!="NULL"){
           where.push( " idConfigCiudad =" + ciudad.idConfigCiudad);
        }

        if(ciudad.nombreCiudad!="NULL"){
            where.push( " LOWER(config_ciudades.nombre) LIKE LOWER('%" + ciudad.nombreCiudad + "%')");
        }                

        if (ciudad.idConfigEstado!="NULL"){
            where.push( " config_ciudades.idConfigEstado =" + ciudad.idConfigEstado);
        } 
        
        if(ciudad.nombreEstado!="NULL"){
            where.push( " LOWER(config_estados.nombre) LIKE LOWER('%" + ciudad.nombreEstado + "%')");
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
    let newPost: Iconfig_ciudades = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO config_ciudades SET ?", [newPost]);    
        newPost.idConfigCiudad = result.insertId;
        return resp.status(201).json(newPost.idConfigCiudad);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iconfig_ciudades = req.body;

    let consulta = ("UPDATE config_ciudades SET ? WHERE idConfigCiudad = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Ciudad actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE config_ciudades SET estatus=0 WHERE idConfigCiudad = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Ciudad del pais eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error " : error })
    }   
}