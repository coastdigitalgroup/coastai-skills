/**
 * Reusable Accessible File Upload Handler
 */
class FileUploadHandler {
  constructor(config) {
    this.dropZone = document.getElementById(config.dropZoneId);
    this.input = document.getElementById(config.inputId);
    this.listContainer = document.getElementById(config.listId);
    this.statusContainer = document.getElementById(config.statusId);
    this.maxSize = config.maxSize || 5 * 1024 * 1024;
    this.allowedTypes = config.allowedTypes || ['image/jpeg', 'image/png'];

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Drag and Drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      this.dropZone.addEventListener(event, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    this.dropZone.addEventListener('dragenter', () => this.dropZone.classList.add('is-active'));
    this.dropZone.addEventListener('dragover', () => this.dropZone.classList.add('is-active'));
    this.dropZone.addEventListener('dragleave', () => this.dropZone.classList.remove('is-active'));
    this.dropZone.addEventListener('drop', e => {
      this.dropZone.classList.remove('is-active');
      this.handleFiles(e.dataTransfer.files);
    });

    // Native Input
    this.input.addEventListener('change', () => this.handleFiles(this.input.files));
  }

  handleFiles(files) {
    Array.from(files).forEach(file => this.validateAndProcess(file));
  }

  validateAndProcess(file) {
    if (!this.allowedTypes.includes(file.type)) {
      this.announce(`Error: ${file.name} is not an allowed file type.`);
      return;
    }

    if (file.size > this.maxSize) {
      this.announce(`Error: ${file.name} exceeds the maximum size of ${this.maxSize / 1024 / 1024}MB.`);
      return;
    }

    this.renderFile(file);
    this.announce(`${file.name} added to list.`);
  }

  renderFile(file) {
    const objectURL = URL.createObjectURL(file);
    const li = document.createElement('li');
    li.className = 'upload-item';

    // Using textContent for security
    const fileName = document.createElement('span');
    fileName.textContent = file.name;
    fileName.className = 'upload-item-name';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('aria-label', `Remove ${file.name}`);
    removeBtn.className = 'upload-item-remove';

    removeBtn.onclick = () => {
      li.remove();
      URL.revokeObjectURL(objectURL);
      this.announce(`${file.name} removed.`);
    };

    li.appendChild(fileName);
    li.appendChild(removeBtn);
    this.listContainer.appendChild(li);
  }

  announce(message) {
    if (this.statusContainer) {
      this.statusContainer.textContent = message;
    }
  }
}
