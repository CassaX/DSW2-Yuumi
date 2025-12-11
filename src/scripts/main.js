document.addEventListener("DOMContentLoaded", function() {
    const loadComponent = (elementId, filePath) => {
        const element = document.getElementById(elementId);
        if (element) {
            fetch(filePath)
                .then(response => {
                    if (response.ok) return response.text();
                    throw new Error(`Arquivo não encontrado: ${filePath}`);
                })
                .then(data => {
                    element.innerHTML = data;
                })
                .catch(error => {
                    console.error(`Erro ao carregar componente: ${error}`);
                    element.innerHTML = `<p style="color:red;">Erro ao carregar ${elementId}.</p>`;
                });
        }
    };

    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");
});