/**
 * Keyboard Shortcut Implementation Example
 */

const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const modLabel = isMac ? '⌘' : 'Ctrl';

// Update UI labels for the current platform
document.querySelectorAll('.mod').forEach(el => el.textContent = modLabel);
const modKeyLabel = document.getElementById('modKey');
const modKeyLabel2 = document.getElementById('modKey2');
if (modKeyLabel) modKeyLabel.textContent = modLabel;
if (modKeyLabel2) modKeyLabel2.textContent = modLabel;

const helpOverlay = document.getElementById('helpOverlay');
const commandPalette = document.getElementById('commandPalette');
const paletteInput = document.getElementById('paletteInput');
const statusMsg = document.getElementById('status');

function showStatus(text) {
    statusMsg.textContent = text;
    statusMsg.style.display = 'block';
    setTimeout(() => {
        statusMsg.style.display = 'none';
    }, 3000);
}

function toggleHelp() {
    helpOverlay.classList.toggle('active');
}

function togglePalette() {
    const isActive = commandPalette.classList.toggle('active');
    if (isActive) {
        paletteInput.focus();
    }
}

function closeAll() {
    helpOverlay.classList.remove('active');
    commandPalette.classList.remove('active');
}

// Global Keyboard Listener
window.addEventListener('keydown', (e) => {
    // 1. Identify if we should ignore the shortcut (e.g., in an input field)
    const isInput = e.target.closest('input, textarea, [contenteditable="true"]');

    // Some shortcuts (like Escape) should work even in inputs
    if (e.key === 'Escape') {
        closeAll();
        return;
    }

    // If we are in an input, don't trigger other shortcuts
    if (isInput) return;

    // 2. Platform-aware modifier check
    const isMod = isMac ? e.metaKey : e.ctrlKey;

    // 3. Match combinations

    // Show Help: '?'
    if (e.key === '?') {
        e.preventDefault();
        toggleHelp();
    }

    // Save: Mod + S
    if (isMod && e.key.toLowerCase() === 's') {
        e.preventDefault(); // Prevent browser "Save Page"
        showStatus('Project saved successfully!');
    }

    // Search/Palette: Mod + K
    if (isMod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        togglePalette();
    }
});
