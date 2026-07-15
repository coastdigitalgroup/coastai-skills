# Inclusive UX Heuristics for Growth

Applying these heuristics helps move beyond technical "compliance" into
"competitive advantage" through inclusivity.

## 1. The "Safety Net" Principle
Never leave a user without a way to recover. If a user makes a mistake
(e.g., enters an invalid email), the system should not just reject the
input, but actively help the user correct it through clear, persistent
guidance.

## 2. Redundancy as a Feature
If a piece of information is important, say it twice in two different
ways. Use a "Success" icon *and* the word "Success." Use a bold font weight
*and* a different color. This ensures that if one channel of perception
fails (e.g., color blindness or visual distraction), the other succeeds.

## 3. The "Minimal Effort" Rule
Inclusive design is often just "Efficient Design." Every unnecessary click,
modal, or form field is a potential drop-off point for a user with motor or
cognitive fatigue. Aim for the "Minimum Viable Interaction" to achieve a
conversion.

## 4. Affordance over Aesthetics
A button should look like a button. A link should look like a link.
While "ghost buttons" (outline only) might look elegant, they often fail
contrast and clarity tests for users with visual or cognitive impairments.
Prioritize clear affordance—the visual cue that tells a user "this is
interactive"—over minimalist trends.

## 5. Situational Empathy
Remember that "disability" is a spectrum that includes everyone at some
point.
- **Permanent:** A user with one arm.
- **Temporary:** A user with a broken arm in a cast.
- **Situational:** A parent holding a baby with one arm.

Designing for the "Permanent" segment makes life easier for the "Temporary"
and "Situational" segments as well.

## 6. The "Aria-Hide" Rule of Thumb
If an element is purely decorative and doesn't provide value to the
conversion (e.g., a background pattern or a generic stock photo), use
`aria-hidden="true"` to keep the screen reader experience focused on the
path to conversion. Don't clutter the audio path with irrelevant data.
