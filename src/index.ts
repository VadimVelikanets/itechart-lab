import dotenv from "dotenv";
import app from "./app";
import corsMiddleware from "./middleware/cors.middleware";
import * as process from "process";
import * as mongoose from "mongoose";

dotenv.config()

const PORT =  process.env.PORT || 8080;
app.use(corsMiddleware);
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string)
        app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`) )
    } catch (e) {
        console.log(e)
    }
}

start();
