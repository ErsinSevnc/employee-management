import { ConfirmModal } from '../src/components/ConfirmModal';
import { assert } from '@open-wc/testing';
import { translate } from '../src/utils/translator';

suite('ConfirmModal Logic Tests', () => {

  test('is defined', () => {
    const el = document.createElement('confirm-modal');
    assert.instanceOf(el, ConfirmModal);
  });

  test('opens the modal with correct message', async () => {
    const el = document.createElement('confirm-modal');
    document.body.appendChild(el);

    const message = 'Are you sure you want to proceed?';
    el.openModal(message, () => {}, () => {});
    await el.updateComplete;

    const modal = el.shadowRoot.querySelector('.modal');
    assert.exists(modal, 'Modal element should exist');
    assert.isTrue(modal.classList.contains('show'), 'Modal should have "show" class');
    
    const modalMessage = el.shadowRoot.querySelector('.modal-content p');
    assert.exists(modalMessage, 'Modal message element should exist');
    assert.equal(modalMessage.textContent, message, 'Modal message should match the input');

    document.body.removeChild(el);
  });

  test('calls onConfirm callback when confirm button is clicked', async () => {
    const el = document.createElement('confirm-modal');
    document.body.appendChild(el);

    let confirmCalled = false;
    el.openModal('Test Message', () => {
      confirmCalled = true;
    }, () => {});
    await el.updateComplete;

    const confirmButton = el.shadowRoot.querySelector('.confirm');
    assert.exists(confirmButton, 'Confirm button should exist');
    confirmButton.click();
    await el.updateComplete;

    assert.isTrue(confirmCalled, 'onConfirm callback should be called');
    document.body.removeChild(el);
  });

  test('calls onCancel callback when cancel button is clicked', async () => {
    const el = document.createElement('confirm-modal');
    document.body.appendChild(el);

    let cancelCalled = false;
    el.openModal('Test Message', () => {}, () => {
      cancelCalled = true;
    });
    await el.updateComplete;

    const cancelButton = el.shadowRoot.querySelector('.cancel');
    assert.exists(cancelButton, 'Cancel button should exist');
    cancelButton.click();
    await el.updateComplete;

    assert.isTrue(cancelCalled, 'onCancel callback should be called');
    document.body.removeChild(el);
  });

  test('closes modal on confirm', async () => {
    const el = document.createElement('confirm-modal');
    document.body.appendChild(el);

    el.openModal('Test Message', () => {}, () => {});
    await el.updateComplete;

    const confirmButton = el.shadowRoot.querySelector('.confirm');
    assert.exists(confirmButton, 'Confirm button should exist');
    confirmButton.click();
    await el.updateComplete;

    const modal = el.shadowRoot.querySelector('.modal');
    assert.exists(modal, 'Modal element should exist');
    assert.isFalse(modal.classList.contains('show'), 'Modal should not have "show" class');
    document.body.removeChild(el);
  });

  test('closes modal on cancel', async () => {
    const el = document.createElement('confirm-modal');
    document.body.appendChild(el);

    el.openModal('Test Message', () => {}, () => {});
    await el.updateComplete;

    const cancelButton = el.shadowRoot.querySelector('.cancel');
    assert.exists(cancelButton, 'Cancel button should exist');
    cancelButton.click();
    await el.updateComplete;

    const modal = el.shadowRoot.querySelector('.modal');
    assert.exists(modal, 'Modal element should exist');
    assert.isFalse(modal.classList.contains('show'), 'Modal should not have "show" class');
    document.body.removeChild(el);
  });

});
