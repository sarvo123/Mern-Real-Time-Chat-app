// Importing the dependencies ...
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToDb from "./db/connectToDb.js";
import messageRoutes from './routes/message.routes.js'
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import {app , server} from './socket/socket.js'
import path from "path";


// implementing stufffs ...
const __dirname = path.resolve();

// Creating the app server
// const app = express();
dotenv.config();
app.use(express.json()) ;   // to parse the incomming requets with json payloads  (from req.body ); 
app.use(cookieParser());
// Using the enviourment vaiables ...
const PORT = process.env.PORT || 5000;



// Middleware ...
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/fronted/dist")));

app.get("*" , (req,res)=>{
  res.sendFile(path.join(__dirname, "fronted","dist","index.html"));
})


// // Routes ...
// app.get("/", (req, res) => {
//   //  root route http://localhost:5000
//   res.send("Hello World !!");
// });



app.listen(PORT, () => {
    connectToDb();
    console.log(`Server is running on port ${PORT}`);
});
