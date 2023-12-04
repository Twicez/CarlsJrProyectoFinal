// menu.js

export class MenuComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.loadContent();
    }

    loadContent() {
        fetch('./microfrontends/Menu/menu.html') 
            .then(response => response.text())
            .then(html => {
                this.innerHTML = html;
            })
            .catch(error => {
                console.error('Error al cargar el contenido del menú:', error);
            });
    }
}

customElements.define('menu-component', MenuComponent);
