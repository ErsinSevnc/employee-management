import { html, css, LitElement } from 'lit';
import './components/NavigationMenu';

class MainLayout extends LitElement {
  static styles = css`
    .root {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    main {
      flex-grow: 1;
      padding: 30px;
    }
  `;

  render() {
    return html`
    <div class="root">
    <navigation-menu></navigation-menu>
      <main>
        <slot></slot>
      </main>
    </div>
    `;
  }
}

customElements.define('main-layout', MainLayout);
