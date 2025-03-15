import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, default: "Unknown User" },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String },
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
    createdAt: { type: Date, default: Date.now },
    firebaseUID: { type: String, required: true },
    completed: { type: Boolean, default: false }
})

const User = mongoose.model("User", userSchema);

export default User