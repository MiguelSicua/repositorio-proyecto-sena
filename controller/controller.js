/**
 * Archivo con funciones de controlador
 */


let vista = new Vista();

let paciente = new Paciente();

let alimentos = new Alimentos();



window.onload = function () {
    mostrarInicio();
};


function mostrarInicio() {
    vista.displayTemplate("tem-login", "contenido");
}




function mostrarCrearCuenta() {
    vista.displayTemplate("tem-crea-cuenta", "contenido");
}

function crearPaciente() {
    // Leer y validar formulario
    let data = vista.getForm('registerForm');

    // Verificar si los datos son válidos
    if (data.ok) {
        
        // Verificar que todos los campos requeridos estén completos
        if (!data.name || !data.email || !data.password || !data.password1) {
            vista.mostrarMensaje(false, 'Todos los campos son obligatorios.');
            return;
        }

        // Contrastar las contraseñas
        if (data.password !== data.password1) {
            vista.mostrarMensaje(false, 'La contraseña es diferente');
            return;
        }

        // Validar el formato del correo electrónico (si es necesario)
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(data.email)) {
            vista.mostrarMensaje(false, 'El correo electrónico no tiene un formato válido');
            return;
        }

        // Si los datos son válidos, crear el paciente
        paciente.crearPaciente(data, function(response) {
            // Si la creación fue exitosa
            if (response.success) {
                vista.mostrarMensaje(true, 'Paciente creado con éxito');
                
                // Mostrar el login o redirigir a otra página
                vista.displayTemplate("tem-registro", "contenido");
            } else {
                // Si hubo un error al crear el paciente
                vista.mostrarMensaje(false, response.message || 'Error al crear el paciente');
            }
        });

    } else {
        // Si los datos no son válidos, mostrar un mensaje de error
        vista.mostrarMensaje(false, 'Formulario inválido');
    }
}


/** 
 * Validar los datos ingresados en el formulario de inicio de sesión 
 * en tablas clientes y empresas. 
 */ 

/**function ingresar() {
    let data = vista.getForm('loginForm'); // Obtener datos del formulario
    if (data.ok) { // Verificar que los datos sean válidos
        paciente.login(data, function (data) {
            if (data.success) {
                if (data.cant == 0) {
                    vista.mostrarMensaje(false, 'No hay datos en el login');
                    return;
                }

                // Obtener el token de la respuesta (esto depende de cómo lo devuelve tu API)
                let token = data.token; // Supongo que el token está en data.token

                // Almacenar el token en localStorage
                localStorage.setItem('authToken', token);

                let dataPaciente = data.data.Id;
                paciente.setData(dataPaciente)

                vista.displayTemplate("tem-pagina-inicio", "contenedor")
                
            } else { 
                vista.mostrarMensaje(false, 'Error al realizar la consulta en la base de datos'); 
            } 
        }); 
    } 
}*/

function ingresar() {
    let formData = vista.getForm('loginForm'); // Obtener datos del formulario
    if (formData.ok) { // Verificar que los datos del formulario sean válidos
        paciente.login(formData, function (response) { // Realizar la solicitud de login al servidor
            if (response.success) {
                // Validar que se obtuvo un token y datos del paciente
                if (!response.data || !response.data.token) {
                    vista.mostrarMensaje(false, 'No se recibió un token del servidor.');
                    return;
                }

                // Almacenar el token en localStorage
                localStorage.setItem('authToken', response.data.token);

                // Actualizar datos del paciente
                let dataPaciente = {
                    id_paciente: response.data.id,
                    name: response.data.name
                };
                paciente.setData(dataPaciente);

                // Redirigir o mostrar el contenido autorizado
                vista.displayTemplate("tem-pagina-inicio", "contenedor");
            } else {
                // Mostrar mensaje de error si las credenciales son incorrectas
                vista.mostrarMensaje(false, response.message || 'Error en las credenciales de inicio de sesión.');
            }
        });
    } else {
        // Mostrar mensaje de error si los datos del formulario no son válidos
        vista.mostrarMensaje(false, 'Por favor, completa correctamente los campos del formulario.');
    }
}




function confirmar() {
    // Obtener los datos del formulario
    let data = vista.getForm('datosForm'); // Suponiendo que el formulario tiene el id 'datosForm'

    // Verificar si los datos son válidos
    if (data.ok) {
        // Validar que todos los campos estén completos
        if (!data.age || !data.weight || !data.height || !data.sex || !data.goal || !data.physicalFreq) {
            vista.mostrarMensaje(false, 'Todos los campos son obligatorios.');
            return;
        }

        // Validar que los datos numéricos tengan el formato adecuado
        if (isNaN(data.age) || isNaN(data.weight) || isNaN(data.height)) {
            vista.mostrarMensaje(false, 'Edad, peso y altura deben ser números válidos.');
            return;
        }

        // Validar que la edad, el peso y la altura sean valores positivos
        if (data.age <= 0 || data.weight <= 0 || data.height <= 0) {
            vista.mostrarMensaje(false, 'La edad, el peso y la altura deben ser mayores a cero.');
            return;
        }

        // Recuperar el correo del paciente desde el almacenamiento local
        const email = localStorage.getItem('email');

        if (!email) {
            vista.mostrarMensaje(false, 'No se encontró el correo del paciente. Por favor, inicie sesión nuevamente.');
            return;
        }

        // Preparar los datos para enviar al servidor
        const patientData = {
            email: email, // Usar el correo del paciente desde el almacenamiento local
            age: data.age,
            weight: data.weight,
            height: data.height,
            sex: data.sex,
            goal: data.goal,
            physicalFreq: data.physicalFreq,
        };

        // Llamar al servidor para actualizar la información del paciente
        paciente.addInfo(patientData, function(response) {
            // Si la actualización fue exitosa
            if (response.success) {
                vista.mostrarMensaje(true, 'Información actualizada con éxito');
                vista.displayTemplate("tem-dieta-personalizada", "contenedor");
            } else {
                // Si hubo un error en la actualización
                vista.mostrarMensaje(false, response.message || 'Error al actualizar la información');
            }
        });
    } else {
        // Si los datos no son válidos
        vista.mostrarMensaje(false, 'Formulario inválido');
    }
}




