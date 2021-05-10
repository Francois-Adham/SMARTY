let mongoose = require('mongoose'),
    Admin    = require('../models/Admin');

var Data = 
{
    username : "Mervat",
    Email : "test@Admin.com",
    password : "0"
}

function SeedDB()
{
    Admin.create(Data,(err,admin)=>{
        if(err){
            console.log(err);
            return; //console.log("register");
        }
            console.log(admin.Email);
    });
}
module.exports = SeedDB;