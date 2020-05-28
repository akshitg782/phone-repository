
var mongoose = require("mongoose");


var contactSchema=new mongoose.Schema({
    
    name:String,
    email:{type: String, unique: true },
    phone:{type: String, unique: true }
});

contactSchema.pag

module.exports =mongoose.model("contacts",contactSchema);
