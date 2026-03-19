import { useState } from "react";
import {
  WoodenToggleA,
  WoodenToggleB,
  WoodenToggleC,
  WoodenToggleD,
} from "./components/WoodenToggle";
import { WoodenSlider } from "./components/WoodenSlider";
import { WoodenRadioGroup } from "./components/WoodenRadio";
import { WoodenSelect } from "./components/WoodenSelect";
import {
  WoodenCheckbox,
  WoodenCheckboxGroup,
} from "./components/WoodenCheckbox";
import { WoodenButton } from "./components/WoodenButton";
import { WoodenInput } from "./components/WoodenInput";
import { WoodenTextarea } from "./components/WoodenTextarea";
import { WoodenNumberInput } from "./components/WoodenNumberInput";
import "./App.css";

/* ── inline SVG icons for Input demos ── */
const IconUser = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="5.5" r="2.5" />
    <path d="M2.5 13.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
  </svg>
);
const IconMail = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
    <path d="M1.5 5l6.5 4.5L14.5 5" />
  </svg>
);
const IconLock = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="7.5" width="10" height="7" rx="1.5" />
    <path d="M5 7.5V5a3 3 0 016 0v2.5" />
  </svg>
);
const IconSave = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13 13H3a1 1 0 01-1-1V4l3-3h7.5L14 2.5V12a1 1 0 01-1 1z" />
    <path d="M5 13V9h6v4M5 1v4h5" />
  </svg>
);
const IconTrash = (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 4h12M5 4V2.5h6V4M6 7v4.5M10 7v4.5M3 4l1 9.5h8L13 4" />
  </svg>
);

const extraOptions = [
  { value: "grain", label: "Wood grain visible" },
  { value: "knots", label: "Natural knots" },
  { value: "aged", label: "Aged patina" },
  { value: "oiled", label: "Oil finish" },
];

const woodOptions = [
  { value: "oak", label: "Oak" },
  { value: "pine", label: "Pine" },
  { value: "walnut", label: "Walnut" },
  { value: "cherry", label: "Cherry" },
  { value: "mahogany", label: "Mahogany" },
];

const finishOptions = [
  { value: "matte", label: "Matte" },
  { value: "satin", label: "Satin" },
  { value: "gloss", label: "High Gloss" },
];

