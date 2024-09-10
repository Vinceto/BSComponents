const tabs = document.querySelectorAll('.nav-link');
const buttons = document.querySelectorAll('.navbar-toggler');

// Tiempo total de carga en milisegundos (3 segundos)
const loadTime = 3000;

tabs.forEach((tab, index) => {
    tab.addEventListener('shown.bs.tab', function () {
        // Desactivar todos los tabs y botones
        tabs.forEach(t => t.classList.remove('active'));
        buttons.forEach(btn => {
            btn.classList.add('d-none'); // Ocultar todos los botones
            btn.classList.remove('btn-primary'); // Remover la clase btn-primary de todos los botones
        });
        
        // Activar el tab y el botón correspondientes
        tab.classList.add('active');
        buttons[index].classList.remove('d-none');
        buttons[index].classList.add('btn-primary');

        // Simular la carga de datos y mostrar el progress bar
        showProgressBar(index + 1, loadTime);
    });
});

function showProgressBar(index, totalTime) {
    const progressBar = document.getElementById(`progressBar${index}`).querySelector('.progress-bar');
    const tableContent = document.getElementById(`tableContent${index}`);
    
    // Mostrar el progress bar y ocultar la tabla
    progressBar.style.width = '0%';
    tableContent.classList.add('d-none');

    let startTime = 0;
    const interval = 100; // Intervalo de actualización en milisegundos
    const totalSteps = totalTime / interval; // Total de pasos para llegar al 100%

    const timer = setInterval(() => {
        startTime += interval;
        const progress = Math.min((startTime / totalTime) * 100, 100); // Progreso en porcentaje
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(timer); // Detener la barra de progreso al alcanzar el 100%
            progressBar.style.width = '100%';
            tableContent.classList.remove('d-none'); // Mostrar la tabla con los datos cargados            
        }
    }, interval);
}