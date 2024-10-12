$(document).ready(function () {
    // Manejar clic en el botón de inicio de sesión
    $('#LoginBtn').click(handleLogin);

    // Manejar clic en el botón de registro
    $('#RegisterBtn').click(handleRegister);
});

// Función para manejar el inicio de sesión
function handleLogin(e) {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente

    let Telefono = $('#Telefono').val();

    // Validar que el campo no esté vacío
    if (Telefono === '') {
        Swal.fire({
            html: '<b>Por favor, ingresa tu número de teléfono</b>',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
        });
        return false;
    }

    // Validar el formato del número de teléfono (por ejemplo, 10 dígitos)
    const telefonoRegex = /^\d{3}$/; // Ajusta la expresión regular según tu necesidad
    if (!telefonoRegex.test(Telefono)) {
        Swal.fire({
            html: '<b>Por favor, ingresa un número de teléfono válido de 10 dígitos</b>',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK'
        });
        return false;
    }

    // Enviar el formulario
    $('#loginForm').submit(); // Asegúrate de que se envíe el formulario correcto
}

// Función para manejar el registro
function handleRegister() {
    console.log('Botón de registro clickeado'); // Para depuración
    // Redirigir a la página de registro
    window.location.href = '<%= process.env.PATH_SERVER %>/registro';
}
