# Avatar Composition Examples

This document demonstrates the application of the **User Avatar System** across
various UI contexts, showing how size, fallbacks, and grouping work in practice.

## 1. Global Navigation (MD Size)

In a top navigation bar, the avatar serves as the entry point for the user's
profile and settings.

- **Context:** Right-aligned in global header.
- **Size:** 40px (MD).
- **Behavior:** On click, opens a dropdown menu.
- **Accessibility:** `aria-label="User menu for Jane Doe"`.

```html
<header class="site-header">
  <div class="user-menu-trigger">
    <img
      src="/assets/avatars/jane-doe.jpg"
      alt="Jane Doe"
      class="avatar avatar-md"
    />
    <span class="status-indicator status-online" aria-label="Online"></span>
  </div>
</header>
```

## 2. Activity Feed with Fallbacks (SM/XS Sizes)

A stream of events where some users have uploaded images and others rely on
system-generated initials.

- **Actor 1:** Has image. Size SM (32px).
- **Actor 2:** No image. Size SM (32px). Initials "BK".
- **Visuals:** Initials use a background color generated from the user ID.

```markdown
| Actor | Action | Time |
| :--- | :--- | :--- |
| [Avatar: Sarah] | Updated the "Project Alpha" spec | 2m ago |
| [Avatar: BK] | Commented on the proposal | 15m ago |
```

## 3. Collaborative Avatar Stack (SM Size)

Used in a document header to show who else is currently viewing or editing the
file.

- **Limit:** 4 visible avatars.
- **Overlap:** 20% overlap with a 2px white border for separation.
- **Overflow:** A "+3" circle for additional participants.

```html
<div class="avatar-group">
  <div class="avatar-stack">
    <img src="user1.jpg" alt="Alice" class="avatar avatar-sm stack-item" />
    <img src="user2.jpg" alt="Bob" class="avatar avatar-sm stack-item" />
    <img src="user3.jpg" alt="Charlie" class="avatar avatar-sm stack-item" />
    <img src="user4.jpg" alt="Diana" class="avatar avatar-sm stack-item" />
    <div class="avatar avatar-sm stack-overflow" aria-label="3 others">
      <span>+3</span>
    </div>
  </div>
</div>
```

## 4. Member Directory (LG Size)

A high-density list of team members where the avatar is the primary visual
anchor.

- **Size:** 64px (LG).
- **Metadata:** Name (H3), Role (P), and Status Badge.
- **Alignment:** Left-aligned avatar with text content to the right.

```html
<div class="member-card">
  <div class="avatar-container">
    <img src="mark-smith.jpg" alt="Mark Smith" class="avatar avatar-lg" />
    <div class="presence-icon presence-busy" title="Busy">
      <svg aria-hidden="true">...</svg>
    </div>
  </div>
  <div class="member-info">
    <h3>Mark Smith</h3>
    <p>Senior Developer</p>
  </div>
</div>
```
