import { Router } from 'express';
import { ProductMongoManager as productManager } from '../dao/ProductsMongoManager.js';
import { cartsModel } from '../dao/Models/CartsModel.js';
import { isValidObjectId } from 'mongoose';
export const router=Router()



router.get('/products', async (req, res) => {
    let { page, limit } = req.query;

    let { docs: productos, totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = await productManager.getProducts(page, limit);
    
    
    let cart = await cartsModel.findOne().lean(); 

    res.render("index", {
        productos,
        cart, 
        totalPages,
        hasNextPage, 
        hasPrevPage,
        prevPage, 
        nextPage
    });
});

router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
  
    try {
      
      if (!isValidObjectId(cid)) {
        return res.status(400).send('El ID del carrito no es válido.');
      }
  
    
      const cart = await cartsModel.findById(cid).populate('products.product').lean();
  
      if (!cart) {
        return res.status(404).send('Carrito no encontrado.');
      }
  
     
      res.render('cart', { cart });
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      res.status(500).send('Error interno del servidor.');
    }
  });
  

router.get('/realtimeproducts', async (req,res)=>{
    let productos= await productManager.getProducts()

    res.render("realTimeProducts", {
        productos
    })

   
})