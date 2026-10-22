import express from "express";
import videoRoutes from "./routes/video.routes.js"


const app = express();


app.use(express.json());

app.use("/", videoRoutes);

app.listen(3000, ()=> {
    console.log("Api funcionando en el puerto 3000");
})