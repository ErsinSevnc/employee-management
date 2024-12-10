import { PaginationComponent } from '../src/components/PaginationComponent';
import { assert } from '@open-wc/testing';

suite('PaginationComponent Logic Tests', () => {
  test('is defined', () => {
    const el = document.createElement('pagination-component');
    assert.instanceOf(el, PaginationComponent);
  });

  test('displays the correct range of pages', async () => {
    const el = document.createElement('pagination-component');
    el.currentPage = 6;
    el.totalPages = 20;
    document.body.appendChild(el);

    await el.updateComplete;
    const { startPage, endPage } = el.pageRange;

    assert.equal(startPage, 6, 'Start page should be 6 for currentPage 6');
    assert.equal(endPage, 10, 'End page should be 10 for currentPage 6');
    document.body.removeChild(el);
  });

  test('disables "previous" button on the first page', async () => {
    const el = document.createElement('pagination-component');
    el.currentPage = 1;
    el.totalPages = 10;
    document.body.appendChild(el);

    await el.updateComplete;
    const previousButton = el.shadowRoot.querySelector('.indicator-btn:first-of-type');
    assert.isTrue(previousButton.disabled, '"Previous" button should be disabled on the first page');
    document.body.removeChild(el);
  });

  test('disables "next" button on the last page', async () => {
    const el = document.createElement('pagination-component');
    el.currentPage = 10;
    el.totalPages = 10;
    document.body.appendChild(el);

    await el.updateComplete;
    const nextButton = el.shadowRoot.querySelector('.indicator-btn:last-of-type');
    assert.isTrue(nextButton.disabled, '"Next" button should be disabled on the last page');
    document.body.removeChild(el);
  });

  test('handles single-page case correctly', async () => {
    const el = document.createElement('pagination-component');
    el.currentPage = 1;
    el.totalPages = 1;
    document.body.appendChild(el);

    await el.updateComplete;
    const buttons = el.shadowRoot.querySelectorAll('.page-button');
    const previousButton = el.shadowRoot.querySelector('.indicator-btn:first-of-type');
    const nextButton = el.shadowRoot.querySelector('.indicator-btn:last-of-type');

    assert.lengthOf(buttons, 1, 'No page buttons should be displayed for a single-page case');
    assert.isTrue(previousButton.disabled, '"Previous" button should be disabled for a single page');
    assert.isTrue(nextButton.disabled, '"Next" button should be disabled for a single page');
    document.body.removeChild(el);
  });

  test('renders correct ellipsis for pages far apart', async () => {
    const el = document.createElement('pagination-component');
    el.currentPage = 15;
    el.totalPages = 20;
    document.body.appendChild(el);

    await el.updateComplete;
    const ellipsisLeft = el.shadowRoot.querySelector('.ellipsis:first-of-type');
    const ellipsisRight = el.shadowRoot.querySelector('.ellipsis:last-of-type');

    assert.exists(ellipsisLeft, 'Left ellipsis should exist');
    assert.exists(ellipsisRight, 'Right ellipsis should exist');
    document.body.removeChild(el);
  });
});
