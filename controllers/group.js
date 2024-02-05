const { response } = require("express");
const Message = require('../models/Messages');
const GroupMessages = require("../models/GroupMessages");

const getGroup = async( req,res = response ) =>{   
    const uid = req.uid;
   
    const  groupMessages  = await  GroupMessages.findOne({user:uid});
  
    res.json({
        groupMessages
    });
}

const crearGroup = async( req,res = response ) =>{
    try {
        const uid = req.uid;
        const group = new GroupMessages({user:uid});
        const groupGuardado = await group.save();
        res.json({
            ok:true,
            groupMessage:groupGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

const crearMessageGroup = async( req,res = response ) =>{
    const groupid = req.params.id;
    
    const group = await GroupMessages.findById(groupid);
    
    if(!group)return;
    
    try {
        
        const message =   new Message(req.body);
        
        group.messages.push(message);
        await group.save();
        res.json({
            ok:true,
            groupMessage:group
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}


const eliminarGroup = async( req,res = response ) =>{

    const groupId = req.params.id;
    const uid = req.uid;
    

    try {
        const groupMessage = await GroupMessages.findById(groupId);

        if(!groupMessage){
            return res.status(404).json({
                ok:false,
                msg:'No hay mensajes con ese id'
            });
        }

        if(groupMessage.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene provilegios para eliminar este menssage'
            })
        }
        await GroupMessages.findByIdAndDelete(groupId);
        
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

const eliminarMessageGroup = async(req,res = response) =>{
    const groupId = req.params.id;
    const MessageId = req.params.msg;
    const uid = req.uid;

    try {
        const groupMessage = await GroupMessages.findById(groupId);
        if(!groupMessage){
            return res.status(404).json({
                ok:false,
                msg:'No hay mensajes con ese id'
            });
        }

        if(groupMessage.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene provilegios para eliminar en este grupo'
            })
        }
        

        const newGroup = groupMessage.messages.filter(message=>{
            return message.id !== MessageId && message
        })
        
        const newGroupMessage = await GroupMessages.findByIdAndUpdate(groupId,{messages:newGroup})
        await newGroupMessage?.save();
        res.json({
            ok:true,
           group:newGroupMessage
        });

    } catch (error) {
        
    }
}


module.exports = {
    getGroup,
    crearGroup,
    eliminarGroup,
    crearMessageGroup,
    eliminarMessageGroup
    
    
}