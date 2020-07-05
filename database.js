const mongoose =require('mongoose');



const URI = 'mongodb+srv://quepasa:UNdianuevo.12@cluster0-c96lb.mongodb.net/test?retryWrites=true&w=majority';


mongoose.connect(URI)
.then(db=> console.log('BASE CONECTADA'))
.catch(err => console.log(err));


module.exports = mongoose;
