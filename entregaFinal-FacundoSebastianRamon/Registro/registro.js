function guardarRegistro(event) {
  event.preventDefault();

  
  const registerForm = event.target;

  
  const nombre = registerForm.nombre.value;
  const apellido = registerForm.apellido.value;
  const usuario = registerForm.usuario.value;
  const email = registerForm.email.value;
  const contrasena = registerForm.contrasena.value;

  
  const request = window.indexedDB.open('registroDB', 1);

  request.onsuccess = function (event) {
    const db = event.target.result;
    console.log('Base de datos abierta o creada con éxito');

    
    const transaction = db.transaction('registro', 'readwrite');
    const objectStore = transaction.objectStore('registro');

    
    const getRequest = objectStore.get(usuario);

    getRequest.onsuccess = function (event) {
      const existingRegistro = event.target.result;
      if (existingRegistro) {
        console.log('El registro con la clave ya existe en IndexedDB');
        
      } else {
        
        const registro = {
          nombre,
          apellido,
          usuario,
          email,
          contrasena
        };

        
        const addRequest = objectStore.add(registro);

        addRequest.onsuccess = function (event) {
          
          Toastify({
            text: "Registro Exitoso 👍",
            duration: 3000,
            gravity: "top", 
            position: "right", 
            style: {
              background: "black",
            },
          }).showToast();
        }


        addRequest.onerror = function (event) {
          console.error('Error al guardar el registro en IndexedDB', event.target.error);
        };
      }
    };

    getRequest.onerror = function (event) {
      console.error('Error al obtener el registro en IndexedDB', event.target.error);
    };
  };

  request.onerror = function (event) {
    console.error('Error al abrir/crear la base de datos', event.target.error);
  };

  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('registro', { keyPath: 'usuario' });
    console.log('Estructura de la base de datos actualizada');
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  registerForm.addEventListener('submit', guardarRegistro);
});
