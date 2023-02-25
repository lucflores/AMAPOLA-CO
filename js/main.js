class productos {
  constructor(id, nombre, descripcion, precio, cantidad, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = cantidad;
    this.imagen = imagen;
  }
}

let carrito = JSON.parse(localStorage.getItem("Carrito")) || [];
let tienda = JSON.parse(localStorage.getItem("tienda")) || [];

const cargar = async () => {
  const resp = await fetch("../product.json");
  const data = await resp.json();

  for (let producto of data) {
    let productNew = new productos(
      producto.id,
      producto.nombre,
      producto.descripcion,
      producto.precio,
      producto.cantidad,
      producto.imagen,
    );
    tienda.push(productNew);
  }
  localStorage.setItem("tienda", JSON.stringify(tienda));
  refrescarProductos(tienda);
};
if (localStorage.getItem("tienda")) {
  tienda = JSON.parse(localStorage.getItem("tienda"));
} else {
  cargar();
}

// Eliminar productos
let deletedProduct = document.getElementById("modalEliminar");
let btnDeleted = document.getElementById("btnDeleted");
let btnEliminarNav = document.getElementById("btnEliminarNav");
let select = document.getElementById("productDeleted");
let alerta = document.getElementById("alert");
//Agregar producto desde card al sitio
let addProducto = document.getElementById("addProducModal");
let addDescrip = document.getElementById("addDescripModal");
let addPrecio = document.getElementById("addPriceModal");
let addBtnAgregar = document.getElementById("btnAgregModal");
//cards
let prendaDiv = document.getElementById("cardPrendas");
let btnFinalizar = document.getElementById("btnFinalizar");
//al agregar producto se puede ver en la ventana modal
let productosEnCarrito = document.getElementById("productosEnCarrito");
// Buscar producto
let productBuscado;
let newAlert = document.getElementById("newAlert");
let searchProduct = document.getElementById("search");
let btnBuscar = document.getElementById("btnSearch");
//Finalizar compra
let btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
let montoTotal = document.getElementById("montoTotal");

