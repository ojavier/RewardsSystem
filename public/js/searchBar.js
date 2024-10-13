let currentIdEtapa = null;

async function searchFunction() {
    const id_Etapa = document.getElementById('searchBar').value;

    // Si la barra de búsqueda está vacía, no hacer nada
    if (!id_Etapa) {
        document.getElementById('resultadoBusqueda').innerHTML = '';
        currentIdEtapa = null; // Resetear el valor si la barra está vacía
        return;
    }

    try {
        // Hacer una petición al servidor
        const response = await fetch(`/etapa/${id_Etapa}`);
        
        // Comprobar si la respuesta es correcta
        if (response.ok) {
            const etapa = await response.json();

            // Guardar el id de la etapa para futuras modificaciones
            currentIdEtapa = etapa.id_Etapa;

            // Mostrar los datos de la etapa en el HTML
            document.getElementById('resultadoBusqueda').innerHTML = `
                <article class="message">
                    <div class="message-header">
                        <p>ID de Etapa: ${etapa.id_Etapa}</p>
                    </div>
                    <div class="message-body">
                        <p>Cantidad de Sellos: ${etapa.Cant_Sellos}</p>
                        <p>Mínimo de Compra: ${etapa.Minimo_Compra}</p>
                        <p>Descuento: ${etapa.Descuento}</p>
                        <p>ID Producto: ${etapa.id_Producto}</p>
                    </div>
                </article>
            `;
        } else {
            // Si no se encontró la etapa, mostrar un mensaje
            document.getElementById('resultadoBusqueda').innerHTML = 'Etapa no encontrada';
            currentIdEtapa = null;
        }
    } catch (error) {
        console.error('Error buscando la etapa:', error);
        document.getElementById('resultadoBusqueda').innerHTML = 'Error al buscar la etapa';
        currentIdEtapa = null;
    }
}
