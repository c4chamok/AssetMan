import dotenv from "dotenv"
dotenv.config();
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: process.env.Firebase_ClientEmail,
        projectId: process.env.Firebase_ProjectId,
        privateKey: process.env.Firebase_Private_Key?.replace(/\\n/g, "\n")
    })
});
const firebaseauth = getAuth();

export default firebaseauth;