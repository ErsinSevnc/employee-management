import { LitElement, html, css } from 'lit';
import { translate } from '../utils/translator';

export class ConfirmModal extends LitElement {
  static styles = css`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .modal.show {
      visibility: visible;
      opacity: 1;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 5px;
      width: 300px;
      text-align: center;
    }
    .modal-content button {
      margin: 10px;
      padding: 10px 20px;
      cursor: pointer;
    }
    .modal-content button.cancel {
      background: #ccc;
    }
    .modal-content button.confirm {
      background: #f44336;
      color: white;
    }
  `;

  static properties = {
    message: { type: String },
    onConfirm: { type: Function },
    onCancel: { type: Function },
  };

  constructor() {
    super();
    this.message = '';
    this.onConfirm = () => {};
    this.onCancel = () => {};
  }

  closeModal() {
    this.shadowRoot.querySelector('.modal').classList.remove('show');
  }

  openModal(message, onConfirm, onCancel) {
    this.message = message;
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;
    this.shadowRoot.querySelector('.modal').classList.add('show');
  }

  render() {
    return html`
      <div class="modal">
        <div class="modal-content">
          <p>${this.message}</p>
          <button class="cancel" @click="${this._handleCancel}">${translate('cancel')}</button>
          <button class="confirm" @click="${this._handleConfirm}">${translate('yes')}</button>
        </div>
      </div>
    `;
  }

  _handleCancel() {
    this.onCancel();
    this.closeModal();
  }

  _handleConfirm() {
    this.onConfirm();
    this.closeModal();
  }
}

customElements.define('confirm-modal', ConfirmModal);
