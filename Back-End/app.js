let express  = require('express'),
    mongoose = require('mongoose'),
    seed     = require('./seeds/seed'),

    app      = express();


//Database connections
mongoose.connect("mongodb://localhost:27017/Smarty", {useNewUrlParser:true, useUnifiedTopology:true});
//seed();

// routes
app.get('/',(req,res)=>{
    res.status(200).json({message : 'Hello from the server side', app:'server'});
})
app.post('/',(req,res)=>{
    res.status(200).json({message : 'You can post to this url', app:'server'});
})


// Open the server
const port = 3000;
app.listen(port,()=>{
    console.log(`Running on port: ${port} ...`);
});