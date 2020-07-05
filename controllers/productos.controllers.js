const productosCtrl = {};
const Productos  = require('../models/productos')
// const MercadoPagoSchema  = require('../models/mercadopago')
const mercadopago = require ('mercadopago');


// API
productosCtrl.getProductos = async (req,res) =>{

const productos = await Productos.find();
res.json(productos);

};

productosCtrl.newProductos = async(req,res) => {
    const productos = new Productos({
       nombre: req.body.nombre,
       precio: req.body.precio,
       categoria: req.body.categoria,
       descripcion: req.body.descripcion,
       imagen: req.body.imagen       
    });
       await productos.save();
       res.json('Guardado');

};

 productosCtrl.getProducto = async(req,res) => { 
    const productos = await Productos.findById(req.params.id);
    res.json(productos);

};

productosCtrl.modificarProducto = async (req,res) => {
    const { id } = req.params;
    const producto = { nombre: req.body.nombre, 
                       precio: req.body.precio,
                       categoria: req.body.categoria,
                       descripcion: req.body.descripcion, 
                       imagen: req.body.imagen, 
                       cantidad: 0
    };
    
       await Productos.findByIdAndUpdate(id, {$set: producto}, {new: true});
       res.json('actualizado');

};

productosCtrl.deleteProducto = async (req,res) => {
    const { id } = req.params;
    await Productos.findByIdAndDelete(id);
    res.json("eliminado");
};

//Mercadopago

productosCtrl.nuevoPago = async (req,res) => {
    var { id } = req.params
     id = Number(id);
     mercadopago.configure({access_token: 'TEST-422141643250773-060218-f9f1edbfaa14164e44c3b4b0f71287ae-26856840'});
   
  let preference = { 

    back_urls: {
        success: "https://www.tu-sitio/success",
        failure: "http://www.tu-sitio/failure",
        pending: "http://www.tu-sitio/pending"
    },
    auto_return: "approved",
      
    items: [
        { title: 'Resto La Malvada Delivery',
          unit_price: (id),
          currency_id: 'ARS',
          quantity: 1,
          
        }
            ]

       
    
    };
  
    await mercadopago.preferences.create(preference)
    .then(function(res){  
    global.init_point = res.body.init_point;
    console.log(global.init_point)}).catch(function(error){console.log(error);});
    res.json({link: (global.init_point)}); 
};




module.exports = productosCtrl