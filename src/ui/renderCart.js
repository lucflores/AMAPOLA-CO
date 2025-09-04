import cart from "../data/cart.js";
import dom from "./domRefs.js";


function rowTemplate(item, index) {
return `
<div class="carrito" data-index="${index}">
<div class="carrito-img">
<img class="card-img-top" width="100" src="./img/${item.imagen}" alt="${item.nombre}">
</div>
<div class="carrito-producto">
<h5>Producto: ${item.nombre}</h5>
<p>${item.descripcion}</p>
</div>
<div class="carrito-cantidad">
<div class="svg">
<button data-del><i class="fas fa-trash-alt"></i></button>
</div>
<div>
<button data-inc>+</button>
<input value="${item.cantidad}" type="text" min="1" readonly>
<button data-dec>-</button>
</div>
<h3>$${item.precio * item.cantidad}</h3>
</div>
</div>`;
}


export function renderCarrito() {
const items = cart.entries();
dom.productosEnCarrito.innerHTML = items.map(rowTemplate).join("");
dom.montoTotal.innerHTML = items.length
? `<h5>EL TOTAL DE LA COMPRA ES: $${cart.total()}</h5>`
: "No hay productos en el carrito";
}


export function bindCarritoEvents() {
dom.btnFinalizar.addEventListener("click", renderCarrito);
dom.productosEnCarrito.addEventListener("click", (e) => {
const row = e.target.closest(".carrito");
if (!row) return;
const index = Number(row.getAttribute("data-index"));
if (e.target.closest("[data-inc]")) {
cart.increase(index);
} else if (e.target.closest("[data-dec]")) {
cart.decrease(index);
} else if (e.target.closest("[data-del]")) {
cart.remove(index);
} else {
return;
}
renderCarrito();
});
}