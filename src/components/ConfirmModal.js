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
      z-index: 100;
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
      padding: 10px 20px;
      margin: 8px 0;
      cursor: pointer;
    }
    .modal-content button {
      width: 100%;
      border-radius: 16px;
      border: none;
    }
    .modal-content button.cancel {
      background: #FFFF;
      border: 1px solid gray;
    }
    .modal-content button.confirm {
      background: #FF6600;
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
    this.updateComplete.then(() => {
      const modal = this.shadowRoot.querySelector('.modal');
      if (modal) {
        modal.classList.add('show');
      }
    });
  }

  _handleCancel() {
    this.onCancel();
    this.closeModal();
  };

  _handleConfirm() {
    this.onConfirm();
    this.closeModal();
  };

  render() {
    return html`
      <div class="modal">
        <div class="modal-content">
          <p>${this.message}</p>
          <button class="confirm" @click="${this._handleConfirm}">${translate('yes')}</button>
          <button class="cancel" @click="${this._handleCancel}">${translate('cancel')}</button>
        </div>
      </div>
    `;
  };
}

customElements.define('confirm-modal', ConfirmModal);
