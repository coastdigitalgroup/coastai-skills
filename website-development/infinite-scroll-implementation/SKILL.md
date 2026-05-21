---
name: infinite-scroll-implementation
description:
  Implement and debug progressive content loading patterns (Infinite Scroll and
  "Load More") using Intersection Observer, ensuring performance, accessibility,
  and SEO compatibility.
---

# Infinite Scroll & "Load More" Implementation

## Purpose

The Infinite Scroll & "Load More" Implementation skill provides a technical
protocol for progressively loading large datasets or feeds as the user scrolls
or interacts. It focuses on balancing performance (reducing initial payload),
accessibility (ensuring screen readers are notified of new content), and UX
(managing scroll position and preventing "unreachable footers").

## Use Cases

- **Product Grids:** Loading more items in an e-commerce category page.
- **Content Feeds:** News articles, social media posts, or activity logs.
- **Search Results:** Displaying large sets of results without heavy
  pagination.
- **Image Galleries:** Handling high-resolution assets by loading them only as
  needed.

## When NOT to Use

- **Small Datasets:** If all items can be loaded under 500ms and don't bloat the
  DOM, load them all at once.
- **Static Content:** Content that must be fully present for simple
  "Find in Page" (Ctrl+F) functionality to be useful (e.g., a single long
  article).
- **Critical Legal/Info Pages:** Privacy policies or Terms of Service should be
  fully loaded and printable.
- **Highly Structured Data with Specific Page References:** If users need to
  frequently share or bookmark "Page 5" specifically, traditional pagination is
  better.

## Inputs

1. **Data Source:** An API endpoint or data array that supports offset/limit or
   cursor-based pagination.
2. **Container Element:** The DOM element where the items will be appended.
3. **Threshold/Trigger:** The point at which new content should be fetched
   (e.g., "Load More" button or a scroll sentinel).
4. **Item Template:** The HTML/Component structure for individual items.

## Outputs

1. **Progressive Loader Logic:** JavaScript using `IntersectionObserver` or
   event listeners to trigger fetches.
2. **Accessible Feedback:** Implementation of `aria-live` and focus management.
3. **State Management:** Logic for "Loading," "Error," and "End of Data"
   states.
4. **Optimized CSS:** Styles for loaders, skeletons, and container stability.

## Workflow

### 1. Choose the Interaction Pattern

- **"Load More" Button:** Best for user control and reaching the footer.
- **Infinite Scroll:** Best for discovery-heavy feeds (e.g., social media).
- **Hybrid Pattern:** Infinite scroll for the first 2-3 pages, then a "Load
  More" button to prevent footer occlusion.

### 2. Implement the Fetch Logic

- Use `fetch` or a data library to request the next "chunk" of data.
- Use **Cursor-based Pagination** over Offset-based if the data is frequently
  updated (to prevent duplicate items when new items are added to the top).

### 3. Setup the Intersection Observer (for Infinite Scroll)

- Create a "Sentinel" element at the bottom of the list.
- Observe the sentinel; when it enters the viewport, trigger the next fetch.
- Disconnect or unobserve the sentinel while a fetch is in progress to prevent
  duplicate requests.

### 4. Manage Accessibility (The "Missing" Link)

- **Announcement:** Use a container with `aria-live="polite"` to announce when
  new items are added (e.g., "Loading more items..." followed by "10 more items
  added").
- **Focus:** If using a "Load More" button, ensure focus returns to the first
  newly added item or remains on the button (depending on the UX flow).
- **Keyboard:** Ensure the "Load More" button is in the standard tab order.

### 5. Handle UI States

- **Loading:** Show a spinner or skeleton screen (see
  `skeleton-screen-implementation`).
- **Error:** Provide a "Retry" button if the fetch fails.
- **Finished:** Clearly indicate when no more items are available (e.g., "You've
  reached the end").

### 6. Optimize Performance

- **Virtualization:** For extremely large lists (thousands of items), use
  windowing/virtualization to only render items in or near the viewport.
- **Debouncing:** If not using Intersection Observer, debounce scroll events.

## Decision Rules

- **Use "Load More" if:** The page has a footer with important links (Contact,
  Support, Social).
- **Use "Infinite Scroll" if:** The primary goal is "lean-back" consumption
  where the footer is non-essential.
- **Prefer Intersection Observer over Scroll Listeners:** It is significantly
  more performant as it doesn't run on every pixel scrolled.
- **Cursor over Offset:** Always prefer cursors for real-time feeds to avoid
  the "Double Item" bug when new content is inserted.

## Constraints

- **Back Button / Scroll Restoration:** If a user clicks a product and then
  goes back, they should ideally return to the same scroll position and have
  the previous items already loaded.
- **URL Sync:** Optionally update the URL (e.g., `?page=3`) so the state can be
  shared.
- **SEO:** Ensure the first "page" of content is in the initial HTML so
  crawlers can see it. Use `<link rel="next">` if appropriate.

## Non-Goals

- Implementing the backend API or database queries.
- Designing the individual item components (Cards, Rows).
- General page layout beyond the loading container.

## Common Failure Patterns

- **The Unreachable Footer:** Infinite scroll loading so fast that the user
  can never click links in the footer.
- **Duplicate Requests:** Not checking the `isLoading` state before triggering
   another fetch.
- **Layout Thrashing:** Adding items one-by-one instead of in a single batch,
  causing multiple reflows.
- **Accessibility Silence:** Users on screen readers have no idea more content
  has been added or that a loading state is active.
- **Memory Leaks:** Not disconnecting observers or removing event listeners
  when the component is destroyed.

## Validation Steps

- [ ] **Throttle Test:** Use "Slow 3G" in DevTools; does the loading indicator
      appear correctly?
- [ ] **Keyboard Test:** (For Load More) Can I trigger the load and move to the
      new items using only the keyboard?
- [ ] **Screen Reader Test:** Is the "Loading" state and the addition of new
      items announced?
- [ ] **Footer Check:** Can a user actually reach the footer (or is a "Load
      More" used)?
- [ ] **Duplicate Check:** Verify in the Network tab that only one request is
      sent per "page".
- [ ] **Scroll Restoration:** Navigate away and back; does the user land where
      they left off?
