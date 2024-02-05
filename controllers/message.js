const { response } = require("express");
const Message = require('../models/Messages');

const getMessages = async( req,res = response ) =>{   
    const uid = req.uid;
    const  messages  = await  Message.find({user:uid})

    res.json({
        messages
    });

}


const crearMessage = async( req,res = response ) =>{
    
    const message = new Message(req.body);
    try {
        message.user = req.uid;
        const messageGuardado = await message.save()

        res.json({
            ok:true,
            message:messageGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

  

}


const eliminarMessages = async( req,res = response ) =>{

    const messagesId = req.params.id;
    const uid = req.uid;
    

    try {
        const message = await Message.findById(messagesId);

        if(!message){
            return res.status(404).json({
                ok:false,
                msg:'No hay mensajes con ese id'
            });
        }

        if(message.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene provilegios para eliminar este menssage'
            })
        }

        

        await Message.findByIdAndDelete(messagesId);
        
        res.json({
            ok:true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }


   

}


module.exports = {
    getMessages,
    crearMessage,
    eliminarMessages,
    
    
}