let Course = require('../models/Course'),
    User   = require('../models/User');

let middlewareObj ={}
// Check if the user is logged in
middlewareObj.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.status(401).json({
        status: 'failed',
        message: 'User not logged in'
    });
};
// Check if the user is Student 
middlewareObj.isStudent = (req,res,next) => {
    if(req.user.type === "Student"){
        return next();
    }
    res.status(401).json({
        status: 'failed',
        message: 'You are not a student'
    });
};
// Check if the user is Instructor 
middlewareObj.isInstructor = (req,res,next) => {
    if(req.user.type === "Instructor"){
        return next();
    }
    res.status(401).json({
        status: 'failed',
        message: 'You are not a Instructor'
    });
};
middlewareObj.isAdmin = (req,res,next) => {
    if(req.user.type === "Admin"){
        return next();
    }
    res.status(401).json({
        status: 'failed',
        message: 'You are not a admin'
    });
};
// Check if the user is enrolled in the course
middlewareObj.isEnrolled = (req,res,next) => {
    found= false;
    User.findById(req.user.id,(err,user)=>{
        if(err){
            return res.status(401).json({
                status: 'failed',
                message: 'user not found'
            });
        }
        user.courses.forEach(course => {
            if(course == req.params.id)
            {
                found = true;
                return next();
            }
        });
        if(!found)
        {
            res.status(400).json({
            status: 'failed',
            message: 'You are not enrolled in this course'
           });
        }
    });
};

module.exports = middlewareObj;