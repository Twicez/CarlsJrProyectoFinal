// FooterComponent.js

export class FooterComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.initFooter();
        this.loadContent();
    }

    initFooter() {
        console.log('Footer initialized');
    }

    loadContent() {
        const footerContainer = document.getElementById('footer-container');

        fetch('microfrontends/footer/footer.html') 
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
            })
            .catch(error => {
                console.error('Error al cargar el contenido del footer:', error);
            });

    }
}

customElements.define('footer-component', FooterComponent);
