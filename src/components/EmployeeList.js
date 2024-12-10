import { LitElement, html, css } from 'lit';
import { stateManager } from '../utils/StateX.js';
import { translate } from '../utils/translator.js';
import { languageObserver } from '../utils/LanguageX';
import './EmployeeTable.js';
import './EmployeeListView.js';
import './ConfirmModal.js';
import './svg/ListSvg.js';
import './svg/GridSvg.js';

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
    .title{
      color: #FF6600;
      font-weight: 600;
    }
    .top-wrapper{
      display: flex;
      flex: 1;
      font-size: 16px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      margin-top: 8px;
    }
    .filter-and-options-wrapper{
      display: flex;
      gap: 10px;
      justify-content: center;
      align-items: stretch
    }
    .search {
      border: 1px solid gray;
      border-radius: 4px;
      outline: none;
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
        <div class="top-wrapper">
          <div>
            <span class="title">${translate('employeeList')}</span>
          </div>
          <div class="filter-and-options-wrapper">
            <input
              class="search"
              style="flex: 2;"
              type="text"
              placeholder="${translate('searchBarPlaceholder')}"
              @input="${(e) => {
                this.searchQueryList = e.target.value;
                this.currentPage = 1;
              }}"
            />
            <list-svg style="flex: 1;" @click="${() => (this.view = 'list')}"></list-svg>
            <grid-svg style="flex: 1;" @click="${() => (this.view = 'table')}"></grid-svg>
          </div>
        </div>

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
