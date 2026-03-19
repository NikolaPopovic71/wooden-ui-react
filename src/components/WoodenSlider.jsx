import { useState } from "react";
import "./WoodenSlider.css";

export function WoodenSlider({
  min = 0,
  max = 100,
  defaultValue = 50,
  step = 1,
  label,
  showValue = true,
  onChange,
}) {
  const [value, setValue] = useState(defaultValue);

  const percent = ((value - min) / (max - min)) * 100;

  const handleChange = (e) => {
    const v = Number(e.target.value);
    setValue(v);
    onChange?.(v);
  };

  return (
    <div className="wooden-slider">
      {label && (
        <div className="wooden-slider__header">
          <span className="wooden-slider__label">{label}</span>
          {showValue && <span className="wooden-slider__value">{value}</span>}
        </div>
      )}
      <div className="wooden-slider__track-wrapper">
        {/* filled portion */}
        <div className="wooden-slider__fill" style={{ width: `${percent}%` }} />
        {/* the actual input sits on top */}
        <input
          className="wooden-slider__input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
        />
      </div>
      <div className="wooden-slider__labels">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
