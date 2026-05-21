/**
 * Robust Intersection Observer Loader Template
 *
 * A clean, performant, and accessible boilerplate for progressive loading.
 */

class ContentLoader {
  constructor(options = {}) {
    this.container = document.querySelector(options.containerSelector || '#content-grid');
    this.sentinel = document.querySelector(options.sentinelSelector || '#scroll-sentinel');
    this.status = document.querySelector(options.statusSelector || '#loader-status');
    this.baseUrl = options.baseUrl;
    this.pageSize = options.pageSize || 10;

    this.page = 1;
    this.isLoading = false;
    this.isFinished = false;

    this.init();
  }

  init() {
    if (!this.sentinel) return;

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.isLoading && !this.isFinished) {
        this.loadMore();
      }
    }, {
      rootMargin: '400px', // Fetch early for smoother UX
    });

    this.observer.observe(this.sentinel);
  }

  async loadMore() {
    this.isLoading = true;
    this.updateStatus('Loading more items...');
    this.container.classList.add('is-loading');

    try {
      const response = await fetch(`${this.baseUrl}?page=${this.page + 1}&limit=${this.pageSize}`);
      const data = await response.json();

      if (data.length === 0) {
        this.isFinished = true;
        this.updateStatus('All items loaded.');
        this.observer.disconnect();
      } else {
        this.page++;
        this.renderItems(data);
        this.updateStatus(`${data.length} new items loaded.`);
      }
    } catch (error) {
      console.error('Failed to load items:', error);
      this.updateStatus('Error loading items. Please try again.');
      // Optional: Add a retry button to the UI
    } finally {
      this.isLoading = false;
      this.container.classList.remove('is-loading');
    }
  }

  renderItems(items) {
    const fragment = document.createDocumentFragment();

    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'grid-item';

      // Use a safer rendering approach to prevent XSS
      const title = document.createElement('h3');
      title.textContent = item.title;

      const desc = document.createElement('p');
      desc.textContent = item.description;

      el.appendChild(title);
      el.appendChild(desc);
      fragment.appendChild(el);
    });

    this.container.appendChild(fragment);
  }

  updateStatus(msg) {
    if (this.status) {
      this.status.textContent = msg;
    }
  }
}

// Usage:
// const loader = new ContentLoader({
//   containerSelector: '#product-grid',
//   sentinelSelector: '#sentinel',
//   statusSelector: '#sr-status',
//   baseUrl: '/api/products'
// });
