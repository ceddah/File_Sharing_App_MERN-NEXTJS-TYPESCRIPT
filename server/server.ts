import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

// mongodb+srv://ceddah:cedaceda@cluster0.uobse.mongodb.net/messages?retryWrites=true&w=majority

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
