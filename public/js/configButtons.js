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

let id_Etapa = null; // Mantén esto como variable global

function buscarEtapa() {
    console.log(id_Etapa)
    const searchBar = document.getElementById('searchBar');
    if (!searchBar || !searchBar.value.trim()) {
        alert('Por favor ingresa un ID de etapa válido para buscar.');
        return;
    }

    id_Etapa = searchBar.value.trim();  // Guarda el valor de id_Etapa globalmente

    console.log('Etapa buscada con ID:', id_Etapa);  // Confirmación en consola
    alert(`Etapa con ID ${id_Etapa} ha sido buscada y almacenada.`);
}

async function aceptarCambios() {
    id_Etapa = searchBar.value.trim(); 
    console.log(id_Etapa);
    if (!id_Etapa) {
        alert('ID de etapa no disponible. Asegúrate de buscar la etapa antes de modificarla.');
        return;
    }

    const Cant_Sellos = document.getElementById('cantidadSellos').value;
    const Minimo_Compra = document.getElementById('minimoCompra').value;
    const Descuento = document.getElementById('descuento').value;
    

    if (!Cant_Sellos || !Minimo_Compra || !Descuento) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    console.log('Datos a enviar:', {
        id_Etapa,
        Cant_Sellos,
        Minimo_Compra,
        Descuento
    });

    try {
        const response = await fetch('${process.env.PATH_SERVER}/etapa/modificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_Etapa,
                Cant_Sellos,
                Minimo_Compra,
                Descuento
            }),
        });

        if (response.ok) {
            alert('Cambios aceptados');
        } else {
            const errorText = await response.text();
            console.error('Error en el servidor:', errorText);
            alert(`Error al aceptar cambios: ${errorText}`);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert(`Error en la solicitud: ${error.message}`);
    }
}

function ingresarNuevosDatos() {
    alert('Listo para ingresar nuevos datos');
}
