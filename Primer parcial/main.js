/* Ejercicio 1 _____________  0.5 puntos
Crea un array de objetos con 13 frutas. Cada objeto debe tener las siguientes claves:
- id
- nombre
- precio
- ruta de la imagen (correspondiente a la carpeta img).*/
/* Creo una lista de objetos que en este caso son frutas con su respectivo id, nombre, precio e imagen */
let listaFrutas = [
    {id:1, nombre:"arandano", precio:5000, img:"img/arandano.jpg"},
    {id:2, nombre:"banana", precio:1000, img:"img/banana.jpg"},
    {id:3, nombre:"frambuesa", precio:4000, img:"img/frambuesa.png"},
    {id:4, nombre:"frutilla", precio:3000, img:"img/frutilla.jpg"},
    {id:5, nombre:"kiwi", precio:2000, img:"img/kiwi.jpg"},
    {id:6, nombre:"mandarina", precio:800, img:"img/mandarina.jpg"},
    {id:7, nombre:"manzana", precio:1500, img:"img/manzana.jpg"},
    {id:8, nombre:"naranja", precio:9000, img:"img/naranja.jpg"},
    {id:9, nombre:"pera", precio:2500, img:"img/pera.jpg"},
    {id:10, nombre:"anana", precio:3000, img:"img/anana.jpg"},
    {id:11, nombre:"pomelo-amarillo", precio:2000, img:"img/pomelo-amarillo.jpg"},
    {id:12, nombre:"pomelo-rojo", precio:2000, img:"img/pomelo-rojo.jpg"}
];

/////////////////////////
// Variables globales //
let productoContainer = document.querySelector(".contenedor-productos");
let nombreAlumno = document.querySelector(".nombreAlumno");
let barraBusqueda = document.querySelector(".barra-busqueda");
let seccionCarrito = document.getElementById("items-carrito");
let cantidadProductos = document.getElementById("contador-carrito");
let precioTotal = document.getElementById("precio-total");
let ordenPrecio = document.getElementById("orden-precio");
let ordenAlfa = document.getElementById("orden-alfa");
let carrito = [];

/*### Ejercicio 2 _____________   0.5 puntos
Modifica la función inicializadora `init()` para incluir una función que imprima tu nombre  y apellido en el `<nav>` del HTML y también en la consola.
Pasos:
- Crea un objeto alumno con tus datos (dni, nombre, apellido).
- Usa backticks (``) para mostrar en consola un mensaje que incluya estos datos desde el objeto.
- Imprimí tu nombre y apellido en el `<nav>` y en la consola. 
- Todo esto debe ser parte de la funcion imprimirDatosAlumno()*/
/* Imprimo mis datos creando un objeto que tiene de atributos dni, nombre y apellido.
Luego imprimo por consola un mensaje con los atributos escritos y en la pagina inserto al nav mi nombre completo
usando inner.HTML*/
function imprimirDatosAlumno() {
    let alumno = {dni: 45303018, nombre:"Tobias Fabricio", apellido:"Escobar"};
    console.log(`Nombre del alumno: ${alumno.nombre} Apellido del alumno: ${alumno.apellido} DNI alumno: ${alumno.dni}`);
    
    console.log(`${alumno.nombre} ${alumno.apellido}`);
    nombreAlumno.innerHTML = `${alumno.nombre} ${alumno.apellido}`;
}

/*### Ejercicio 3 _____________   1 punto
Implementa una función que imprima en pantalla los productos (frutas) del array de objetos. Agrega esta función dentro de `init()`.

El HTML generado debe seguir esta estructura:
```html
    <div class="card-producto">
        <img src="" alt="">
        <h3></h3>
        <p>$</p>
        <button>Agregar al carrito</button>
    </div>
```*/
/* Muestra por pantalla, tomando a traves de un for clasico, los productos de la lista que se le pase por parametro
Se le va sumando a la variable cartaProducto un bloque HTML para cada producto y al final se insertan todos juntos*/
function mostrarProductos(array) {
    let cartaProducto = "";
    for (let i = 0; i < array.length; i++) {
        cartaProducto += `<div class="card-producto">
                        <img src="${array[i].img}" alt="imagen-producto" class="producto">
                        <h3>${array[i].nombre}</h3>
                        <p>$${array[i].precio}</p>
                        <button class="boton-carrito" onclick="agregarCarrito(${array[i].id})">Agregar al carrito</button> 
                    </div>`;
    }
    productoContainer.innerHTML = cartaProducto;
}

