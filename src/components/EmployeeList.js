import { LitElement, html, css } from 'lit';
import { stateManager } from '../utils/StateX.js';
import { translate } from '../utils/translator.js';
import { languageObserver } from '../utils/LanguageX';
import './EmployeeTable.js';
import './EmployeeListView.js';
import './ConfirmModal.js';

export class EmployeeList extends LitElement {
  static styles = css`
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
  `;

  static properties = {
    view: { type: String },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    searchQueryList: { type: String },
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.searchQueryList = '';
    this.view = 'table';
    this.modal = null;

    stateManager.subscribe(() => this.requestUpdate());
    languageObserver.autoSubscribe(this, 'language');
  };

  firstUpdated() {
    this.modal = this.shadowRoot.querySelector('confirm-modal');
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    stateManager.unsubscribe(() => this.requestUpdate());
  };

  get employees() {
    const query = this.searchQueryList.toLowerCase();
    return stateManager.getState().employees.filter((employee) =>
      [employee.firstName, employee.lastName, employee.department, employee.position]
        .some((field) => field.toLowerCase().includes(query))
    );
  };

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.employees.slice(start, start + this.itemsPerPage);
  };

  deleteEmployee(id) {
    stateManager.deleteEmployee(id);
  };

  openDeleteModal(id) {
    this.modal.openModal(
      translate('confirmDelete'),
      () => this.deleteEmployee(id),
      () => false
    )
  };


  render() {
    return html`
      <div>
        <button @click="${() => (this.view = 'table')}">${translate('tableView')}</button>
        <button @click="${() => (this.view = 'list')}">${translate('listView')}</button>

        <input
          type="text"
          placeholder="${translate('searchBarPlaceholder')}"
          @input="${(e) => {
            this.searchQueryList = e.target.value;
            this.currentPage = 1;
          }}"
        />

        ${this.view === 'table'
          ? html`
              <employee-table
                .employees="${this.paginatedEmployees}"
                .currentPage="${this.currentPage}"
                .totalPages="${Math.ceil(this.employees.length / this.itemsPerPage)}"
                .onChangePage="${(page) => (this.currentPage = page)}"
                .onDelete="${(id) => this.openDeleteModal(id)}"
              ></employee-table>
            `
          : html`
              <employee-list-view
                .employees="${this.paginatedEmployees}"
                .currentPage="${this.currentPage}"
                .totalPages="${Math.ceil(this.employees.length / this.itemsPerPage)}"
                .onChangePage="${(page) => (this.currentPage = page)}"
                .onDelete="${(id) => this.deleteEmployee(id)}"
              ></employee-list-view>
            `}
      </div>

      <confirm-modal></confirm-modal>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
