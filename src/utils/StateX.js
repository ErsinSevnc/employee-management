import mockEmployeeData from "./data";

class StateManager {
  constructor() {
    this.state = {
      employees: [],
    };
    this.subscribers = [];
  }

  init() {
    this.state.employees = mockEmployeeData;
  }

  /**
   * @param {Function} callback
   */
  subscribe(callback) {
    this.subscribers.push(callback);
  }

  /**
   * @param {Function} callback
   */
  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
  }

  notify() {
    this.subscribers.forEach((callback) => callback());
  }

  /**
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * @param {string} key
   * @param {any} value
   */
  setState(key, value) {
    this.state[key] = value;
    this.notify();
  }

  /**
   * @param {Object} employee
   */
  addEmployee(employee) {
    const id = Math.max(...this.state.employees.map((e) => e.id), 0) + 1;
    this.state.employees = [...this.state.employees, { ...employee, id }];
    this.notify();
  }

  /**
   * @param {Object} updatedEmployee
   */
  updateEmployee(updatedEmployee) {
    this.state.employees = this.state.employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    this.notify();
  }

  /**
   * @param {number} id
   */
  deleteEmployee(id) {
    this.state.employees = this.state.employees.filter((employee) => employee.id !== id);
    this.notify();
  }
}

const stateManager = new StateManager();
stateManager.init();

export {stateManager};
