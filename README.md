# 🪵 Wooden UI

[![Version](https://img.shields.io/badge/version-1.0.0-b75301)](https://github.com/NikolaPopovic71/wooden-ui-react)
[![License](https://img.shields.io/badge/license-MIT-5698bb)](./LICENSE)
[![React](https://img.shields.io/badge/React-19%2B-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8%2B-646cff?logo=vite&logoColor=white)](https://vitejs.dev)

A handcrafted React component library with a skeuomorphic wood texture aesthetic. All components share a consistent visual language — carved-in inputs, raised wooden buttons, tactile toggles, and warm amber tones.

![Wooden UI Preview](https://assets.codepen.io/4175254/wood-pattern.png)

---

## Installation

### From npm *(once published)*

```bash
npm install wooden-ui-react
```

Then import components and styles:

```jsx
import { WoodenButton, WoodenInput } from 'wooden-ui-react'
import 'wooden-ui-react/style.css'
```

### Local development

```bash
git clone https://github.com/NikolaPopovic71/wooden-ui-react.git
cd wooden-ui-react
npm install
npm run dev
```

> **Requires**: React 19+, Vite 8+

The wood texture is served from CodePen CDN (`https://assets.codepen.io/4175254/wood-pattern.png`). To self-host, download the image and update `--wood-texture` in `src/index.css`.

---

## CSS Variables

All components share a set of CSS custom properties defined in `src/index.css`:

```css
:root {
  --wood-light:   #d4a96a;   /* light grain highlight */
  --wood-mid:     #a07840;   /* mid tone */
  --wood-dark:    #775b40;   /* dark grain, text */
  --wood-darker:  #4b3928;   /* carved-in surfaces */
  --wood-shadow:  #b75301;   /* warm inner shadow */
  --wood-edge:    #e9d38d;   /* bright edge highlight */
  --wood-burn:    #ad2201;   /* deep burn shadow */

  --state-off:    #bb5555;   /* red — inactive/danger */
  --state-on:     #5698bb;   /* blue — active/primary */

  --wood-texture: url("...");
  --inset-shadow: ...;       /* raised knob shadow */
  --track-shadow: ...;       /* track/container shadow */
  --transition:   0.4s linear;
}
```

---

## Components

### `WoodenToggleA` — Round pill toggle with icon

```jsx
import { WoodenToggleA } from './components/WoodenToggle'

<WoodenToggleA
  defaultChecked={false}
  onChange={(checked) => console.log(checked)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultChecked` | `boolean` | `false` | Initial state |
| `onChange` | `(checked: boolean) => void` | — | Change callback |

---

### `WoodenToggleB` — Rectangular grip toggle

```jsx
import { WoodenToggleB } from './components/WoodenToggle'

<WoodenToggleB defaultChecked={true} onChange={fn} />
```

Same props as `WoodenToggleA`.

---

### `WoodenToggleC` — Slim track toggle

```jsx
import { WoodenToggleC } from './components/WoodenToggle'

<WoodenToggleC defaultChecked={false} onChange={fn} />
```

Same props as `WoodenToggleA`.

---

### `WoodenToggleD` — Sliding label toggle

```jsx
import { WoodenToggleD } from './components/WoodenToggle'

<WoodenToggleD defaultChecked={false} onChange={fn} />
```

Same props as `WoodenToggleA`.

---

### `WoodenSlider`

```jsx
import { WoodenSlider } from './components/WoodenSlider'

<WoodenSlider
  label="Volume"
  min={0}
  max={100}
  defaultValue={50}
  step={1}
  showValue={true}
  onChange={(value) => console.log(value)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Visible label above slider |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `defaultValue` | `number` | `50` | Initial value |
| `step` | `number` | `1` | Step increment |
| `showValue` | `boolean` | `true` | Show current value next to label |
| `onChange` | `(value: number) => void` | — | Change callback |

---

### `WoodenRadioGroup`

```jsx
import { WoodenRadioGroup } from './components/WoodenRadio'

<WoodenRadioGroup
  name="finish"
  label="Surface finish"
  options={[
    { value: 'matte',  label: 'Matte' },
    { value: 'satin',  label: 'Satin' },
    { value: 'gloss',  label: 'High Gloss' },
  ]}
  defaultValue="satin"
  onChange={(value) => console.log(value)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | HTML `name` attribute for radio group |
| `label` | `string` | — | Group legend |
| `options` | `{ value, label }[]` | `[]` | Options list |
| `defaultValue` | `string` | first option | Initially selected value |
| `onChange` | `(value: string) => void` | — | Change callback |

---

### `WoodenSelect`

```jsx
import { WoodenSelect } from './components/WoodenSelect'

<WoodenSelect
  label="Wood type"
  options={[
    { value: 'oak',    label: 'Oak' },
    { value: 'walnut', label: 'Walnut' },
  ]}
  defaultValue="oak"
  onChange={(value) => console.log(value)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label above dropdown |
| `options` | `{ value, label }[]` | `[]` | Options list |
| `defaultValue` | `string` | first option | Initially selected value |
| `onChange` | `(value: string) => void` | — | Change callback |

Closes on outside click and `Escape` key.

---

### `WoodenCheckbox`

```jsx
import { WoodenCheckbox } from './components/WoodenCheckbox'

<WoodenCheckbox
  label="I agree to the terms"
  defaultChecked={false}
  disabled={false}
  onChange={(checked) => console.log(checked)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Visible label |
| `defaultChecked` | `boolean` | `false` | Uncontrolled initial state |
| `checked` | `boolean` | — | Controlled mode |
| `disabled` | `boolean` | `false` | Disables interaction |
| `onChange` | `(checked: boolean) => void` | — | Change callback |

---

### `WoodenCheckboxGroup`

```jsx
import { WoodenCheckboxGroup } from './components/WoodenCheckbox'

<WoodenCheckboxGroup
  legend="Features"
  options={[
    { value: 'grain', label: 'Wood grain', defaultChecked: true },
    { value: 'knots', label: 'Natural knots' },
    { value: 'aged',  label: 'Aged patina', disabled: true },
  ]}
  onChange={(values) => console.log(values)} // string[]
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legend` | `string` | — | Group label |
| `options` | `{ value, label, defaultChecked?, disabled? }[]` | `[]` | Options |
| `onChange` | `(values: string[]) => void` | — | Called with array of selected values |

---

### `WoodenButton`

```jsx
import { WoodenButton } from './components/WoodenButton'

<WoodenButton
  variant="primary"
  size="md"
  icon={<SaveIcon />}
  onClick={handleSave}
>
  Save
</WoodenButton>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'danger'` | `'default'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button height |
| `disabled` | `boolean` | `false` | Disables button |
| `fullWidth` | `boolean` | `false` | Stretches to container width |
| `icon` | `ReactNode` | — | Leading icon |
| `iconAfter` | `ReactNode` | — | Trailing icon |
| `type` | `string` | `'button'` | HTML button type |
| `onClick` | `() => void` | — | Click handler |

---

### `WoodenInput`

```jsx
import { WoodenInput } from './components/WoodenInput'

<WoodenInput
  label="Email"
  type="email"
  placeholder="you@example.com"
  iconBefore={<MailIcon />}
  maxLength={64}
  helper="We will never share your email"
  error={!isValid ? 'Enter a valid email' : ''}
  value={email}
  onChange={(val) => setEmail(val)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label above field |
| `type` | `string` | `'text'` | Input type |
| `placeholder` | `string` | `''` | Placeholder text |
| `defaultValue` | `string` | `''` | Uncontrolled initial value |
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string, e) => void` | — | Change callback |
| `helper` | `string` | — | Helper text below field |
| `error` | `string` | — | Error text (overrides helper, adds red ring) |
| `disabled` | `boolean` | `false` | Disables input |
| `maxLength` | `number` | — | Max chars + counter |
| `iconBefore` | `ReactNode` | — | Leading icon |
| `iconAfter` | `ReactNode` | — | Trailing icon (clickable if `onIconAfterClick` provided) |
| `onIconAfterClick` | `() => void` | — | Makes trailing icon a button |

---

### `WoodenTextarea`

```jsx
import { WoodenTextarea } from './components/WoodenTextarea'

<WoodenTextarea
  label="Notes"
  placeholder="Write something..."
  maxLength={200}
  autoResize={true}
  helper="Describe grain and finish"
  value={notes}
  onChange={(val) => setNotes(val)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label |
| `placeholder` | `string` | `''` | Placeholder |
| `defaultValue` | `string` | `''` | Uncontrolled initial value |
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string, e) => void` | — | Change callback |
| `helper` | `string` | — | Helper text |
| `error` | `string` | — | Error text + red ring |
| `disabled` | `boolean` | `false` | Disabled state |
| `maxLength` | `number` | — | Max chars + counter |
| `rows` | `number` | `4` | Initial rows (when `autoResize` is false) |
| `autoResize` | `boolean` | `true` | Grows with content |

---

### `WoodenNumberInput`

```jsx
import { WoodenNumberInput } from './components/WoodenNumberInput'

<WoodenNumberInput
  label="Quantity"
  min={1}
  max={99}
  step={1}
  defaultValue={1}
  unit=" pcs"
  onChange={(value) => console.log(value)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label |
| `min` | `number` | `-Infinity` | Minimum value |
| `max` | `number` | `Infinity` | Maximum value |
| `step` | `number` | `1` | Increment step |
| `defaultValue` | `number` | `0` | Uncontrolled initial value |
| `value` | `number` | — | Controlled value |
| `unit` | `string` | — | Unit suffix shown in field (e.g. `°C`, `%`) |
| `precision` | `number` | `0` | Decimal places for rounding |
| `helper` | `string` | — | Helper text |
| `error` | `string` | — | Error text |
| `disabled` | `boolean` | `false` | Disabled state |
| `onChange` | `(value: number) => void` | — | Change callback |

Supports long-press on `+`/`-` buttons for rapid increment, and `↑`/`↓` arrow keys.

---

## Project Structure

```
src/
├── index.css                       # CSS variables + body reset
├── main.jsx                        # React entry point
├── App.jsx                         # Full showcase
├── App.css                         # Showcase layout styles
└── components/
    ├── WoodenToggle.jsx/.css       # Toggles A, B, C, D
    ├── WoodenSlider.jsx/.css       # Range slider
    ├── WoodenRadio.jsx/.css        # Radio group
    ├── WoodenSelect.jsx/.css       # Custom dropdown
    ├── WoodenCheckbox.jsx/.css     # Checkbox + CheckboxGroup
    ├── WoodenButton.jsx/.css       # Button (default / primary / danger)
    ├── WoodenInput.jsx/.css        # Text input
    ├── WoodenTextarea.jsx/.css     # Textarea with auto-resize
    └── WoodenNumberInput.jsx/.css  # Stepper with long-press
```

---

## Accessibility

- All interactive elements have accessible labels (`aria-label`, `aria-describedby`, `htmlFor`)
- Error messages use `role="alert"` for screen reader announcement
- Focus styles are preserved (`focus-visible` outlines using `--state-on` blue)
- `disabled` states are conveyed via both visual opacity and `disabled` attribute
- Keyboard navigation: `Tab`, `Enter`, `Space`, `Escape`, `Arrow` keys all work as expected

---

## License

MIT — free to use and modify. Attribution appreciated. 🪵
