import { cartsModel } from "./Models/CartsModel.js";

import { isValidObjectId } from "mongoose";

export class CartMongoManager {

  static async getCarts() {
    return await cartsModel.find().populate("products.product").lean();
  }


    static async createCart() {
      try {
        
        const newCart = await cartsModel.create({
          products: [] 
        });
  
        return newCart;
      } catch (error) {
        console.error("Error al crear el carrito:", error);
        throw new Error("No se pudo crear el carrito");
      }
    }
  

 static async getCartById(id) {
    
    return await cartsModel.findById(id).populate("products.product")
  } 

    static async addProductToCart(cid, pid) {
      try {
        
        const cart = await cartsModel.findById(cid);
  
        if (!cart) {
          throw new Error("Carrito no encontrado");
        }
  
        
        const productIndex = cart.products.findIndex(
          (product) => product.product.toString() === pid.toString()
        );
  
        if (productIndex > -1) {
         
          cart.products[productIndex].quantity++;
        } else {
          
          cart.products.push({ product: pid, quantity: 1 });
        }
  
        
        const updatedCart = await cartsModel.findByIdAndUpdate(
          cid, 
          { products: cart.products }, 
          { new: true } 
        );
  
        return updatedCart;
      } catch (error) {
        console.error(error);
        throw new Error("Error al agregar producto al carrito");
      }
    }
  
  
  static async eliminaCarrito(cid){
    return  await cartsModel.findByIdAndDelete(cid)
  }


  static async eliminaProductoCarrito(cid, pid) {
    try {
      
      const cart = await cartsModel.findById(cid);
  
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
  
    
      const productIndex = cart.products.findIndex(product => product.product.toString() === pid);
  
      if (productIndex === -1) {
        throw new Error("Producto no encontrado en el carrito");
      }
  
     
      cart.products.splice(productIndex, 1);
  
      
      await cart.save();
  
      return cart; 
    } catch (error) {
      throw new Error(error.message);
    }
  }


    static async actualizarProductosCarrito(cid, productos) {
      try {
        
        const cart = await cartsModel.findById(cid);
        if (!cart) {
          throw new Error(`Carrito con ID ${cid} no encontrado`);
        }
  
       
        if (!Array.isArray(productos) || productos.length === 0) {
          throw new Error("El cuerpo de la solicitud debe contener un array de productos.");
        }
  
      
        for (let item of productos) {
          if (!item.product || !isValidObjectId(item.product)) {
            throw new Error(`El ID del producto ${item.product} no es válido`);
          }
          if (!item.quantity || item.quantity <= 0) {
            throw new Error(`La cantidad del producto ${item.product} no es válida`);
          }
        }
  
       
        cart.products = productos;
  
        
        await cart.save();
  
        return cart;
      } catch (error) {
        throw new Error(error.message);
      }
    }
    static async actualizarCantidadProductoCarrito(cid, pid, cantidad) {
      try {
    
        const cart = await cartsModel.findById(cid);
        if (!cart) {
          throw new Error(`Carrito con ID ${cid} no encontrado`);
        }
  
        
        const producto = cart.products.find(item => item.product.toString() === pid);
  
        if (!producto) {
          throw new Error(`Producto con ID ${pid} no encontrado en el carrito`);
        }
  
        
        if (cantidad <= 0) {
          throw new Error("La cantidad debe ser mayor que 0");
        }
  
       
        producto.quantity = cantidad;
  
       
        await cart.save();
  
        return cart;  
      } catch (error) {
        throw new Error(error.message);
      }
    }

    static async eliminaTodosProductosDelCarrito(cid) {
      try {
       
        const cart = await cartsModel.findById(cid);
    
        
        if (!cart) {
          throw new Error("Carrito no encontrado");
        }
    
        
        cart.products = [];
    
       
        await cart.save();
    
        return cart;  
      } catch (error) {
        throw new Error(error.message);
      }
    }
    
}




