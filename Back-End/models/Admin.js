const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: [true, 'An Admin must have an Email'],
        },
    Password: {
        type: String,
        required: [true, 'An Admin must have a paswword'],
        }
});

const Admin = mongoose.model("Admin",AdminSchema);
module.exports = Admin;