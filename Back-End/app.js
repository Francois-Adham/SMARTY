let express        = require('express'),
    mongoose       = require('mongoose'),
    seed           = require('./seeds/seed'),
    bodyParser     = require("body-parser"),
    passport       = require("passport"),
    LocalStratgy   = require("passport-local"),
    methodOverride = require("method-override"),
    app            = express();

// Requireing the Models
let User  = require('./models/User'),
    Amdin = require('./models/Admin');

//Database connections
mongoose.connect("mongodb://localhost:27017/Smarty", {useNewUrlParser:true, useUnifiedTopology:true});
// Seeding database
seed();
// App Configrations
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride("_method"));
// Passport configration
app.use(require("express-session")({
    secret: "secret word is here :)",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratgy(User.authenticate()));
passport.use(new LocalStratgy(Amdin.authenticate()));
passport.serializeUser(User.serializeUser());
passport.serializeUser(Amdin.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.deserializeUser(Amdin.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});

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