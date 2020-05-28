var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var contacts=require("./models/mongo");
var paginate=require("mongoose-paginate");

mongoose.connect('mongodb://localhost/contacts', {useNewUrlParser: true});

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine","ejs");
schema.plugin(paginate);

app.get("/contacts",function(req,res){
    
    contacts.find({},function(err,contacts){
        if(err){
            console.log(err);
        }else{
            res.render("home",{contacts:contacts});
        }
    });
    
});


/*app.get("/contacts",function(req,res){
    
    contacts.paginate({},{limit:4,sort:{name: 'asc'}},function(err,contacts){
        if(err){
            console.log(err);
        }else{
            res.render("home",{contacts:contacts});
        }
    });
    
});*/



app.get("/contacts/new",function(req,res){
    
    res.render("new");
});



app.post("/contacts",function(req,res){
    
     var name= req.body.name;
     var email =req.body.email;
    var phone = req.body.phone;  
    var newContact={name:name,email:email,phone:phone};
    contacts.create(newContact);
  res.redirect("/contacts");
});


app.get("/contacts/:id/edit",function(req,res){
   
    contacts.findById(req.params.id,function(err,found){
       if(err){
           res.redirect("/contacts");
       } else{
             res.render("edit",{contacts:found});

       }
    });
});


app.put("/contacts/:id",function(req,res){
    contacts.findByIdAndUpdate(req.params.id,req.body,function(err,updateData){
       if(err){
           res.redirect("/contacts");
       } else{
           res.redirect("/contacts");
       }
    });
    
});





app.get("/contacts/:id",function(req,res){
   
    contacts.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect("/contacts");
       } else{
             res.redirect("/contacts");

       }
    });
});













app.listen(process.env.Port||5000,process.env.IP,function(){
	console.log("running on port 5000");
});



/*
app.get("/home",function(req,res){
    
});
*/