export default class Producto {
constructor({ id, nombre, descripcion, precio, cantidad = 1, imagen = "logo.png" }) {
this.id = id;
this.nombre = nombre;
this.descripcion = descripcion;
this.precio = Number(precio);
this.cantidad = Number(cantidad) || 1;
this.imagen = imagen;
}
static from(raw) {
return new Producto(raw);
}
}