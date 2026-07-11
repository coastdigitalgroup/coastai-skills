# Template: Comment Structure Spec

Use this template to define the visual and spatial rules for comment components
in a design system or UI kit.

## 1. Node Anatomy

| Element | Style Rule | Notes |
| :--- | :--- | :--- |
| **Avatar** | 40px (L0), 32px (L1+) | Circular crop, 2px border-radius |
| **User Name** | 14px, Bold, `#1A1A1A` | Clickable link to profile |
| **Badge (Author)** | `#EBF5FF` bg, `#0070E0` text | "Author" or "OP" |
| **Badge (Staff)** | `#F0FDF4` bg, `#166534` text | "Staff" or "Moderator" |
| **Timestamp** | 12px, Regular, `#6B7280` | Relative (e.g., "5m ago") |
| **Body Text** | 15px, Regular, `#374151` | Line-height: 1.6, Max-width: 65ch |
| **Vote Count** | 13px, Semi-bold | Neutral color, Orange on active |

## 2. Spatial System

| Property | Desktop | Mobile |
| :--- | :--- | :--- |
| **Indentation** | 32px (`2rem`) | 12px (`0.75rem`) |
| **Vertical Gap** | 24px (`1.5rem`) | 16px (`1rem`) |
| **Inner Padding** | 16px (`1rem`) | 12px (`0.75rem`) |
| **Thread Line** | 2px solid, `#E5E7EB` | 1px solid, `#E5E7EB` |
| **Nesting Cap** | 4 levels | 2 levels |

## 3. Action Priority

| Priority | Action | Visualization |
| :--- | :--- | :--- |
| **Primary** | Reply, Vote | Text + Icon, High affordance |
| **Secondary** | Share, Link | Icon only or Muted text |
| **Tertiary** | Report, Edit | Inside "More" (ellipsis) menu |

## 4. State Matrix

- **Hover:** Subtle background color shift (`#F9FAFB`).
- **Focus:** 2px Blue ring (`#3B82F6`) around interactive elements.
- **New:** Left border accent (4px, Primary Color) + Fade-out highlight.
- **Pending:** 50% opacity on the entire node + loading spinner on action.
- **Deleted:** "This comment has been removed" placeholder text.

## 5. Responsive Pivot Rules

1. **If Viewport < 640px:**
   - Reduce indentation to 12px.
   - Max nesting = 2.
   - Comments at Level 3+ shift to Level 2 indentation with an "@mention" header.
2. **If Viewport < 480px:**
   - Stack Meta (User/Time) vertically if Name is long.
   - Expand touch targets for all actions to 44px.
