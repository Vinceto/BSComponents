const tabs_component = document.querySelectorAll('.nav-link');
const buttons = document.querySelectorAll('.navbar-toggler');

// Tiempo total de carga en milisegundos (3 segundos)
const loadTime = 3000;

tabs_component.forEach((tab, index) => {
    tab.addEventListener('shown.bs.tab', function () {
        // Desactivar todos los tabs_component y botones
        tabs_component.forEach(t => t.classList.remove('active'));
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

async function showProgressBar(index, totalTime) {
    await resetProgressBar(); // Se asegura de que todas las barras se hayan reseteado primero
    console.log('Ahora puedes continuar con el siguiente paso.');

    const progressBar = document.getElementById(`progressBar${index}`).querySelector('.progress-bar');
    const tableContent = document.getElementById(`tableContent${index}`);
    if (progressBar.parentNode.classList.contains('fade')) {
        progressBar.parentNode.classList.remove('fade'); 
    }
    // Mostrar el progress bar y ocultar la tabla
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
            progressBar.parentNode.classList.add('fade');     
        }
    }, interval);
}

async function resetProgressBar() {
    // Obtiene todas las barras de progreso en la página
    const progressBars = document.querySelectorAll('progress');

    // Espera a que todas las barras de progreso se reseteen
    for (let progressBar of progressBars) {
        await resetSingleProgressBar(progressBar);
    }

    // Después de que todas las barras se hayan reseteado
    console.log('Todas las barras de progreso se han reseteado.');
}

function resetSingleProgressBar(progressBar) {
    return new Promise((resolve) => {
        // Simula un tiempo de reset (por ejemplo, 1 segundo)
        setTimeout(() => {
            // Resetea la barra de progreso
            progressBar.value = 0;
            progressBar.style.width = '0%';
            console.log(`Progress bar reseteada: ${progressBar.id}`);
            resolve(); // Resuelve la promesa cuando se complete el reset
        }, 1000); // Puedes ajustar el tiempo según sea necesario
    });
}