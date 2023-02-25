# AMAPOLA-CO
sitio web con javaScript

La clase productos define la estructura de los objetos de producto con los campos id, nombre, descripción, precio, cantidad y imagen.

Los productos se cargan desde un archivo JSON usando fetch. Se crea un nuevo objeto de producto y se agrega al array tienda. En el array 
tienda se guarda en el almacenamiento local del navegador usando localStorage.

Se verifica si existe un array tienda guardado en el almacenamiento local del navegador, si es así, se carga desde localStorage. De lo contrario, 
se carga desde el archivo JSON usando la función de cargar().

Hay varias variables que hacen referencia a los elementos HTML, como los botones para eliminar, agregar y buscar productos, el div que muestra los productos
en el carrito y el div que muestra los productos disponibles.

Hay varias funciones que manejan la lógica del carrito de compras. La función AgregarProducto() agrega un producto al array carrito y guarda el
array en el almacenamiento local del navegador. La función actualizaCarrito() actualiza el número de productos en el carrito y muestra un botón para finalizar la compra.
La función refrescarProductos() refresca la lista de productos disponibles en el sitio.


------------------------------------------------------------------función de la tienda----------------------------------------------------------------------------
Este sitio web te permite administrar los productos de una tienda en línea. Puedes agregar nuevos productos a la lista, así como eliminar productos existentes. 
Además, puedes iniciar una compra seleccionando los productos que deseas agregar al carrito.

La función de agregar al carrito se ha mejorado para evitar agregar el mismo producto más de una vez en la misma compra. Sin embargo, si ya has agregado un producto
al carrito, puedes aumentar la cantidad de ese producto desde el carrito.

Finalmente, cuando estés listo para finalizar tu compra, puedes hacer clic en el botón de finalizar compra. Se mostrará una lista de los productos que has agregado
al carrito, junto con sus precios y la cantidad seleccionada. Además, se calculará el precio total de la compra.
