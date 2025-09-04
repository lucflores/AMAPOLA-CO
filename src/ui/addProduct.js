import store from "../data/store.js";
import dom from "./domRefs.js";
import { renderProductos } from "./renderProducts.js";
import { toastError, toastOk } from "./notifications.js";


export function bindAddProduct() {
dom.btnAgregModal.addEventListener("click", () => {
const nombre = dom.addProducModal.value.trim();
const descripcion = dom.addDescripModal.value.trim();
const precio = dom.addPriceModal.value.trim();


if (!/^\D+$/.test(nombre)) {
toastError("El nombre no puede contener números");
return;
}
if (isNaN(precio)) {
toastError("El precio debe ser un número");
return;
}
store.add({ nombre, descripcion, precio: parseFloat(precio) });
toastOk("Producto agregado");
dom.addProducModal.value = "";
dom.addDescripModal.value = "";
dom.addPriceModal.value = "";
renderProductos(store.all());
});
}