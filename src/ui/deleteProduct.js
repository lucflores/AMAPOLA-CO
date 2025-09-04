import store from "../data/store.js";
import dom from "./domRefs.js";
import { renderProductos } from "./renderProducts.js";


export function populateDeleteSelect() {
const items = store.all();
dom.productDeleted.innerHTML = `<option selected>Seleccione producto a eliminar</option>` +
items.map((p, idx) => `<option value="${idx}">${p.nombre} color: ${p.descripcion}</option>`).join("");
}


export function bindDeleteModal() {
dom.btnEliminarNav.addEventListener("click", populateDeleteSelect);
dom.btnDeleted.addEventListener("click", () => {
const idx = dom.productDeleted.selectedIndex - 1;
if (idx < 0) return;
store.removeByIndex(idx);
populateDeleteSelect();
renderProductos(store.all());
});
}