import store from "./data/store.js";
import dom from "./ui/domRefs.js";
import { renderProductos, actualizarBadge, bindAddToCart } from "./ui/renderProducts.js";
import { bindCarritoEvents, renderCarrito } from "./ui/renderCart.js";
import { bindSearch } from "./ui/search.js";
import { bindAddProduct } from "./ui/addProduct.js";
import { bindDeleteModal, populateDeleteSelect } from "./ui/deleteProduct.js";
import { bindFinalizePurchase } from "./ui/finalizePurchase.js";
import { initDarkMode } from "./theme/darkMode.js";


async function bootstrap() {
await store.init();
renderProductos(store.all());
actualizarBadge();
renderCarrito();


bindAddToCart();
bindCarritoEvents();
bindSearch(dom);
bindAddProduct();
bindDeleteModal();
bindFinalizePurchase();
initDarkMode(dom);
populateDeleteSelect();
}


bootstrap();