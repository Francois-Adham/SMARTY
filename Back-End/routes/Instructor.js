var express  = require("express"),
    router   = express.Router({ mergeParams: true }),
    { isAdmin } = require("../middleware"),
    User     = require("../models/User"),
    passport = require("passport");

// Get all instructors 
router.get('/',isAdmin,(req,res)=>
{
    User.find({type:"Instructor"},(err,instructors)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({status:"failed to get instructors"});
        }
        else
        {
            res.status(200).json({status:"success",data:{instructors:instructors}});
        }
    });
});

module.exports =router;