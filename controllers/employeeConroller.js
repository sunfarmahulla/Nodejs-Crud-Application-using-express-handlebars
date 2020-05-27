const express = require('express');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

var router = express();

router.get('/', function(req, res){
    res.render("employee/addOrEdit",{
        viewTitle: "Insert Employee"
    });
});
router.post('/',function(req, res){
    if(req.body._id == ''){
        insertRecord(req, res);
    }
    else{
        updateRecord(req,res);
    }
});

function insertRecord(req, res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc)=>{
        if(!err){
            res.redirect('employee/list');

        }else{
            if(err.name == "ValidationError" ){
               handleValidationError(err, req.body); 
                    res.render("employee/addOrEdit",{
                    viewTitle: "Insert Employee",
                    employee:req.body
                });
            }else{
                consoe.log("Error during insertion:"+err);
            }

            
        }
    });
}



router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['cityError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', function(req, res){
    Employee.findById(req.params.id, (err, doc)=>{
        if(!err){
            res.render("employee/addOrEdit",{
              viewTitle:"update Employee",
              employee:doc  
            })
        }
    })
})

function  updateRecord(req, res){
    Employee.findByIdAndUpdate({
        _id:req.body._id}, req.body,{new:true},
    (err, doc)=>{
        if(!err){
            res.redirect('employee/list');
        }else{
            if(err.name == "ValidationError" ){
                handleValidationError(err, req.body); 
                     res.render("employee/addOrEdit",{
                     viewTitle: "Update Employee",
                     employee:req.body
                 });
             }else{
                 consoe.log("Error during update the record:"+err);
             }
        }
    });
    
}

router.get('/delete/:id',function(req, res) {
    Employee.findByIdAndDelete(req.params.id,(err, doc)=>{
        if(!err){
            res.redirect('/employee/list')
        }else{
            console.log('error in employee delete:'+err);
        }
    })
})
module.exports=router;
