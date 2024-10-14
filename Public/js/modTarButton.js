document.addEventListener('DOMContentLoaded', () => {
    const Popup = document.getElementById('modTarPopup');
    const abrirPopupBtn = document.getElementById('modTarButton');  
    const cerrarPopupBtns = document.querySelectorAll('.modal-background, .modal-close');  

    abrirPopupBtn.addEventListener('click', () => {
        Popup.classList.add('is-active');  
    });

    cerrarPopupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            Popup.classList.remove('is-active');  
        });
    });
});

console.log("Archivo JS cargado correctamente");