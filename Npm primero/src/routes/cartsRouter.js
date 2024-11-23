import { Router } from "express";

import { CartMongoManager as cartManager } from "../dao/CartMongoManager.js";
import { isValidObjectId } from "mongoose";
import { procesoErrores } from "../utils.js";
const router = Router();


router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/", async (req, res) => {
 
  try {
    const cart = await cartManager.getCarts();
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    return res.json(cart);
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


router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

 
  if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: "El ID no es válido" });
  }

  try {
   
    const productoEliminadoCarrito = await cartManager.eliminaProductoCarrito(cid, pid);

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ 
      carritoActualizado: productoEliminadoCarrito
    });
  } catch (error) {
    
    procesoErrores(res, error);
  }
});


router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const nuevosProductos = req.body;


  if (!isValidObjectId(cid)) {
    return res.status(400).json({ error: "Indique un ID válido de MongoDB" });
  }

  try {

    const carritoActualizado = await cartManager.actualizarProductosCarrito(cid, nuevosProductos);

    res.status(200).json({
      status: "success",
      carritoActualizado: carritoActualizado
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message
    });
  }
});
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;


  if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
    return res.status(400).json({ error: "Indique un ID válido de MongoDB" });
  }


  if (quantity <= 0) {
    return res.status(400).json({ error: "La cantidad debe ser mayor que 0" });
  }

  try {
   
    const carritoActualizado = await cartManager.actualizarCantidadProductoCarrito(cid, pid, quantity);

    res.status(200).json({
      carritoActualizado: carritoActualizado
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message
    });
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

 
  if (!isValidObjectId(cid)) {
    return res.status(400).json({ error: "El ID del carrito no es válido" });
  }

  try {
    
    const carritoVacio = await cartManager.eliminaTodosProductosDelCarrito(cid);

    res.status(200).json({
      carritoVacio,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});




export { router };
