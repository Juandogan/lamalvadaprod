const mongoose = require('mongoose');
const { Schema } = mongoose;



// modelo de datos PROMOS y CARTA
const ProductoSchema = new Schema({

    nombre:{type: String, required : false},
    descripcion:{type: String, required : false},
    imagen:{type: String, required : false},
    precio:{type: String, required : false}, 
    categoria:{type: String, required: false},
    cantidad:{type: String, required:false},

  //mercadoPago
    title:{type: String, required: false},
    unit_price:{type: Number, required: false}, 
    quantity:{type: Number, required: false} 

});


module.exports = mongoose.model('ProductoSchema', ProductoSchema); 
