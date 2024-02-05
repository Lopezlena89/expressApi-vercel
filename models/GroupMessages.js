
const {Schema,model} = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const GroupSchema = new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    messages:[
        {
            messageAi:String,
            messageUser:String
        }
    ],
    

});

module.exports = model('GroupMessage',GroupSchema);

