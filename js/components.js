// Datos para tabs, sus títulos y contenidos
const tabsConfig = [
    {
        id: "doc-obligatorios",
        title: "Documentos Obligatorios",
        contentType: "table",
        contentData: [
            { title: "Documento 1", description: "Descripción 1" },
            { title: "Documento 2", description: "Descripción 2" }
        ]
    },
    {
        id: "doc-opcionales",
        title: "Documentos Opcionales",
        contentType: "carousel",
        contentData: [
            "../images/image1.jpg",
            "../images/image2.jpg",
            "../images/image3.jpg"
        ]
    },
    {
        id: "opcion3",
        title: "Opción 3",
        contentType: "table",
        contentData: [
            { title: "Acción 1", description: "Descripción A" },
            { title: "Acción 2", description: "Descripción B" }
        ]
    },
    {
        id: "opcion4",
        title: "Opción 4",
        contentType: "carousel",
        contentData: [
            "../images/image4.jpg",
            "../images/image5.jpg"
        ]
    }
];

// Función para cargar dinámicamente el componente
function initializeDynamicTabs(tabsConfig) {
    const container = document.querySelector('.container.mt-5');
    const nav = document.createElement('ul');
    nav.classList.add('navbar', 'bg-body-secondary', 'fixed-top', 'nav', 'nav-pills', 'nav-fill', 'mb-3');

    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content', 'py-5');

    tabsConfig.forEach((tab, index) => {
        // Crear el nav-item
        const li = document.createElement('li');
        li.classList.add('nav-item', 'col-md-3', 'col-sm-12', 'd-flex', 'justify-content-between', 'align-items-center');

        const a = document.createElement('a');
        a.classList.add('nav-link');
        a.id = `tab-${tab.id}`;
        a.setAttribute('data-bs-toggle', 'pill');
        a.href = `#${tab.id}`;
        a.innerHTML = `<p class="mb-0">${tab.title}</p>`;

        const button = document.createElement('button');
        button.classList.add('navbar-toggler', 'mx-2', 'my-auto', 'bg-light', 'd-none');
        button.setAttribute('data-bs-toggle', 'offcanvas');
        button.setAttribute('data-bs-target', `#offcanvasMenu${index + 1}`);
        button.innerHTML = '<span class="navbar-toggler-icon"></span>';

        li.appendChild(a);
        li.appendChild(button);
        nav.appendChild(li);

        // Crear tab-pane
        const tabPane = document.createElement('div');
        tabPane.classList.add('tab-pane', 'fade');
        if (index === 0) tabPane.classList.add('show', 'active');
        tabPane.id = tab.id;

        const h3 = document.createElement('h3');
        h3.textContent = tab.title;
        tabPane.appendChild(h3);

        // Inicializar contenido dinámico
        if (tab.contentType === 'table') {
            initializeTableContent(tabPane, tab.contentData);
        } else if (tab.contentType === 'carousel') {
            initializeCarouselContent(tabPane, tab.contentData);
        }

        tabContent.appendChild(tabPane);
    });

    container.appendChild(nav);
    container.appendChild(tabContent);
}

// Inicializa una tabla
function initializeTableContent(tabPane, data) {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Encabezados
    const headerRow = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = 'Título';
    const th2 = document.createElement('th');
    th2.textContent = 'Descripción';
    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    thead.appendChild(headerRow);

    // Datos
    data.forEach(row => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = row.title;
        const td2 = document.createElement('td');
        td2.textContent = row.description;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tabPane.appendChild(table);
}

// Inicializa un carrusel
function initializeCarouselContent(tabPane, images) {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel', 'slide');
    carousel.id = 'carouselExample';
    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');

    images.forEach((imageSrc, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) carouselItem.classList.add('active');
        const img = document.createElement('img');
        img.src = imageSrc;
        img.classList.add('d-block', 'w-100');
        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
    });

    carousel.appendChild(carouselInner);
    tabPane.appendChild(carousel);

    // Inicializar el carrusel de Bootstrap
    new bootstrap.Carousel(carousel);
}

async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const componentHtml = await response.text();

        // Inserta el componente en el contenedor especificado
        document.getElementById(containerId).innerHTML = componentHtml;

        // Inicializa los elementos del componente después de cargarlos
        initializeComponent();  // Aquí se llama para inicializar los tabs y botones
    } catch (error) {
        console.error('Error al cargar el componente:', error);
    }
}


// Llama a la función de inicialización después de que la página está lista
$(document).ready(function() {
    console.log(tabsConfig)
    initializeDynamicTabs(tabsConfig);
});