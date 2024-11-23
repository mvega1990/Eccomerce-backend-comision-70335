import { Router } from "express";
import { procesoErrores } from "../utils.js";

import { ProductMongoManager as productManager } from "../dao/ProductsMongoManager.js";
import { isValidObjectId } from "mongoose";

export const router = Router();

router.get("/", async (req, res) => {
  let { page, limit, sort, category, inStock } = req.query;

  let sortOption = {};
  if (sort === "asc") {
    sortOption = { price: 1 };
  } else if (sort === "desc") {
    sortOption = { price: -1 };
  }

  try {
    let productos = await productManager.getProducts(
      page,
      limit,
      sortOption,
      category,
      inStock
    );

    const response = {
      status: "success",
      payload: productos.docs,
      totalPages: productos.totalPages,
      prevPage: productos.prevPage,
      nextPage: productos.nextPage,
      page: productos.page,
      hasPrevPage: productos.hasPrevPage,
      hasNextPage: productos.hasNextPage,
      prevLink: productos.hasPrevPage
        ? `/products?page=${productos.prevPage}`
        : null,
      nextLink: productos.hasNextPage
        ? `/products?page=${productos.nextPage}`
        : null,
    };

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    procesoErrores(res, error);
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  if (!isValidObjectId(id)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: `Indique un ID valido de MongoDB` });
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
    const newProduct = await productManager.addProduct({
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category,
    });
    const io = req.app.get("io");
    io.emit("newProduct", newProduct);

    res.setHeader("Content-Type", "application/json");
    return res.status(201).json({ newProduct });
  } catch (error) {
    procesoErrores(res, error);
  }
});

router.put("/:id", async (req, res) => {
  let { id } = req.params;

  if (!isValidObjectId(id)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: `Indique un ID valido de MongoDB` });
  }

  let { ...aModificar } = req.body;
  let cantProsModificar = Object.keys(aModificar).lenght;
  if (cantProsModificar === 0) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: "No se han ingresado propiedades" });
  }

  try {
    let productoModificado = await productManager.modificaProducto(
      id,
      aModificar
    );

    res.setHeader("Content-Type", "application/json");
    return res
      .status(200)
      .json({ message: "Producto modificado con éxito", productoModificado });
  } catch (error) {
    if (error.message.includes("not found")) {
      res.setHeader("Content-Type", "application/json");
      return res
        .status(404)
        .json({ error: `No se encontró producto con el id ${id}` });
    }

    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;

  if (!isValidObjectId) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: `El Id no es valido` });
  }

  try {
    let productoEliminado = await productManager.eliminaProducto(id);
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ productoEliminado });
  } catch (error) {
    procesoErrores(res, error);
  }

  const io = req.app.get("io");

  io.emit("deleteProduct", id);
  console.log(`Producto con ID ${id} eliminado y emitido a clientes`);

  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ productoEliminado });
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
