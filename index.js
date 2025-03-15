import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
import server from "./app.js";

const mongoDBConnect = async () => {
    await mongoose.connect(`${process.env.MONGO_URI}`);
}
mongoDBConnect()
    .then(() => { console.log("connected to DB"); })
    .catch(err => console.error("Connection error", err))


const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
