import dotenv from "dotenv"
dotenv.config();
import User from "../models/User/User.js";
import jwt from "jsonwebtoken"
import { firebaseauth } from "../index.js";

export const userRegister = async (req, res) => {
    const { userEmail, firebaseUID } = req.body;
    const user = await firebaseauth.getUser(firebaseUID);
    if (user.email !== userEmail) return res.status(403).send({ message: "incorrect User", error: true });
    try {
        const newUser = new User({ email: userEmail, firebaseUID });
        const saveResponse = await newUser.save();
        const objectId = saveResponse._id.toString();
        const token = jwt.sign({ userId: objectId, firebaseUID: firebaseUID }, process.env.JWT_SECRET, { expiresIn: '5h' });
        res.status(201).send({ token });
    } catch (err) {
        res.status(500).send(err);
    }
}



export const userLogin = async (req, res) => {
    const { firebaseUID } = req.body;
    const theUser = await User.findOne({ firebaseUID: firebaseUID });
    if (!theUser) {
        try {
            const user = await firebaseauth.getUser(firebaseUID);
            const newUser = new User({ email: user?.email, firebaseUID });
            const saveResponse = await newUser.save();
            const objectId = saveResponse._id.toString();
            const token = jwt.sign({ userId: objectId, firebaseUID: firebaseUID }, process.env.JWT_SECRET, { expiresIn: '5h' });
            return res.status(201).send({ token });
        } catch (err) {
            return res.send({err, error: true})
        }

    }
    const token = jwt.sign({ userId: theUser._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
    res.status(201).send({ token });
}

export const getUserProfile = async (req, res) => {
    const theUser = await User.findById(req?.user?.userId, { createdAt: 0, __v: 0 });
    if (!theUser) return res.status(401).send({ message: "No User Found" });
    if (!theUser.completed) return res.status(301)
        .send({ message: "Profile not fully completed", error: true, redirect: 'register/profile-info' });
    res.send(theUser);

}

export const updateUserProfile = async (req, res) => {
    const { name, photoURL } = req.body;
    const theUser = await User.findByIdAndUpdate(req?.user?.userId, { name, photoURL });
    if (!theUser) return res.status(401).send({ message: "No User Found", error: true });
    if(theUser?.name !== "Unknown User" || theUser?.photoURL !== ""){
        theUser.completed = true;
    }
    await theUser.save();
    res.send({ message: "Updated successfully", success: true })
}

