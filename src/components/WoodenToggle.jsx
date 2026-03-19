import { useState } from "react";
import "./WoodenToggle.css";

/* ── Toggle A: round pill with check/cross icons ── */
export function WoodenToggleA({ defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <div className={`toggle-a ${checked ? "is-checked" : ""}`}>
      <input
        className="toggle-input"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        aria-label={checked ? "On" : "Off"}
      />
      <div className="toggle-a__handle" />
      {/* check icon */}
      <svg
        className="toggle-a__icon toggle-a__icon--check"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12.7072 5.70718L7.00008 11.4143L3.29297 7.70718L4.70718 6.29297L7.00008 8.58586L11.293 4.29297L12.7072 5.70718Z" />
      </svg>
      {/* cross icon */}
      <svg
        className="toggle-a__icon toggle-a__icon--cross"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M6.58594 8.00015L4.29297 5.70718L5.70718 4.29297L8.00015 6.58594L10.2931 4.29297L11.7073 5.70718L9.41436 8.00015L11.7072 10.293L10.293 11.7072L8.00015 9.41436L5.70733 11.7072L4.29312 10.293L6.58594 8.00015Z" />
      </svg>
    </div>
  );
}

/* ── Toggle B: rectangular with grip dots ── */
export function WoodenToggleB({ defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <div className={`toggle-b ${checked ? "is-checked" : ""}`}>
      <input
        className="toggle-input"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        aria-label={checked ? "On" : "Off"}
      />
      <div className="toggle-b__handle">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="toggle-b__dot" />
        ))}
      </div>
      <p className="toggle-b__text toggle-b__text--off" aria-hidden="true">
        OFF
      </p>
      <p className="toggle-b__text toggle-b__text--on" aria-hidden="true">
        ON
      </p>
    </div>
  );
}

/* ── Toggle C: slim track style ── */
export function WoodenToggleC({ defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <div className={`toggle-c ${checked ? "is-checked" : ""}`}>
      <input
        className="toggle-input"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        aria-label={checked ? "On" : "Off"}
      />
      <p className="toggle-c__text" aria-hidden="true">
        OFF
      </p>
      <div className="toggle-c__track-wrapper-wrapper">
        <div className="toggle-c__handle" />
        <div className="toggle-c__track-wrapper">
          <div className="toggle-c__track" />
        </div>
      </div>
      <p className="toggle-c__text" aria-hidden="true">
        ON
      </p>
    </div>
  );
}

/* ── Toggle D: sliding label style ── */
export function WoodenToggleD({ defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  return (
    <div className={`toggle-d ${checked ? "is-checked" : ""}`}>
      <input
        className="toggle-input"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        aria-label={checked ? "On" : "Off"}
      />
      <div className="toggle-d__handle">
        <p className="toggle-d__text toggle-d__text--off">OFF</p>
        <p className="toggle-d__text toggle-d__text--on">ON</p>
      </div>
    </div>
  );
}
