const Etapa = require('../models/etapas.models');

exports.buscarEtapa = (req, res, next) => {
    const { id_Etapa } = req.params; // Obtener el id_Etapa de los parámetros

    // Agregar un console.log para verificar el id_Etapa
    console.log('Buscando etapa con ID:', id_Etapa);

    Etapa.buscarPorId(id_Etapa)
        .then(([rows]) => {
            if (rows.length === 0) {
                return res.status(404).send('Etapa no encontrada');
            }
            console.log('Etapa encontrada:', rows[0]); // Agregar un console.log para ver la etapa encontrada
            res.status(200).json(rows[0]); // Devolver la primera coincidencia
        })
        .catch(err => {
            console.log('Error buscando etapa:', err);
            res.status(500).send('Error al buscar etapa');
        });
};

// Modificar Etapa
exports.modificarEtapa = (req, res) => {
    const { id_Etapa, Cant_Sellos, Minimo_Compra, Descuento } = req.body;

    if (!id_Etapa || !Cant_Sellos || !Minimo_Compra || !Descuento) {
        console.log('Datos recibidos para modificar:', req.body);
        return res.status(400).send('Todos los campos son requeridos');
    }

    // Verificar que los datos están siendo recibidos correctamente
    console.log('Datos recibidos para modificar:', req.body);

    const nuevosDatos = {
        Cant_Sellos,
        Minimo_Compra,
        Descuento,
    };

    Etapa.modificarPorId(id_Etapa, nuevosDatos).then(()=>{

        return res.status(200).json({'mensaje':'OK'});
    }).catch(err => {
        console.log(err);
        return res.status(500).json({'mensaje':'Internal server error'});
    });


/*
    async function modificarEtapa() {
        if (!currentIdEtapa) {
            alert("ID de etapa no disponible. Asegúrate de buscar la etapa antes de modificarla.");
            return;
        }
    
        const Cant_Sellos = document.getElementById('cantidadSellos').value;
        const Minimo_Compra = document.getElementById('minimoCompra').value;
        const Descuento = document.getElementById('descuento').value;
    
        try {
            const response = await fetch(`/etapa/${currentIdEtapa}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Cant_Sellos,
                    Minimo_Compra,
                    Descuento
                })
            });
    
            if (response.ok) {
                alert("Etapa modificada con éxito");
            } else {
                alert("Error modificando la etapa");
            }
        } catch (error) {
            console.error('Error modificando la etapa:', error);
            alert('Error al modificar la etapa');
        }
    }    
        */
};
