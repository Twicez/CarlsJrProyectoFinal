// contactComponent.js
export class ContactComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.setupForm();
        this.#agregarEstilo(shadow);
        this.#render(shadow);
    }

    #render(shadow) {
        shadow.innerHTML = `
        <!-- Contact Start -->
        <div class="container-xxl py-5">
            <div class="container">
                <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h5 class="section-title ff-secondary text-center text-primary fw-normal">Contáctanos</h5>
                </div>
                <div class="row g-4">
                    <div class="col-12">
                        <div class="row gy-4">
                            <div class="col-md-4">
                                <h5 class="section-title ff-secondary fw-normal text-start text-primary">Pedidos</h5>
                                <p><i class="fa fa-phone-alt me-3"></i>+52 644 200 0000 </p>
                            </div>
                            <div class="col-md-4">
                                <h5 class="section-title ff-secondary fw-normal text-start text-primary">General</h5>
                                <p><i class="fa fa-envelope-open text-primary me-2"></i>CarlsJr@hotmail.com </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                    <div class="wow fadeInUp" data-wow-delay="0.2s">
                        <form>
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="name" placeholder="Tu nombre">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="email" class="form-control" id="email"
                                               placeholder="Tu correo">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="subject" placeholder="Tema">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-floating">
                                        <textarea class="form-control" placeholder="Mensaje"
                                                  id="message" style="height: 150px"></textarea>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button class="btn btn-primary w-100 py-3" type="submit">Enviar</button>
                                </div>
                    <div class="col-md-6 wow fadeIn" data-wow-delay="0.1s">
                    <h5 class="section-title ff-secondary text-center text-primary fw-normal">Nuestra Direccion</h5>
                        <a href="https://goo.gl/maps/ZRebmxkpDn6ZGvc26" target="_blank">
                            <img src="img/maps.png" class="maps">
                        </a>
                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Contact End -->
        `;
    }

    setupForm() {
        // Agrega aquí el código para manejar el formulario de contacto, si es necesario
    }

    #agregarEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "/frontend/microfrontends/contactComponent/contact.css");
        link.setAttribute("href", "/frontend/css/style.css");
        shadow.appendChild(link);
    }
}

customElements.define('contact-component', ContactComponent);
