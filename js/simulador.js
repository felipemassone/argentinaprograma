const CarritoRemeras = [
    {id: 1,nombre: 'Cool Haas Negra',precio: 1000,imagen: 'images/remera1.jpg' },
    {id: 2,nombre: 'Cool Haas Multicolor',precio: 1500,imagen: 'images/remera2.jpg'},
    {id: 3,nombre: 'Cool Haas Locals',precio: 1300,imagen: 'images/remera3.jpg'},
    {id: 4,nombre: 'Honolulu',precio: 1200,imagen: 'images/remera4.jpg'}
];

let carrito = [];
const moneda = '$';
const insertarItems = document.querySelector('#items');
const insertarCarrito = document.querySelector('#carrito');
const calculoTotal = document.querySelector('#total');
const insertarBoton = document.querySelector('#boton-vaciar');

// Function



function renderizarProductos() {
    CarritoRemeras.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${moneda}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        insertarItems.appendChild(miNodo);
    });
}

/** EVENTOS */


function anyadirProductoAlCarrito(evento) {
    
    carrito.push(evento.target.getAttribute('marcador'))
    
    renderizarCarrito();

}


function renderizarCarrito() {
    
    insertarCarrito.textContent = '';
    
    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {
      
        const miItem = CarritoRemeras.filter((itemCarritoRemeras) => {
           
            return itemCarritoRemeras.id === parseInt(item);
        });
        
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
           
            return itemId === item ? total += 1 : total;
        }, 0);
      
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${moneda}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        miNodo.appendChild(miBoton);
        insertarCarrito.appendChild(miNodo);
    });
 
    calculoTotal.textContent = calcularTotal();
}

/**
 * EventoS
 */
function borrarItemCarrito(evento) {

    const id = evento.target.dataset.item;
  
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
   
    renderizarCarrito();
}

/** CALCULAMOS EL TOTAL DEL CARRITO
 */
function calcularTotal() {
    
    return carrito.reduce((total, item) => {
        
        const miItem = CarritoRemeras.filter((itemCarritoRemeras) => {
            return itemCarritoRemeras.id === parseInt(item);
        });
        
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

function vaciarCarrito() {
   
    carrito = [];
    
    renderizarCarrito();
}

insertarBoton.addEventListener('click', vaciarCarrito);


renderizarProductos();
renderizarCarrito();
