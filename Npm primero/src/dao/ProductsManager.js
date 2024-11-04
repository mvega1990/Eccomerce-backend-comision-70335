import fs from "fs";

class ProductManager {
  #path = "";

  constructor(rutaArchivo) {
    this.#path = rutaArchivo;
  }

  async getProducts() {
    if (fs.existsSync(this.#path)) {
      try {
        const data = await fs.promises.readFile(this.#path, {
          encoding: "utf-8",
        });

       
        if (data.trim().length === 0) {
          return [];
        }

        return JSON.parse(data);
      } catch (error) {
        console.error(
          "Error al leer o parsear el archivo JSON:",
          error.message
        );
        return [];
      }
    } else {
      return [];
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (
      !title /* ||
      !description ||
      price === undefined ||
      !thumbnail ||
      !code ||
      stock === undefined */
    ) {
      console.log("Error: el titulo es obligatorio.");
      return;
    }

    let productos = await this.getProducts();

    
    let existe = productos.find((p) => p.code === code);
    if (existe) {
      console.log(`Error: Ya existe un producto con el código ${code}`);
      return;
    }


    let id =
      productos.length > 0 ? Math.max(...productos.map((d) => d.id)) + 1 : 1;

    let nuevoProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    productos.push(nuevoProduct);

    try {

      await fs.promises.writeFile(
        this.#path,
        JSON.stringify(productos, null, 5)
      );
    } catch (error) {
      console.error("Error al escribir en el archivo:", error.message);
    }

    return nuevoProduct;
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts(); 
      const product = products.find((p) => p.id === Number(id)); 
      if (!product) {
        console.log("Not found");
        return null;
      }
      return product;
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  async modificaProducto(id, modificaciones) {
    let productos = await this.getProducts();
    let indiceProducto = productos.findIndex((p) => p.id === Number(id)); 
    if (indiceProducto === -1) {
      throw new Error(`${id} not found`);
    }

  
    productos[indiceProducto] = {
      ...productos[indiceProducto],
      ...modificaciones,
      id: productos[indiceProducto].id, 
    };

 
    await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, 5));

    return productos[indiceProducto]; 
  }


    async eliminaProducto(id) { 
      let productos = await this.getProducts();
      let productoEliminado = productos.find((p) => p.id === id);
      if (!productoEliminado) {
          throw new Error(`No se encontró el producto con ID ${id}`);
      }
      productos = productos.filter((p) => p.id !== id);
      await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, 5));
      return productoEliminado; 
  }
  
}

export default ProductManager;
