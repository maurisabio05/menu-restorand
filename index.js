const readline = require("readline");

// Creamos un arreglo vacío para almacenar nuestras notas
let notas = [];

// Creamos una instancia de readline para leer la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const productos = [
  {
    nombre: "Hamburguesa simple",
    costo: 20,
    codigo: "H100",
  },
  {
    nombre: "Hamburguesa doble",
    costo: 30,
    codigo: "H200",
  },
  {
    nombre: "Papas fritas",
    costo: 8,
    codigo: "P100",
  },
  {
    nombre: "Refresco personal",
    costo: 6,
    codigo: "R100",
  },
];

const usuario = {
  nombre: "Beto",
  edad: 30,
  deuda: 0,
};

let pedido = [];
let costoPedido = 0;

// Lista todos los productos del menú en un formato amigable
function mostrarMenu() {
  console.clear();
  console.log(`CÓDIGO - NOMBRE PRODUCTO - COSTO`);
  for (let producto of productos) {
    console.log(`${producto.codigo} - ${producto.nombre} - $${producto.costo}`);
  }
  menú();
}
function pedirProducto() {
  console.clear();
  rl.question("que producto quieres pedir?", (cod) => {
    if (!cod) return;

    const productoEncontrado = productos.find(
      (producto) => producto.codigo === cod
    );
    if (!productoEncontrado) return "El producto no existe";

    pedido.push(productoEncontrado);
    console.log("El producto ha sido agregado a su pedido.");
    return menú();
  });
}

function verPedido() {
  console.clear();
  console.log(pedido);
  menú();
}

function calcularCosto() {
  console.clear();
  let costo = 0;
  for (producto of pedido) {
    costo += producto.costo;
  }
  costoPedido = costo;
  console.log(costoPedido);
  return menú();
}

function finalizarPedido() {
  console.clear();
  calcularCosto();
  usuario.deuda = costoPedido;

  pedido = [];
  costoPedido = 0;
  console.log(`${usuario.nombre}, debes pagar ${usuario.deuda} dólares.`);
  //return `${usuario.nombre}, debes pagar ${usuario.deuda} dólares.`;
  menú();
}

// Función que permite pagar todo un pedido y entrega cambio si es necesario.
function pagarPedido() {
  console.clear();
  rl.question("paga de una vez:$", (montoEntregado) => {
    if (2 > 1) {
      if (montoEntregado < usuario.deuda) {
        return `No te alcanza para pagar tu pedido.`;
      } else if (montoEntregado === usuario.deuda) {
        usuario.deuda = 0;
        return `Tu pedido ha sido pagado.`;
      } else {
        console.log(
          `Tu pedido ha sido pagado y tu cambio es de ${
            montoEntregado - usuario.deuda
          }.`
        );
        usuario.deuda = 0;
        return "Deuda pagada";
      }
    } else {
      return "Dato ingresado de forma erronea";
    }
  });
  menú();
}

function menú() {
  console.log("\nbienvenido");
  console.log("1.ver los productos");
  console.log("2.pedir");
  console.log("3.ver");
  console.log("4.calcular");
  console.log("5.finalizar");
  console.log("6.pagar");
  rl.question("que quieres hacer: ", (opcion) => {
    switch (opcion) {
      case "1":
        mostrarMenu();
        break;
      case "2":
        pedirProducto();
        break;
      case "3":
        verPedido();
        break;
      case "4":
        calcularCosto();
        break;
      case "5":
        finalizarPedido();
        break;
      case "6":
        pagarPedido();
        break;
      default:
        console.clear();
        console.log("dato incorrecto");
        menú();
    }
  });
}
menú();
