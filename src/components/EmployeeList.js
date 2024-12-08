import { LitElement, html, css } from 'lit';
import { stateManager } from '../utils/StateX.js';
import { translate } from '../utils/translator.js';

export class EmployeeList extends LitElement {
  //TODO: Seperate Table and List to reduce code lines
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
      background-color: #f4f4f4;
    }
    button {
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      padding: 5px 10px;
      margin: 2px;
    }
    button:hover {
      background-color: #0056b3;
    }
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    .pagination button {
      margin: 0 5px;
      padding: 5px 10px;
    }
    .pagination button.active {
      background-color: #0056b3;
    }
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
  `;

  static properties = {
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    searchQueryTable: { type: String },
    searchQueryList: { type: String },
    view: { type: String },
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.searchQueryTable = '';
    this.searchQueryList = '';
    this.view = 'table';
    this.handleStateChange = this.handleStateChange.bind(this);
    stateManager.subscribe(this.handleStateChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    stateManager.unsubscribe(this.handleStateChange);
  }

  handleStateChange() {
    this.requestUpdate();
  }

  get employees() {
    const query = this.searchQueryTable.toLowerCase() || this.searchQueryList.toLowerCase();
    const allEmployees = stateManager.getState().employees;

    return allEmployees.filter((employee) =>
      [employee.firstName, employee.lastName, employee.department, employee.position]
        .some((field) => field.toLowerCase().includes(query))
    );
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.employees.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.employees.length / this.itemsPerPage);
  }

  changePage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  deleteEmployee(id) {
    const confirmation = confirm(translate('confirm_delete', this.lang));
    if (confirmation) {
      stateManager.deleteEmployee(id);
    }
  }

  renderTable() {
    return html`
      <h2>${translate('employee_list')}</h2>

      <input
        type="text"
        placeholder="${translate('search_placeholder')}"
        @input="${(e) => {
          this.searchQueryTable = e.target.value;
          this.currentPage = 1;
        }}"
      />

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
          ${this.paginatedEmployees.map(
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
                  <button @click=${() => this.deleteEmployee(employee.id)}>
                    ${translate('delete')}
                  </button>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>

      <div class="pagination">
        <button
          ?disabled="${this.currentPage === 1}"
          @click="${() => this.changePage(this.currentPage - 1)}"
        >
          ${translate('previous', this.lang)}
        </button>
        ${Array.from({ length: this.totalPages }, (_, i) => i + 1).map(
          (page) => html`
            <button
              class="${this.currentPage === page ? 'active' : ''}"
              @click="${() => this.changePage(page)}"
            >
              ${page}
            </button>
          `
        )}
        <button
          ?disabled="${this.currentPage === this.totalPages}"
          @click="${() => this.changePage(this.currentPage + 1)}"
        >
          ${translate('next', this.lang)}
        </button>
      </div>
    `;
  }

  renderList() {
    return html`
      <h2>${translate('employee_list')}</h2>

      <input
        type="text"
        placeholder="${translate('search_placeholder')}"
        @input="${(e) => {
          this.searchQueryList = e.target.value;
          this.currentPage = 1; 
        }}"
      />

      <ul class="list-view">
        ${this.paginatedEmployees.map(
          (employee) => html`
            <li>
              ${employee.firstName} ${employee.lastName} - ${translate(employee.department)} - ${translate(employee.position)}
              <button @click=${() => this.deleteEmployee(employee.id)}>
                ${translate('delete')}
              </button>
            </li>
          `
        )}
      </ul>

      <div class="pagination">
        <button
          ?disabled="${this.currentPage === 1}"
          @click="${() => this.changePage(this.currentPage - 1)}"
        >
          ${translate('previous')}
        </button>
        ${Array.from({ length: this.totalPages }, (_, i) => i + 1).map(
          (page) => html`
            <button
              class="${this.currentPage === page ? 'active' : ''}"
              @click="${() => this.changePage(page)}"
            >
              ${page}
            </button>
          `
        )}
        <button
          ?disabled="${this.currentPage === this.totalPages}"
          @click="${() => this.changePage(this.currentPage + 1)}"
        >
          ${translate('next')}
        </button>
      </div>
    `;
  }

  render() {
    return html`
      <div>
        <button @click="${() => this.view = 'table'}">${translate('table_view')}</button>
        <button @click="${() => this.view = 'list'}">${translate('list_view')}</button>

        ${this.view === 'table' ? this.renderTable() : this.renderList()}
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
