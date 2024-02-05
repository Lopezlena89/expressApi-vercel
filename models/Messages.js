const {Schema,model} = require('mongoose');


const MessageSchema = new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    messageAi:{
        type:String,
        required:true,       
    },
    messageUser:{
        type:String,
        required:true,       
    },
    

});

module.exports = model('Message',MessageSchema);

