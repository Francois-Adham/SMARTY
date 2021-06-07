let express  = require("express"),
    Post     = require("../models/Post"),
    User     = require("../models/User"),
    Course   = require("../models/Course"),
    {isInstructor,isStudent}       = require("../middleware/index"),
    router   = express.Router({ mergeParams: true });


router.post('/upload', function(req, res) {

  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({status:'failed no file selected'});
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.file;
  uploadPath = __dirname + '/../uploads/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
    
    // Create post and give hime the path of this file 
    Post.create({title:req.body.title,body:sampleFile.name,type:req.body.type,publisher:req.user,MaterialPath:uploadPath,dueDate:req.body.dueDate},(err,post)=>{
        if(err)
        {
            console.log(err);
            res.status(400).json({status:"failed to Add file"});
        }
        else
        {
            Course.findById(req.params.courseID,(err,course)=>{
                if (err)
                {
                    console.log(err);
                    res.status(400).json({status:"failed to find course"});
                }
                else
                {
                    course.posts.push(post);
                    course.save();
                    res.status(200).json({status:"success",message:"File uploaded"});
                }
            });
        }
    })
  });
});

router.get('/downloads/:id', function (req, res, next) {
    // Get the post to fill the data 
    Post.findById(req.params.id,(err,post)=>{
        if(err){
            return res.status(400).json({status:'failed' ,message: 'file not found'});
        }
        var filePath = post.MaterialPath; // Or format the path using the `id` rest param
        var fileName = post.body; // file name 
        res.download(filePath, fileName); 
    })
});

module.exports =router;