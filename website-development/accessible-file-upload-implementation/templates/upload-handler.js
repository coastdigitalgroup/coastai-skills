/**
 * Accessible File Upload Handler
 * Manages drag-and-drop, file selection, and ARIA announcements.
 */
class AccessibleUploader {
    constructor(config) {
        this.container = document.querySelector(config.selector);
        this.dropZone = this.container.querySelector('#drop-zone');
        this.input = this.container.querySelector('input[type="file"]');
        this.previewList = this.container.querySelector('#file-preview-list');
        this.announcer = this.container.querySelector('#upload-announcer');
        this.errorMsg = this.container.querySelector('#upload-error-msg');

        this.selectedFiles = new Set();
        this.init();
    }

    init() {
        // Drag and drop events
        ['dragenter', 'dragover'].forEach(name => {
            this.dropZone.addEventListener(name, (e) => this.highlight(e));
        });

        ['dragleave', 'drop'].forEach(name => {
            this.dropZone.addEventListener(name, (e) => this.unhighlight(e));
        });

        this.dropZone.addEventListener('drop', (e) => this.handleDrop(e));

        // Input change event
        this.input.addEventListener('change', (e) => this.handleFiles(e.target.files));
    }

    highlight(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dropZone.classList.add('is-dragging');
    }

    unhighlight(e) {
        e.preventDefault();
        e.stopPropagation();
        this.dropZone.classList.remove('is-dragging');
    }

    handleDrop(e) {
        const dt = e.dataTransfer;
        this.handleFiles(dt.files);
    }

    handleFiles(files) {
        const fileArray = Array.from(files);
        this.errorMsg.textContent = ''; // Clear previous errors

        fileArray.forEach(file => {
            // Validation Logic
            if (this.isValid(file)) {
                this.addFile(file);
            } else {
                this.showError(`Cannot upload "${file.name}". Invalid type or size.`);
            }
        });

        this.announce(`${fileArray.length} files processed. ${this.selectedFiles.size} total selected.`);
    }

    isValid(file) {
        // Example: max 2MB
        const maxSize = 2 * 1024 * 1024;
        return file.size <= maxSize;
    }

    addFile(file) {
        if (this.selectedFiles.has(file.name)) return;

        this.selectedFiles.add(file.name);

        const li = document.createElement('li');
        li.className = 'preview-item';
        li.innerHTML = `
            <span class="preview-name">${file.name}</span>
            <button type="button" class="preview-remove" aria-label="Remove ${file.name}">
                &times;
            </button>
        `;

        li.querySelector('button').addEventListener('click', () => {
            this.removeFile(file.name, li);
        });

        this.previewList.appendChild(li);
    }

    removeFile(fileName, element) {
        this.selectedFiles.delete(fileName);
        element.remove();
        this.announce(`${fileName} removed.`);

        // Return focus to input or next available item
        if (this.selectedFiles.size === 0) {
            this.input.focus();
        } else {
            // Focus management logic here
        }
    }

    announce(message) {
        this.announcer.textContent = message;
    }

    showError(message) {
        this.errorMsg.textContent = message;
        this.announce(`Error: ${message}`);
    }
}

// Usage:
// new AccessibleUploader({ selector: '#upload-widget' });
