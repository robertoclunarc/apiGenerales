import { json, Request, Response } from "express";
import db from "../../database";
import { IComprasEmpresa } from "../../interfaces/compras/compras.interface";

export const SelectRecordAll = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM compras_empresa where cerrada=0";  
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

export const SelectRecordNoFilter = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM compras_empresa ORDER BY cerrada, IdComprasEmpresa";  
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

export const empresacomprasgerencia = async (req: Request, resp: Response) => {
    
    let consulta = "SELECT em.*, gea.* FROM compras_empresa em INNER JOIN gen_empre_area_gerencia gea ON em.IdComprasEmpresa = gea.idComprasEmpresa WHERE gea.idConfigGerencia = ? and gea.idGenAreaNegocio = ? GROUP BY em.idComprasEmpresa";  
    try {
        const result = await db.querySelect(consulta, [req.params.Id, req.params.idarea]);
        if (result.length <= 0) {
            return resp.status(201).json({ msg: "No Data!" });
        }

        return resp.status(201).json(result);

    } catch (error) {
        resp.status(401).json({ err: error });
    }
}

export const SelectRecordFilter = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM compras_empresa ";
    let emp = {
        
        IdComprasEmpresa:  req.params.Id  == 'null' ? null : req.params.Id,
        nombre_empresa: req.params.nombre == 'null' ? null : req.params.nombre,
        rif: req.params.rif == 'null' ? null : req.params.rif,
        bd: req.params.bd == 'null' ? null : req.params.bd,       
        direccion_fiscal: req.params.dirfiscal == 'null' ? null : req.params.dirfiscal,
        cerrada: req.params.cerrada == 'null' ? null : req.params.cerrada,
    }
    
    let where: string[] = [];
    
    if (emp.IdComprasEmpresa || emp.nombre_empresa || emp.rif || emp.bd ||  emp.direccion_fiscal || emp.cerrada){        
        if (emp.IdComprasEmpresa){
           where.push( " IdComprasEmpresa =" + emp.IdComprasEmpresa);
        }

        if(emp.nombre_empresa){
            emp.nombre_empresa=emp.nombre_empresa.replace(/\+|%20/g," ");
            where.push( " LOWER(nombre_empresa) LIKE LOWER('%" + emp.nombre_empresa + "%')");
        }

        if(emp.rif){
            where.push( " LOWER(rif) LIKE LOWER('%" + emp.rif + "%')");
        }

        if (emp.bd){
            where.push( " LOWER(base_de_datos) LIKE LOWER('%" + emp.bd + "%')");
        }

        if (emp.direccion_fiscal){
            where.push( " LOWER(direccion_fiscal) LIKE LOWER('%" + emp.direccion_fiscal + "%')");
        }

        if (emp.cerrada){
            where.push( " cerrada = " + emp.cerrada + " ");
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
    let newPost: IComprasEmpresa = req.body;
    const ExpReg = /-/g;
    newPost.rif = newPost.rif.replace(ExpReg, '');
    newPost.rif = newPost.rif.toUpperCase();
    console.log(newPost.rif);
    let result = await db.querySelect("Select * FROM compras_empresa where rif=?", [newPost.rif]);
    if (result.length>0){
        return resp.status(402).json({ msg: "El Rif Ya Existe" });
    }
    try {
        result = await db.querySelect("INSERT INTO compras_proveedores SET ?", [newPost]);    
        newPost.IdComprasEmpresa = result.insertId;
        return resp.status(201).json(newPost.IdComprasEmpresa);        

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
    
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: IComprasEmpresa = req.body;

    let consulta = ("UPDATE compras_empresa SET ? WHERE IdComprasEmpresa = ?");
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
    let consulta = ("UPDATE compras_empresa SET cerrada=1 WHERE IdComprasEmpresa = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Empresa eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}