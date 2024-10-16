const { response, request } = require('express');
const Usuario = require('../models/usuario.models');
const Establecimiento = require('../models/establecimientos.models');
const isAuth = require('../Util/is-auth');
const { v4: uuidv4 } = require('uuid');

// Método para manejar el GET de inicio de sesión
exports.getLogin = (req, res, next) => {
    const error = req.session.error || null;
    const isLoggedIn = req.session.isLoggedIn || false;

    if (!isLoggedIn) {
        return res.render('login', {
            pagePrimaryTitle: 'Sistema de recompensas',
            isLoggedIn,
            permisos: req.session.permisos || [],
            usuario: req.session.usuario || {},
            error,
            establecimientos: [],
        });
    }

    // Redirigir según los permisos
    if (req.session.permisos === 1) {
        return res.redirect(`${process.env.PATH_SERVER}misVersiones`); // Administrador
    } else if (req.session.permisos === 2) {
        return res.redirect(`${process.env.PATH_SERVER}misTarjetas`); // Gerente
    } else {
        return res.redirect(`${process.env.PATH_SERVER}misTarjetas`); // Cliente u otros roles
    }
};

// Método para manejar el POST de inicio de sesión
exports.postLogin = (req, res, next) => {
    const { telefono } = req.body;

    console.log('Iniciando sesión con teléfono:', telefono);
    req.session.error = null;

    Usuario.buscarPorTelefono(telefono)
        .then(([rows]) => {
            console.log('Resultado de la búsqueda:', rows);

            if (rows.length > 0) {
                req.session.isLoggedIn = true;
                req.session.usuario = rows[0];
                console.log('Usuario encontrado, buscando rol');

                // Obtener el rol del usuario
                return Usuario.buscarRolPorId(rows[0].id_Usuario)
                    .then(([rolRows]) => {
                        if (rolRows.length > 0) {
                            req.session.permisos = rolRows[0].id_Rol; // Almacena el id del rol en la sesión
                            console.log('Rol encontrado:', rolRows[0].id_Rol);
                        } else {
                            req.session.permisos = []; // Si no hay rol, asigna un array vacío
                        }

                        return Establecimiento.buscarEstablecimientos(telefono)
                            .then(([establecimientos]) => {
                                req.session.establecimientos = establecimientos;
                                req.session.establecimiento_id = establecimientos[0]?.id || ''; // Evitar error si no hay establecimientos

                                return res.redirect(`${process.env.PATH_SERVER}misTarjetas`); // Cambia a misTarjetas
                            })
                            .catch((err) => {
                                console.error('Error al buscar establecimientos:', err);
                                return res.status(500).send('Error al buscar establecimientos');
                            });
                    });
            }

            req.session.error = 'Número de teléfono no encontrado';
            console.log('Usuario no encontrado, redirigiendo a login');
            return res.redirect(`${process.env.PATH_SERVER}usuario/login`);
        })
        .catch((err) => {
            console.error('Error al buscar el usuario:', err);
            req.session.error = 'Error interno del servidor';
            return res.redirect(`${process.env.PATH_SERVER}usuario/login`);
        });
};

// Método para modificar usuario
exports.modificarUsuario = (req, res, next) => {
  const { id_Usuario, Nombre, Apellido, Telefono, id_Rol } = req.body;

  // Verificar si el usuario actual tiene permisos de administrador o gerente
  if (req.session.usuario.id_Rol !== 1 && req.session.usuario.id_Rol !== 2) {
      console.log('El usuario no tiene permisos para modificar el rol');
      
      // Si no tiene permisos, permitimos sólo la actualización de información personal
      const nuevosDatos = { id_Usuario, Nombre, Apellido, Telefono };

      return Usuario.modificarUsuario(nuevosDatos)
          .then(() => {
              req.session.mensaje = 'Información actualizada con éxito'; // Guardar mensaje en la sesión
              return res.redirect(`${process.env.PATH_SERVER}miInformacion`); // Redirigir a /miInformacion
          })
          .catch(err => {
              console.log(err);
              return res.status(500).send('Error al actualizar la información');
          });
  }

  // Si tiene permisos, permitir la actualización de todos los campos, incluido el rol
  const nuevosDatos = { id_Usuario, Nombre, Apellido, Telefono };

  // También se puede actualizar el rol si tienes permisos
  Usuario.modificarUsuario(nuevosDatos)
      .then(() => {
          if (id_Rol) {
              return Usuario.modificarRol(id_Usuario, id_Rol);
          }
          return Promise.resolve(); // Resuelve la promesa si no hay cambio de rol
      })
      .then(() => {
          req.session.mensaje = 'Usuario actualizado con éxito'; // Guardar mensaje en la sesión
          return res.redirect(`${process.env.PATH_SERVER}miInformacion`); // Redirigir a /miInformacion
      })
      .catch(err => {
          console.log(err);
          return res.status(500).send('Error al actualizar el usuario');
      });
};


// Controlador para registrar usuarios
exports.postRegistrar = (req, res, next) => {
    const { Nombre, Apellido, Telefono } = req.body;

    // Validar que los datos estén completos
    if (!Nombre || !Apellido || !Telefono) {
        req.session.error = 'Todos los campos son obligatorios';
        req.session.establecimientos = req.session.establecimientos || [];
        return res.redirect(`${process.env.PATH_SERVER}registro`);
    }

    // Generar un id único para el usuario usando UUID v4
    const id_Usuario = uuidv4();

    // Registrar el nuevo usuario
    Usuario.registrar({ id_Usuario, Nombre, Apellido, Telefono })
        .then(() => {
            req.session.success = 'Usuario registrado con éxito';
            req.session.establecimientos = req.session.establecimientos || [];
            return res.redirect(`${process.env.PATH_SERVER}usuario/login`);
        })
        .catch((err) => {
            console.error('Error al registrar el usuario:', err);
            req.session.error = 'Hubo un error al registrar el usuario';
            req.session.establecimientos = req.session.establecimientos || [];
            return res.redirect(`${process.env.PATH_SERVER}registro`);
        });
};

// Renderizar el formulario de registro
exports.getRegistrar = (req, res, next) => {
    const error = req.session.error || null;

    return res.render('registro', {
        pagePrimaryTitle: 'Registro de Usuario',
        error: error,
        isLoggedIn: false,
        establecimientos: [],
        id_Establecimiento: '',
    });
};