//Agregar productos desde array al carrito de compras
function AgregarProducto(array) {
  const productoExistente = carrito.find(producto => producto.id === array.id && producto.cantidad >= 2);

  if (productoExistente) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "No puedes agregar más de dos veces el mismo producto",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    const productoExistente = carrito.find(producto => producto.id === array.id);
    if (productoExistente) {
      productoExistente.cantidad += array.cantidad;
    } else {
      carrito.push(array);
    }
    actualizaCarrito(carrito);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "El producto fue agregado correctamente",
      showConfirmButton: false,
      timer: 1000,
    });
    localStorage.setItem("Carrito", JSON.stringify(carrito));
    agregarAlCarrito(carrito);
  }
}
//se encarga de actualizar el número de productos en el carrito y mostrar un botón para finalizar la compra.
function actualizaCarrito(array) {
  btnFinalizar.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
      class="bi bi-cart2" viewBox="0 0 16 16">
      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25
	  5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
  </svg>
  Finalizar`;
  let btnFin = document.createElement("div");
  btnFin.innerHTML = "";
  array.length == 0
    ? (btnFin.innerHTML = "")
    : (btnFin.innerHTML = `<div class="estadoCarrito"><p> (${array.length}) </p></div>`);
  btnFinalizar.appendChild(btnFin);
}
//cards
function refrescarProductos(producto) {
  prendaDiv.innerHTML = "";
  producto.forEach((producto) => {
    let nuevaPrenda = document.createElement("div");
    nuevaPrenda.innerHTML = `<div class="card">
		<img src="./img/${producto.imagen}">
		<div class="container_cards">
			<p class="card-text">${producto.nombre}</p>
			<p class="card-text">$${producto.precio}</p>
			<div class="d-flex justify-content-between align-items-center">
			<button id="btn${producto.id}" type="button" class="btn btn-secondary">
			Agregar</button>
			</div>
		</div>
	</div>`;
    prendaDiv.appendChild(nuevaPrenda);
    let btnAgCarrito = document.getElementById(`btn${producto.id}`);
    btnAgCarrito.addEventListener("click", () => {
      AgregarProducto(producto);
    });
  });
}
//al agregar producto se puede ver en la ventana modal
function agregarAlCarrito(producto) {
  productosEnCarrito.innerHTML = "";
  for (let i = 0; i < producto.length; i++) {
    let productoEnCarrito = producto[i];
    let imprCarrito = document.createElement("div");
    imprCarrito.innerHTML = `
		<!-- contenedor carrito -->
			<div class="carrito">
				<!-- imagen -->
				<div class="carrito-img">
					<img class="card-img-top" height="auto" width="100px" src="../img/${productoEnCarrito.imagen}">
				</div>
				<!-- producto -->
				<div class="carrito-producto">
					<h5>Producto: ${productoEnCarrito.nombre}</h5>
					<p>${productoEnCarrito.descripcion}</p>
				</div>
				<div class="carrito-cantidad">
					<!-- Botón eliminar -->
					<div class="svg">
						<button id="botonEliminar${productoEnCarrito.id}" onclick="eliminar(${i})">
							<i class="fas fa-trash-alt"></i>
						</button>
					</div>
					<!-- valores / cantidad -->
					<div>
						<button type="button" onclick="aumentar(${i})">+</button>
						<input value=${productoEnCarrito.cantidad} id="${i}" type="text" min="1">
						<button type="button" onclick="disminuir(${i})">-</button>
					</div>
					<!-- precio -->
					<h3>$${productoEnCarrito.precio * productoEnCarrito.cantidad}</h3>
				</div>
			</div>
		`;
    productosEnCarrito.appendChild(imprCarrito);
    totalCompra(carrito);
  }
}
btnFinalizar.addEventListener("click", () => {
  agregarAlCarrito(carrito);
});

function totalCompra(tot) {
  let total = tot.reduce(
    (cont, productoEnCarrito) =>
      cont + productoEnCarrito.precio * productoEnCarrito.cantidad,
    0
  );
  total == 0
    ? (montoTotal.innerHTML = `No hay productos en el carrito`)
    : (montoTotal.innerHTML = `<h5>EL TOTAL DE LA COMPRA ES: $${total}</h5>`);
}
function aumentar(valor) {
  carrito[valor].cantidad++;
  localStorage.setItem("Carrito", JSON.stringify(carrito));
  totalCompra(carrito);
  agregarAlCarrito(carrito);
}
function disminuir(valor) {
  let cm = document.getElementById(valor).value;
  if (cm >= 2) {
    carrito[valor].cantidad--;
    localStorage.setItem("Carrito", JSON.stringify(carrito));
  } else {
    eliminar(carrito);
  }
  totalCompra(carrito);
  agregarAlCarrito(carrito);
}
//eliminar desde carrito
function eliminar(valor) {
  carrito.splice(valor, 1);
  localStorage.setItem("Carrito", JSON.stringify(carrito));
  totalCompra(carrito);
  agregarAlCarrito(carrito);
  actualizaCarrito(carrito);
}
//agregar productos a la tienda
function addPrenda(array) {
  //elimina espacios en blanco
  const nombreProducto = addProducto.value.trim();
  const descripcionProducto = addDescrip.value.trim();
  const precioProducto = addPrecio.value.trim();

  // Validar que el nombre del producto no tenga caracteres numéricos
  if (/^\D+$/.test(nombreProducto)) {
    // Validar que el precio sea un número
    if (isNaN(precioProducto)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El precio debe ser un numero!",
        timer: 3000,
      });
    } else {
      const productoNuevo = new productos(
        array.length + 1,
        nombreProducto,
        descripcionProducto,
        parseInt(precioProducto),
        1,
        "logo.png"
      );
      array.push(productoNuevo);
      localStorage.setItem("tienda", JSON.stringify(tienda));
      imprimirSelector(tienda);

      // resetear input luego de agregar
      addProducto.value = "";
      addDescrip.value = "";
      addPrecio.value = "";
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El precio debe ser un numero!",
      timer: 3000,
    });
  }
}
addBtnAgregar.onclick = () => {
  addPrenda(tienda);
  refrescarProductos(tienda);
};
function imprimirSelector(array) {
  select.innerHTML = ""; // Borra todas las opciones existentes en el selector
  array.forEach((produc, index) => {
    let selector = document.createElement("option");
    selector.innerHTML = `
	  <option value="${index}">${produc.nombre} color: ${produc.descripcion}</option>`;
    select.appendChild(selector);
  });
}
btnEliminarNav.onclick = () =>{
  imprimirSelector(tienda)
}
btnDeleted.onclick = () => {
  let opcion = select.selectedIndex;
  tienda.splice(opcion, 1);
  imprimirSelector(tienda);
  select.selectedIndex = 0; // Selecciona la primera opción del selector
  localStorage.setItem("tienda", JSON.stringify(tienda));
  refrescarProductos(tienda);
};
// Buscar producto
function buscarProducto(e, array) {
  e.preventDefault();
  newAlert.innerHTML = "";
  productBuscado = searchProduct.value;
  let busqueda = array.filter((item) =>
    item.nombre.toLowerCase().includes(productBuscado.toLowerCase())
  );
  if (busqueda.length == 0) {
    let alerta = document.createElement("div");
    Swal.fire("El producto no esta disponible", {
      dangerMode: true,
    });
    newAlert.appendChild(alerta);
    searchProduct.value = "";
  } else {
    refrescarProductos(busqueda);
    searchProduct.value = "";
  }
  return buscarProducto;
}
btnBuscar.onclick = (event) => {
  try {
    buscarProducto(event, tienda);
  } catch (error) {
    console.error(error);
  }
};
//finalizar compra del carrito
function finalizarCompraCarrito() {
  if (carrito.length === 0) {
    Swal.fire({
      title: "El carrito de compras está vacío",
      icon: "error",
      text: `No hay productos para comprar`,
      timer: 3000,
      showConfirmButton: false,
    });
    return; // Salir de la función si el carrito está vacío
  }
  Swal.fire({
    title: "¿Desea finalizar la compra?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
    confirmButtonColor: "green",
    cancelButtonColor: "red",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Compra realizada con éxito",
        icon: "success",
        confirmButtonColor: "green",
        text: `Muchas gracias por su compra, vuelva prontos!!`,
        timer: 3000,
        showConfirmButton: false,
      });
      // Lógica para procesar la compra y vaciar el carrito
      localStorage.removeItem("Carrito");
      carrito = [];
      actualizaCarrito([]);
      productosEnCarrito.innerHTML =""
      montoTotal.innerHTML = `No hay productos en el carrito`
    } else {
      Swal.fire({
        title: "Compra no realizada",
        icon: "info",
        text: `Los productos siguen en el carrito`,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  });
}
btnFinalizarCompra.addEventListener("click", () => {
  finalizarCompraCarrito();
});

totalCompra(carrito);
refrescarProductos(tienda);
imprimirSelector(tienda);
actualizaCarrito(carrito);
