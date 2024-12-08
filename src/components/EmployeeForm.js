import { LitElement, html, css } from 'lit';

class EmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
    isEdit: { type: Boolean },
  };

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    label {
      font-weight: bold;
    }
    input, select, button {
      padding: 0.5rem;
    }
  `;

  constructor() {
    super();
    this.employee = {};
    this.isEdit = false;
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.employee = { ...this.employee, [name]: value };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isEdit) {
      if (confirm('Are you sure you want to update this record?')) {
        alert('Employee updated!');
      }
    } else {
      alert('Employee added!');
    }
    window.location.href = '/';
  }

  render() {
    return html`
      <h2>${this.isEdit ? 'Edit Employee' : 'Add Employee'}</h2>
      <form @submit=${this.handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="firstName" .value=${this.employee.firstName || ''} @input=${this.handleInputChange} required />
        
        <label>Last Name:</label>
        <input type="text" name="lastName" .value=${this.employee.lastName || ''} @input=${this.handleInputChange} required />
        
        <label>Department:</label>
        <select name="department" .value=${this.employee.department || ''} @change=${this.handleInputChange} required>
          <option value="">Select</option>
          <option value="Tech">Tech</option>
          <option value="Analytics">Analytics</option>
        </select>
        
        <label>Position:</label>
        <select name="position" .value=${this.employee.position || ''} @change=${this.handleInputChange} required>
          <option value="">Select</option>
          <option value="Junior">Junior</option>
          <option value="Medior">Medior</option>
          <option value="Senior">Senior</option>
        </select>
        
        <button type="submit">${this.isEdit ? 'Update' : 'Add'} Employee</button>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);