import storage from "../services/storage.js";


const KEY = "Carrito";
let _carrito = storage.getJSON(KEY, []);


function save() { storage.setJSON(KEY, _carrito); }
function entries() { return _carrito.map(item => ({ ...item })); }
function count() { return _carrito.length; }
function total() { return _carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0); }


function add(producto, cantidad = 1) {
const existing = _carrito.find(p => String(p.id) === String(producto.id));
if (existing) {
const next = existing.cantidad + cantidad;
if (next > 2) return { ok: false, reason: "MAX_2" };
existing.cantidad = next;
} else {
_carrito.push({ ...producto, cantidad: Math.min(2, cantidad) });
}
save();
return { ok: true };
}


function increase(index) {
const item = _carrito[index];
if (!item) return;
if (item.cantidad >= 2) return { ok: false, reason: "MAX_2" };
item.cantidad++;
save();
return { ok: true };
}


function decrease(index) {
const item = _carrito[index];
if (!item) return;
item.cantidad--;
if (item.cantidad <= 0) {
_carrito.splice(index, 1);
}
save();
return { ok: true };
}


function remove(index) {
_carrito.splice(index, 1);
save();
}


function clear() { _carrito = []; save(); }


export default { entries, count, total, add, increase, decrease, remove, clear, save };