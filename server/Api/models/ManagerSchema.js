import mongoose from "mongoose"

const managerSchema = new mongoose.Schema({
    Musername: {
        type: String,
        required: true,
        unique: true 
    },
    Memail: {
        type: String,
        required: true,
        unique: true
    },
    Mpassword: {
        type: String,
        required: true
    },
    MUniqueID: {
        type: String,
        unique: true // Ensure uniqueness of the MUniqueID
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});


managerSchema.pre('save', async function(next) {
    try {
        if (!this.isNew) {
           
            return next();
        }
    
        const count = await this.constructor.countDocuments();
     
        this.MUniqueID = `manager${count + 1}`;
        next();
    } catch (error) {
        next(error);
    }
});

const Manager = mongoose.model('Manager', managerSchema);

export default  Manager;
