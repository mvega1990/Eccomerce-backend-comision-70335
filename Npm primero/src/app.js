import express from "express";
import { router as productosRouter } from "./routes/productosRouter.js";
import { router as cartsRouter } from "./routes/cartsRouter.js";

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productosRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => {
  console.log(`server online en puerto ${PORT}`);
});
