# Review Component Blueprints

These blueprints provide the structural foundation for the three core views of a Review and Rating system: the Summary, the Entry, and the Input.

## 1. Aggregate Summary Blueprint

Use this for the top of a review section or as a "trust block" on a landing page.

```text
Container (Flex/Grid)
├── Summary Header (Flex: Row)
│   ├── Average Score (Text: 2xl, Bold)
│   └── Star Row (Container: Icon Group)
│       └── [Full][Full][Full][Full][Half] (aria-label: "4.5 out of 5 stars")
├── Review Count (Text: SM, Muted)
└── Distribution List (Container: Stack)
    └── Distribution Row (Flex: Row, Align: Center)
        ├── Label ("5 Star")
        ├── Progress Bar (Track: Gray-200, Fill: Amber-400)
        └── Percentage/Count ("85%")
```

## 2. Individual Review Entry Blueprint

Use this for the list of user feedback.

```text
Review Card (Container: Border-Bottom or Card)
├── Meta Info (Flex: Row/Wrap)
│   ├── User Identifier (Text: Bold)
│   ├── [✓ Verified Purchase] (Badge: Semantic Success)
│   └── Date (Text: SM, Muted)
├── Rating Block (Flex: Row)
│   └── Star Row (Small)
├── Content Block (Stack)
│   ├── Headline (Text: LG, Bold)
│   └── Body Text (Text: Base, Color: Gray-800)
├── Media Gallery (Flex: Row, Gap: S)
│   └── [Thumbnail][Thumbnail] (Image: 1:1 Aspect Ratio)
└── Action Footer (Flex: Row, Justify: Between)
    ├── Helpful Voting (Group: Button/Link)
    └── Report Action (Link: SM, Muted)
```

## 3. Review Input Form Blueprint

Use this for the "Write a Review" interaction.

```text
Form Container (Stack: Gap: L)
├── Rating Selector (Fieldset)
│   ├── Legend ("How would you rate this?")
│   └── Star Input (Group: Radio Inputs visually styled as stars)
│       └── [S1][S2][S3][S4][S5] (State: Focus/Hover effects)
├── [Conditional] Review Details (Reveals after rating selected)
│   ├── Headline Input (Text Field: Placeholder: "Sum it up in a few words")
│   ├── Body Input (Text Area: Placeholder: "What did you like or dislike?")
│   └── Photo Upload (File Input: Styled as Drag & Drop or Button)
└── Submit Action (Button: Primary)
```

## Spacing Tokens (Reference)

- **Card Padding:** `--space-m` (1.5rem / 24px)
- **Internal Gaps:** `--space-s` (1rem / 16px)
- **Metadata Gap:** `--space-xs` (0.5rem / 8px)
- **Section Margin:** `--space-xl` (3rem / 48px)
