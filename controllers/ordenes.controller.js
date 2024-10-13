const { request, response } = require("express")
const Ordenes = require("../models/ordenes.models")

exports.registrarOrden = async (request, response, next) =>{
    try{
        console.log(request.body);
        const Feedback = request.body.Feedback;
        const nivel_Satisfaccion = request.body.nivel_Satisfaccion;
        const Telefono = request.body.telefono;
        const id_Orden = Ordenes.crearID();
        const id_Establecimiento = request.session.id_Establecimiento;

        Ordenes.registrarOrden(id_Orden, nivel_Satisfaccion, Feedback, id_Establecimiento, Telefono);

        response.render("misClientes", { 
            notificationOrder: "Orden Registrada Correctamente", 
            type: "success" , 
            Telefono: Telefono,
        })
    }
    catch(err){
        console.log(err);
    }
}