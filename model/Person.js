import mongoose from'mongoose';
const personschema = new mongoose.Schema({
    name : String,
    email: String,
    age : Number
},
{timestamps : true} )
export const person = mongoose.model('Person',personschema)