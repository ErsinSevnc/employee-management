import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './PaginationComponent.js';
import { translate } from '../utils/translator.js';
import { languageObserver } from '../utils/LanguageX.js';

export class EmployeeTable extends LitElement {
    static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    th {
      background-color: #f2f2f2;
      text-align: left;
    }
    button {
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      padding: 5px 10px;
    }
    button:hover {
      background-color: #0056b3;
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
        // languageObserver.autoSubscribe(this, 'language');
    }

    render() {
        return html`
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
                <td>${employee.dateOfEmployment}</td>
                <td>${employee.dateOfBirth}</td>
                <td>${employee.phone}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td>
                  <button @click=${() => this.onDelete(employee.id)}>${translate('delete')}</button>
                  <button @click="${() => Router.go(`/edit-employee?id=${employee.id}`)}">${translate('edit')}</button>
                </td>
              </tr>
            `
        )}
        </tbody>
      </table>
      <pagination-component
        .currentPage="${this.currentPage}"
        .totalPages="${this.totalPages}"
        .onChangePage="${this.onChangePage}"
      ></pagination-component>
    `;
    }
}

customElements.define('employee-table', EmployeeTable);