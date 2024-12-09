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

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== callback);
  }

  notify() {
    this.subscribers.forEach((callback) => callback());
  }

  getEmployee(employeeId) {
    return this.state.employees.find(employee => employee.id === Number(employeeId));
  }

  getState() {
    return this.state;
  }

  setState(key, value) {
    this.state[key] = value;
    this.notify();
  }

  addEmployee(employee) {
    const id = Math.max(...this.state.employees.map((e) => e.id), 0) + 1;
    const employeeList = [...this.state.employees, { ...employee, id }];
    this.setState('employees', employeeList);
  }

  updateEmployee(updatedEmployee) {
    const updatedEmployees = this.state.employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );

    this.setState('employees', updatedEmployees);
  };

  deleteEmployee(id) {
    this.state.employees = this.state.employees.filter((employee) => employee.id !== id);
    this.notify();
  }
}

const stateManager = new StateManager();
stateManager.init();

export {stateManager};
