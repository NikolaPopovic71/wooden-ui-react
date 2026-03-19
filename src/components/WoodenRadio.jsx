import { useState } from "react";
import "./WoodenRadio.css";

export function WoodenRadioGroup({
  options = [],
  defaultValue,
  name,
  label,
  onChange,
}) {
  const [selected, setSelected] = useState(defaultValue ?? options[0]?.value);

  const handleChange = (value) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <fieldset className="wooden-radio-group">
      {label && <legend className="wooden-radio-group__legend">{label}</legend>}
      <div className="wooden-radio-group__options">
        {options.map((opt) => (
          <WoodenRadio
            key={opt.value}
            name={name}
            value={opt.value}
            label={opt.label}
            checked={selected === opt.value}
            onChange={() => handleChange(opt.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}

function WoodenRadio({ name, value, label, checked, onChange }) {
  return (
    <label className={`wooden-radio ${checked ? "is-checked" : ""}`}>
      <input
        className="wooden-radio__input"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {/* outer ring (track) */}
      <div className="wooden-radio__track">
        {/* wooden knob */}
        <div className="wooden-radio__knob" />
      </div>
      <span className="wooden-radio__label">{label}</span>
    </label>
  );
}
