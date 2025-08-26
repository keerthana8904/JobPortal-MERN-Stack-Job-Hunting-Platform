import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        // select options 
        enum:['student','recruiter'],
        required:true
    },
    // Profile related data is grouped under profile object.
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // URL to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto:{
            type:String,
            default:"" // Default profile photo URL can be no profile photo
        }
    },
},
{
    timestamps:true // This will add createdAt and updatedAt fields automatically
});
export const User = mongoose.model('User', userSchema);