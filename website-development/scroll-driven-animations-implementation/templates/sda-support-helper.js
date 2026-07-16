/**
 * Scroll-Driven Animations Support Helper
 * Use this to detect support and apply fallbacks or classes.
 */

const checkSDASupport = () => {
  const isSupported = 'animationTimeline' in document.documentElement.style;

  if (isSupported) {
    document.documentElement.classList.add('sda-supported');
  } else {
    document.documentElement.classList.add('sda-not-supported');
    console.warn('Scroll-Driven Animations are not supported in this browser.');
  }

  return isSupported;
};

export default checkSDASupport;
