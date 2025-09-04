import storage from "../services/storage.js";
import Producto from "../models/Product.js";


const KEY = "tienda";
let _tienda = [];


async function init() {
_tienda = storage.getJSON(KEY, []);
if (!_tienda || _tienda.length === 0) {
await cargarDesdeJSON();
}
}


async function cargarDesdeJSON() {
const resp = await fetch("./product.json");
const data = await resp.json();
_tienda = data.map(Producto.from);
save();
}


function all() { return [..._tienda]; }
function save() { storage.setJSON(KEY, _tienda); }


function add({ nombre, descripcion, precio, imagen = "logo.png" }) {
const maxId = _tienda.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
const nuevo = new Producto({ id: maxId + 1, nombre, descripcion, precio, cantidad: 1, imagen });
_tienda.push(nuevo);
save();
return nuevo;
}


function removeByIndex(index) {
_tienda.splice(index, 1);
save();
}


function findById(id) {
return _tienda.find(p => String(p.id) === String(id));
}


function searchByNombre(q) {
const s = q.trim().toLowerCase();
return _tienda.filter(p => p.nombre.toLowerCase().includes(s));
}


export default { init, all, add, removeByIndex, findById, searchByNombre };