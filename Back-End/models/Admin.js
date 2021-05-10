const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

const AdminSchema = new mongoose.Schema({
    username : String,
    email: {
        type: String,
        required: [true, 'An Admin must have an Email'],
        },
    password: {
        type: String
        }
});
AdminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model("Admin",AdminSchema);

module.exports = Admin;