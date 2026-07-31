# Quantum Website Design System

Status: **Locked for launch**

This document is the visual source of truth for the first release. New interface
decisions should follow these rules unless an explicit design review changes them.

## 1. Brand direction

Quantum should feel:

- Technical
- Premium
- Reliable
- Modern
- Clean
- Engineering-led

The site should combine strong architectural and engineering photography with
disciplined spacing, clear typography, and restrained color. It must not resemble
a construction hardware supplier or a generic property company.

## 2. Color system

| Token | Value | Primary use |
| --- | --- | --- |
| `navy` | `#0B2A46` | Navigation, footer, headings, dark sections, image overlays |
| `yellow` | `#FFC928` | Primary actions, highlights, labels, active filters |
| `white` | `#FFFFFF` | Main backgrounds, cards, text on dark surfaces |
| `charcoal` | `#202A33` | Body text |
| `grey-50` | `#F4F6F8` | Alternate sections and card borders |
| `grey-600` | `#66717D` | Secondary text |
| `orange` | `#F58220` | Logo-related detail only |

### Usage rules

- Aim for approximately 60% white/light grey, 25% navy, and 10% yellow.
- Orange is a rare brand detail, not a second primary accent; keep it below 1% of
  a typical page.
- Do not use yellow and orange heavily within the same section.
- Never use yellow text on a white or light-grey background.
- Use navy text on yellow buttons.
- Verify all text and interactive states against WCAG AA contrast requirements.

Suggested CSS variables:

```css
:root {
  --color-navy: #0b2a46;
  --color-yellow: #ffc928;
  --color-white: #ffffff;
  --color-charcoal: #202a33;
  --color-grey-50: #f4f6f8;
  --color-grey-600: #66717d;
  --color-orange: #f58220;
}
```

## 3. Typography

- Heading and display font: **Manrope**
- Body and interface font: **Inter**
- Fallback: `system-ui, sans-serif`

Use sentence case for headings. Reserve uppercase for short eyebrow labels such as
“OUR SERVICES”. Keep paragraphs around 60–75 characters wide, use generous line
height, left-align most text, and use bold weights sparingly.

### Type scale

| Role | Desktop | Mobile |
| --- | --- | --- |
| Hero | 56–68 px | 38–46 px |
| Page title | 44–52 px | 34–40 px |
| Section title | 34–40 px | 28–32 px |
| Card title | 22–26 px | 20–22 px |
| Large body | 18–20 px | 17 px |
| Standard body | 16–18 px | 16–17 px |
| Small text | 14–15 px | 14 px |
| Button | 14–16 px | 14–16 px |

Use responsive `clamp()` values in implementation rather than abrupt breakpoint
changes.

## 4. Grid and spacing

- Grid: 12 responsive columns
- Maximum content width: 1280 px
- Desktop side padding: 48 px
- Tablet side padding: 32 px
- Mobile side padding: 20 px
- Desktop section spacing: 96–128 px
- Tablet section spacing: 72–96 px
- Mobile section spacing: 56–72 px

Prefer generous negative space. Do not tighten sections simply to place more
content above the fold.

## 5. Shape, borders, and depth

- Cards: rectangular with 12–16 px radius
- Buttons: 8–12 px radius and at least 48 px high
- Images: 12–16 px radius where not full-bleed
- Borders: thin and low-contrast
- Shadows: rare and subtle

Approved elevated shadow:

```css
box-shadow: 0 10px 30px rgb(11 42 70 / 8%);
```

Use borders and spacing before adding shadows. Avoid pill-shaped containers except
for compact controls such as project filters.

## 6. Imagery

Project photography leads the visual experience. Prefer:

- Finished buildings
- Real MEP installations
- Construction progress
- Plant rooms
- Electrical panels
- HVAC and industrial systems
- Approved professional renders

Keep photographs natural and technically credible. Avoid excessive filters and
heavy text over detailed images. When text overlays an image, use a navy overlay
strong enough to preserve contrast.

| Asset | Preferred ratio |
| --- | --- |
| Hero | 16:9 or 21:9 |
| Project card | 4:3 |
| Featured project | 16:9 |
| Team portrait | 4:5 |
| Client logo container | 3:2 |

