import { html, css, LitElement } from 'lit';
import { Router } from '@vaadin/router';
import { translate } from '../utils/translator';
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
      justify-content: space-between;
      align-items: center;
      padding: 30px;
    }

    .nav-items-wrapper {
      display: flex;
      gap: 20px;
    }

    .multilang-wrapper {
      text-align: right;
    }
    
    .lang-btn {
      border: none;
      background-color: transparent;
      color: #FF6600;
      cursor: pointer;
    }

    .active {
      text-decoration: underline;
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

  navigate(event, path) {
    event.preventDefault();
    Router.go(path);
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
            <button class="lang-btn ${this.language === 'tr' && 'active'}" @click="${() => this.handleLanguageClick('tr')}">TR</button>
            <button class="lang-btn ${this.language === 'en' && 'active'}" @click="${() => this.handleLanguageClick('en')}">EN</button>
          </div>
        </div>
      </nav>
    `;
  }
};

customElements.define('navigation-menu', NavigationMenu);
