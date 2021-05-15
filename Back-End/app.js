let express        = require('express'),
    mongoose       = require('mongoose'),
    seed           = require('./seeds/seed'),
    passport       = require("passport"),
    LocalStratgy   = require("passport-local"),
    methodOverride = require("method-override"),
    app            = express();

// Requireing the Models
let User  = require('./models/User');

// Requireing routes
let indexRoutes   = require('./routes/index'),
    studentRoutes = require('./routes/Students'),
    instructorRoutes = require('./routes/Instructor'),
    userRoutes = require('./routes/Users');

//Database connections
mongoose.connect("mongodb://localhost:27017/Smarty", {useNewUrlParser:true, useUnifiedTopology:true});
// Seeding database
seed();
// App Configrations
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));
app.use(express.json()); // Handeling post requests
// Passport configration
app.use(require("express-session")({
    secret: "secret word is here :)",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratgy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});

// routes
app.use('/api/v1/',indexRoutes);
app.use('/api/v1/students',studentRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/instructors',instructorRoutes);



// Open the server
const port = process.env.PORT | 3000;
app.listen(port,()=>{
    console.log(`Running on port: ${port} ...`);
});