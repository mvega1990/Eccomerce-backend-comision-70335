const spanIdCart = document.getElementById("idCart");

const agregarCarrito = async (idProducto) => {
    const idCart = spanIdCart.textContent.trim();

    if (!idCart) {
        alert("El carrito no está definido.");
        return;
    }

    console.log({ idProducto, idCart });

    try {
        const respuesta = await fetch(`/api/carts/${idCart}/product/${idProducto}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        if (!respuesta.ok) {
            const { error } = await respuesta.json();
            alert(error);
            return;
        }

        alert("Producto agregado al carrito.");
        window.location.reload();
    } catch (error) {
        console.error("Error al agregar producto:", error);
        alert("Hubo un problema al intentar agregar el producto al carrito.");
    }
};

