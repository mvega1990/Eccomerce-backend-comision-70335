import { Router } from "express";
import CartManager from "../dao/CartManager.js";
const router = Router();
const cartManager = new CartManager("./src/data/carts.json");

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cartUpdated = await cartManager.addProductToCart(cid, pid);
    res.status(200).json(cartUpdated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export { router };
