function cambiarCampos(tipo) {
    // Ocultar todos los campos primero
    document.getElementById('tarjetaCampos').style.display = 'none';
    document.getElementById('etapaCampos').style.display = 'none';
    document.getElementById('sellosCampos').style.display = 'none';
    
    // Mostrar los campos correspondientes al tipo seleccionado
    document.getElementById(tipo + 'Campos').style.display = 'block';
}
