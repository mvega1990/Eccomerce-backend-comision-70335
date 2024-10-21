import fs from 'fs';

class CartManager {
    #path = "";

    constructor(rutaArchivo) {
        this.#path = rutaArchivo;
    }

    async getCarts() {
        if (fs.existsSync(this.#path)) {
            const data = await fs.promises.readFile(this.#path, 'utf-8');
            return JSON.parse(data || '[]');
        }
        return [];
    }

    async createCart() {
        const carts = await this.getCarts();
        const id = carts.length > 0 ? Math.max(...carts.map(cart => cart.id)) + 1 : 1;
        const newCart = { id, products: [] };
        carts.push(newCart);
        await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === Number(id));
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex(cart => cart.id === Number(cid));

        if (cartIndex === -1) {
            throw new Error('Carrito no encontrado');
        }

        const productIndex = carts[cartIndex].products.findIndex(product => product.product === Number(pid));
        
        if (productIndex > -1) {
            
            carts[cartIndex].products[productIndex].quantity++;
        } else {
            
            carts[cartIndex].products.push({ product: Number(pid), quantity: 1 });
        }

        await fs.promises.writeFile(this.#path, JSON.stringify(carts, null, 2));
        return carts[cartIndex];
    }
}

export default CartManager;