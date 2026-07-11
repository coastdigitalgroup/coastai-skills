---
name: comment-and-discussion-system
description:
  Design and implement a systematic framework for threaded conversations,
  managing nesting depths, action hierarchies, and community signaling to
  foster engagement and readability.
---

# Comment and Discussion System

## Purpose

The Comment and Discussion System provides a methodology for designing
interactive conversation layers. It ensures that complex, multi-user dialogues
remain readable, navigable, and organized. By defining rules for **threading**,
**nesting limits**, **action priority**, and **contributor signaling**, this
system prevents "information spaghetti" and helps users find the most valuable
contributions in high-volume environments.

## Use Cases

- **Community Forums:** Designing threaded discussions for niche communities.
- **Article/Blog Comments:** Enabling reader feedback on long-form content.
- **SaaS Collaboration:** Structuring internal discussions within project
  tasks, documents, or pull requests.
- **Support Q&A:** Organizing customer questions and staff responses.
- **Social Feeds:** Managing interactions on shared posts or media.

## When NOT to Use

- **Direct Messaging (Chat):** For real-time 1-to-1 or small group messaging,
  use a layout optimized for "message bubbles" and instant delivery.
- **Announcement-only Feeds:** Where users can't reply or interact; a simple
  list of notifications suffices.
- **Low-Interaction Pages:** If a page expects fewer than 3 comments total,
  a flat list without threading is more efficient.
- **Transactional Logs:** For automated system audit logs, use
  `timeline-activity-system`.

## Inputs

1. **Hierarchy Model:** How deep can threads go? (Flat, nested, or hybrid).
2. **User Identity Data:** Avatars, display names, and roles (e.g., Moderator,
   Author, Staff).
3. **Engagement Metrics:** Vote counts (Up/Down), reply counts, and timestamps.
4. **Contextual Metadata:** "Verified Purchase," "Top Contributor," or "Author"
   badges.

## Outputs

1. **Comment Anatomy Spec:** Visual definition of a single comment "Node"
   (Avatar, Meta, Body, Actions).
2. **Threading Blueprint:** Spatial rules for nesting, including indentation
   increments and vertical "Thread Lines."
3. **Action Hierarchy Map:** Priority ranking for "Reply," "Vote," "Edit,"
   and "Report."
4. **Responsive Adaptation Strategy:** Rules for collapsing threads or
   flattening layouts on mobile.

## Workflow

### 1. Define the Comment Anatomy

Establish a consistent "Node" structure:
- **The Header:** User avatar (sized by nesting level), display name, role
  badges, and relative timestamp (e.g., "2h ago").
- **The Body:** The text content, supporting markdown or rich text where
  appropriate.
- **The Action Bar:** Primary (Reply, Vote) and secondary (Share, Report, Edit)
  actions.

### 2. Establish Threading and Nesting Rules

Manage the spatial relationship between replies:
- **Indentation:** Use a consistent increment (e.g., `24px` or `1.5rem`) for
  nested replies.
- **Thread Lines:** Use subtle vertical lines (1px width) to visually link
  a reply to its parent.
- **Nesting Limit:** Set a maximum depth (usually 3–5 levels) before
  flattening the thread or requiring a "Continue this thread" link to a new
  view.

### 3. Rank Action Priority

Not all actions are equal; use visual weight to guide the user:
- **Primary:** "Reply" and "Vote" should be immediately visible.
- **Secondary:** "Share" or "Link" can be text-only or icon-only.
- **Overflow:** Place "Edit," "Delete," and "Report" inside a "More" (ellipsis)
  menu to reduce clutter.

### 4. Implement Signaling and Trust

Use visual cues to provide context:
- **Author/Staff Highlight:** Use a distinct background color or a prominent
  badge for the original author or official staff.
- **New/Highlighted Comments:** Use a subtle background fade or left-border
  accent to signal unread or newly posted comments.
- **Vote Visualization:** Use color (e.g., Orange for upvotes, Blue for
  downvotes) only when active.

### 5. Plan Responsive Adaptations

Threads consume horizontal space rapidly; adapt for narrow viewports:
- **Mobile Flattening:** Reduce indentation increments on mobile (e.g., from
  `24px` to `8px`) or cap nesting at 2 levels before going flat.
- **The "Full-Screen" Pivot:** For deep threads, allow tapping a reply to
  open it and its children in a dedicated, full-width "focus mode."

## Decision Rules

- **Indentation vs. Flat:** Use indentation for "Discovery" (where context of
  the parent is critical). Use flat lists with "@mention" references for "Task"
  environments (where latest information is priority).
- **Vote Display:** Only show downvotes if the community requires "Self-Policing."
  For most positive-growth environments, show upvotes only.
- **Default Sorting:** Default to "Top" (weighted score) for communities, but
  "Newest" for time-sensitive collaboration tools.
- **Truncation Rule:** Truncate extremely long comments (>500 words) with
  a "Read More" button to preserve the thread's vertical rhythm.

## Constraints

- **Accessibility:** Comments must be navigable via keyboard (`Tab` through
  actions). Use semantic HTML (`<article>` for comments, `<ul>`/`<li>` for
  nesting). Every action must have a clear label. "Thread lines" should be
  purely decorative (hidden from ARIA) or use `aria-hidden="true"`.
- **Responsiveness:** Indentation must not push content off the edge of the
  screen. Use `padding-left` or `margin-left` on containers, never fixed
  widths for nested blocks.
- **Performance:** For high-volume threads (>100 comments), use "Lazy Loading"
  or "Load More" pagination to prevent long initial render times.

## Common Failure Patterns

- **Indentation Death:** Allowing infinite nesting until the text is 1
  character wide on the right side of the screen.
- **Action Overload:** Showing 10+ buttons under every single comment,
  creating a "sea of icons."
- **Invisible Hierarchy:** Failing to distinguish between the "Author" and
  a regular commenter, making it hard to find official answers.
- **The "Lost Parent":** Deep threads without thread lines, making it
  difficult to track which reply belongs to which parent.
- **Missing State:** Not showing a "Pending" or "Sending" state when a user
  submits a comment.

## Validation Criteria

- [ ] Nesting depth is capped and transitions to a flat or "focus" view.
- [ ] Visual hierarchy distinguishes between Author, Staff, and regular users.
- [ ] Thread lines clearly connect replies to their parent comments.
- [ ] Primary actions (Reply/Vote) are visually prominent over secondary ones.
- [ ] Indentation adapts for mobile viewports to prevent horizontal overflow.
- [ ] Comments are marked up semantically as a nested list or articles.
- [ ] Action buttons have a minimum touch target of 44x44px.
