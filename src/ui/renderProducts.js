import store from "../data/store.js";
import cart from "../data/cart.js";
import dom from "./domRefs.js";
import { toastOk, toastError } from "./notifications.js";


function cardTemplate(p) {
return `
<div class="card">
<img src="./img/${p.imagen}" alt="${p.nombre}">
<div class="container_cards">
<p class="card-text">${p.nombre}</p>
<p class="card-text">$${p.precio}</p>
<div class="d-flex justify-content-between align-items-center">
<button data-add="${p.id}" type="button" class="btn btn-secondary">Agregar</button>
</div>
</div>
</div>`;
}


export function renderProductos(list) {
dom.cardPrendas.innerHTML = list.map(cardTemplate).join("");
}


function onAddClick(e) {
const btn = e.target.closest("[data-add]");
if (!btn) return;
const id = btn.getAttribute("data-add");
const p = store.findById(id);
if (!p) return;
const res = cart.add(p, 1);
if (!res.ok && res.reason === "MAX_2") {
toastError("No puedes agregar más de dos veces el mismo producto");
} else {
toastOk("El producto fue agregado correctamente");
actualizarBadge();
}
}


export function bindAddToCart() {
dom.cardPrendas.addEventListener("click", onAddClick);
}


export function actualizarBadge() {
dom.btnFinalizar.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
<path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
</svg>
Finalizar
${cart.count() ? `<div class="estadoCarrito"><p>(${cart.count()})</p></div>` : ""}
`;
}