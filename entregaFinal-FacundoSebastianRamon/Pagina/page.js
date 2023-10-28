


document.addEventListener("DOMContentLoaded", function () {
  const inventario = document.getElementById("inventario");
  const filtros = document.getElementById("filtros");

  inventario.style.display = "none";
  filtros.style.display = "none";
})

let prendass;


function mostrarInventario() {
  let inventario = document.getElementById("inventario");
  let filtros = document.getElementById("filtros");

  
  fetch("./ropa.json")
    .then(response => response.json())
    .then(data => {
      prendas = data;
      if (inventario.style.display === "none") {
        inventario.style.display = "block";
        filtros.style.display = "block";
        mostrarPrendas(); 
      } else {
        inventario.style.display = "none";
        filtros.style.display = "none";
      }
      mostrarPrendas();
    })
    .catch(error => console.error(error));
}


function mostrarPrendas() {
  let marca = document.getElementById("marca").value;
  let calidad = parseInt(document.getElementById("calidad").value);
  let precio = parseInt(document.getElementById("precio").value);
  let error = document.getElementById('notfound')

  let prendList = document.getElementById("prendList");
  prendList.innerHTML = ""; 

  let resultadosEncontrados = false;

  prendas.forEach(function (auto) {
    if (
      (marca === "" || ropa.marca === marca) &&
      (isNaN(calidad) || ropa.calidad >= calidad) &&
      (isNaN(precio) || ropa.precio <= precio)
    ) {
      let prendItem = crearElementoAuto(auto); 
      prendList.appendChild(prendItem); 
      resultadosEncontrados = true;
    }
  });

  !resultadosEncontrados ? error.innerHTML = 'No se encontraron resultados' : error.innerHTML = ''
}




function abrirFormularioContacto(auto) {
  let nombreInput = document.getElementById('name');
  let correoInput = document.getElementById('email');
  let mensajeInput = document.getElementById('message');

  const nombre = nombreInput.value;
  const correo = correoInput.value;

  mensajeInput.value = `Estoy interesado(a) en la prenda ${auto.marca} ${auto.modelo} con valor de $${auto.precio}. Por favor, contáctenme con más información. Mi nombre es ${nombre} y mi correo es ${correo}.`;


    
    const formData = {
      nombre: nombreInput.value,
      correo: correoInput.value,
      mensaje: mensajeInput.value
    };
  
}





function crearElementoAuto(auto) {
  let prendItem = document.createElement("div");
  prendItem.className = "prend-item";

  let img = document.createElement("img");
  img.src = auto.imagen;
  img.alt = "Auto";
  prendItem.appendChild(img);

  agregarElemento(prendItem, "h3", auto.marca); 
  agregarElemento(prendItem, "p", "Modelo: " + auto.modelo);  
  agregarElemento(prendItem, "p", "calidad: " + auto.calidad); 
  agregarElemento(prendItem, "p", "Precio: $" + auto.precio); 

  let detallesLink = document.createElement("a");
  detallesLink.className = "btn";
  detallesLink.href = "";
  detallesLink.textContent = "Ver Detalles";
  prendItem.appendChild(detallesLink);

  detallesLink.addEventListener('click', function (event) {
    event.preventDefault(); 
    abrirFormularioContacto(auto);
    document.getElementById('contact-form').style.display = 'block'; 

    if (isContactFormOpen) {
      contactForm.style.display = 'none';
    } else {
      contactForm.style.display = 'block';
      confirmationMessage.style.display = 'none'; 
    }

    isContactFormOpen = !isContactFormOpen;
  });


  return prendItem; 
}




function agregarElemento(padre, tipoElemento, texto) {
  let elemento = document.createElement(tipoElemento);
  elemento.textContent = texto;
  padre.appendChild(elemento);
}


document.getElementById('logoutButton').addEventListener('click', function () {
  Toastify({
    text: "Vuelva Pronto",
    duration: 2000,
    gravity: "top", 
    position: "right", 
    style: {
      background: "black",
    },
  }).showToast();
  
  setTimeout(() => {
    window.location.href = '../Login/login.html';
  }, 3000);
})



let isContactFormOpen = false,
  contactLink = document.getElementById('contact'),
  contactForm = document.getElementById('contact-form'),
  confirmationMessage = document.getElementById('confirmation-message'),
  form = document.getElementById('form');


contactLink.addEventListener('click', function (e) {
  e.preventDefault();

  if (isContactFormOpen) {
    contactForm.style.display = 'none';
  } else {
    contactForm.style.display = 'block';
    confirmationMessage.style.display = 'none'; 
  }

  isContactFormOpen = !isContactFormOpen;
});



form.addEventListener('submit', function (e) {
  e.preventDefault();
  confirmationMessage.style.display = 'block';
  form.reset(); 
  isContactFormOpen = false;

  
  setTimeout(function () {
    contactForm.style.display = 'none';
  }, 1000);
});


