let currentIndex = 0;

const projects = [
    [
        {
            src: "assets/imgs/AD.png",
            doc: "documentation/ADY.pdf"
        },
        {
            src: "assets/imgs/POWERSHELL.png",
            doc: "documentation/POWERSHELL.pdf"
        },
    ],
];

function updateGrid() {
    const grid = document.getElementById("projectGrid");
    grid.innerHTML = projects[currentIndex].map(project => {
        const altText = project.src.split('/').pop().split('.')[0].replace(/-/g, ' ');
        return `
            <div class="project">
                <img src="${project.src}" alt="${altText}" class="img-project">
                <div class="overlay">
                    <a href="${project.doc}" download class="btn btn-primary">Télécharger la documentation</a>
                </div>
            </div>
        `;
    }).join('');
}

function nextGrid() {
    currentIndex = (currentIndex + 1) % projects.length;
    updateGrid();
}

function prevGrid() {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateGrid();
}

// Initialisation de la grille au chargement
updateGrid();
