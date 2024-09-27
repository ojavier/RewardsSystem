$(document).ready(function () {

    $('#LoginBtn').click(function (e) {
        e.preventDefault(); // Evitar que el formulario se envíe automáticamente

        let Telefono = $('#Telefono').val();

        if (Telefono == '') {
            Swal.fire({
                html: '<b>Por favor, ingresa tu número de teléfono</b>',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
            return false;
        }

        // Enviar el formulario
        $('form').submit();
    });
});
