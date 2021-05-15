const { isInstructor, isEnrolled } = require("../middleware");

var express  = require("express"),
    router   = express.Router({ mergeParams: true }),
    Course   = require("../models/Course"),
    User     = require("../models/User"),

    passport = require("passport");


// Add Course
router.post('/create',isInstructor,(req,res)=>{
    console.log(req.body)
    Course.create({name:req.body.name,key:req.body.key},(err,course)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({status:"failed to Add Course"});
        }
        else
        {
            course.instructors.push(req.user);
            course.save();
            User.findById(req.user._id,(err,instructor)=>{
                if(err)
                {
                    console.log(err);
                    res.status(400).json({status:"failed to get Instructor"});   
                }
                else
                {
                    instructor.courses.push(course);
                    instructor.save();
                    res.status(200).json({status:"success",data:{Course:course}});
                }
            });
        }
    })
});

// Get all Courses 
router.get('/',(req,res)=>
{
    Course.find({},(err,courses)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({status:"failed to get Courses"});
        }
        else
        {
            res.status(200).json({status:"success",data:{Courses:courses}});
        }
    });
});

//Get Course by ID

router.get('/:id',isEnrolled,(req,res)=>
{
    Course.findById({_id:req.params.id},(err,course)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({status:"failed to get course"});
        }
        else
        {
            res.status(200).json({status:"success",data:{course:course}});
        }
    });
});

//delete Course by ID

router.delete('/:id',isInstructor,(req,res)=>
{
    Course.findByIdAndRemove(req.params.id,(err)=>{
        if(err)
        {
            res.status(400).json({status:"failed to delete course"});
        }
        else
        {

            res.status(200).json({status:"success"});
        }
    });
});

// TODO: Enroll in a course



module.exports =router;