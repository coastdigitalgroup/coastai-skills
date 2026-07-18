# Adaptive Loading Heuristics & Device Tier Specifications

This reference document provides technical specifications, browser API details, and performance correlation data for implementing Adaptive Loading on websites.

---

## 1. Device Tier Classification Heuristics

To make adaptive decisions easy and maintainable, devices should be grouped into three coarse tiers based on hardware and connection constraints.

```
                    ┌─────────────────────────┐
                    │  Environment Inputs     │
                    │  (Network & Hardware)   │
                    └────────────┬────────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   │  Is Data Saver Active?    ├─────── Yes ──────► [ LOW TIER ]
                   │  (SaveData / Media Query) │                    (Data-Saver Profile)
                   └─────────────┬─────────────┘
                                 │ No
                   ┌─────────────┴─────────────┐
                   │   Is Connection Speed     ├─────── Yes ──────► [ LOW TIER ]
                   │   Slow? (Slow-2G/2G/3G)   │                    (Slow-Network Profile)
                   └─────────────┬─────────────┘
                                 │ No
                   ┌─────────────┴─────────────┐
                   │  Is Hardware Constrained? ├─────── Yes ──────► [ LOW TIER ]
                   │  (Memory <= 2G, Core <= 2)│                    (Constrained Profile)
                   └─────────────┬─────────────┘
                                 │ No
                   ┌─────────────┴─────────────┐
                   │   Is Hardware Mid-Tier?   ├─────── Yes ──────► [ MEDIUM TIER ]
                   │  (Memory <= 4G, Core <= 4)│                    (Mid-Range Profile)
                   └─────────────┬─────────────┘
                                 │ No
                                 ▼
                           [ HIGH TIER ]
                         (Premium Profile)
```

### Low-Tier (Constrained / Economical)
- **Primary Characteristics:** Very low-performance CPU/GPU, extremely limited system memory (RAM), or restricted/slow internet.
- **Trigger Conditions:**
  - `navigator.connection.saveData === true` OR
  - Media query `(prefers-reduced-data: reduce)` matches OR
  - `navigator.connection.effectiveType` is `'slow-2g'`, `'2g'`, or `'3g'` OR
  - `navigator.deviceMemory <= 2` OR
  - `navigator.hardwareConcurrency <= 2`
- **Development Policy:** Minimalist script execution, no background transfers, purely static layouts, zero speculative asset fetching.

### Medium-Tier (Standard / Mid-Range)
- **Primary Characteristics:** Moderate processor and GPU capabilities, sufficient RAM for normal usage, but prone to execution delays on complex canvas renderings or intensive interactive animations.
- **Trigger Conditions:**
  - `navigator.deviceMemory === 4` OR
  - `navigator.hardwareConcurrency === 4` (while on 4G connections and without active data-saver preference).
- **Development Policy:** Solid layout styling, smooth CSS-driven animations, limited background speculative loads (maximum 1 high-probability route), load 2D graphics but scale down WebGL or massive particle engines.

### High-Tier (Premium / Advanced)
- **Primary Characteristics:** Multi-core processors, plentiful RAM, fast unmetered networks (broadband, Wi-Fi, premium 4G/5G).
- **Trigger Conditions:**
  - `navigator.deviceMemory > 4` AND
  - `navigator.hardwareConcurrency > 4` AND
  - `effectiveType === '4g'` (or unmetered connection profile).
- **Development Policy:** Full rich feature set enabled, autoplay background loops, high-definition assets, advanced speculative prefetching/prerendering, immersive WebGL/3D canvases, maximum fidelity.

---

## 2. Browser APIs & Compatibility Specifications

Because several adaptive loading APIs are non-standard or exclusive to Chromium, your implementations must understand how individual browsers report or restrict access to these properties.

| API / Feature | Chromium (Chrome, Edge, Opera, Brave) | Mozilla Firefox | Apple Safari (iOS & macOS) | Safe Fallback Value |
| :--- | :--- | :--- | :--- | :--- |
| **`navigator.connection`** | Full Support (Includes `effectiveType`, `saveData`, `rtt`, `downlink`) | No Support (Returns `undefined`) | No Support (Returns `undefined`) | Fall back to standard `4g` profile; assume data-saver is `false`. |
| **`navigator.deviceMemory`**| Full Support (Capped at `8` to prevent fingerprinting) | No Support (Returns `undefined`) | No Support (Returns `undefined`) | Fall back to `8` or `null`. Treat device as high-tier unless media queries say otherwise. |
| **`navigator.hardwareConcurrency`**| Full Support | Full Support | Full Support (May return lower count on low-power modes) | Fall back to `4` cores. |
| **`(prefers-reduced-data)`**| Experimental (Requires flag in some versions) | Support | Support (Since iOS 15 / macOS Monterey) | Fall back to `false` if unsupported. |
| **`(prefers-reduced-motion)`**| Full Support | Full Support | Full Support | Fall back to `false`. |

---

## 3. Core Web Vitals Correlation

Adaptive Loading directly affects critical Core Web Vitals (CWV) metrics, particularly for users on mobile hardware or poor cell networks.

### Largest Contentful Paint (LCP)
- **How it's improved:** By dynamically swapping a background hero video with a lightweight CSS-background poster image, you save several megabytes of bandwidth during the initial render phase. This lets the browser load the main hero content and LCP image instantly without competing for network socket slots.
- **Target Impact:** Bypassing video loops can reduce LCP on 3G connections by **60% to 80%** (saving multiple seconds of visual load time).

### Interaction to Next Paint (INP) & Total Blocking Time (TBT)
- **How it's improved:** If the device has low memory (< 2GB) or fewer CPU cores (< 2), skipping WebGL canvas scene rendering, particle calculations, or heavy DOM manipulations prevents the main thread from locking up.
- **Target Impact:** Avoids "Long Tasks" (any JS task exceeding 50ms) during user click or scroll interactions. Reduces TBT to < 200ms and preserves INP within the "Good" range (< 200ms), even under 6x CPU throttling emulation.

### Cumulative Layout Shift (CLS)
- **How it's improved:** Swapping elements can cause layout shifts if the container sizes are not matched. When using adaptive component rendering:
  1. Define explicit layout wrappers with `aspect-ratio` or defined `width` and `height`.
  2. Maintain identical container dimensions regardless of whether it renders a video or a static poster, ensuring a CLS score of exactly **0.00**.
