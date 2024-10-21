import fs from "fs";

class ProductManager {
    #path = "";
    
    constructor(rutaArchivo) {
        this.#path = rutaArchivo;
    }

    async getProducts() {
        if (fs.existsSync(this.#path)) {
            try {
                const data = await fs.promises.readFile(this.#path, { encoding: "utf-8" });
                
                // Si el archivo está vacío, devuelve un array vacío
                if (data.trim().length === 0) {
                    return [];
                }
                
                return JSON.parse(data);
            } catch (error) {
                console.error("Error al leer o parsear el archivo JSON:", error.message);
                return [];
            }
        } else {
            return [];
        }
    }
    

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || price === undefined || !thumbnail || !code || stock === undefined) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }
    
        let productos = await this.getProducts();
        
        // Verifica si ya existe un producto con el mismo código
        let existe = productos.find(p => p.code === code);
        if (existe) {
            console.log(`Error: Ya existe un producto con el código ${code}`);
            return;
        }
    
        // Genera un nuevo ID basado en el mayor ID existente
        let id = productos.length > 0 ? Math.max(...productos.map(d => d.id)) + 1 : 1;
       
        let nuevoProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
    
        productos.push(nuevoProduct);
    
        try {
            // Guardar productos en el archivo
            await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, 5));
        } catch (error) {
            console.error("Error al escribir en el archivo:", error.message);
        }
    
        return nuevoProduct;
    }
    

    async getProductById(id) {
        try {
            const products = await this.getProducts();  // Reutilizamos getProducts()
            const product = products.find(p => p.id === Number(id)); // Busca el producto con el ID
            if (!product) {
                console.log("Not found");
                return null;
            }
            return product;
        }  catch (error) {
                   console.log(`Error: ${error.message}`)
                 }
    }

    async modificaPersonaje(id, modificaciones) {
        let productos = await this.getProducts();
        let indiceProducto = productos.findIndex(p => p.id === Number(id)); // Aseguramos que id sea numérico
        if (indiceProducto === -1) {
            throw new Error(`${id} not found`);
        }
    
        // Actualizamos el producto y mantenemos su ID sin cambios
        productos[indiceProducto] = {
            ...productos[indiceProducto],
            ...modificaciones,
            id: productos[indiceProducto].id // Aseguramos que el ID no se modifique
        };
    
        // Guardamos los productos actualizados en el archivo
        await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, 5));
    
        return productos[indiceProducto]; // Corregido el acceso al índice
    }

    async eliminaProducto(id){
        let productos=await this.getProducts()
        let productoEliminado=productos.filter(p=>p.id===id)
        productos=productos.filter(p=>p.id!==id)
        await fs.promises.writeFile(this.#path, JSON.stringify(productos, null, 5));
        return productoEliminado
    }}

export default ProductManager;
