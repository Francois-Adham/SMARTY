let express = require('express'),
    app     = express();


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