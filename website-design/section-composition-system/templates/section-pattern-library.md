# Section Pattern Library

Use these annotated blueprints to structure common page body sections. Ensure
all sections use the site's `fluid-spacing-system` tokens for consistent
margins and padding.

## 1. The 50/50 Split (Zig-Zag Foundation)

Best for communicating high-value benefits with supporting visuals.

```text
[ Container: Max-width 1280px | Padding: --space-2xl ]
------------------------------------------------------
|                                                    |
|  [ Column 1 ]                [ Column 2 ]          |
|  (Text Content)              (Media Anchor)        |
|                                                    |
|  Tag/Category (Level 3)      [ Image / Video /  ]  |
|  Headline H2 (Level 1)       [ Interactive UI   ]  |
|  Body Text (Level 2)         [ Animation        ]  |
|  Primary Link/Button                               |
|                                                    |
------------------------------------------------------
[ Mobile: Stack Column 2 on top of Column 1 ]
```

## 2. The Feature Grid (The Details)

Best for secondary capabilities, services, or technical specifications.

```text
[ Container: Max-width 1280px | Padding: --space-xl ]
------------------------------------------------------
|             Centered Section Headline H2           |
|             (Optional Intro Paragraph)              |
|                                                    |
|  [ Card 1 ]        [ Card 2 ]        [ Card 3 ]    |
|  - Icon            - Icon            - Icon        |
|  - Title H3        - Title H3        - Title H3    |
|  - Desc            - Desc            - Desc        |
|                                                    |
|  [ Card 4 ]        [ Card 5 ]        [ Card 6 ]    |
|  - ...             - ...             - ...         |
|                                                    |
------------------------------------------------------
[ Mobile: Single column stack ]
```

## 3. The "Impact" Breaker

Best for quotes, statistics, or "stop and read" moments.

```text
[ Container: Full Width | Background: Brand-Primary | Padding: --space-3xl ]
-------------------------------------------------------------------------
|                                                                       |
|                       "The High-Impact Quote or                       |
|                        Key Metric Stated Boldly"                       |
|                                                                       |
|                             - Attribution                             |
|                                                                       |
-------------------------------------------------------------------------
```

## 4. The Action Anchor (Final CTA)

The definitive end of the page body.

```text
[ Container: Max-width 960px | Padding: --space-2xl | Border/Shadow ]
----------------------------------------------------------------------
|                                                                    |
|                      Ready to Get Started?                         |
|            Join 5,000+ teams using our platform today.             |
|                                                                    |
|               [ Primary CTA ]    [ Secondary CTA ]                 |
|                                                                    |
----------------------------------------------------------------------
```

## Annotation Checklist for Designers

- [ ] **BG-Color:** Define if this section is `base`, `surface`, or `brand`.
- [ ] **V-Padding:** Define if this uses `Standard`, `Compact`, or `Large`.
- [ ] **H-Hierarchy:** Assign `h2` or `h3` tags.
- [ ] **Mobile-Order:** Explicitly state if media should be top or bottom on
      stacking.
