const { isInstructor, isEnrolled } = require("../middleware");

var express  = require("express"),
    router   = express.Router({ mergeParams: true }),
    Course   = require("../models/Course"),
    User     = require("../models/User"),
    Post     = require("../models/Post"),
    passport = require("passport");


// Add Course
router.post('/create',isInstructor,(req,res)=>{
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
    Course.findById({_id:req.params.id}).populate("posts").exec((err,course)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({status:"failed to get course"});
        }
        else
        {
            res.status(200).json({status:"success",isEnrolled: true,data:{course:course}});
        }
    });
});

//delete Course by ID

router.delete('/:id',isInstructor,(req,res)=>
{
    // Find Course
    Course.findById({_id:req.params.id},(err,course)=>{
        if (err)
        {
            console.log(err);
            res.status(400).json({status:"failed to get Course"});
        }
        else
        {
            // get instructors
            // loop and remove course from them
            course.instructors.forEach(instructor => {
                User.findById(instructor,(err,inst)=>{
                    if (err)
                    {
                        console.log(err);
                        res.status(400).json({status:"failed to find instructor"});
                    }
                    else
                    {
                        inst.courses = inst.courses.filter(function(value, index, arr){ 
                            return value != req.params.id;
                        });
                        inst.save();
                    }
                });
            });
            // do the same for students
            course.students.forEach(student => {
                User.findById(student,(err,std)=>{
                    if (err)
                    {
                        console.log(err);
                        res.status(400).json({status:"failed to find student"});
                    }
                    else
                    {
                        std.courses = std.courses.filter(function(value, index, arr){ 
                            return value != req.params.id;
                        });
                        std.save();
                    }
                });
            });
            // delete all posts
            course.posts.forEach(post => {
                Post.findByIdAndRemove(post,(err,pst)=>{
                    if (err)
                    {
                        console.log(err);
                        res.status(400).json({status:"failed to delete post"});
                    }
                });
            });
            //Delete course
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
        }
    });
});

//Enroll in a course
router.post('/:id/enroll',(req,res)=>{
    Course.findById(req.params.id,(err,course)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({status:"failed to get Course"});
        }
        else
        {
            if(course.key == req.body.key)
            {
                course.students.push(req.user);
                course.save();
                User.findById(req.user._id,(err,student)=>{
                    if(err)
                    {
                        console.log(err);
                        res.status(400).json({status:"failed to get Student"});   
                    }
                    else
                    {
                        student.courses.push(course);
                        student.save();
                        res.status(200).json({status:"success"});
                    }
                });
            }
            else 
            {
                res.status(400).json({status:"You entered wrong Key !"}); 
            }
        }
    })
});


module.exports =router;