/*### Ejercicio 4 _____________   1 punto
Implementar una función de filtro, que se dispare al escribir en un campo input, filtrando los productos que coincidan con el campo de texto.*/
/* En este evento, cada vez que se escriba algo dentro de la barra de busqueda, toma los valores que se esten escribiendo y
a traves de un filter busca en la lista de frutas si lo que se esta escribiendo coincide (esta incluido) en el nombre de algun producto*/
barraBusqueda.addEventListener("keyup", function() {
    let valorInput = barraBusqueda.value.toLowerCase();
    console.log(valorInput);

    let productosFiltrados = listaFrutas.filter(producto => producto.nombre.toLowerCase().includes(valorInput));
    mostrarProductos(productosFiltrados);
});

/*### Ejercicio 5 _____________   2 puntos
1. Implementar la funcionalidad de carrito, esta debe estar asociada al boton de cada elemento del carrito. El carrito debe mostrarse por `console.log()`*/
/* Esta funcion recibe por parametro el id del producto y usa el metodo find() para encontrarlo dentro de la lista de frutas. Cuando lo encuentra,
agrega el producto que coincide su id a la lista carrito. Tambien esta funcion se encarga de invocar a las funciones para mostrar por pantalla el carrito
guardar en local el carrito y contar cuantos productos estan siendo agregados*/
function agregarCarrito(id) {
    console.log(`El id del producto es: ${id}`);
    let nuevoProducto = listaFrutas.find(producto => producto.id === id);
    console.log(nuevoProducto);
    
    console.log(carrito);
    carrito.push(nuevoProducto);

    contadorCarrito();
    guardarCarritoEnLocal();
    mostrarCarrito();
}

/*2. Incorporar la funcion `mostrarCarrito()` asociada al boton de cada elemento del carrito
    El HTML generado debe seguir esta estructura:
    ```html
        <li class="bloque-item">
            <p class="nombre-item">nombreProducto - precioProducto</p>
            <button class="boton-eliminar">Eliminar</button>
        </li>
    ```*/
/* Mantiene la logica de mostrarProductos() solo que no recibe una lista, sino que usa una lista global que fue declarada antes y usa
el forEach para hacer la inclusion de los productos en el carrito e insertarlos por pantalla mediante el innerHTML*/
    function mostrarCarrito() {
    let listaCarrito = "";
    carrito.forEach(function(item, indice){
        listaCarrito += `
                <li class="bloque-item">
                    <p class="nombre-item">${item.nombre} - $${item.precio}</p>
                    <button class="boton-eliminar" onclick="eliminarProducto(${indice})"> Eliminar</button>
                </li>`;
    });
    seccionCarrito.innerHTML = listaCarrito;
}

// 3. Incorporar la funcion `eliminarProducto()`. Este debe estar asociado al boton del carrito
/* Elimina mediante el metodo splice el producto que se eligio borrar tocando en el boton de eliminar en el carrito
Tambien, elimina el producto almacenado en el localStorage y en el caso que haya sido el ultimo en ser borrado, elimina
la key listaCarrito del localStorage*/
function eliminarProducto(indiceProducto) {
    carrito.splice(indiceProducto, 1);

    eliminarProductoLocalPorIndice(indiceProducto);
    if (carrito.length === 0) {
        localStorage.removeItem("listaCarrito");
    }
}


/*### Ejercicio 6 _____________   1 punto
- Almacena los productos del carrito en `localStorage`.
- Los productos en el localStorage deben estar además con los últimos cambios de carrito y los productos que se hayan eliminado del carrito
- Si existen productos previamente en el localStorage, deben poder verse cuando se cargue la pagina*/
/* Guarda en local el carrito en formato de string ya que el metodo setItem de localStorage solo puede guardar en ese formato.*/
function guardarCarritoEnLocal() {
    localStorage.setItem("listaCarrito", JSON.stringify(carrito));
}
/* Esta funcion se encarga de mostrar por pantalla los productos guardados en el carrito de manera local. Para eso los vuelve a transformar
en objetos usando el metodo JSON.parse y realiza una llamada a la funcion mostrarCarrito(). Si no hay productos guardados de manera local, deja un mensaje
en consola*/
function cargarCarritoDesdeLocal() {
    let carritoGuardado = localStorage.getItem("listaCarrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    } else {
        console.log("No hay carrito guardado en localStorage.");
    }
}

