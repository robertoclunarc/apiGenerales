import { json, Request, Response } from "express";
import db from "../../database";
import { Iconfig_noticias } from "../../interfaces/configuraciones/configuraciones.interface";

export const SelectREcordAll = async (req: Request, resp: Response) => {
    let consulta = "SELECT * FROM config_noticias where activo=1";    
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
    let consulta = "SELECT * FROM config_noticias";
    let noticia = {
        idConfigNoticia: req.params.Id,
        titulo: req.params.titulo,
        descripcion: req.params.descripcion,
        fechaAlta: req.params.fechaAlta,
        activo: req.params.activo
    }
    let where: string[] = [];
    
    if (noticia.idConfigNoticia!="NULL" || noticia.titulo!="NULL" || noticia.descripcion!="NULL" || noticia.fechaAlta!="NULL" || noticia.activo!="NULL"){        
        if (noticia.idConfigNoticia!="NULL"){
           where.push( " idConfigNoticia =" + noticia.idConfigNoticia);
        }

        if(noticia.titulo!="NULL"){
            where.push( " LOWER(titulo) LIKE LOWER('%" + noticia.titulo + "%')");
        }                

        if (noticia.activo!="NULL"){
            where.push( " activo =" + noticia.activo);
        }
        
        if(noticia.fechaAlta!="NULL"){
            where.push( " date_format(fechaAlta,'%Y-%m-%d') ='" + noticia.fechaAlta+ "' ");
        }

        if(noticia.descripcion!="NULL"){
            where.push( " LOWER(descripcion) LIKE LOWER('%" + noticia.descripcion + "%')");
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
    let newPost: Iconfig_noticias = req.body;      
    try {
        const result = await db.querySelect("INSERT INTO config_noticias SET ?", [newPost]);    
        newPost.idConfigNoticia = result.insertId;
        return resp.status(201).json(newPost.idConfigNoticia);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}

export const updateRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let update: Iconfig_noticias = req.body;

    let consulta = ("UPDATE config_noticias SET ? WHERE idConfigNoticia = ?");
    try {
        const result = await db.querySelect(consulta, [update, idx]);
        resp.status(201).json("Noticia actualizada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error": error })
    }   
}

export const deleteRecord = async (req: Request, resp: Response) => {
    let idx = req.params.IdRec;
    let consulta = ("UPDATE config_noticias SET activo=0 WHERE idConfigNoticia = ?");
    try {
        const result = await db.querySelect(consulta, [idx]);
        resp.status(201).json("Noticia eliminada correctamente");
    } catch (error) {
        console.log(error);
        resp.json({"Error ": error })
    }   
}

export function subirimagen(req:Request, resp: Response) {
    const newPhoto = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        imagePath: req.file.path
    }
    console.log(newPhoto);

    return resp.status(201).json(newPhoto.imagePath);
}