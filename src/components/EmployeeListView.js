import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './PaginationComponent.js';
import { translate } from '../utils/translator.js';

export class EmployeeListView extends LitElement {
  static styles = css`
    .list-wrapper {
      border-radius: 8px;
    }
    .list-view {
      list-style-type: none;
      padding: 0;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: start;
      align-items: stretch;
    }
    .list-employee-item {
      background-color: #FFFF;
      border-radius: 16px;
      box-shadow: 3px 2px 4px 3px rgba(0, 0, 0, 0.03);
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .list-view li {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }

    .list-sub-title {
      color: black;
      font-weight: bold;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    }

    .list-item-text {
      color: rgba(0, 0, 0, 0.7);
      font-weight: normal;
    }

    .list-btn {
      width: 100%;
      margin: 8px 0;
      border-radius: 8px;
      background-color: transparent;
      border: 1px solid gray;
      padding: 8px 0px;
    }

    .update-btn {
      background-color: #FF6600;
      border: none;
      color: white;
    }

    .delete-btn {
      background-color: #172B53;
      border:none;
      color: white;
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
      <div class="list-wrapper">
        <ul class="list-view">
          ${this.employees.map(
            (employee) => html`
              <li class="list-employee-item">
                <div>
                   ${Object.keys(employee).map(employeeKey => {
                  if (employeeKey === 'id') {
                    return
                  }
                  return html`
                    <p class="list-sub-title">${translate(employeeKey)}: <span class="list-item-text">${employee[employeeKey]}</span></p>
                  `
                })}
                </div>
                <div class="list-btn-wrapper">
                  <button class="list-btn delete-btn" @click=${() => this.onDelete(employee.id)}>${translate('delete')}</button>
                  <button class="list-btn update-btn" @click="${() => Router.go(`/edit-employee?id=${employee.id}`)}">${translate('edit')}</button>
                </div>
              </li>
            `
          )}
        </ul>
      </div>
      <pagination-component
        .currentPage="${this.currentPage}"
        .totalPages="${this.totalPages}"
        .onChangePage="${this.onChangePage}"
      ></pagination-component>
    `;
  }
}

customElements.define('employee-list-view', EmployeeListView);
