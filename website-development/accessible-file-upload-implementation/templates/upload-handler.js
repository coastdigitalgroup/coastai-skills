/**
 * Accessible File Upload Controller
 * Manages drag-and-drop, native input syncing, and ARIA announcements.
 *
 * Note: This implementation manages files in an internal `this.files` array,
 * which is ideal for Fetch/AJAX-based submissions.
 * For traditional multipart/form-data submissions, you would need to
 * synchronize this array back to the native input's `files` property using
 * DataTransfer, or append them to a FormData object on submit.
 */
class AccessibleUploader {
  constructor(config) {
    this.container = document.querySelector(config.selector);
    this.input = this.container.querySelector('input[type="file"]');
    this.dropZone = this.container.querySelector('[role="region"]');
    this.list = this.container.querySelector('.upload-list');
    this.announcer = this.container.querySelector('[aria-live]');
    this.files = [];

    this.init();
  }

  init() {
    // 1. Listen for native input changes
    this.input.addEventListener('change', (e) => this.handleFiles(e.target.files));

    // 2. Setup Drag and Drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      this.dropZone.addEventListener(event, (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    this.dropZone.addEventListener('dragenter', () => this.dropZone.classList.add('is-active'));
    this.dropZone.addEventListener('dragleave', () => this.dropZone.classList.remove('is-active'));
    this.dropZone.addEventListener('drop', (e) => {
      this.dropZone.classList.remove('is-active');
      this.handleFiles(e.dataTransfer.files);
    });

    // 3. Handle keyboard trigger on the drop zone
    // (Note: The input itself is also focusable and triggers the picker via Space/Enter)
    this.dropZone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.input.click();
      }
    });

    // 4. Click trigger
    this.dropZone.addEventListener('click', () => this.input.click());
  }

  handleFiles(fileList) {
    const newFiles = Array.from(fileList);
    newFiles.forEach(file => {
      // Basic validation example
      if (file.size > 10 * 1024 * 1024) {
        this.announce(`Error: ${file.name} is too large (max 10MB)`);
        return;
      }

      this.files.push(file);
      this.renderFileItem(file);
    });

    if (newFiles.length > 0) {
      this.announce(`${newFiles.length} file(s) added. Total: ${this.files.length}`);
    }
  }

  renderFileItem(file) {
    const li = document.createElement('li');
    li.className = 'upload-item';

    // Use textContent and setAttribute to prevent XSS from malicious filenames
    const nameSpan = document.createElement('span');
    nameSpan.className = 'file-name';
    nameSpan.textContent = file.name;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'remove-file';
    removeBtn.setAttribute('aria-label', `Remove ${file.name}`);
    removeBtn.innerHTML = '&times;'; // Hardcoded entity is safe

    removeBtn.addEventListener('click', () => {
      this.files = this.files.filter(f => f !== file);
      li.remove();
      this.announce(`Removed ${file.name}`);
      this.input.focus(); // Restore focus to the input for keyboard users
    });

    li.appendChild(nameSpan);
    li.appendChild(removeBtn);
    this.list.appendChild(li);
  }

  announce(message) {
    if (this.announcer) {
      this.announcer.textContent = message;
    }
  }
}

// Usage:
// const uploader = new AccessibleUploader({ selector: '#upload-component' });
