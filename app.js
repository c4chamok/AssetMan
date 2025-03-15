import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import { verifyToken } from "./middlewares/verifyToken.js";
import { getUserProfile, updateUserProfile, userLogin, userRegister } from "./controllers/UserController.js";
import { getAllRequests, makeRequest } from "./controllers/RequestController.js";


export const app = express();
const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: "*" } });


app.use(express.json());
app.use(cors());


app.post("/auth/register", userRegister)
app.post("/auth/login", userLogin)
app.get("/auth/profile", verifyToken, getUserProfile)
app.put("/auth/profile", verifyToken, updateUserProfile)

app.post("/request", verifyToken, makeRequest)
app.get("/request", verifyToken, getAllRequests)

export default server;
