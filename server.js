require('./models/db');

const express = require('express');

const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
  
const employeeController = require('./controllers/employeeConroller');
var app =express();

//or

//const PORT = process.env.PORT || 5000;
//app.listen(PORT, console.log('server is started at',PORT));



app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());


app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({
    extname:'hbs',
    defaultLayout:'mainLayout',
    layoutsDir:__dirname+'/views/layouts/'
}));

app.set('view engine', 'hbs');
app.listen(3001,()=>{
    console.log('express server started with at port:3000');
});

app.use('/employee', employeeController);