let express  = require("express"),
    router   = express.Router(),
    User     = require("../models/User"),
    passport = require("passport");
let isLoggedIn = require('../middleware/index').isLoggedIn;

router.get('/',(req,res)=>{
    res.status(200).json({
        message: "Hello from the api"
    })
})
// ===================================================================
//                          AUTH ROUTES
// ===================================================================
// Create new user (Register)
router.post("/register",(req,res)=>{
    User.register(new User({username:req.body.username,email:req.body.email,phone:req.body.phone,type:req.body.type}),req.body.password,(err,user)=>{
        if(err){
            console.log("error")
            return res.status(400).json(err);
        }
        passport.authenticate("local")(req,res,()=>{
            console.log(req.isAuthenticated());
        })
        res.status(201).json({
            status:'success',
            data:{
                user: req.user,
                sessionID: req.sessionID
            }
        })
    })
});
// Login 
router.post("/login",passport.authenticate("local", 
    {
        successRedirect: "/api/v1/loginSuccess",
        failureMessage: "/api/v1/loginFail"
    }),(req,res)=>{
});
router.get('/loginSuccess',(req,res)=>{
    console.log("The login");
    res.status(201).json({
        status: 'success',
        data:{
            user: req.user,
            sessionID: req.sessionID
        }
    })
})
router.get('/loginFail',(req,res)=>{
    res.status(400).json({
        status: 'failed'
    })
})
router.get("/logout",(req,res)=>{
    console.log("The logout");
    req.logOut();
    res.status(201).json({
        status:'success',
        message: "You are logged out"
    })
});
// ===================================================================
//                          My Info ROUTES
// ===================================================================
router.get('/me',isLoggedIn,(req,res)=>{
    res.status(200).json({
        data :{
            user: req.user
        }
})
});


module.exports = router;