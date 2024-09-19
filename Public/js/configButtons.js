function cambiarCampos(tipo) {
    // Ocultar todos los campos primero
    document.getElementById('tarjetaCampos').style.display = 'none';
    document.getElementById('etapaCampos').style.display = 'none';
    document.getElementById('sellosCampos').style.display = 'none';
    
    // Mostrar los campos correspondientes al tipo seleccionado
    document.getElementById(tipo + 'Campos').style.display = 'block';

    // Mostrar los botones circulares solo cuando se selecciona la sección "Etapa"
    if (tipo === 'etapa') {
        document.getElementById('botonesCirculares').style.display = 'flex';
    } else {
        document.getElementById('botonesCirculares').style.display = 'none';
    }
}


function aceptarCambios() {
    // Aquí puedes agregar la lógica para guardar los cambios realizados
    alert('Cambios aceptados');
}

function ingresarNuevosDatos() {
    // Aquí puedes agregar la lógica para limpiar los campos e ingresar nuevos datos
    document.querySelectorAll('.input').forEach(input => input.value = ''); // Limpiar campos
    alert('Listo para ingresar nuevos datos');
}
