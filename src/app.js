import { LitElement, html } from 'lit';
import { initRouter } from './router';

class App extends LitElement {
    firstUpdated() {
        const outlet = this.shadowRoot.getElementById('outlet');
        initRouter(outlet);
    }

    render() {
        return html``
    }
};

customElements.define('custom-app', App);