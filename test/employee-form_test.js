import { EmployeeForm } from '../src/components/EmployeeForm';
import { assert } from '@open-wc/testing';
import { translate } from '../src/utils/translator';

suite('EmployeeForm Logic Tests', () => {

  test('is defined', () => {
    const el = document.createElement('employee-form');
    assert.instanceOf(el, EmployeeForm);
  });

  test('validates field length for first name', () => {
    const el = document.createElement('employee-form');
    el.firstName = 'Jo';
    el.handleInputChange({ target: { name: 'firstName', value: 'Jo' } });

    requestAnimationFrame(() => {
      assert.equal(el.errors.firstName, translate('fieldTooShort'));
    });
  });

  test('validates email format', () => {
    const el = document.createElement('employee-form');
    el.email = 'invalid-email';
    el.handleInputChange({ target: { name: 'email', value: 'invalid-email' } });

    requestAnimationFrame(() => {
      assert.equal(el.errors.email, translate('invalidEmail'));
    });
  });

  test('does not show error for valid email', () => {
    const el = document.createElement('employee-form');
    el.email = 'valid.email@example.com';
    el.handleInputChange({ target: { name: 'email', value: 'valid.email@example.com' } });

    requestAnimationFrame(() => {
      assert.isUndefined(el.errors.email);
    });
  });

});
