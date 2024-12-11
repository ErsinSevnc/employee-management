import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './PaginationComponent.js';
import { translate } from '../utils/translator.js';
import { languageObserver } from '../utils/LanguageX.js';

export class EmployeeTable extends LitElement {
  static styles = css`
    .table-wrapper {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      background-color: #FFFF;
      padding: 16px;
      text-transform: capitalize;
    }

    th {
      text-align: left;
      color: #FF6600;
      font-weight: normal;
    }

    td {
      color: rgba(0, 0, 0, 0.7);
    }

    th:first-child,
    td:first-child {
      position: sticky;
      left: 0;
      background-color: #FFFF;
      z-index: 1;
    }

    .actions-wrapper {
      display: flex;
      gap: 8px;
    }

    .action-btn {
      cursor: pointer;
      background-color: transparent;
      color: #FF6600;
      border: none;
      padding: 5px 10px;
      border-radius: 10px;
    }

    .action-btn:hover {
      background-color: rgba(0, 0, 0, 0.2);
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
    languageObserver.autoSubscribe(this, 'language');
  }

  render() {
    return html`
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>${translate('firstName')}</th>
              <th>${translate('lastName')}</th>
              <th>${translate('dateOfEmployment')}</th>
              <th>${translate('dateOfBirth')}</th>
              <th>${translate('phone')}</th>
              <th>${translate('email')}</th>
              <th>${translate('department')}</th>
              <th>${translate('position')}</th>
              <th>${translate('actions')}</th>
            </tr>
          </thead>
          <tbody>
            ${this.employees.map(
              (employee) => html`
                <tr>
                  <td>${employee.firstName}</td>
                  <td>${employee.lastName}</td>
                  <td>${new Date(employee.dateOfEmployment).toLocaleDateString(document.documentElement.lang)}</td>
                  <td>${new Date(employee.dateOfBirth).toLocaleDateString(document.documentElement.lang)}</td>
                  <td>${employee.phone}</td>
                  <td>${employee.email}</td>
                  <td>${employee.department}</td>
                  <td>${employee.position}</td>
                  <td>
                    <div class="actions-wrapper">
                      <button class="action-btn" @click=${() => this.onDelete(employee.id)}>${translate('delete')}</button>
                      <button class="action-btn" @click="${() => Router.go(`/edit-employee?id=${employee.id}`)}">${translate('edit')}</button>
                    </div> 
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
      <pagination-component
        .currentPage="${this.currentPage}"
        .totalPages="${this.totalPages}"
        .onChangePage="${this.onChangePage}"
      ></pagination-component>
    `;
  }
}

customElements.define('employee-table', EmployeeTable);
