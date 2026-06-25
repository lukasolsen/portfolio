# Brand Guide

This document defines the design system for this portfolio. All AI agents, contributors, and design tools must follow these rules when creating or modifying content, components, or pages.

Reference: [OpenAI Brand Guidelines](https://openai.com/brand/) — our guidelines follow similar principles of geometric precision, restraint, and clarity.

---

## 1. Typography

### Font Stack

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

- **Primary:** Inter (loaded via `@font-face` from `/public/fonts/Inter.woff2`)
- **Monospace:** `font-mono` — system monospace stack for code, technical terms, and identifiers
- **Never use decorative or display fonts.** Inter is the only font in this project.

### Scale

| Token | Size | Usage |
|---|---|---|
| `text-[9px]` | 9px | Badges, micro labels |
| `text-[10px]` | 10px | Section labels, overlines |
| `text-[11px]` | 11px | Small UI text, captions |
| `text-[12px]` | 12px | Descriptions, metadata |
| `text-[13px]` | 13px | Card content, body in dense UI |
| `text-sm` | 14px | Body text, UI labels |
| `text-base` | 16px | Default body |
| `text-[15px]` | 15px | Section descriptions |
| `text-lg` | 18px | Lead text, emphasis |
| `text-xl` | 20px | Subheadings |
| `text-2xl` | 24px | H3 |
| `text-3xl` | 30px | H2 |
| `text-4xl` | 36px | H1 (page titles) |
| `text-5xl` | 48px | H1 (section heroes) |
| `text-6xl` | 60px | Hero titles only |

### Typography Components

Always use the components from `src/components/typography/typography.tsx`. Never write raw heading tags with inline Tailwind classes.

```tsx
import { Header1, Header2, Header3, Paragraph, LeadText, SmallText } from "@/components/typography/typography";
```

| Component | When to use |
|---|---|
| `<Header1>` | Page title |
| `<Header2>` | Major section heading |
| `<Header3>` | Subsection heading |
| `<Header4>` | Card heading |
| `<Header5>` | Minor heading |
| `<Header6>` | Inline heading |
| `<Paragraph>` | Body text |
| `<LeadText>` | Intro/emphasis paragraph |
| `<SmallText>` | Captions, metadata, fine print |

### Font Weights

| Weight | CSS class | Usage |
|---|---|---|
| Regular | `font-normal` | Body text, descriptions |
| Medium | `font-medium` | UI labels, navigation, buttons |
| Semibold | `font-semibold` | Headings, emphasis |
| Bold | `font-bold` | Hero titles only |

### Tracking

| Class | Usage |
|---|---|
| `tracking-tight` | All headings |
| `tracking-tighter` | Hero titles (`text-5xl`, `text-6xl`) |
| `tracking-normal` | Body text |
| `tracking-[0.2em]` | Overline/label text (uppercase) |
| `tracking-wider` | Small uppercase labels |
| `tracking-widest` | Badges |

### Text Rules

- **Body text:** `text-muted-foreground leading-relaxed` — never use `text-foreground` for long-form reading
- **Headings:** `text-foreground` — always
- **Maximum line width:** `max-w-2xl` for descriptions, `max-w-3xl` for paragraphs
- **Line height:** `leading-relaxed` (1.625) for body, `leading-snug` (1.375) for headings, `leading-none` for tight hero text
- **Sentence case** for all headings: "How it works" not "How It Works"
- **No ALL CAPS except:** overline labels (`uppercase`) and badges
- **Never use bold for emphasis in body text.** Use `font-medium` or color change instead.

---

## 2. Spacing System

### Section Spacing

| Pattern | Classes | When |
|---|---|---|
| Standard section | `py-20` | Default for all content sections |
| Prominent section | `py-28` | Hero, major breaks |
| Compact section | `py-16` | Footer, meta sections |
| Tight section | `py-12` | Nested content |

### Content Spacing (vertical rhythm)

| Pattern | Classes | When |
|---|---|---|
| Dense | `space-y-4` | Lists of items, form fields |
| Standard | `space-y-6` | Card grids, content blocks |
| Relaxed | `space-y-8` | Major content divisions |
| Spacious | `space-y-10` | Section intros |
| Hero | `space-y-12` | Top-level section groups |

### Horizontal Spacing

| Pattern | Classes | When |
|---|---|---|
| Page edge | `px-4 md:px-8` | All sections |
| Card padding | `p-4` | Standard cards |
| Compact card | `p-3` | Dense lists, inline items |
| Spacious card | `p-5` or `p-6` | Featured content |
| Code block | `p-4` | Code examples |

### Gaps

| Pattern | Classes | When |
|---|---|---|
| Tight | `gap-2` | Inline elements, dense grids |
| Standard | `gap-4` | Card grids |
| Relaxed | `gap-6` | Section grids |
| Spacious | `gap-8` | Major layout divisions |

### Max Widths

| Class | Pixels | Usage |
|---|---|---|
| `max-w-2xl` | 672px | Descriptions, abstracts |
| `max-w-3xl` | 768px | Long-form paragraphs |
| `max-w-4xl` | 896px | Standard content sections |
| `max-w-5xl` | 1024px | Wide content (grids, tables) |
| `max-w-6xl` | 1152px | Page-level container |

---

## 3. Color Palette

### Principles

- **Use semantic tokens always.** Never use raw hex values for UI elements.
- **Dark mode is primary.** Design for dark first, adapt to light.
- **Restraint.** Color is for meaning, not decoration.

### Semantic Tokens

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `bg-background` | white | near-black | Page background |
| `bg-foreground` | near-black | near-white | Primary text (inverted) |
| `text-foreground` | near-black | near-white | Headings, primary text |
| `text-muted-foreground` | gray | gray | Descriptions, secondary text |
| `bg-muted` | light gray | dark gray | Subtle backgrounds |
| `bg-muted/3` | 3% opacity | 3% opacity | Zebra section striping |
| `bg-muted/50` | 50% opacity | 50% opacity | Code blocks, badges |
| `border-border` | light gray | white 10% | All borders |
| `border-border/20` | 20% | 20% | Subtle dividers |
| `border-border/30` | 30% | 30% | Section borders |
| `border-border/40` | 40% | 40% | Interactive borders |

### Accent Colors

| Color | CSS | Usage |
|---|---|---|
| Green | `text-green-500`, `bg-green-500/10` | Success, active status, "Generated" badges |
| Blue | `text-blue-500`, `bg-blue-500/10` | Info, links, medium-tier items |
| Purple | `text-purple-500`, `bg-purple-500/10` | Advanced, long-term items |
| Yellow | `text-yellow-500`, `bg-yellow-500/10` | Warning, in-progress status |
| Red | `text-red-500`, `bg-red-500/10` | Error, destructive actions |

### Color Rules

- **Status indicators:** Use dot + text pattern. Example: `<span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active`
- **Links:** `text-foreground` with `underline underline-offset-4 decoration-border/40 hover:decoration-foreground/40`
- **Selection:** `bg-primary text-primary-foreground`
- **Never use color alone to convey meaning.** Always pair with text or icon.
- **Muted backgrounds:** Use `bg-muted/3` for subtle zebra striping on alternating sections.
- **Hover states:** `hover:border-border/40` for cards, `hover:text-foreground` for muted text.

---

## 4. Image Usage

### Rules

- **Every image must have `alt` text.** Descriptive, concise.
- **Lazy load below the fold:** Always use `loading="lazy"` and `decoding="async"`.
- **Aspect ratios:** Use `aspect-[4/3]` for gallery images, `aspect-video` for wide shots.
- **Object fit:** Always `object-cover` for filled containers, `object-contain` for logos/icons.
- **Border radius:** `rounded-lg` for cards, `rounded` for badges, `rounded-full` for avatars.
- **No decorative images.** Every image must serve a purpose (demonstration, proof, context).

### Gallery Images

```tsx
<figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted/30 border border-border/15">
  <img
    src={image.src}
    alt={image.alt}
    loading="lazy"
    decoding="async"
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
</figure>
```

- Show a "Generated" badge on hover for algorithmically produced images
- Caption overlay: `bg-gradient-to-t from-background/60 via-transparent to-transparent`
- Hover text: `opacity-0 group-hover:opacity-100 transition-opacity duration-300`

### Image Loading States

For galleries with many images, implement:

1. **Skeleton:** `bg-muted/30 animate-pulse` placeholder while loading
2. **Fade in:** `opacity-0` → `opacity-100` on `onLoad`
3. **Error state:** `ImageOff` icon from lucide-react with fallback text
4. **Never show broken images.** Always handle `onError`.

### Generated Image Attribution

All images produced by Backgrad must show:
- A "Generated" badge on hover (inline gallery)
- "Generated by Backgrad" in lightbox footer
- Credit: "© Lukas Olsen" for personal work

---

## 5. Component Patterns

### Section Structure

Every section follows this pattern:

```tsx
<section className="w-full px-4 md:px-8 py-20 border-t border-border/30">
  <div className="max-w-4xl mx-auto">
    {/* Section label */}
    <div className="flex items-center gap-3">
      <span className="text-xs font-mono text-muted-foreground/40">01</span>
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
        Section Title
      </span>
    </div>

    {/* Description */}
    <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
      Section description text.
    </p>

    {/* Content */}
  </div>
</section>
```

### Section Labels

Always use this exact pattern for section labels:

```tsx
<div className="flex items-center gap-3">
  <span className="text-xs font-mono text-muted-foreground/40">01</span>
  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
    Label
  </span>
</div>
```

- Number: `text-xs font-mono text-muted-foreground/40`
- Text: `text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium`
- Separator: `gap-3`

### Cards

Standard card:

```tsx
<div className="p-4 rounded-lg border border-border/20 bg-background hover:border-border/40 transition-colors">
  {/* content */}
</div>
```

Compact card (list item):

```tsx
<div className="flex items-start gap-2.5 p-3 rounded-lg hover:bg-muted/30 transition-colors">
  {/* content */}
</div>
```

### Code Blocks

```tsx
<div className="rounded-lg bg-muted/50 border border-border/20 p-4">
  <code className="text-[13px] font-mono text-foreground">
    code here
  </code>
</div>
```

### Badges

```tsx
<span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-green-500/10 text-green-600 dark:text-green-400">
  Label
</span>
```

### Links

Inline link:

```tsx
<a className="text-sm text-muted-foreground hover:text-foreground transition-colors">
  Link text
</a>
```

Arrow link:

```tsx
<a className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
  Link text
  <span className="text-muted-foreground/30 group-hover:text-foreground/50 transition-colors">→</span>
</a>
```

### Buttons

Always use the shadcn `Button` component. Never write raw `<button>` for user-facing actions.

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="sm">Action</Button>
<Button variant="ghost" size="sm">Secondary</Button>
<Button variant="outline" size="sm">Tertiary</Button>
```

---

## 6. Animation Rules

### Principles

- **Subtle.** Animations should feel natural, never flashy.
- **Purposeful.** Animate to guide attention, not to decorate.
- **Performant.** Use `transform` and `opacity` only. Never animate `width`, `height`, or `top/left`.

### Framer Motion Defaults

```tsx
// Section entrance
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
viewport={{ once: true }}

// Card entrance
initial={{ opacity: 0, y: 12 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, delay: index * 0.08 }}
viewport={{ once: true }}

// Micro-interaction
initial={{ opacity: 0, y: 8 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
viewport={{ once: true }}
```

### Timing

| Duration | Usage |
|---|---|
| `0.8s` | Hero entrance |
| `0.6s` | Section entrance |
| `0.4s` | Card/element entrance |
| `0.3s` | Micro-interaction, hover |
| `0.2s` | Button state change |

### Staggering

- Stagger child elements with `delay: index * 0.05` to `index * 0.08`
- Never stagger more than 15 elements — it becomes slow
- For long lists, use `whileInView` with `viewport={{ once: true }}`

### Canvas Animations

- Always use `requestAnimationFrame`
- Always handle `resize` events
- Always clean up with `cancelAnimationFrame` on unmount
- Use `devicePixelRatio` for sharp rendering on Retina displays
- Cap particles/elements: 350 max for flow fields, 20 max for triangulation

---

## 7. Layout Rules

### Page Structure

```tsx
<div className="min-h-screen w-full bg-background text-foreground">
  {/* Header — sticky, blur */}
  {/* Main content — sections */}
  {/* Footer */}
</div>
```

### Section Separation

- Between sections: `border-t border-border/30`
- Zebra striping: alternate sections get `bg-muted/3`
- Never use box shadows for section separation

### Responsive Breakpoints

| Breakpoint | Class | Column shift |
|---|---|---|
| Mobile | default | 1 column |
| Tablet | `md:` | 2 columns |
| Desktop | `lg:` | 3-4 columns |

### Grid Patterns

| Pattern | Classes | Usage |
|---|---|---|
| Dense cards | `grid gap-2 md:grid-cols-2` | Compact lists |
| Standard cards | `grid gap-4 md:grid-cols-2` | Card grids |
| Feature cards | `grid gap-6 md:grid-cols-3` | Feature sections |
| Wide grid | `grid gap-4 sm:grid-cols-2 lg:grid-cols-3` | Stats, metrics |

### Header

- Sticky: `sticky top-0 z-50`
- Blur: `bg-background/60 backdrop-blur-sm`
- Border on scroll: conditional `border-b border-border`
- Height: `py-2`

### Footer

- Subtle: `py-16` or `py-20`
- Border top: `border-t border-border/30`
- Text: `text-[12px] text-muted-foreground/50`

---

## 8. Writing Style

### Voice

- **Concise.** Say it in fewer words.
- **Technical.** This is a developer portfolio, not marketing copy.
- **Honest.** No superlatives. No "revolutionary." No "game-changing."
- **Present tense.** "Generates" not "Will generate."

### Formatting Rules

- **Sentence case** for headings: "How it works" not "How It Works"
- **No emojis** in content or headings
- **No exclamation marks** in technical writing
- **Code in mono:** Use `code` or `font-mono` for all technical terms, commands, file paths, and API names
- **One space after periods.** Not two.

### Label Patterns

| Pattern | Example |
|---|---|
| Section labels | "Quick start", "How it works", "Performance" |
| Status | "Active", "Planned", "In progress" |
| Badges | "Release", "Feature", "Improvement" |
| Time | "October 2025 — June 2026" |
| Version | "v0.1.0" |

### Content Length

| Type | Target |
|---|---|
| Hero abstract | 2-3 sentences |
| Section description | 1-2 sentences |
| Card description | 1 sentence |
| Badge label | 1-2 words |
| Update title | 3-6 words |
| Update description | 1 sentence |

---

## 9. Accessibility

- **Contrast:** All text must meet WCAG AA (4.5:1 for body, 3:1 for large text)
- **Focus states:** All interactive elements must have visible focus rings (`focus-visible:ring-2`)
- **Alt text:** Every image must have descriptive alt text
- **Keyboard navigation:** All interactive elements must be keyboard-accessible
- **Reduced motion:** Respect `prefers-reduced-motion` for animations
- **Semantic HTML:** Use `<section>`, `<nav>`, `<header>`, `<footer>`, `<figure>`, `<figcaption>` appropriately

---

## 10. Tech Stack Reference

| Layer | Technology |
|---|---|
| Framework | React 19 + TanStack Router/Start |
| Styling | Tailwind CSS v4 (CSS-based config) |
| Components | shadcn/ui (Radix primitives) |
| Animation | Framer Motion |
| Icons | lucide-react |
| Utilities | clsx + tailwind-merge (`cn()`) |
| i18n | Paraglide.js (en/no) |
| Content | MDX via @mdx-js/rollup |

### Key Files

| File | Purpose |
|---|---|
| `src/styles/globals.css` | Theme tokens, fonts, dark mode |
| `src/components/typography/typography.tsx` | Typography components |
| `src/components/ui/` | shadcn/ui components |
| `src/lib/utils.ts` | `cn()` utility |
| `src/core/layout.tsx` | Page layout wrapper |
| `src/core/header.tsx` | Navigation header |
