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
    .error {
      color: red;
      font-size: 12px;
      margin-top: -8px;
      margin-bottom: 10px;
    }
  `;

  static properties = {
    mode: { type: String },
    employeeId: { type: String },
    employeeData: { type: Object },
    errors: { type: Object },
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
    this.errors = {};
    this.modal = null;
    languageObserver.autoSubscribe(this, 'language');
  }

  firstUpdated() {
    this.modal = this.shadowRoot.querySelector('confirm-modal');
  }

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
    this.validateField(name, value);
  }

  validateField(name, value) {
    const errors = { ...this.errors };

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (value.length < 2) {
          errors[name] = translate('fieldTooShort');
        } else {
          delete errors[name];
        }
        break;
      case 'dateOfEmployment':
        if (!value) {
          errors[name] = translate('fieldRequired');
        }
        break;
      case 'dateOfBirth':
        if (new Date(value) > new Date()) {
          errors[name] = translate('dateInFuture');
        } else {
          delete errors[name]
        }
        break;
      case 'phone':
        if (!/^\+?\d{10,15}$/.test(value)) {
          errors[name] = translate('invalidPhone');
        } else {
          delete errors[name];
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          errors[name] = translate('invalidEmail');
        } else {
          delete errors[name];
        }
        break;
      case 'department':
      case 'position':
          delete errors[name];
        break;
      default:
        break;
    }

    this.errors = errors;
  }

  validateForm() {
    const fields = Object.keys(this.employeeData);
    fields.forEach((field) => this.validateField(field, this.employeeData[field]));
    return Object.keys(this.errors).length === 0;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.validateForm()) {
      alert(translate('formErrors'));
      return;
    }

    if (this.mode === 'add') {
      stateManager.addEmployee(this.employeeData);
      alert(translate('employee_added'));
      Router.go('/');
    }

    if (this.mode === 'edit') {
      this.openEditModal();
    }
  }

  openEditModal() {
    this.modal.openModal(
      translate('confirmEdit'),
      () => {
        stateManager.updateEmployee(this.employeeData);
        Router.go('/');
      },
      () => false
    );
  }

  render() {
    return html`
      <h2>${this.mode === 'add' ? translate('add_employee') : translate('edit_employee')}</h2>
      <form @submit="${this.handleSubmit}">
        ${this.renderField('firstName', 'text')}
        ${this.renderField('lastName', 'text')}
        ${this.renderField('dateOfEmployment', 'date')}
        ${this.renderField('dateOfBirth', 'date')}
        ${this.renderField('phone', 'tel')}
        ${this.renderField('email', 'email')}
        ${this.renderDropdown('department', deparments)}
        ${this.renderDropdown('position', positions)}

        <button type="submit">
          ${this.mode === 'add' ? translate('create') : translate('update')}
        </button>
      </form>

      <confirm-modal></confirm-modal>
    `;
  }

  renderField(name, type) {
    return html`
      <label for="${name}">${translate(name)}</label>
      <input
        type="${type}"
        id="${name}"
        name="${name}"
        .value="${this.employeeData[name]}"
        @input="${this.handleInputChange}"
        required
      />
      ${this.errors[name]
        ? html`<div class="error">${this.errors[name]}</div>`
        : ''}
    `;
  }

  renderDropdown(name, options) {
    return html`
      <label for="${name}">${translate(name)}</label>
      <select
        id="${name}"
        name="${name}"
        .value="${this.employeeData[name]}"
        @change="${this.handleInputChange}"
        required
      >
        <option value="" disabled>${translate('select' + name)}</option>
        ${options.map(
          (option) =>
            html`<option value="${option.key}">${option.label}</option>`
        )}
      </select>
      ${this.errors[name]
        ? html`<div class="error">${this.errors[name]}</div>`
        : ''}
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
