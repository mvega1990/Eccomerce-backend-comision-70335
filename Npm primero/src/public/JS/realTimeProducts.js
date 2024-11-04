
const socket = io();
const ulProductos = document.getElementById("lista-productos");

socket.on("newProduct", (product) => {
    let liproducto = document.createElement("li");
    liproducto.textContent = product.title;
    liproducto.id = `producto-${product.id}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = () => {
        console.log(`Intentando eliminar producto con ID: ${product.id}`);
        socket.emit("deleteProduct", product.id);
    };

    liproducto.appendChild(deleteButton);
    ulProductos.append(liproducto);
});


socket.on("deleteProduct", (id) => {
    console.log(`Producto con ID ${id} eliminado desde el servidor`); 
    const productoElement = document.getElementById(`producto-${id}`);
    if (productoElement) {
        productoElement.remove(); 
        console.log(`Producto con ID ${id} eliminado del DOM`); 
    } else {
        console.log(`No se encontró el elemento para el producto con ID ${id}`);
    }
});

const cargaDatos = async () => {
    let respuesta = await fetch("/api/products");
    let datos = await respuesta.json();
    console.log(datos);
    datos.productos.forEach((p) => {
        let liproducto = document.createElement("li");
        liproducto.textContent = p.title;
        liproducto.id = `producto-${p.id}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => {
            console.log(`Intentando eliminar producto con ID: ${p.id}`); 
            socket.emit("deleteProduct", p.id); 
        };

        liproducto.appendChild(deleteButton);
        ulProductos.append(liproducto);
    });
};

cargaDatos();

