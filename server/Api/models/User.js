import mongoose from "mongoose";
import Task from "./TaskSchema.js"; // Import the TaskSchema

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
    tasks: [Task.schema] 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
