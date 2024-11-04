import { Router } from 'express';
import ProductManager from '../dao/ProductsManager.js';
export const router=Router()

const productManager = new ProductManager("./src/data/Productos.json");

router.get('/products', async (req,res)=>{
    let productos= await productManager.getProducts()

    res.render("index", {
        productos
    })

   
})

router.get('/realtimeproducts', async (req,res)=>{
    let productos= await productManager.getProducts()

    res.render("realTimeProducts", {
        productos
    })

   
})