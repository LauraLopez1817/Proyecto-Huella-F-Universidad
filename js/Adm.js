let listaClientes = [];

const objCliente = {
    id: '',
    nombre: '',
    apellido: '',
    email:''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const emailInput = document.querySelector('#email');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || apellidoInput.value === '' || emailInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarCliente();
        editando = false;
    } else {
        objCliente.id = Date.now();
        objCliente.nombre = nombreInput.value;
        objCliente.apellido = apellidoInput.value;
        objCliente.email = emailInput.value;

        agregarCliente();
    }
}

function agregarCliente() {

    listaClientes.push({...objCliente});

    mostrarClientes();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objCliente.id = '';
    objCliente.nombre = '';
    objCliente.apellido = '';
    objCliente.email = '';
}

function mostrarClientes() {
    limpiarHTML();

    const divClientes = document.querySelector('.div-clientes');
    
    listaClientes.forEach(cliente => {
        const {id, nombre, apellido, email} = cliente;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${apellido} - ${email} - `;
        parrafo.dataset.id = id;
//Boton Editar//
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarCliente(cliente);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);
//Boton Borrar//
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarCliente(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divClientes.appendChild(parrafo);
        divClientes.appendChild(hr);
    });
}

function cargarcliente(cliente) {
    const {id, nombre, apellido, email} = cliente;

    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    emailInput.value = email;

    objCliente.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarCliente() {

    objCliente.nombre = nombreInput.value;
    objCliente.apellido = apellidoInput.value;
    objCliente.email = emailInput.value;

    listaClientes.map(cliente => {

        if(cliente.id === objCliente.id) {
            cliente.id = objCliente.id;
            cliente.nombre = objCliente.nombre;
            cliente.apellido = objCliente.apellido;
            cliente.email = objCliente.email;

        }

    });

    limpiarHTML();
    mostrarClientes();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarCliente(id) {

    listaClientes = listaClientes.filter(cliente => cliente.id !== id);

    limpiarHTML();
    mostrarClientes();
}

function limpiarHTML() {
    const divClientes = document.querySelector('.div-clientes');
    while(divClientes.firstChild) {
        divClientes.removeChild(divClientes.firstChild);
    }
}