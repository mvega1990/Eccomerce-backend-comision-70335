import { Router } from "express";
import { procesoErrores } from "../utils.js";
import ProductManager from "../dao/ProductsManager.js";


const productManager = new ProductManager("./src/data/Productos.json");
export const router = Router();

router.get("/", async (req, res) => {
  try {
    let { limit } = req.query;
    let productos = await productManager.getProducts();

    if (!limit) {
      limit = productos.length;
    } else {
      limit = Number(limit);

      if (isNaN(limit)) {
        return res.status(400).send(`Error: el limit debe ser numérico`);
      }
    }

    let productosLimitados = productos.slice(0, limit);

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ productos: productosLimitados });
  } catch (error) {
    procesoErrores(res, error);
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);

  console.log(`ID recibido: ${id}`);

  if (isNaN(id)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: `el id debe ser numerico` });
  }

  try {
    let product = await productManager.getProductById(id);
    console.log(`Producto encontrado: ${JSON.stringify(product)}`);
    if (!product) {
      res.setHeader("Content-Type", "application/json");
      return res
        .status(404)
        .json({ error: `no se encontro personaje con el id` });
    }
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  if (
    !title /* ||
    !description ||
    !code ||
    price === undefined ||
    status === undefined ||
    stock === undefined */
  ) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: `titulo es obligatorio` });
  }

  try {
    const newProduct = await productManager.addProduct(
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category
    );
    const io = req.app.get("io");
    io.emit("newProduct", newProduct)

    res.setHeader("Content-Type", "application/json");
    return res.status(201).json({ newProduct });
  } catch (error) {
    procesoErrores(res, error);
  }
});


router.put("/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id);
  if (isNaN(id)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: "El id debe ser numérico" });
  }

  let modificaciones = req.body;
  if (modificaciones.id) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: "No se puede modificar el id" });
  }

  try {
    // Intentamos modificar el producto usando modificaProducto
    let productoModificado = await productManager.modificaProducto(id, modificaciones);

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ message: "Producto modificado con éxito", productoModificado });
  } catch (error) {
    if (error.message.includes('not found')) {
      res.setHeader("Content-Type", "application/json");
      return res.status(404).json({ error: `No se encontró producto con el id ${id}` });
    }

    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});


router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  id = Number(id); 
  console.log("ID recibido para eliminar:", id);

  if (isNaN(id)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: `El id debe ser numérico` });
  }

  try {
    let producto = await productManager.getProductById(id);
    if (!producto) {
      res.setHeader("Content-Type", "application/json");
      return res.status(404).json({ error: `No existe producto con id ${id} en DB` });
    }

  
    let productoEliminado = await productManager.eliminaProducto(id);
    
   
    const io = req.app.get("io");


    io.emit("deleteProduct", id); 
    console.log(`Producto con ID ${id} eliminado y emitido a clientes`);

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ productoEliminado });
  } catch (error) {
    procesoErrores(res, error);
  }
});


const setupDeleteListener = (io) => {
  io.on("connection", (socket) => {
    console.log("Cliente conectado");

    socket.on("deleteProduct", async (id) => {
      try {
        let producto = await productManager.getProductById(id);
        if (producto) {
          await productManager.eliminaProducto(id);
          io.emit("deleteProduct", id); 
          console.log(`Producto con ID ${id} eliminado mediante Socket.IO`);
        } else {
          console.log(`Producto con ID ${id} no encontrado`);
        }
      } catch (error) {
        console.error(`Error al eliminar producto con ID ${id}:`, error);
      }
    });
  });
};

export { setupDeleteListener };
