import store from "../data/store.js";
import { renderProductos } from "./renderProducts.js";


export function bindSearch(dom) {
dom.btnSearch.addEventListener("click", (event) => {
event.preventDefault();
const q = dom.search.value.trim();
if (!q) {
renderProductos(store.all());
return;
}
const results = store.searchByNombre(q);
if (results.length === 0) {
Swal.fire("El producto no está disponible");
} else {
renderProductos(results);
}
dom.search.value = "";
});
}