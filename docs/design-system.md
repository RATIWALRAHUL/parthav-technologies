# Parthav Technologies — Design System & Visual Specification

This document is the visual consistency reference for Parthav Technologies. All styling across the web application must adhere to the design tokens and structural patterns defined here.

---

## 1. Color System

### Primary & Brand Colors
| Token Name | Hex Value | Usage |
| :--- | :--- | :--- |
| `--color-navy` | `#062B57` | Primary brand navy, section backgrounds, dark headers |
| `--color-deep-navy` | `#031B3A` | Deepest contrast navy, dark hero accents, footer wave base |
| `--color-orange` | `#FF6A00` | Primary brand orange, primary CTAs, text highlights |
| `--color-orange-light` | `#FF7A00` | Bright orange hover states, gradient accents |
| `--color-white` | `#FFFFFF` | Page base, card backgrounds, light contrast text |
| `--color-bg-light` | `#F7FAFD` | Soft cool background for section separation |
| `--color-blue-tint` | `#EAF4FF` | Soft blue card background, pill badge tint |
| `--color-text-primary` | `#10243E` | Main headline and body text color |
| `--color-text-muted` | `#66758A` | Subtitles, supporting copy, metadata |
| `--color-border-subtle` | `rgba(6, 43, 87, 0.08)` | Dividers, card borders, input borders |
| `--color-border-hover` | `rgba(255, 106, 0, 0.4)` | Focus and active borders |

### Functional Pastel Accents (Service & Value Badges)
| Token Name | Hex Value | Application |
| :--- | :--- | :--- |
| `--accent-mint` | `#EAF7F2` | SEO & Growth badge backgrounds |
| `--accent-lavender` | `#F4EEFF` | AI & Automation badge backgrounds |
| `--accent-peach` | `#FFF4EA` | Web Development badge backgrounds |
| `--accent-sky` | `#EAF4FF` | UI/UX badge backgrounds |

---

## 2. Typography System

### Font Families
- **Headings**: `Manrope`, sans-serif (`var(--font-heading)`)
- **Body**: `Inter`, sans-serif (`var(--font-body)`)

### Typographic Hierarchy
| Role | Size Scale (Desktop / Mobile) | Line Height | Weight | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | `clamp(2.25rem, 5vw + 1rem, 4.5rem)` | 1.12 | 800 | `-0.025em` |
| **Section H2** | `clamp(1.85rem, 3.5vw + 0.5rem, 3.125rem)` | 1.2 | 800 | `-0.02em` |
| **Card H3** | `clamp(1.25rem, 2vw + 0.25rem, 1.75rem)` | 1.3 | 700 | `-0.015em` |
| **Subheading** | `1.125rem – 1.25rem` (18–20px) | 1.5 | 500 | `normal` |
| **Body Large** | `1.0625rem – 1.125rem` (17–18px) | 1.65 | 400 | `normal` |
| **Body Regular** | `1rem` (16px) | 1.65 | 400 | `normal` |
| **Small / Meta** | `0.875rem` (14px) | 1.5 | 500 | `normal` |
| **Micro Eyebrow**| `0.75rem – 0.8125rem` (12–13px) | 1.2 | 700 | `0.12em` (UPPERCASE) |

---

## 3. Spacing System (8px Grid)

Use the predefined spacing variables for all padding, margins, and gaps:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

---

## 4. Layout & Container Grid

- **Max Content Width**: `1280px` (maximum bounding box: `1320px`)
- **Desktop Section Padding**: `80px` to `112px` vertical, `48px` to `64px` horizontal
- **Tablet Section Padding**: `64px` vertical, `32px` horizontal
- **Mobile Section Padding**: `48px` vertical, `20px` horizontal

---

## 5. Buttons & Interactive Elements

### 1. Primary CTA (`.btn-primary`)
- **Background**: `#FF6A00` (`--color-orange`)
- **Hover**: `#FF7A00` (`--color-orange-light`), `translateY(-2px)`, subtle orange shadow
- **Text Color**: `#FFFFFF`
- **Border Radius**: `9999px` (pill)
- **Padding**: `14px 28px`
- **Font**: Manrope, 600 weight, `15px`
- **Icon Interaction**: Right arrow slides `3px` to the right on hover.

### 2. Secondary CTA (`.btn-secondary`)
- **Background**: Transparent / `#FFFFFF`
- **Border**: `1.5px solid rgba(6, 43, 87, 0.15)`
- **Hover**: Background `rgba(234, 244, 255, 0.6)`, border `#062B57`, `translateY(-2px)`
- **Text Color**: `#062B57`
- **Border Radius**: `9999px` (pill)

### 3. Circular Action Buttons (`.btn-circle`)
- **Size**: `40px x 40px` or `44px x 44px`
- **Border**: `1px solid rgba(6, 43, 87, 0.12)`
- **Radius**: `50%`
- **Hover**: Inverted fill or orange accent, arrow transition.

---

## 6. Cards & Containers

- **Standard Service Card**:
  - Background: White with very subtle pastel tint
  - Border: `1px solid rgba(6, 43, 87, 0.08)`
  - Border Radius: `20px`
  - Padding: `32px`
  - Hover: `translateY(-4px)`, shadow `0 20px 40px -15px rgba(6, 43, 87, 0.08)`
- **Dark Section Cards (Why Parthav / SEO & AI)**:
  - Background: `rgba(255, 255, 255, 0.04)` to `rgba(255, 255, 255, 0.08)`
  - Border: `1px solid rgba(255, 255, 255, 0.1)`
  - Border Radius: `16px` to `20px`
  - Text: White / Muted silver

---

## 7. Animation & Transitions

- **Primary Timing Function**: `cubic-bezier(0.22, 1, 0.36, 1)`
- **Durations**:
  - Micro (hover, focus): `200ms`
  - Moderate (accordion, slide): `350ms`
  - Reveal (section entrances): `500ms – 700ms`
- **Reduced Motion**: Mandatory fallback disabling motion for users with `prefers-reduced-motion: reduce`.

---

## 8. Imagery & Editorial Visuals

- Crisp photography showing sophisticated modern workspaces, laptops featuring clean user interfaces, Jaipur architectural daylight, and authentic team collaborations.
- Consistently graded with natural daylight and rich contrast.
- Zero tacky stock photos or clichéd handshake visuals.
