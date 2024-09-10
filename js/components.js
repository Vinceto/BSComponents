async function loadComponent(containerId, componentPath) {
    // Realiza una llamada AJAX para cargar el componente desde el servidor
    try {
        const response = await fetch(componentPath);
        const componentHtml = await response.text();

        // Inserta el componente en el contenedor especificado
        document.getElementById(containerId).innerHTML = componentHtml;

        // Inicializa los elementos del componente (si es necesario)
        initializeComponent();
    } catch (error) {
        console.error('Error al cargar el componente:', error);
    }
}

function initializeComponent() {
    // Funciones adicionales para el componente cargado, como el progreso y otros
    const tabs = document.querySelectorAll('.nav-link');
    const buttons = document.querySelectorAll('.navbar-toggler');
    const loadTime = 3000;

    tabs.forEach((tab, index) => {
        tab.addEventListener('shown.bs.tab', function () {
            tabs.forEach(t => t.classList.remove('active'));
            buttons.forEach(btn => {
                btn.classList.add('fade');
                btn.classList.remove('btn-primary');
            });

            tab.classList.add('active');
            buttons[index].classList.remove('fade');
            buttons[index].classList.add('btn-primary');

            showProgressBar(index + 1, loadTime);
        });
    });
}