/**function buscarAlimento() {
    let data = vista.getForm('alimForm');
    if (data.ok) {
        alimentos.consultarAlimento(data, function(data) {
            if (data.success) {
                let dataAlimentos = data.data.id_alimento;
                alimentos.setData(dataAlimentos)
                
            }
        })
    }
}*/


function buscarAlimento() {
    // Obtener el nombre del alimento
    const foodName = document.getElementById('food-name').value.trim();
    const nutritionInfoDiv = document.getElementById('nutrition-info');

    if (!foodName) {
        alert('Por favor, ingrese el nombre del alimento.');
        return;
    }

    alimentos.consultarAlimento({ nameAlimento: foodName }, function(response) {
        // Limpiar el contenedor antes de insertar nueva información
        nutritionInfoDiv.innerHTML = '';

        if (response.success) {
            const data = response.data;


                // Mapea los datos con etiquetas descriptivas
                const nutritionData = {

                    "Cantidad por Porción": data.cantidadPorcion,
                    "Proteínas": data.proteinas,
                    "Gramos Proteínas": data.gmgP,
                    "Carbohidratos": data.carbohidratos,
                    "Gramos Carbohidratos": data.gmgCar,
                    "Grasas": data.grasas,
                    "Gramos Grasas": data.gmgGra,
                    "Calorías": data.calorias,
                    "Glucosa": data.glucosa,
                    "Gramos Glucosa": data.gmgGlu,
                    "Sodio": data.sodio,
                    "Gramos Sodio": data.gmgSod
                };
                
            // Insertar información de manera dinámica
            const title = document.createElement('h2');
            title.textContent = 'Información Nutricional';
            nutritionInfoDiv.appendChild(title);
            
            for (const [label, value] of Object.entries(nutritionData)) {
                const p = document.createElement('p');
                p.textContent = `${label}: ${value !== undefined && value !== null ? value : 'No disponible'}`;
                nutritionInfoDiv.appendChild(p);
            }
            return data
        } else {
            nutritionInfoDiv.innerHTML = '<p>Alimento no encontrado.</p>';
        }
    });
}




// Función para enviar el nombre del alimento a la dieta
function enviarAlimentoADieta() {
    // Obtener el nombre del alimento del input
    const foodName = document.getElementById('food-name').value.trim();
    if (!foodName) {
        alert('Por favor, ingrese el nombre del alimento.');
        return;
    }

    // Llamada a la función de agregar alimento
    alimentos.addAlimento({ nameAlimento: foodName }, function(response) {
        if (response.success) {
            // Obtener el contenedor de la dieta donde se mostrará el alimento
            const dietaDiv = document.getElementById('diet-box');
            
            // Crear un nuevo elemento de lista para agregar el alimento
            const alimentoItem = document.createElement('li');
            alimentoItem.textContent = foodName;
            
            // Agregar el nuevo elemento a la lista de la dieta
            dietaDiv.appendChild(alimentoItem);

            alert('Alimento agregado con éxito.');
        } else {
            alert('Error al agregar el alimento: ' + (response.message || 'Intente nuevamente.'));
        }
    });
}







/**
 * Mostrar el menú principal para pacientes autenticados.
 */

function irMenu(){
    vista.displayTemplate("tem-pagina-inicio", "contenedor")
}



function mostrarCorreoRecuperacion() {
    vista.displayTemplate("tem-correo-rec", "contenido"); 
}


function mostrarRecuperarContrasena() {
    vista.displayTemplate("tem-recuperar-contrasena", "contenido"); 
}



function mostrarPerfil() {
    vista.displayTemplate("tem-perfil", "contenedor"); 
}


function mostrarPaginaInicio() {
    vista.displayTemplate("tem-pagina-inicio", "contenedor"); 
}

// Función para mostrar el template de "Mi Dieta"
function mostrarDietaPersonalizada() {
    vista.displayTemplate("tem-dieta-personalizada", "contenedor");
}

// Función para mostrar el template de "Ingresar Alimento"
function mostrarAnalisisComida() {
    vista.displayTemplate("tem-analisis-comida", "contenedor");
}

function agregarAlimentoADieta() {
    vista.displayTemplate("tem-dieta-personalizada", "contenedor");
}




/**function confirmar() {
    // Leer datos del formulario de datos de usuario
    let data = vista.getForm("datosForm");

    if (data.ok) {
        // Aquí   lógica para validar y guardar los datos ingresados
        console.log("Datos registrados correctamente:", data.data);

        vista.displayTemplate("tem-dieta-personalizada", "contenedor");
    } else {
        console.error("Error: Datos inválidos o incompletos en el registro.");
    }
}*/