

exports.buscarTarjeta = (req, res) => {
    const idTarjeta = req.query.idTarjeta;

    // Busca la tarjeta por su ID en la base de datos
    Tarjeta.findById(idTarjeta)
        .then(tarjeta => {
            if (tarjeta) {
                res.render('configuracion', { tarjeta }); // Renderiza la vista con la tarjeta encontrada
            } else {
                res.render('configuracion', { error: 'Tarjeta no encontrada' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error al buscar tarjeta');
        });
};

exports.modificarTarjeta = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    // Modificar los parámetros de la tarjeta en la base de datos
    Tarjeta.update({ nombre, descripcion }, { where: { id } })
        .then(() => res.redirect('/configuracion'))
        .catch(err => {
            console.error(err);
            res.status(500).send('Error al modificar tarjeta');
        });
};