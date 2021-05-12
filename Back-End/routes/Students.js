var express  = require("express"),
    router   = express.Router({ mergeParams: true }),
    User     = require("../models/User"),
    bcrypt   = require('bcryptjs')
    passport = require("passport");

router.get('/',(req,res)=>
{
    User.find({type:"Student"},(err,students)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({status:"failed to get students"});
        }
        else
        {
            res.status(200).json({status:"success",data:{students:students}});
        }
    });
});

router.get('/:id',(req,res)=>
{
    User.findById({_id:req.params.id},(err,student)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({status:"failed to get student"});
        }
        else
        {
            res.status(200).json({status:"success",data:{student:student}});
        }
    });
});

router.delete('/:id',(req,res)=>
{
    User.findByIdAndRemove(req.params.id,(err)=>{
        if(err)
        {
            res.status(400).json({status:"failed to delete student"});
        }
        else
        {

            res.status(200).json({status:"success"});
        }
    });
});


//TODO:
router.put('/:id',(req,res)=>
{
    User.findByIdAndUpdate(req.params.id, req.body,(err,newuser)=>{
        if(err)
            res.status(400).json({status:"Passwords don't match"});
        else
        {    
            console.log(newuser);
            res.status(200).json({status:"Password Updated"});
        }
    });
});



module.exports = router;