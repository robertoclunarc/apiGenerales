import { json, Request, Response } from "express";
import db from "../../database";
import { Iconfig_estados } from "../../interfaces/configuraciones/configuraciones.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM config_estados where estatus=1";    
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
    let consulta = "SELECT * FROM config_estados ";
    let estado = {
        idConfigEstado: req.params.Id,
        nombre: req.params.nombre
    }
    let where: string[] = [];
    
    if (estado.idConfigEstado!="NULL" || estado.nombre!="NULL"){        
        if (estado.idConfigEstado!="NULL"){
           where.push( " idConfigEstado =" + estado.idConfigEstado);
        }

        if(estado.nombre!="NULL"){
            where.push( " LOWER(nombre) LIKE LOWER('%" + estado.nombre + "%')");
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
    let newPost: Iconfig_estados = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO config_estados SET ?", [newPost]);    
        newPost.idConfigEstado = result.insertId;
        return resp.status(201).json(newPost.idConfigEstado);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iconfig_estados = req.body;

    let consulta = ("UPDATE config_estados SET ? WHERE idConfigEstado = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Estado actualizado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE config_estados SET estatus=0 WHERE idConfigEstado = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Estado de eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}