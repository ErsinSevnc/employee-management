import { html, css, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import { translate } from '../utils/translator';  // Make sure your translator function works
import { languageObserver } from '../utils/LanguageX';


const routes = [
  { name: 'home', path: '/' },
  { name: 'addEmployee', path: '/add-employee' },
];
class NavigationMenu extends LitElement {
  static styles = css`
    nav {
      background-color: #FFFF;
      flex-direction: row;
      width: 100%;
    }

    .navbar {
      display: flex;
      padding: 30px;
    }

    .nav-items-wrapper {
      display: flex;
      flex: 3;
      gap: 20px;
    }

    .multilang-wrapper {
      flex: 1;
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
    };
  `;

  static properties = {
    routes: { type: Array },
  };

  constructor() {
    super();
    this.language = languageObserver.getCurrentLanguage();
    this.routes = routes;
    languageObserver.autoSubscribe(this, 'language');
  }

  handleLanguageClick(lang) {
    document.documentElement.setAttribute('lang', lang);
  }

  render() {
    return html`
      <nav>
        <div class="navbar">
          <div class="nav-items-wrapper">
            ${this.routes.map(
              (route) => html`
                <a href="${route.path}" @click="${(e) => this.navigate(e, route.path)}">${translate(route.name)}</a>
              `
            )}
          </div>
          <div class="multilang-wrapper">
            <button @click="${() => this.handleLanguageClick('tr')}">TR</button>
            <button @click="${() => this.handleLanguageClick('en')}">EN</button>
          </div>
        </div>
      </nav>
    `;
  }

  navigate(event, path) {
    event.preventDefault();
    Router.go(path);
  }
}

customElements.define('navigation-menu', NavigationMenu);
