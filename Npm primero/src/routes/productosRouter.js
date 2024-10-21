import { Router } from "express";
import { procesoErrores } from "../utils.js";
import ProductManager from "../dao/ProductsManager.js"

const productManager = new ProductManager("./src/data/Productos.json")
export const router = Router()

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

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ productos: productosLimitados });
        
    } catch (error) {
        procesoErrores(res, error);
    }
});


router.get("/:id", async (req, res) => {
    let { id } = req.params;
    id = Number(id);

    console.log(`ID recibido: ${id}`); // Verificar el ID recibido
  
    if (isNaN(id)) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id debe ser numerico`})
    }

    try {
        let product = await productManager.getProductById(id);
        console.log(`Producto encontrado: ${JSON.stringify(product)}`); // Mostrar el producto encontrado
        if (!product) {
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({error:`no se encontro personaje con el id`})
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({product});;
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.post("/", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!title || !description || !code || price === undefined || status === undefined || stock === undefined) {
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`todos los campos son obligatorios`})
    }

    try {
        // Agregar el nuevo producto
        const newProduct = await productManager.addProduct(title, description, price, thumbnails, code, stock, status, category);

    res.setHeader('Content-Type','application/json');
    return res.status(201).json({newProduct});
    } catch (error) {
        procesoErrores(res, error)
    }
});


router.put('/:id',async (req,res)=>{
    let {id}=req.params
    id=Number(id)
    if(isNaN(id)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`el id debe ser numerico`})
    }
    let aModificar=req.body
    if(aModificar.id){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No se puede modificar el id`})
    }
    try {

        let product = await productManager.getProductById(id);
         
        if (!product) {
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({error:`no se encontro producto con el id`})
        }
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({product});;
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});
    


    router.delete("/:id", async(req, res)=>{
        let {id}=req.params
        id=Number(id)   
        if(isNaN(id)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El id debe ser numérico`})
        }

        try {
            let producto=await productManager.getProductById(id)
            if(!producto){
                res.setHeader('Content-Type','application/json');
                return res.status(404).json({error:`No existe producto con id ${id} en DB`})
            }
            let productoEliminado=await productManager.eliminaProducto(id)
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({personajeEliminado});
        } catch (error) {
            procesoErrores(res, error)
        }
    })

