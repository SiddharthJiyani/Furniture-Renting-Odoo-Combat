const mongoose = require("mongoose")

/*

users // model
user_id  // primary key
username serial 
email   varchar
password_hash text
first_name varchar
last_name varchar
address text
phone_number varchar
profile_image text
created at timestamp
updated_at timestamp
 */

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    profile_image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true}
)
