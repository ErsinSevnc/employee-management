import { html, css, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import { translate } from '../utils/translator';

class NavigationMenu extends LitElement {
  static styles = css`
    nav {
      background-color: #FFFF;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      display: flex;
      padding: 30px;
      gap: 20px;
      width: 100%;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      margin-bottom: 10px;
    }

    a {
      color: #FF6600;
      font-weight: 600;
      text-decoration: none;
    }

    a:hover {
      color: gray;
    }
  `;

  static properties = {
    routes: { type: Array },
  };

  constructor() {
    super();
    this.routes = [
      { name: 'Home', path: '/' },
      { name: 'Add Employee', path: '/add-employee' },
    ];
  }

  render() {
    return html`
      <nav>
      ${this.routes.map(
      (route) => html`
            <div>
                <a href="${route.path}" @click="${(e) => this.navigate(e, route.path)}">${translate(route.name)}</a>
            </div>
            `
    )}
      </nav>
    `;
  }

  navigate(event, path) {
    event.preventDefault();
    Router.go(path);
  }
}

customElements.define('navigation-menu', NavigationMenu);
