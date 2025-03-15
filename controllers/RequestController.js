import Request from "../models/Request/Request.js";

export const makeRequest = async (req, res) => {
    const { assetName, category, description, quantity } = req.body;
    const userId = req?.user?.userId;
    const newRequest = new Request({ assetName, category, description, from: userId, quantity });
    const saveResponse = await newRequest.save();
    res.send({ success: true, message: "new request has been created", redirect: null });
};


export const getAllRequests = async (req, res) => {
    const requests = await Request.find({}).populate("from").exec()
    res.send(requests);
}