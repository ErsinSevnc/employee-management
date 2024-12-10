import { LitElement, html, css } from 'lit';
import { translate } from '../utils/translator.js';

export class PaginationComponent extends LitElement {
  static styles = css`
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 24px;
    }
    .indicator-btn {
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
    .indicator-btn:disabled {
      border: none;
      background-color: transparent;
      cursor: not-allowed;
    }
    .pagination button.active {
      background-color: #FF6600;
      color: white;
    }
    .page-button {
      margin: 0 2px;
      padding: 5px 8px;
      cursor: pointer;
      background-color: transparent;
      color: black;
      border-radius: 50%;
      border-color: transparent;
    }
    .ellipsis {
      cursor: pointer;
      padding: 5px 10px;
      background-color: transparent;
      color: black;
      border-radius: 50%;
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

  get pageRange() {
    const startPage = Math.floor((this.currentPage - 1) / 5) * 5 + 1;
    const endPage = Math.min(startPage + 4, this.totalPages);
    return { startPage, endPage };
  }

  handleEllipsisClick(isLeftEllipsis) {
    const { startPage, endPage } = this.pageRange;
  
    const nextStartPage = isLeftEllipsis 
      ? Math.max(startPage - 5, 1)
      : Math.min(endPage + 1, this.totalPages - 4);
  
    const nextEndPage = isLeftEllipsis 
      ? nextStartPage + 4 
      : Math.min(nextStartPage + 4, this.totalPages);
  
    this.onChangePage(nextStartPage);
  }

  render() {
    const { startPage, endPage } = this.pageRange;
    return html`
      <div class="pagination">
        <button
          class="indicator-btn"
          ?disabled="${this.currentPage === 1}"
          @click="${() => this.onChangePage(this.currentPage - 1)}"
        >
          ${translate('previous')}
        </button>

        ${startPage > 1 ? html`<button class="page-button" @click="${() => this.onChangePage(1)}">1</button>` : ''} 
        ${startPage > 2 ? html`<span class="ellipsis" @click="${() => this.handleEllipsisClick(true)}">...</span>` : ''}
        
        ${Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
          (page) => html`
            <button
              class="${this.currentPage === page ? 'active' : ''} page-button"
              @click="${() => this.onChangePage(page)}"
            >
              ${page}
            </button>
          `
        )}

        ${endPage < this.totalPages - 1 ? html`<span class="ellipsis" @click="${() => this.handleEllipsisClick(false)}">...</span>` : ''}
        ${endPage < this.totalPages ? html`<button class="page-button" @click="${() => this.onChangePage(this.totalPages)}">${this.totalPages}</button>` : ''}

        <button
          class="indicator-btn"
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
