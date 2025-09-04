import cart from "../data/cart.js";
import dom from "./domRefs.js";
import { confirm } from "./notifications.js";
import { actualizarBadge } from "./renderProducts.js";
import { renderCarrito } from "./renderCart.js";

function hideFinalizeModal() {
  const el = dom.modalFinalizar;
  if (!el) return;
  const instance = window.bootstrap?.Modal.getInstance(el) || new window.bootstrap.Modal(el);
  instance.hide();
}

export function bindFinalizePurchase() {
  dom.btnFinalizarCompra.addEventListener("click", async () => {
    if (cart.count() === 0) {
      await Swal.fire({
        title: "El carrito de compras está vacío",
        icon: "error",
        text: "No hay productos para comprar",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    const res = await confirm("¿Desea finalizar la compra?", { icon: "question" });

    if (res.isConfirmed) {
      hideFinalizeModal();

      await Swal.fire({
        title: "Compra realizada con éxito",
        icon: "success",
        confirmButtonColor: "green",
        text: "Muchas gracias por su compra, vuelva pronto!!",
        timer: 3000,
        showConfirmButton: false,
      });

      cart.clear();
      actualizarBadge();
      renderCarrito();
    } else {
      await Swal.fire({
        title: "Compra no realizada",
        icon: "info",
        text: "Los productos siguen en el carrito",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  });
}