export default function App() {
  const [state, setState] = useState({
    notifications: false,
    autoSave: true,
    darkMode: false,
    soundFx: true,
    volume: 65,
    brightness: 40,
    wood: "oak",
    finish: "satin",
    extras: ["grain"],
    username: "",
    email: "",
    password: "",
    inputError: "",
    notes: "",
    quantity: 1,
    temperature: 20,
    discount: 0,
  });

  const update = (key) => (val) => setState((s) => ({ ...s, [key]: val }));

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-knot" />
        <h1 className="app__title">Wooden UI</h1>
        <p className="app__subtitle">Handcrafted React Components</p>
      </header>

      <div className="app__grid">
        {/* ── Toggles ── */}
        <section className="card">
          <h2 className="card__title">Toggles</h2>

          <div className="card__row">
            <span className="card__field-label">Notifications</span>
            <WoodenToggleA
              defaultChecked={state.notifications}
              onChange={update("notifications")}
            />
          </div>

          <div className="card__row">
            <span className="card__field-label">Auto-Save</span>
            <WoodenToggleA
              defaultChecked={state.autoSave}
              onChange={update("autoSave")}
            />
          </div>

          <div className="card__divider" />

          <div className="card__row">
            <span className="card__field-label">Dark Mode</span>
            <WoodenToggleB
              defaultChecked={state.darkMode}
              onChange={update("darkMode")}
            />
          </div>

          <div className="card__row">
            <span className="card__field-label">Sound FX</span>
            <WoodenToggleB
              defaultChecked={state.soundFx}
              onChange={update("soundFx")}
            />
          </div>

          <div className="card__divider" />

          <div className="card__row card__row--center">
            <WoodenToggleC
              defaultChecked={state.soundFx}
              onChange={update("soundFx")}
            />
          </div>

          <div className="card__divider" />

          <div className="card__row">
            <WoodenToggleD defaultChecked={false} onChange={() => {}} />
            <WoodenToggleD defaultChecked={true} onChange={() => {}} />
          </div>
        </section>

        {/* ── Sliders ── */}
        <section className="card">
          <h2 className="card__title">Sliders</h2>

          <WoodenSlider
            label="Volume"
            min={0}
            max={100}
            defaultValue={state.volume}
            onChange={update("volume")}
          />

          <WoodenSlider
            label="Brightness"
            min={0}
            max={100}
            defaultValue={state.brightness}
            onChange={update("brightness")}
          />

          <WoodenSlider
            label="Bass"
            min={-10}
            max={10}
            defaultValue={0}
            step={1}
          />

          <WoodenSlider
            label="Treble"
            min={-10}
            max={10}
            defaultValue={3}
            step={1}
          />
        </section>

        {/* ── Radio + Select ── */}
        <section className="card">
          <h2 className="card__title">Radio & Select</h2>

          <WoodenRadioGroup
            name="finish"
            label="Surface finish"
            options={finishOptions}
            defaultValue={state.finish}
            onChange={update("finish")}
          />

          <div className="card__divider" />

          <WoodenSelect
            label="Wood type"
            options={woodOptions}
            defaultValue={state.wood}
            onChange={update("wood")}
          />
        </section>

        {/* ── Buttons ── */}
        <section className="card">
          <h2 className="card__title">Buttons</h2>

          <p className="card__label-sm">Default</p>
          <div className="card__btn-row">
            <WoodenButton size="sm">Small</WoodenButton>
            <WoodenButton size="md">Medium</WoodenButton>
            <WoodenButton size="lg">Large</WoodenButton>
          </div>

          <div className="card__divider" />

          <p className="card__label-sm">Primary</p>
          <div className="card__btn-row">
            <WoodenButton variant="primary" size="sm" icon={IconSave}>
              Save
            </WoodenButton>
            <WoodenButton variant="primary" size="md">
              Confirm
            </WoodenButton>
          </div>

          <p className="card__label-sm">Danger</p>
          <div className="card__btn-row">
            <WoodenButton variant="danger" size="md" icon={IconTrash}>
              Delete
            </WoodenButton>
            <WoodenButton variant="danger" size="md" disabled>
              Disabled
            </WoodenButton>
          </div>

          <div className="card__divider" />

          <WoodenButton
            variant="primary"
            size="md"
            fullWidth
            onClick={() =>
              setState((s) => ({ ...s, username: "", email: "", password: "" }))
            }
          >
            Reset Form
          </WoodenButton>
        </section>

        {/* ── Checkboxes ── */}
        <section className="card">
          <h2 className="card__title">Checkboxes</h2>

          <WoodenCheckbox label="I agree to the terms" defaultChecked={false} />
          <WoodenCheckbox
            label="Subscribe to newsletter"
            defaultChecked={true}
          />
          <WoodenCheckbox
            label="Unavailable option"
            defaultChecked={false}
            disabled
          />

          <div className="card__divider" />

          <WoodenCheckboxGroup
            legend="Wood characteristics"
            options={extraOptions}
            onChange={update("extras")}
          />
        </section>

        {/* ── Inputs ── */}
        <section className="card card--wide">
          <h2 className="card__title">Text Inputs</h2>

          <WoodenInput
            label="Username"
            placeholder="e.g. woodworker42"
            iconBefore={IconUser}
            value={state.username}
            onChange={update("username")}
            maxLength={24}
            helper="Letters, numbers and underscores only"
          />

          <WoodenInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            iconBefore={IconMail}
            value={state.email}
            onChange={update("email")}
            error={
              state.email && !state.email.includes("@")
                ? "Enter a valid email address"
                : ""
            }
            helper={!state.email ? "We will never share your email" : ""}
          />

          <WoodenInput
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            iconBefore={IconLock}
            value={state.password}
            onChange={update("password")}
            error={
              state.password && state.password.length < 8
                ? "Password must be at least 8 characters"
                : ""
            }
          />

          <div className="card__btn-row">
            <WoodenButton variant="primary" size="md" fullWidth>
              Sign In
            </WoodenButton>
            <WoodenButton
              size="md"
              fullWidth
              onClick={() =>
                setState((s) => ({
                  ...s,
                  username: "",
                  email: "",
                  password: "",
                }))
              }
            >
              Cancel
            </WoodenButton>
          </div>
        </section>

        {/* ── Textarea + Number ── */}
        <section className="card card--wide">
          <h2 className="card__title">Textarea & Number Input</h2>

          <WoodenTextarea
            label="Notes"
            placeholder="Write something about this wood piece..."
            maxLength={200}
            helper="Describe grain, finish, or special characteristics"
            value={state.notes}
            onChange={update("notes")}
          />

          <div className="card__divider" />

          <div className="card__number-row">
            <WoodenNumberInput
              label="Quantity"
              min={1}
              max={99}
              step={1}
              defaultValue={1}
              unit=" pcs"
              onChange={update("quantity")}
            />
            <WoodenNumberInput
              label="Temperature"
              min={-20}
              max={120}
              step={0.5}
              defaultValue={20}
              unit="°C"
              precision={1}
              onChange={update("temperature")}
            />
            <WoodenNumberInput
              label="Discount"
              min={0}
              max={100}
              step={5}
              defaultValue={0}
              unit="%"
              onChange={update("discount")}
            />
          </div>
        </section>
      </div>
      <div className="app__readout">
        <span className="app__readout-label">Current state</span>
        <pre className="app__readout-pre">{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}
