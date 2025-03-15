import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import server from "./app.js";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

const mongoDBConnect = async () => {
  await mongoose.connect(`${process.env.MONGO_URI}`);
};
mongoDBConnect()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.error("Connection error", err));

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.Firebase_ClientEmail,
    projectId: process.env.Firebase_ProjectId,
    privateKey: process.env.Firebase_Private_Key?.replace(/\\n/g, "\n"),
  }),
});

export const firebaseauth = getAuth();



const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
