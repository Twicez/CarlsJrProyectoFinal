
// NavbarComponent.js

export class NavbarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.initNavbar();
        this.loadContent();
    }

    initNavbar() {

    }

    loadContent() {
        fetch('microfrontends/navbar/navbar.html') 
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
           
            })
            .catch(error => {
                console.error('Error al cargar el contenido del navbar:', error);
            });
    }
}

customElements.define('navbar-component', NavbarComponent);
