/**
 * PaginationController: A boilerplate for handling AJAX-based pagination
 * with focus management and ARIA state updates.
 */
class PaginationController {
  constructor(options) {
    this.container = document.querySelector(options.containerSelector);
    this.nav = document.querySelector(options.navSelector);
    this.statusElement = document.querySelector(options.statusSelector);
    this.onPageChange = options.onPageChange;

    this.init();
  }

  init() {
    this.nav.addEventListener('click', (e) => {
      const btn = e.target.closest('.pagination-btn');
      if (btn && !btn.hasAttribute('aria-current') && !btn.disabled) {
        const pageNum = btn.dataset.page;
        this.handlePageChange(pageNum, btn);
      }
    });
  }

  async handlePageChange(pageNum, btn) {
    // 1. Trigger the data fetch (external logic)
    if (this.onPageChange) {
      this.container.setAttribute('aria-busy', 'true');

      try {
        await this.onPageChange(pageNum);

        // 2. Update ARIA states
        this.updateAriaState(btn);

        // 3. Update Live Region Status
        if (this.statusElement) {
          this.statusElement.textContent = `Showing page ${pageNum}. Content updated.`;
        }

        // 4. CRITICAL: Manage Focus
        // We move focus to the container so the screen reader identifies the change.
        this.container.setAttribute('tabindex', '-1');
        this.container.focus();

        // 5. Reset busy state
        this.container.setAttribute('aria-busy', 'false');

        // 6. Scroll to top of results (optional but recommended)
        this.container.scrollIntoView({ behavior: 'smooth', block: 'start' });

      } catch (error) {
        console.error('Pagination failed:', error);
        this.container.setAttribute('aria-busy', 'false');
      }
    }
  }

  updateAriaState(activeBtn) {
    const allBtns = this.nav.querySelectorAll('.pagination-btn');
    allBtns.forEach(btn => {
      btn.removeAttribute('aria-current');
    });
    activeBtn.setAttribute('aria-current', 'page');
  }
}

// Example usage:
/*
const pager = new PaginationController({
  containerSelector: '#results-grid',
  navSelector: '#pagination-nav',
  statusSelector: '#sr-status',
  onPageChange: async (page) => {
    const data = await fetch(`/api/items?page=${page}`).then(r => r.json());
    renderItems(data);
  }
});
*/
