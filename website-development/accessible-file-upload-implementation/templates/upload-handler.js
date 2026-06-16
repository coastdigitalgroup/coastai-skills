/**
 * FileUploadHandler
 * A reusable class for managing accessible file uploads with drag-and-drop.
 */
class FileUploadHandler {
  constructor(options) {
    this.dropZone = document.querySelector(options.dropZoneSelector);
    this.input = document.querySelector(options.inputSelector);
    this.previewGrid = document.querySelector(options.previewGridSelector);
    this.statusSR = document.querySelector(options.statusSRSelector);
    this.statusVisible = document.querySelector(options.statusVisibleSelector);

    this.maxSize = options.maxSize || 5 * 1024 * 1024; // Default 5MB
    this.allowedTypes = options.allowedTypes || [];
    this.onFilesSelected = options.onFilesSelected || (() => {});

    this.files = new Map(); // Store processed files

    this.init();
  }

  init() {
    if (!this.dropZone || !this.input) return;

    // Drag-and-drop event listeners
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      this.dropZone.addEventListener(eventName, () => {
        this.dropZone.classList.add('is-drag-over');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.dropZone.addEventListener(eventName, () => {
        this.dropZone.classList.remove('is-drag-over');
      }, false);
    });

    this.dropZone.addEventListener('drop', (e) => {
      const droppedFiles = Array.from(e.dataTransfer.files);
      this.handleFiles(droppedFiles);
    });

    this.input.addEventListener('change', (e) => {
      const selectedFiles = Array.from(e.target.files);
      this.handleFiles(selectedFiles);
      // Clear input so same file can be selected again
      this.input.value = '';
    });
  }

  handleFiles(fileList) {
    let successCount = 0;

    fileList.forEach(file => {
      const error = this.validateFile(file);
      if (error) {
        this.updateStatus(error, 'error');
        return;
      }

      const fileId = Math.random().toString(36).substr(2, 9);
      this.files.set(fileId, file);

      if (this.previewGrid && file.type.startsWith('image/')) {
        this.renderPreview(file, fileId);
      }

      successCount++;
    });

    if (successCount > 0) {
      this.updateStatus(`Added ${successCount} file(s).`, 'success');
      this.onFilesSelected(Array.from(this.files.values()));
    }
  }

  validateFile(file) {
    if (this.allowedTypes.length > 0 && !this.allowedTypes.includes(file.type)) {
      return `Error: File type "${file.type}" not allowed for ${file.name}.`;
    }
    if (file.size > this.maxSize) {
      return `Error: File "${file.name}" exceeds the size limit.`;
    }
    return null;
  }

  renderPreview(file, fileId) {
    const item = document.createElement('div');
    item.className = 'upload-preview-item';
    item.dataset.id = fileId;

    const img = document.createElement('img');
    const url = URL.createObjectURL(file);
    img.src = url;
    img.alt = `Preview of ${file.name}`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'upload-remove-btn';
    removeBtn.innerHTML = 'Remove';
    removeBtn.setAttribute('aria-label', `Remove ${file.name}`);

    removeBtn.onclick = () => {
      this.files.delete(fileId);
      item.remove();
      URL.revokeObjectURL(url);
      this.updateStatus(`Removed ${file.name}.`, 'success');
    };

    item.appendChild(img);
    item.appendChild(removeBtn);
    this.previewGrid.appendChild(item);
  }

  updateStatus(message, type) {
    if (this.statusSR) this.statusSR.textContent = message;

    if (this.statusVisible) {
      this.statusVisible.textContent = message;
      this.statusVisible.className = `upload-status is-${type}`;
    }
  }
}
