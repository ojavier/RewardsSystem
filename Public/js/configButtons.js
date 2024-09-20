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

let id_Etapa = null; // Inicialmente no tenemos un ID de etapa

// Función que busca la etapa y guarda su ID
function buscarEtapa() {
    const searchBar = document.getElementById('searchBar');
    if (!searchBar || !searchBar.value.trim()) {
        alert('Por favor ingresa un ID de etapa válido para buscar.');
        return;
    }
    
    id_Etapa = searchBar.value.trim();  // Asegúrate de eliminar espacios en blanco
    
    console.log('Etapa buscada con ID:', id_Etapa);  // Confirmación en consola
    alert(`Etapa con ID ${id_Etapa} ha sido buscada y almacenada.`);
}

async function aceptarCambios() {
    console.log('ID de etapa al intentar modificar:', id_Etapa);  // Asegura que el ID está disponible

    if (!id_Etapa) {
        alert('ID de etapa no disponible. Asegúrate de buscar la etapa antes de modificarla.');
        return;
    }

    const Cant_Sellos = document.querySelector('input[placeholder="Ingresa la cantidad de sellos"]').value;
    const Minimo_Compra = document.querySelector('input[placeholder="Ingresa el minimo de compra"]').value;
    const Descuento = document.querySelector('input[placeholder="Ingresa el descuento"]').value;

    if (!Cant_Sellos || !Minimo_Compra || !Descuento) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        const response = await fetch('/etapa/modificar', {
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
