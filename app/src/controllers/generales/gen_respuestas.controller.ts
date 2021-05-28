import { json, Request, Response } from "express";
import db from "../../database";
import { Igen_respuestas_valoracion } from "../../interfaces/generales/generales.interface";

export const SelectREcord = async (req: Request, resp: Response) => {
    let consulta = "Select * FROM gen_respuestas_valoracion";
        
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
    let consulta = "SELECT re.*,  (SELECT descripcion FROM gen_preguntas_gerencias ger WHERE ger.idPregunta = re.idPregunta) desc_pregunta FROM gen_respuestas_valoracion re";
    let filtro = {         
        idPregunta: req.params.Id,        
        idRefServicio: req.params.idRefServicio              
    }

    let where: string[] = [];
    
    if (filtro.idPregunta!="NULL" || filtro.idRefServicio!="NULL"){        
        if (filtro.idPregunta!="NULL"){
           where.push( " re.idPregunta =" + filtro.idPregunta);
        }

        if(filtro.idRefServicio!="NULL"){
            where.push( " re.idRefServicio=" + filtro.idRefServicio);
        }

        where.forEach(function(where, index) {
            if (index==0){
                consulta = consulta + " WHERE " + where;
            }else{               
                consulta = consulta + " OR " + where;                              
            }
        });        
    }
    console.log(consulta);
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
    let newPost: Igen_respuestas_valoracion = req.body;
    
    try {
        const result = await db.querySelect("INSERT INTO gen_respuestas_valoracion SET ?", [newPost]);    
        newPost.idRespuesta = result.insertId;
        return resp.status(201).json(newPost.idRespuesta);

    } catch(error) {
        console.log(error);
        resp.json({"Error": error});
    }
}