Gallery images may retain varied source ratios, but the layout must reserve their
space to prevent layout shift.

## 7. Core components

### Navigation

- White background with a subtle bottom border
- Logo on the left; links and consultation action on the right
- Yellow “Request a Consultation” primary action
- Height: 80 px desktop
- Sticky after scroll with a restrained shadow/transition
- Accessible mobile menu with focus management and Escape-to-close behavior

### Buttons

**Primary:** yellow background with navy text.

**Secondary:** transparent background with a navy border/text on light surfaces or
a white border/text on dark surfaces.

All buttons require:

- Minimum height of 48 px
- Visible keyboard focus
- Mild hover lift
- Small arrow shift where an arrow is present
- Disabled and loading states when used for forms

### Cards

Use large visual project cards instead of dense tile grids. A project card includes:

- 4:3 image
- Industry label
- Project title
- Location
- Short summary
- “View project” link or arrow

### Icons

Use **Lucide** outline icons throughout. Do not mix icon families. Icons can
represent mechanical, electrical, plumbing, fire, low-current, energy, location,
phone, and email concepts.

### Forms

- Persistent, visible labels; placeholders do not replace labels
- Large field spacing and subtle borders
- Strong focus states and inline validation
- One column on mobile; two columns only for naturally paired short fields
- Yellow submit button
- Clear pending, success, and error feedback
- Spam protection must not create unnecessary friction

## 8. Page patterns

### Homepage

Use this order:

1. Navigation
2. Split-layout hero
3. Three service divisions
4. Featured projects
5. Industries served
6. Why Quantum
7. Approved clients and partners
8. Consultation call to action
9. Footer

The hero uses left-aligned messaging and actions with one strong project image on
the right. Each service division uses a large card with a Lucide icon, concise
description, link, and relevant image or technical detail.

Featured projects use one dominant card, two supporting cards, then a clean grid.

The “Why Quantum” section uses a strong statement and supporting copy on the left,
with four concise credibility points on the right.

The closing CTA is full-width navy:

> Planning a new project or upgrading an existing facility?

Actions:

- Request a Consultation
- Call Quantum

### Project listing

Each project card follows the standard card anatomy. Industry filters form a
horizontal control on desktop and an accessible, horizontally scrollable row on
mobile. Yellow indicates only the active filter.

### Individual project

- Large featured image
- Project title, location, and industry
- Optional status and completion year
- Compact facts grid
- Readable scope copy and grouped service tags
- Controlled varied-ratio gallery
- Three related projects
- Consultation CTA

Render only populated facts. Related projects should prefer the same industry,
then fall back to shared services or other featured projects when the launch
catalogue has no same-industry match.

### Content pages

About, Services, and Contact reuse the same heading, grid, card, form, and CTA
components. They should not introduce a separate visual language.

## 9. Motion

Motion is subtle and purposeful:

- Short fade/slide entrances
- Gentle project-image zoom on hover
- Link underline movement
- Button arrow shift
- Sticky navigation transition
- User-initiated gallery lightbox

Avoid heavy parallax, 3D effects, rotating decoration, long loading sequences, and
autoplaying background video.

Respect `prefers-reduced-motion` and ensure no information depends on animation.

## 10. Accessibility requirements

- Meet WCAG 2.2 AA for contrast and interaction
- Minimum 16 px body text
- Visible keyboard focus
- Logical heading order
- Descriptive image alt text
- Labels and useful validation messages on every form field
- Tap targets at least 44 × 44 px; buttons target 48 px height
- Full keyboard access to navigation, filters, galleries, and forms
- Reduced-motion support
- No color-only status or selection indicators

## 11. Design acceptance checklist

A screen is ready for development when:

- It uses only the approved colors and typefaces.
- Its desktop and mobile behavior is defined.
- Spacing follows the grid and section rules.
- All interactive states are included.
- Image ratios and fallback behavior are specified.
- Empty optional content collapses without blank space.
- Keyboard focus and contrast are visible.
- Motion has a reduced-motion equivalent.
- It reads as an engineering consultancy, not a supplier or property business.