/* Elimina el producto que se haya elegido borrar de manera local recibiendo su indice. Para eso, transforma al producto en objeto nuevamente 
y verifica si el indice esta fuera de rango o es numero negativo. Si todo esta bien, borra el producto con splice, vuelve a cargar el carrito en consola
para actualizar el cambio y deja un mensaje en consola de confirmacion*/
function eliminarProductoLocalPorIndice(indice) {
    let carritoGuardado = localStorage.getItem("listaCarrito");

    if (carritoGuardado) {
        let carrito = JSON.parse(carritoGuardado);

        if (indice >= 0 && indice < carrito.length) {
            carrito.splice(indice, 1); 
            localStorage.setItem("listaCarrito", JSON.stringify(carrito));

            console.log(`Producto en índice ${indice} eliminado del localStorage.`);
        }
    }
    //Actualizo la pantalla
    mostrarCarrito();
}

/*### Ejercicio 7 _____________   1 punto
- Implementa un contador de números de productos del carrito. Si hay 0 productos se eliminan del carrito.
- Actualiza la cantidad de productos en el header en la parte de *Carrito: 0 productos*
- Actualiza el precio del valor total del carrito abajo de todo a la derecha (cuando haya productos en el carrito)*/
/* Esta funcion actualiza por pantalla tanto en el nav como en la seccion carrito, la cantidad y el precio total
de los productos. */
function contadorCarrito() {
    
    let actualizar = "";
    let precioFinal = 0;
    let mostrarPrecio = "";

    if (carrito.length == 0) {
        actualizar = "0";
        mostrarPrecio = "0";
    } else {
        for (let contador = 1; contador < carrito.length; contador++) {
        actualizar = `${contador}`;
        
            for (let i = 0; i < carrito.length; i++) {
                precioFinal += carrito[i].precio;
                mostrarPrecio = `$${precioFinal.toFixed(2)}`
            }
            precioTotal.textContent = mostrarPrecio;
            cantidadProductos.textContent = actualizar;
        }
    }
}


/*### Ejercicio 8 _____________   1 punto
- Crea dos botones en línea con el título de sección productos.
- Implementa la funcionalidad para ordenar los productos en estos dos botones. Un boton debe ordenar por nombre los productos y el otro por precio de menor a mayor*/
/* Este evento para el boton de ordenar de menor a mayor, hace una copia de la lista de frutas, para asi poder aplicarle el metodo .sort() que se va a encargar de ordenarlo
indicandole en este caso, con el precio buscando siempre el mas bajo. Finalmente, llama a mostrarProductos y le pasa como parametro la listaOrdenada*/
ordenPrecio.addEventListener("click", function() {
    let productosOrdenados = [...listaFrutas];

    productosOrdenados.sort((a, b) => a.precio - b.precio);
    
    mostrarProductos(productosOrdenados);
});

/* Este evento para el boton de ordenar alfabeticamente a/z, hace una copia de la lista de frutas, para asi poder aplicarle el metodo .sort() y tambien necesita del metodo
localeCompare para comparar los strings en orden alfabetico. Finalmente, le pasa como parametro la lista de productosOrdenados al metodo mostrarProductos() */
ordenAlfa.addEventListener("click", function() {
    let productosOrdenados = [...listaFrutas];

    productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));

    mostrarProductos(productosOrdenados);
})



/*### Ejercicio 9 _____________   0.5 puntos
- Implementa la funcionalidad para Vaciar carrito. Crea un botón en la sección carrito que vacíe todo el carrito.*/
/* Esta funcion elimina tanto de manera local como en pantalla, los productos guardados en el carrito mediante el uso del metodo .clear() y 
asignandole a carrito un lenght de 0. Finalmente, actualiza pantalla llamando a mostrarCarrito()*/
function eliminarTotalCarrito() {
    carrito.length = 0;
    localStorage.clear();
    mostrarCarrito();
}



function init() {
    mostrarProductos(listaFrutas);
    imprimirDatosAlumno();
    cargarCarritoDesdeLocal();
}
init();