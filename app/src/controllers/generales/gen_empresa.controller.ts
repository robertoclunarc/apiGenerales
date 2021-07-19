import { json, Request, Response } from "express";
import db from "../../database";
import { Igen_empresa } from "../../interfaces/generales/generales.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM gen_empresa where cerrada='No'";    
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
    let consulta = "SELECT * FROM gen_empresa";
    let filtro = {         
        IdGenEmpresa: req.params.Id,
        nombre: req.params.nombre,
        rif: req.params.rif,
        base_datos: req.params.base_datos,
        fecha_ope: req.params.fecha,
        cerrada: req.params.cerrada        
    }

    let where: string[] = [];
    
    if (filtro.IdGenEmpresa!="NULL" || filtro.rif!="NULL" || filtro.nombre!="NULL" || filtro.base_datos!="NULL" || filtro.fecha_ope || filtro.cerrada!="NULL"){        
        if (filtro.IdGenEmpresa!="NULL"){
           where.push( " IdGenEmpresa =" + filtro.IdGenEmpresa);
        }

        if(filtro.nombre!="NULL"){
            where.push( " LOWER(nombre_empresa) LIKE LOWER('%" + filtro.nombre + "%')");
        }

        if(filtro.rif!="NULL"){
            where.push( " LOWER(rif) LIKE LOWER('%" + filtro.rif + "%')");
        }

        if(filtro.base_datos!="NULL"){
            where.push( " LOWER(base_de_datos) LIKE LOWER('%" + filtro.base_datos + "%')");
        }        

        if (filtro.fecha_ope!="NULL"){
            where.push( " date_format(fecha_ope,'%Y-%m-%d')  = " + filtro.fecha_ope);
        }
        
        if (filtro.cerrada!="NULL"){
            where.push( " cerrada = '" + filtro.cerrada + "'");
        }

        where.forEach(function(where, index) {
            if (index==0){
                consulta = consulta + " WHERE " + where;
            }else{
                consulta = consulta + " OR " + where;
            }

        });        
        
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
    let newPost: Igen_empresa = req.body;
    //////verificacion del rif//////////////////////////////////////
    const ExpReg = /-/g;    
    newPost.rif = newPost.rif?.replace(ExpReg, '');
    newPost.rif = newPost.rif?.toUpperCase();
    console.log(newPost.rif);
    let result = await db.querySelect("Select * FROM gen_empresa where rif LIKE '"+newPost.rif+"'");
    if (result.length>0){
        return resp.status(201).json({ msg: "El Rif Ya Existe" });
    }
    /////////////////////////////////////////////////////////
    try {
        const result = await db.querySelect("INSERT INTO gen_empresa SET ?", [newPost]);    
        newPost.IdGenEmpresa = result.insertId;
        return resp.status(201).json(newPost.IdGenEmpresa);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Igen_empresa = req.body;
    
    let consulta = ("UPDATE gen_empresa SET ? WHERE IdGenEmpresa = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Empresa actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE gen_empresa SET cerrada='Sí' WHERE IdGenEmpresa = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Empresa eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}