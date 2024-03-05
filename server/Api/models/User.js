import mongoose from "mongoose";
import ProjectSchema from "./ProjectSchema.js"; // Import the ProjectSchema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    projects: [ProjectSchema.schema] 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
