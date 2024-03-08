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
    UserUniqueID: {
        type: String,
        unique: true 
    },
    projects: [ProjectSchema.schema] 
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    try {
        if (!this.isNew) {
           
            return next();
        }
    
        const count = await this.constructor.countDocuments();
     
        this.UserUniqueID = `User101${count + 1}`;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
