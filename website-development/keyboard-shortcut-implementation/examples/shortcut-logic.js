/**
 * Keyboard Shortcut Implementation Example
 * Demonstrates: Platform normalization, context awareness, and event prevention.
 */

const searchModal = document.getElementById('search-modal');
const searchInput = document.getElementById('search-input');

function toggleSearch(show) {
    if (show) {
        searchModal.classList.add('active');
        searchInput.focus();
    } else {
        searchModal.classList.remove('active');
        searchInput.value = '';
    }
}

document.addEventListener('keydown', (event) => {
    // 1. Detect platform modifier (Cmd on Mac, Ctrl on Win/Linux)
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isPrimaryModifier = isMac ? event.metaKey : event.ctrlKey;

    // 2. Context Awareness: Don't trigger if user is typing in an input
    // (Unless it's the Escape key to close the current modal)
    const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) ||
                     document.activeElement.isContentEditable;

    // 3. Shortcut: Primary Modifier + K (Search)
    if (isPrimaryModifier && event.key.toLowerCase() === 'k') {
        // Prevent browser's default "Duplicate Tab" or "Focus URL" if applicable
        event.preventDefault();
        toggleSearch(true);
        console.log('Search opened via shortcut');
        return;
    }

    // 4. Shortcut: Escape (Close Search)
    if (event.key === 'Escape') {
        toggleSearch(false);
        console.log('Search closed via Escape');
        return;
    }
});
