

const express = require ('express'); 
const app = express(); // API
const morgan = require ('morgan'); // middleware Morgan muestra las peticiones en consola. 
const cors = require ('cors');     // autorizacion de cxn entre servidores
const { mongoose } = require('./database'); //mongodb

// CREATE SERVER socket.IO
const serverSocketIo = express(); 
const serverHttp = require('http').Server(serverSocketIo);
const io = require('socket.io')(serverHttp);
serverHttp.listen(3001, () =>{
console.log('***** SocketIO port: 3002')
    
    })

    
// CONFIG SOCKET.IO    
const ordenSocketIo=[]; //  recibe data desde comunicacion.serivce.ts (funciones emit(), liten()) son llamadas x productos.component funcion: formEdit()                                                    
       
io.on('connection', function(socket){    // abre cnx no recibe data
        socket.on('send-cxn', function(data){  //Llega pedido desde            
        socket.emit('cxn',ordenSocketIo)     
        socket.broadcast.emit('cxn',ordenSocketIo)
   })
    
        socket.on('send-message', function(data){
        ordenSocketIo.push(data);
        socket.emit('text-event',ordenSocketIo)
        socket.broadcast.emit('text-event',ordenSocketIo)
    })
   
    
})



// CREATE API

app.set('port', process.env.PORT || 3000);  // tomo app e nsu propiedad .set  // paso "port" y process.env.PORT (escucha puerto por defecto)
// sino usa el 3000

// Midlewares
app.use(morgan('dev')); // morgan es una funcion, la pegamos en la propiedad use de app. y pasamos el parametro dev que indica que mostrara el mensaje por consola de desarrollo. 
app.use(express.json()); // habilita para que el servidor entienda formato json, es una propiedad de la dependencia Express.npom
app.use(cors('http://174.138.46.164:4200'));
//app.use(cors({origin:'http://localhost:4200'}));
//app.use(cors({origin:'http://167.99.0.153:4200'}));


// Routes http://
app.use('/', express.static('client', {redirect:false}))
app.use('/productos',require('./routes/productos.routes'))
app.use('/mercadopago',require('./routes/mercadopago.routes'))
app.get('*', function(req, res, next){res.sendFile(path.resolve('client/index.html')); //FIX ROUTER PRODUCCION
}) 
// Starting server  
app.listen(app.get('port'), () => {console.log("Puerto escuchando en puerto: ", app.get('port'))});    


 
