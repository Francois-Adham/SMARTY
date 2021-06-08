var express  = require("express"),
    router   = express.Router({ mergeParams: true }),
    { isAdmin } = require("../middleware"),
    User     = require("../models/User");

router.get('/',isAdmin,(req,res)=>
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

module.exports = router;