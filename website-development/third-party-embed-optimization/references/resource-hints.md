# Resource Hints for Third-Party Embeds

When using facades or lazy-loading, it's crucial to "warm up" the connection to the third-party domain so that when the user does interact, the content loads as quickly as possible.

## 1. `dns-prefetch`

The first step in a connection is resolving the domain name. `dns-prefetch` performs this resolution in the background.

```html
<link rel="dns-prefetch" href="https://www.youtube-nocookie.com">
```

- **When to use:** For domains you *might* need, or for older browsers (IE10+).
- **Overhead:** Extremely low.

## 2. `preconnect`

`preconnect` goes a step further by resolving DNS and performing the TCP handshake and TLS negotiation.

```html
<link rel="preconnect" href="https://www.youtube-nocookie.com">
```

- **When to use:** For domains you *know* will be used shortly after an interaction (like the video player domain).
- **Overhead:** Moderate (maintains an open connection). Limit to 2-4 critical domains.

## Common Third-Party Domains to Optimize

| Service | Domains to Preconnect |
| :--- | :--- |
| **YouTube** | `https://www.youtube-nocookie.com`, `https://www.google.com`, `https://googleads.g.doubleclick.net` |
| **Google Maps** | `https://maps.googleapis.com`, `https://maps.gstatic.com` |
| **Google Fonts** | `https://fonts.googleapis.com`, `https://fonts.gstatic.com` |
| **Intercom** | `https://widget.intercom.io`, `https://js.intercomcdn.com` |

## 3. Intersection Observer (Scroll-to-Load)

For content that should load as the user scrolls, use the `IntersectionObserver` with a `rootMargin` to start the connection before the element is visible.

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Start preconnecting or loading the embed
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'https://third-party-domain.com';
      document.head.appendChild(link);

      observer.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '600px' // Start 600px before it enters the viewport
});
```
