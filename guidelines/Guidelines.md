# Typography System Guidelines

## Overview
Our typography system uses **Nunito** for headers and **Inter** for body text, with responsive scaling and consistent hierarchy across all application panels.

## Typography Hierarchy

### Desktop Sizes
- **H1**: 38px / 46px line height - Main page titles
- **H2**: 30px / 38px line height - Section headers
- **H3**: 24px / 32px line height - Subsection headers
- **H4**: 20px / 28px line height - Card titles
- **H5**: 16px / 24px line height - Small headers
- **Body LG**: 16px / 24px line height - Prominent body text
- **Body Base**: 14px / 22px line height - Default body text
- **Body SM**: 12px / 20px line height - Captions, metadata

### Mobile Sizes (Auto-responsive)
- **H1**: 30px / 38px line height
- **H2**: 25px / 32px line height
- **H3**: 21px / 28px line height
- **H4**: 19px / 24px line height
- **H5**: 16px / 22px line height
- **Body LG**: 16px / 24px line height
- **Body Base**: 15px / 22px line height (min 16px for inputs)
- **Body SM**: 13px / 19px line height

## Usage Rules

### HTML Elements
- Use semantic HTML elements (`h1`, `h2`, `h3`, `h4`, `h5`, `p`) whenever possible
- Headers automatically use Nunito font
- Body elements automatically use Inter font

### Utility Classes
Use these classes when you need typography styling on non-semantic elements:

```html
<!-- Header styles -->
<div class="text-h1">Main Title</div>
<div class="text-h2">Section Header</div>
<div class="text-h3">Subsection</div>
<div class="text-h4">Card Title</div>
<div class="text-h5">Small Header</div>

<!-- Body text styles -->
<div class="text-lg">Large body text</div>
<div class="text-base">Default body text</div>
<div class="text-sm">Small text</div>

<!-- Font weights -->
<div class="font-regular">Regular weight</div>
<div class="font-semibold">Semibold weight</div>
<div class="font-bold">Bold weight</div>

<!-- Text styles -->
<div class="text-strong">Strong text</div>
<div class="text-italic">Italic text</div>
<div class="text-underline">Underlined text</div>
<div class="text-line-through">Deleted text</div>
```

### Content Width for Readability
Use the `content-width` class for optimal reading experience:
```html
<div class="content-width">
  <p>This content will have optimal line length for reading...</p>
</div>
```

## Accessibility Requirements

1. **Minimum Font Size**: All interactive elements use minimum 16px on mobile
2. **Color Contrast**: Ensure WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
3. **Line Length**: 
   - Desktop: ~60-80 characters (use `content-width` class)
   - Mobile: ~35-50 characters

## Consistency Rules

1. **Never override typography with inline Tailwind classes** - Use the utility classes provided
2. **Use semantic HTML first**, utility classes second
3. **Maintain visual hierarchy** - Don't skip heading levels
4. **Apply consistently** across dashboards, forms, modals, and all UI panels
5. **Responsive by default** - Typography automatically scales on mobile

## Examples

### Dashboard Card
```html
<div class="card">
  <h4>Client Completion Rate</h4>
  <p class="text-lg font-semibold">87%</p>
  <p class="text-sm text-muted-foreground">+5% from last month</p>
</div>
```

### Form Section
```html
<div>
  <h3>Account Settings</h3>
  <label class="text-sm font-medium">Email Address</label>
  <input type="email" />
  <p class="text-sm text-muted-foreground">We'll never share your email</p>
</div>
```

### Modal Header
```html
<div>
  <h2>Campaign Distribution</h2>
  <p class="text-base text-muted-foreground">Configure your campaign settings</p>
</div>
```

## Design System Integration

- Typography integrates seamlessly with existing color tokens
- Responsive breakpoints align with component system
- Letter spacing optimized for each font size
- Line heights calculated for optimal readability
- Consistent margin/padding relationships maintained

## General Guidelines

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files
* Use the typography system consistently - never override with arbitrary Tailwind font/text classes
* Ensure all text content uses proper semantic markup and accessibility attributes

## Design System Rules

* Use semantic HTML typography elements (h1-h5, p) whenever possible
* Apply utility classes only when semantic elements aren't appropriate
* Maintain consistent spacing between typography elements
* Date formats should always be in the format "Jun 10"
* Interactive elements must meet minimum touch target size (44px minimum)
* All form inputs must use minimum 16px font size on mobile for accessibility
* Text content should be wrapped in content-width containers for optimal readability