import { useState } from "react";
import "./WoodenCheckbox.css";

/* ── Single checkbox ── */
export function WoodenCheckbox({
  label,
  defaultChecked = false,
  checked: controlledChecked, // controlled mode
  disabled = false,
  onChange,
}) {
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e) => {
    if (disabled) return;
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <label
      className={`wooden-checkbox ${checked ? "is-checked" : ""} ${disabled ? "is-disabled" : ""}`}
    >
      <input
        className="wooden-checkbox__input"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={label}
      />

      {/* carved box */}
      <div className="wooden-checkbox__box" aria-hidden="true">
        <svg
          className="wooden-checkbox__mark"
          viewBox="0 0 14 11"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polyline
            points="1.5,5.5 5.5,9.5 12.5,1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {label && <span className="wooden-checkbox__label">{label}</span>}
    </label>
  );
}

/* ── Checkbox group — fully controlled internally ── */
export function WoodenCheckboxGroup({ legend, options = [], onChange }) {
  const [values, setValues] = useState(
    () => new Set(options.filter((o) => o.defaultChecked).map((o) => o.value)),
  );

  const toggle = (value) => {
    setValues((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      onChange?.([...next]);
      return next;
    });
  };

  return (
    <fieldset className="wooden-checkbox-group">
      {legend && (
        <legend className="wooden-checkbox-group__legend">{legend}</legend>
      )}
      <div className="wooden-checkbox-group__list">
        {options.map((opt) => (
          <WoodenCheckbox
            key={opt.value}
            label={opt.label}
            checked={values.has(opt.value)}
            disabled={opt.disabled}
            onChange={() => toggle(opt.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}
