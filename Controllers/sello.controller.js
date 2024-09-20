const db = require("C:\Users\gaelc\RewardsSystem\oscarv7_rewards.sql");

// Registra un sello
exports.registrarSello = (req,res) => {
    const {telefono} = req.body;


// Consulta para actualizar sellos
    //Query
    const query = "UPDATE usuarios SET sellos = sellos + 1 WHERE Telefono = ?";
    //Ingresa el query a la base de datos y manda error si no funciona
    db.query(query, [telefono], (err, result) => {
        if (err){
            return res.status(500).json({ error:" Error al registrar sello "});
        }
        console.log("Se ingreso correctamente");
    })
};