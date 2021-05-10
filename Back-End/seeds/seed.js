let mongoose = require('mongoose'),
    passport = require('passport'),
    Admin    = require('../models/Admin');

var Data = 
{
    username : "Mervat",
    email : "test@Admin.com",
    password : "0"
}

function SeedDB()
{
    Admin.remove({},(err)=>{
        if(err){
            console.log("error in removeing admins in seed")
            console.log(err);
        }else{
            Admin.register(new Admin({username:Data.username,email:Data.email}),Data.password,(err,admin)=>{
                if(err){
                    console.log(err)
                    return;
                }
                passport.authenticate("local")
            })
        }
    })
}
module.exports = SeedDB;