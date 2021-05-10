const mongoose = require("mongoose");
const crypto   = require("crypto");
const jwt      = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
    username : String,
    Email: {
        type: String,
        required: [true, 'An Admin must have an Email'],
        },
    password: {
        type: String,
        required: [true, 'An Admin must have a paswword'],
        }
});

const Admin = mongoose.model("Admin",AdminSchema);
module.exports = Admin;