const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EmployeDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}, (err)=>{
    if(!err){
        console.log('MongoDB connection succeeded')
    }
});

require('./emplyee_model');