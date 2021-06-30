import { json, Request, Response } from "express";
import db from "../../database";
import { Iconfig_cargos } from "../../interfaces/configuraciones/configuraciones.interface";
import { Iusuarios } from '../../interfaces/usuarios/usuarios.interface';
import { usuariosPorCargos } from "../usuarios/usuarios.controller";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM config_cargos where estatus=1";    
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
    let consulta = "Select * FROM config_cargos";
    let Cargo = {
        idConfigCargo: req.params.Id,
        nombre: req.params.nombre.replace(/\+|%20/g, " "),
        descripcion: req.params.descripcion.replace(/\+|%20/g, "-"),  
        idConfigGerencia: req.params.idGerencia
    }
    
    let where: string[] = [];
    
    if (Cargo.idConfigCargo!="NULL" || Cargo.nombre!="NULL" || Cargo.descripcion!="NULL" || Cargo.idConfigGerencia!="NULL"){        
        if (Cargo.idConfigCargo!="NULL"){
           where.push( " idConfigCargo =" + Cargo.idConfigCargo);
        }

        if(Cargo.nombre!="NULL"){
            where.push( " LOWER(nombre) LIKE LOWER('%" + Cargo.nombre + "%')");
        }

        if(Cargo.descripcion!="NULL"){
            where.push( " LOWER(descripcion) LIKE LOWER('%" + Cargo.descripcion + "%')");
        }        

        if (Cargo.idConfigGerencia!="NULL"){
            where.push( " idConfigGerencia =" + Cargo.idConfigGerencia);
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

export const usuariosPorCargoGcia = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM config_cargos WHERE idConfigGerencia = ? and LOWER(nombre) = lOWER(?)";     
    const nombreCargo = req.params.nombreCargo.replace(/\+|%20/g, " ");
    const idConfigGerencia =  req.params.idGerencia;    
    let usuarios: Iusuarios[] = [];
    let _cargos: number[]=[];
    try {
        const cargos: Iconfig_cargos[] = await db.querySelect(consulta, [idConfigGerencia, nombreCargo]);
        
        if (cargos.length <= 0) {
            return resp.status(201).json({ msg: "No Data!" });            
        }else{
            cargos.forEach(c => {
                if (c.idConfigCargo){
                    _cargos.push(c.idConfigCargo);                
                }
            });
            await usuariosPorCargos(_cargos).then(
                result => {                    
                    result?.forEach(r => {                        
                        usuarios.push(r)
                    })
                }
            )
        }
        if (usuarios.length <= 0) {
            return resp.status(201).json({ msg: "No Data!" });
        }

        return resp.status(201).json(usuarios);         

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}



export const createRecord = async (req: Request, resp: Response) => {
    let newPost: Iconfig_cargos = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO config_cargos SET ?", [newPost]);    
        newPost.idConfigCargo = result.insertId;
        return resp.status(201).json(newPost.idConfigCargo);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iconfig_cargos = req.body;

    let consulta = ("UPDATE config_cargos SET ? WHERE idConfigCargo = ?");
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
    let consulta = ("UPDATE config_cargos SET estatus=0 WHERE idConfigCargo = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Cargo eliminado correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}