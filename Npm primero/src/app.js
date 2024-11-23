import express from "express";
import { router as productosRouter } from "./routes/productosRouter.js";
import { router as cartsRouter } from "./routes/cartsRouter.js";
import { router as vistasRouter} from "./routes/vistasRouter.js";
import{engine} from "express-handlebars"
import {Server} from "socket.io"
import { setupDeleteListener } from "./routes/productosRouter.js";
import { conectaDB } from "./connDB.js";
import { config } from "./Config/config.js";

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")
app.use("/", vistasRouter)
app.use("/api/products", productosRouter);
app.use("/api/carts", cartsRouter);

const serverHTTP=app.listen(PORT, () => {
  console.log(`server online en puerto ${PORT}`);
});

const io = new Server(serverHTTP)

app.set("io", io);
setupDeleteListener(io)

io.on("connection", socket =>{
  console.log("se conecto nuevo cliente ")
})

conectaDB(config.MONGO_URL, config.DB_NAME) 
