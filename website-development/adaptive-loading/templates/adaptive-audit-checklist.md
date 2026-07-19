# Adaptive Loading Implementation & Audit Checklist

Use this checklist to audit any landing page or website for performance bottlenecks on low-end hardware and slow networks. Use these steps to guide the progressive enhancement of high-overhead components.

---

## 1. Network & Data Audit (The Bandwidth Gate)

- [ ] **LCP Asset Optimization:**
  - Are critical, visible images preloaded using `<link rel="preload">` on fast connections, but bypassed when on 3G or with data-saver enabled?
  - Does the Largest Contentful Paint (LCP) element avoid competing with non-essential tracking pixels or background video streams?
- [ ] **Dynamic Background Media:**
  - If a looping, silent hero background video is used, is it conditionally loaded only on high-tier connections?
  - Is there a clear static image poster placeholder rendered immediately to prevent a layout shift (CLS) when video loading is bypassed?
- [ ] **Speculative Link Prefetching:**
  - If the application uses hover-based or viewport-based prefetching (e.g., Quicklink, Instant.page, or native Speculation Rules), is this behavior disabled completely when `navigator.connection.saveData` is `true` or connection is slow?
- [ ] **Media Asset Budgeting:**
  - Are standard-definition images/video fallbacks prepared and configured for low-tier users rather than loading high-resolution visual elements by default?

---

## 2. Hardware & Thread Audit (The CPU/Memory Gate)

- [ ] **Dynamic Module Splitting:**
  - Are heavy libraries (like Three.js, heavy SVG rendering packages, dynamic plotting libraries, or complex canvas animation files) loaded conditionally via dynamic JavaScript imports `import()`?
- [ ] **Processor Core Check:**
  - Does the application check logical CPU counts (`navigator.hardwareConcurrency <= 2`) to downscale animation loops or reduce particle elements in complex canvases?
- [ ] **Device Memory Check:**
  - Does the page query `navigator.deviceMemory` and switch off high-overhead UI features (e.g., dynamic client-side filtering of long lists, drag-and-drop animations, or real-time autocomplete results) if RAM is 2GB or less?
- [ ] **Fallback Layout Design:**
  - When visual elements are disabled on low-end devices, does the layout fall back to simple CSS animations, solid background fills, or clean list structures instead of leaving empty holes?

---

## 3. User Choice & System Preferences

- [ ] **Data Reduction Preference:**
  - Does the page check for the `prefers-reduced-data` media query using `window.matchMedia('(prefers-reduced-data: reduce)')`?
  - If active, is the site operating under the absolute "Low-Data" tier, treating it as if saveData was enabled?
- [ ] **Motion Reduction Preference:**
  - Does the site check for `prefers-reduced-motion`?
  - If active, are transitions slowed down, simplified, or completely paused (especially loops, parallax, and slider carousels)?

---

## 4. Environment Change Resilience

- [ ] **Live Network Listeners:**
  - Does the script set up an event listener on the Connection API (`change` event)?
  - If a mobile user moves from Wi-Fi to a 3G cell zone, is the app's internal prefetching immediately paused or visual loops throttled down?
- [ ] **Cross-Browser Fallback Safety:**
  - Do all calls to `navigator.connection`, `navigator.deviceMemory`, and related properties use robust existence checks or safe wrappers to prevent script failures in Apple Safari and Mozilla Firefox?

---

## 5. Verification & Testing Routine

- [ ] **Slow Connection Simulation:**
  - Set browser network throttling to **Slow 3G** inside Chrome DevTools.
  - Verify that no video requests are sent, and the page is fully functional.
- [ ] **Data Saver Emulation:**
  - Enable "Save Data" option in browser emulation or mock the connection property:
    ```javascript
    Object.defineProperty(navigator, 'connection', {
      value: { saveData: true, effectiveType: '4g' },
      writable: true
    });
    ```
  - Reload and confirm that only low-data resources are requested.
- [ ] **Low-End Device Emulation:**
  - Set a 6x CPU slowdown inside the Performance panel.
  - Verify that interactive components degrade cleanly without thread locks.
- [ ] **Console Inspection:**
  - Verify that no errors or uncaught promise rejections occur when heavy optional dynamic imports are bypassed.
