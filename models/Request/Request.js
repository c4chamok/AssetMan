import mongoose, { Types } from "mongoose";


const requestSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    quantity: { type: Number},
    assetName: { type: String},
    category: { type: String},
    status: { type: String, enum: ["pending", "processing", "approved", "canceled"], default: "pending"},
    createdAt: { type: Date, default: Date.now() },
    description: { type: String},
})

const Request = mongoose.model("Request", requestSchema);

export default Request