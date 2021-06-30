import {  Request, Response } from "express";
import db from "../../database";
//import { Iusuarios } from "../../interfaces/usuarios/usuarios.interface";

export const usuarios = async (req: Request, resp: Response) => {
    try {
        const result = await db.querySelect("select *, CONCAT_WS(' ' ,primerNombre ,segundoNombre ,primerApellido, segundoApellido) as nombre_completo from seg_usuarios");
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }
        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "select *, CONCAT_WS(' ' ,primerNombre ,segundoNombre ,primerApellido, segundoApellido) as nombre_completo from seg_usuarios";
    let User = {
        idSegUsuario: req.params.getId,
        primerNombre: req.params.pNombre,
        segundoNombre: req.params.sNombre,
        primerApellido: req.params.pApellido,
        segundoApellido: req.params.sApellido,       
        usuario: req.params.login,      
        estatus: req.params.estatus ,      
        idConfigCargo: req.params.idConfigCargo        
    }
    let where: string[] = [];
    
    if (User.idSegUsuario!="NULL" || User.primerNombre!="NULL" || User.segundoNombre!="NULL" || User.primerApellido!="NULL" || User.segundoApellido!="NULL" || User.usuario!="NULL" || User.estatus!="NULL" || User.idConfigCargo!="NULL"){        
        if (User.idSegUsuario!="NULL"){
           where.push( " idSegUsuario =" + User.idSegUsuario);
        }

        if(User.primerNombre!="NULL"){
            where.push( " LOWER(primerNombre) LIKE LOWER('%" + User.primerNombre + "%')");
        }

        if(User.segundoNombre!="NULL"){
            where.push( " LOWER(segundoNombre) LIKE LOWER('%" + User.segundoNombre + "%')");
        }
        
        if(User.primerApellido!="NULL"){
            where.push( " LOWER(primerApellido) LIKE LOWER('%" + User.primerApellido + "%')");
        }
        
        if(User.segundoApellido!="NULL"){
            where.push( " LOWER(segundoApellido) LIKE LOWER('%" + User.segundoApellido + "%')");
        }

        if(User.usuario!="NULL"){
            where.push( " LOWER(usuario) LIKE LOWER('%" + User.usuario + "%')");
        }

        if(User.estatus!="NULL"){
            where.push( " estatus = " + User.estatus);
        }

        if (User.idConfigCargo!="NULL"){
            where.push( " idConfigCargo =" + User.idConfigCargo);
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
            return resp.status(200).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export async function direcciones(req:Request, resp: Response) {
    const idx = req.params.getid;
    const query: string = "SELECT * FROM seg_direcciones WHERE idSegUsuario =?";
    try {
        const result = await db.querySelect(query, [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export async function telefonos(req:Request, resp: Response) {
    const idx = req.params.getid;
    const query: string = "SELECT * FROM seg_telefonos WHERE idSegUsuario =?";
    try {
        const result = await db.querySelect(query, [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export async function correos(req:Request, resp: Response) {
    const idx = req.params.getid;
    const query: string = "SELECT * FROM seg_correos WHERE idSegUsuario =?";
    try {
        const result = await db.querySelect(query, [idx]);
        if (result.length <= 0) {
            return resp.status(402).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}