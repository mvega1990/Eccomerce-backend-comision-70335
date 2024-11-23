/* import fs from "fs"; */

import { productsModel } from "./Models/ProductsModel.js";

export class ProductMongoManager {

  static async getProducts(page = 1, limit = 10, sort, category, inStock) {
    
    let filter = {};
  
    
    if (category) {
      filter.category = category;
    }
  
  
    if (inStock === "true") {
      filter.stock = { $gt: 0 }; 
    } else if (inStock === 'false') {
      filter.stock = { $lte: 0 }};
  
    
    return await productsModel.paginate(filter, {
      page,
      limit,
      sort,
      lean: true
    });
  }
  


  static async addProduct(producto={}) {
    
  let nuevoProduct=await productsModel.create(producto)
    return nuevoProduct.toJSON();
  }

  static async getProductById(id) {
    
   return await productsModel.findById(id)
  }

  static async modificaProducto(id, aModificar={}) {

    return productsModel.findByIdAndUpdate(id, aModificar, {new:true})
  }


    static async eliminaProducto(id) { 
  
      return await productsModel.findByIdAndDelete(id)
  }
  
}


