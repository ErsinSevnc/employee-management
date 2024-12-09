import { LitElement, html, css } from 'lit';
import {translate} from '../utils/translator.js';

export class PaginationComponent extends LitElement {
  static styles = css`
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    .pagination button {
      margin: 0 5px;
      padding: 5px 10px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
    }
    .pagination button.active {
      background-color: #0056b3;
    }
    .pagination button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `;

  static properties = {
    currentPage: { type: Number },
    totalPages: { type: Number },
    onChangePage: { type: Function },
  };

  constructor() {
    super();
    this.currentPage = 1;
    this.totalPages = 1;
    this.onChangePage = () => {};
  }

  render() {
    return html`
      <div class="pagination">
        <button
          ?disabled="${this.currentPage === 1}"
          @click="${() => this.onChangePage(this.currentPage - 1)}"
        >
          ${translate('previous')}
        </button>
        ${Array.from({ length: this.totalPages }, (_, i) => i + 1).map(
          (page) => html`
            <button
              class="${this.currentPage === page ? 'active' : ''}"
              @click="${() => this.onChangePage(page)}"
            >
              ${page}
            </button>
          `
        )}
        <button
          ?disabled="${this.currentPage === this.totalPages}"
          @click="${() => this.onChangePage(this.currentPage + 1)}"
        >
          ${translate('next')}
        </button>
      </div>
    `;
  }
}

customElements.define('pagination-component', PaginationComponent);
