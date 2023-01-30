const express = require("express");
const port = 8000;
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const Contact = require('./models/contact');
const db = require('./confi/mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("asset"));
var contactList = [
    {
        name : "Sid",
        number : "111"
    },
    {
        name : "Sush",
        number : "222"
    }
];
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.get("/",function(req,res){
    Contact.find({},function(err,contacts){
        if (err){
            console.log('Error in fetching');
            return;
        }
        res.render('home',{
            title : 'Contact list',
            contact_list : contacts
        });
        return;
    });
});
app.get("/delete-contact/",function(req,res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if (err){
            console.log("Err got");
            return;
        }
        res.redirect('/');
        return;
    })
})
app.post("/new_contact",function(req,res){
    Contact.create({
        name: req.body.name,
        number: req.body.number
    },function(err,new_contact){
        if (err){
            console.log("kind error");
            return;
        }
        console.log("kind suc");
        console.log(new_contact);
        res.redirect('/');
        return;
    })
})


app.listen(port,function(err){
    if (err){
        console.log("Error",err);
        return;
    }
    console.log("Server is up",port);
})