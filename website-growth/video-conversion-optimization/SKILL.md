---
name: video-conversion-optimization
description:
  Audit and optimize video content and its surrounding UI to increase play
  rates, engagement, and conversion. Trigger this skill when video assets
  underperform in terms of watch time or when video-based landing pages have low
  conversion.
---

# Video Conversion Optimization

## Purpose

The Video Conversion Optimization skill provides a systematic framework for
improving the performance of video content on a website. Video is often a high-
production-cost asset that underdelivers because of poor "packaging" (thumbnails
and titles), weak hooks, or a lack of clear integration with the conversion
path. This skill focuses on maximizing Play Rate, Completion Rate, and direct
Conversion Rate by treating video as a functional part of the conversion funnel
rather than just passive content.

## Use Cases

- **Hero Explainer Videos:** Optimizing the primary "How it Works" video on a
  landing page.
- **Product Demos:** Improving the effectiveness of video walkthroughs on SaaS
  or E-commerce PDPs.
- **Video Sales Letters (VSLs):** Refining long-form persuasive videos for
  direct-response campaigns.
- **Customer Testimonial Videos:** Enhancing the credibility and impact of
  social proof videos.
- **Video-Centric Landing Pages:** Where the video is the primary vehicle for
  the value proposition.

## When NOT to Use

- **Purely Technical Optimization:** For file size, formats, or bitrate issues,
  use `native-video-implementation`. This skill focuses on *persuasion* and
  *performance*.
- **Live Streaming Events:** While some principles apply, live video requires
  different engagement strategies (chat, real-time Q&A).
- **Background/Atmospheric Video:** For non-critical videos used purely for
  aesthetic or brand atmosphere (where play rate doesn't matter).
- **Internal Training/LMS:** Where video consumption is mandatory rather than
  persuasive.

## Inputs

1. **Current Video Analytics:** Play Rate (%), Average Watch Time, Completion
   Rate, and "Drop-off Points" (the exact second users leave).
2. **Video Asset Details:** The current video file, thumbnail image, and title.
3. **Primary Conversion Goal:** What is the specific action the user should take
   after watching (e.g., "Start Trial", "Add to Cart")?
4. **Target Audience Intent:** Why is the user watching this video? What is the
   primary question they want answered?

## Outputs

1. **Video Engagement Audit:** Identification of the "Drop-off" causes (e.g.,
   boring intro, weak CTA) and packaging flaws.
2. **Optimized Thumbnail & Title Specs:** Recommendations for higher-CTR visual
   hooks and curiosity-driven titles.
3. **Content Structure Refinement:** Proposed changes to the video script or
   editing (Hook, Problem, Solution, CTA).
4. **On-Page Placement Strategy:** Guidance on the video's relationship to the
   primary CTA and surrounding copy.

## Workflow

### 1. Audit the "Packaging" (The Click)

Before a video can convert, it must be played. Analyze the thumbnail and title:

- **Thumbnails:** Does it use a "Human Element" (face) or "Result-Driven" image?
  Is there high-contrast text that is readable on mobile?
- **Titles/Play Buttons:** Is the "Play" button prominent? Does the title
  promise a benefit or provoke curiosity?
- **The "Scent of Value":** Does the thumbnail match the expectation set by
  the surrounding page copy?

### 2. Identify the "Hook" & Drop-off Points

Analyze the first 10 seconds of the video.

- **The 10-Second Rule:** Does the video immediately validate why the user
  clicked? Does it promise to solve a problem?
- **Drop-off Mapping:** Check analytics. If 50% leave in the first 5 seconds,
  the intro is too long (e.g., animated logos, generic introductions).
- **The "Pivot":** Identify the moment the video transitions from "Information"
  to "Persuasion."

### 3. Optimize the Conversion Integration

A video should never be a dead end.

- **In-Video CTAs:** Use overlays or "end screens" that direct the user to the
  next step.
- **Proximity to Page CTA:** Place the primary page button immediately below or
  beside the video player.
- **Interactive Layers:** If possible, use interactive video tools to allow
  users to click directly within the frame.

### 4. Refine the Script/Story Arc

If re-editing or re-shooting is possible, apply the conversion arc:

- **Hook:** Immediate value/curiosity.
- **Problem:** Agitate the user's pain point.
- **Solution:** Present the product/service as the answer.
- **Proof:** Show (don't just tell) the result.
- **Call to Action:** Tell them exactly what to do next.

### 5. Review Against Decision Rules

Verify the strategy against the video conversion heuristics.

## Decision Rules

- **The "Silent-Start" Rule:** Assume the user has the sound off. The first 10
  seconds must be visually engaging and should include captions or text
  overlays.
- **Thumbnail > Title:** The thumbnail is the primary driver of play rate. Focus
  70% of packaging effort on the visual.
- **Contextual Alignment:** If the video is on a Pricing page, it should focus
  on "Value/ROI." If it's on a Homepage, it should focus on "Discovery."
- **The One-Goal CTA:** A video should only have ONE primary call to action.
  Multiple CTAs lead to decision paralysis.
- **Speed to Value:** Remove all "brand intro" animations. Start the content
  at 0:00.

## Constraints

- **Source Quality Ceiling:** Video optimization cannot compensate for fundamentally poor production quality — low-resolution or poorly lit source footage limits achievable results.
- **Autoplay Restrictions:** iOS and Android restrict autoplay for videos with audio; muted autoplay is the only reliable cross-platform option for background or hero video.
- **Accessibility Requirement:** Videos with spoken dialogue require captions or a transcript to meet WCAG 2.1 AA standards.

## Non-Goals

- Video production, scripting, or editing direction.
- Paid video advertising strategy such as YouTube Ads or social video campaigns.
- CDN selection, video hosting infrastructure, or encoding pipeline configuration.

## Common Failure Patterns

- **The "Corporate Intro":** Spending the first 15 seconds on an animated logo
  and generic "Welcome" message.
- **Low-Contrast Thumbnails:** Using a random frame from the video that looks
  blurry or uninteresting.
- **Mismatched Scent:** A thumbnail that promises "See how it works" but a
  video that is a "Founder Interview."
- **The "Ghost CTA":** Asking for a signup in the video but not having a button
  on the page near the player.
- **Over-Length:** A 5-minute video for a product that only needs 60 seconds of
  explanation.

## Validation Criteria

- [ ] **Play Rate Lift:** (Video Plays / Page Views). Target: 10-25% increase by
  optimizing thumbnails.
- [ ] **Average Watch Time (AWT):** Measure if re-hooking the intro keeps users
  watching for longer.
- [ ] **Video-Assisted Conversion Rate:** The CVR of users who watched the video vs.
  those who did not.
- [ ] **Drop-off Rate Reduction:** Decreasing the percentage of users who leave in
  the first 5-10 seconds.
