let mongoose = require('mongoose'),
    passport = require('passport'),
    User    = require('../models/User');

var Data = 
{
    username : "Mervat",
    email : "test@Admin.com",
    phone: "01270540306",
    type: "Admin",
    password : "admin"
}

function SeedDB()
{
    User.findOne({type:"Admin"},(err,user)=>{
        if(err){
            console.log(error);
        }else{
            if(user){
                //console.log(user);
                console.log("The DB is seeded");
            }else{
                User.register(
                    new User({
                        username: Data.username,
                        email: Data.email,
                        phone: Data.phone,
                        type: Data.type})
                    ,Data.password,(err,user)=>{
                        if(err){
                            console.log(err)
                        }
                        passport.authenticate("local");
                        console.log("The DB is seeded");
                })
            }
        }
    });
}
module.exports = SeedDB;