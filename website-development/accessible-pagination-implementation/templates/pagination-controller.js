/**
 * Pagination Controller Utility
 * Handles state updates and focus management for AJAX pagination.
 */
class PaginationController {
  constructor(options) {
    this.navElement = options.navElement;
    this.contentTarget = options.contentTarget; // Element to focus after update
    this.onPageChange = options.onPageChange; // Callback function
    this.totalPages = options.totalPages;
    this.currentPage = 1;

    this.init();
  }

  init() {
    this.navElement.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn || btn.disabled) return;

      if (btn.id === 'pagination-prev') {
        this.goToPage(this.currentPage - 1);
      } else if (btn.id === 'pagination-next') {
        this.goToPage(this.currentPage + 1);
      } else {
        const pageNum = parseInt(btn.textContent);
        if (!isNaN(pageNum)) {
          this.goToPage(pageNum);
        }
      }
    });
  }

  async goToPage(page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;

    this.currentPage = page;

    // 1. Notify listeners/Fetch data
    await this.onPageChange(this.currentPage);

    // 2. Update UI State
    this.updatePaginationUI();

    // 3. FOCUS MANAGEMENT: Restore focus to content
    if (this.contentTarget) {
      // Ensure target has tabindex if it's not naturally focusable
      if (!this.contentTarget.hasAttribute('tabindex')) {
        this.contentTarget.setAttribute('tabindex', '-1');
      }
      this.contentTarget.focus();
    }
  }

  updatePaginationUI() {
    const buttons = this.navElement.querySelectorAll('.pagination-btn');

    buttons.forEach(btn => {
      const pageNum = parseInt(btn.textContent);

      // Update aria-current
      if (pageNum === this.currentPage) {
        btn.setAttribute('aria-current', 'page');
      } else {
        btn.removeAttribute('aria-current');
      }

      // Update Prev/Next disabled states
      if (btn.id === 'pagination-prev') {
        btn.disabled = this.currentPage === 1;
      }
      if (btn.id === 'pagination-next') {
        btn.disabled = this.currentPage === this.totalPages;
      }
    });
  }
}
