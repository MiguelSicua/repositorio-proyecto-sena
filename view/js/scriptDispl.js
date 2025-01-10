// Función para cargar la información del usuario al cargar la página
window.onload = function() {
    document.getElementById('nombre').value = userData.nombre;
    document.getElementById('email').value = userData.email;
    document.getElementById('edad').value = userData.edad;
    document.getElementById('peso').value = userData.peso;
    document.getElementById('estatura').value = userData.estatura;
    document.getElementById('meta').value = userData.meta;
    document.getElementById('actividad').value = userData.actividad;
};

// Función para activar los campos de entrada para que sean editables
function editarInfo() {
    document.getElementById('nombre').readOnly = false;
    document.getElementById('email').readOnly = false;
    document.getElementById('edad').readOnly = false;
    document.getElementById('peso').readOnly = false;
    document.getElementById('estatura').readOnly = false;
    document.getElementById('meta').disabled = false;
    document.getElementById('actividad').disabled = false;

    document.getElementById('confirmarBtn').disabled = false; // Habilitar el botón de confirmar
    document.getElementById('editarBtn').disabled = true; // Deshabilitar el botón de editar
}

// Función para guardar la información editada y volver a bloquear los campos
function confirmarInfo() {
    userData.nombre = document.getElementById('nombre').value;
    userData.email = document.getElementById('email').value;
    userData.edad = document.getElementById('edad').value;
    userData.peso = document.getElementById('peso').value;
    userData.estatura = document.getElementById('estatura').value;
    userData.meta = document.getElementById('meta').value;
    userData.actividad = document.getElementById('actividad').value;

    // Volver a hacer los campos no editables
    document.getElementById('nombre').readOnly = true;
    document.getElementById('email').readOnly = true;
    document.getElementById('edad').readOnly = true;
    document.getElementById('peso').readOnly = true;
    document.getElementById('estatura').readOnly = true;
    document.getElementById('meta').disabled = true;
    document.getElementById('actividad').disabled = true;

    document.getElementById('confirmarBtn').disabled = true; // Deshabilitar el botón de confirmar
    document.getElementById('editarBtn').disabled = false; // Habilitar el botón de editar

    alert("Información actualizada correctamente");
}