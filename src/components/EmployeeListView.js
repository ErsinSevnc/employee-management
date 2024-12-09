import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './PaginationComponent.js';
import { translate } from '../utils/translator.js';

export class EmployeeListView extends LitElement {
  static styles = css`
    .list-view {
      list-style-type: none;
      padding: 0;
    }
    .list-view li {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    .list-view li button {
      margin-left: 10px;
    }

    .list-sub-title {
      font-weight: bold;
    }

    .list-item-text {
      font-weight: normal;
    }
  `;

  static properties = {
    employees: { type: Array },
    currentPage: { type: Number },
    totalPages: { type: Number },
    onChangePage: { type: Function },
    onDelete: { type: Function },
  };

  constructor() {
    super();
    this.employees = [];
    this.currentPage = 1;
    this.totalPages = 1;
    this.onChangePage = () => { };
    this.onDelete = () => { };
  }

  render() {
    return html`
      <ul class="list-view">
        ${this.employees.map(
      (employee) => html`
            <li>
              ${Object.keys(employee).map(employeeKey => {
                if (employeeKey === 'id') {
                  return
                }
                return html`
                  <p class="list-sub-title">${translate(employeeKey)}: <span class="list-item-text">${employee[employeeKey]}</span></p>
                `
      })}
              <button @click=${() => this.onDelete(employee.id)}>Delete</button>
              <button @click="${() => Router.go(`/edit-employee?id=${employee.id}`)}">
  Edit
</button>
            </li>
          `
    )}
      </ul>
      <pagination-component
        .currentPage="${this.currentPage}"
        .totalPages="${this.totalPages}"
        .onChangePage="${this.onChangePage}"
      ></pagination-component>
    `;
  }
}

customElements.define('employee-list-view', EmployeeListView);
