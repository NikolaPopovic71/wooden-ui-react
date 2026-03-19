import { useState, useRef, useEffect } from "react";
import "./WoodenSelect.css";

export function WoodenSelect({ options = [], defaultValue, label, onChange }) {
  const [selected, setSelected] = useState(defaultValue ?? options[0]?.value);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selectedOption = options.find((o) => o.value === selected);

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
    onChange?.(value);
  };

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="wooden-select" ref={ref}>
      {label && <p className="wooden-select__label">{label}</p>}

      {/* Trigger button */}
      <button
        className={`wooden-select__trigger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selectedOption?.label ?? "— select —"}</span>
        {/* carved arrow icon */}
        <svg
          className="wooden-select__arrow"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1 1L6 7L11 1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <ul
          className="wooden-select__dropdown"
          role="listbox"
          aria-label={label}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`wooden-select__option ${opt.value === selected ? "is-selected" : ""}`}
              role="option"
              aria-selected={opt.value === selected}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.value === selected && (
                <svg
                  className="wooden-select__check"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12.7072 5.70718L7.00008 11.4143L3.29297 7.70718L4.70718 6.29297L7.00008 8.58586L11.293 4.29297L12.7072 5.70718Z" />
                </svg>
              )}
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
