import { LitElement, html, css } from 'lit';

export class ListSvg extends LitElement {
    static styles = css`
    :host {
      display: inline-block;
      width: 24px;
      height: 24px;
    }
    .icon-wrapper {
        cursor: pointer;
        display: inline-block;
    }
  `;

    render() {
        return html`
    <div class="icon-wrapper">
    <svg viewBox="0 -2.65 19.8 19.8" xmlns="http://www.w3.org/2000/svg" fill="#FF6600">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <g id="list-2" transform="translate(-2.2 -4.75)">
            <line id="primary-upstroke" x2="0.1" transform="translate(3.45 6)" fill="none" stroke="#FF6600" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></line>
            <line id="primary-upstroke-2" data-name="primary-upstroke" x2="0.1" transform="translate(3.45 12)" fill="none" stroke="#FF6600" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></line>
            <line id="primary-upstroke-3" data-name="primary-upstroke" x2="0.1" transform="translate(3.45 18)" fill="none" stroke="#FF6600" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></line>
            <path id="primary" d="M9,6H21M9,12H21M9,18H21" fill="none" stroke="#FF6600" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
          </g>
        </g>
      </svg>
    </div>
    `;
    }
}

customElements.define('list-svg', ListSvg);
