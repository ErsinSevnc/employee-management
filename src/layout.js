import { html, css, LitElement } from 'lit';
import './components/NavigationMenu';

class MainLayout extends LitElement {
  static styles = css`
    .root {
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    main {
      flex-grow: 1;
      padding: 30px;
      background-color: rgba(0, 0, 0, 0.02);
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
