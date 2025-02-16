
import {Request, Response} from 'express';
import Usuario from '../models/usuario';
import { json } from 'sequelize';

export const getUsuarios =async(req:Request, res:Response)=>{

    const usuarios =await Usuario.findAll();
    res.json({usuarios});

}
export const getUsuario =async(req:Request, res:Response)=>{

    const {id}=req.params;
    const usuario=await Usuario.findByPk(id);//find by primary key
    if (usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({
            msg:`No existe un usuario con el id ${id}`
        });     
    }

}
export const postUsuario =async(req:Request, res:Response)=>{

    const {body}=req;

    try {

        const existeEmail =await Usuario.findOne({
            where:{
                email:body.email
            }
        });
        if(existeEmail){
            return res.status(400).json({ //return para que ya no siga ejecutando el programa
                msg:'Ya existe un usuario con ese email '+ body.email
            })
        }


        const usuario= await Usuario.create(body);
        res.status(201).json({
            ok: true,
            usuario
          })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }

}

export const putUsuario =async(req:Request, res:Response)=>{

    const {id}=req.params;
    const {body}=req;


    try {
        const usuario=await Usuario.findByPk(id);
        if(!usuario){
            return res.status(400).json({
                msg:'No existe un usuario con el id ' + id
            });
        }

        await usuario.update(body);
        res.json(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }

}
export const deleteUsuario =async(req:Request, res:Response)=>{

    const {id}=req.params;
    const usuario=await Usuario.findByPk(id);
    if(!usuario){
        return res.status(400).json({
            msg:'No existe un usuario con el id ' + id
        });
    }

    await usuario.update({estado:false});// Eliminación lógica

    //Eliminación física  await usuario.destroy();

    res.json(usuario);

}