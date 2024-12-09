import { LitElement, html, css } from 'lit';
import { stateManager } from '../utils/StateX.js';
import { translate } from '../utils/translator.js';
import { Router } from '@vaadin/router';
import deparments from '../config/deparments.js';
import positions from '../config/positions.js';
import './ConfirmModal.js';
import { languageObserver } from '../utils/LanguageX.js';

export class EmployeeForm extends LitElement {
  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
      margin: 0 auto;
    }
    label {
      font-weight: bold;
    }
    input, select, button {
      padding: 8px;
      font-size: 16px;
    }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;

  static properties = {
    mode: { type: String },
    employeeId: { type: String },
    employeeData: { type: Object },
  };

  constructor() {
    super();
    this.mode = 'add';
    this.employeeId = null;
    this.employeeData = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
    this.modal = null;
    languageObserver.autoSubscribe(this, 'language');
  }

  firstUpdated() {
    this.modal = this.shadowRoot.querySelector('confirm-modal');
  };

  connectedCallback() {
    super.connectedCallback();
    if (this.mode === 'edit' && this.employeeId) {
      this.loadEmployeeData();
    }
  }

  loadEmployeeData() {
    const employee = stateManager.getEmployee(this.employeeId);
    if (employee) {
      this.employeeData = { ...employee };
    } else {
      alert(translate('employee_not_found'));
      Router.go('/');
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.employeeData = { ...this.employeeData, [name]: value };
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.mode === 'add') {
      stateManager.addEmployee(this.employeeData);
      alert(translate('employee_added'));
      Router.go('/');
    } 
    
    if (this.mode === 'edit') {
      this.openEditModal();
    }

    
  };

  openEditModal() {
    this.modal.openModal(
      translate('confirmEdit'),
      () => {
        stateManager.updateEmployee(this.employeeData);
        Router.go('/');
      },
      () => false
    )
  }

  render() {
    return html`
      <h2>${this.mode === 'add' ? translate('add_employee') : translate('edit_employee')}</h2>
      <form @submit="${this.handleSubmit}">
        <label for="firstName">${translate('firstName')}</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          .value="${this.employeeData.firstName}"
          @input="${this.handleInputChange}"
          required
        />

        <label for="lastName">${translate('lastName')}</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          .value="${this.employeeData.lastName}"
          @input="${this.handleInputChange}"
          required
        />

        <label for="dateOfEmployment">${translate('dateOfEmployment')}</label>
        <input
          type="date"
          id="dateOfEmployment"
          name="dateOfEmployment"
          .value="${this.employeeData.dateOfEmployment}"
          @input="${this.handleInputChange}"
          required
        />

        <label for="dateOfBirth">${translate('dateOfBirth')}</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          .value="${this.employeeData.dateOfBirth}"
          @input="${this.handleInputChange}"
          required
        />

        <label for="phone">${translate('phone')}</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          .value="${this.employeeData.phone}"
          @input="${this.handleInputChange}"
          required
        />

        <label for="email">${translate('email')}</label>
        <input
          type="email"
          id="email"
          name="email"
          .value="${this.employeeData.email}"
          @input="${this.handleInputChange}"
          required
        />

        <label for="department">${translate('department')}</label>
        <select
          id="department"
          name="department"
          .value="${this.employeeData.department}"
          @change="${this.handleInputChange}"
          required
        >
          <option value="" disabled>${translate('selectDepartment')}</option>
          ${deparments.map(deparment => (
            html`
              <option value=${deparment.key}>${deparment.label}</option>
            `
          ))}
        </select>

        <label for="position">${translate('position')}</label>
        <select
          id="position"
          name="position"
          .value="${this.employeeData.position}"
          @change="${this.handleInputChange}"
          required
        >
        <option value="" disabled>${translate('selectPosition')}</option>
        ${positions.map(position => (
          html`
            <option value=${position.key}>${position.label}</option>
          `
        ))}
        </select>

        <button type="submit">
          ${this.mode === 'add' ? translate('create') : translate('update')}
        </button>
      </form>
      
      <confirm-modal></confirm-modal>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
