import { useState, useRef, useEffect, useId, useCallback } from "react";
import "./WoodenSelect.css";

export function WoodenSelect({
  options = [],
  defaultValue,
  value: controlledValue,
  label,
  onChange,
}) {
  const triggerId = useId();
  const listboxId = useId();
  const isControlled = controlledValue !== undefined;

  const [internalSelected, setInternalSelected] = useState(
    defaultValue ?? options[0]?.value,
  );
  const selected = isControlled ? controlledValue : internalSelected;

  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const optionRefs = useRef([]);

  const selectedIdx = options.findIndex((o) => o.value === selected);
  const selectedOption = options[selectedIdx];

  /* ── helpers ── */
  const closeList = useCallback((returnFocus = true) => {
    setOpen(false);
    setFocusedIdx(-1);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  const handleSelect = useCallback(
    (value) => {
      if (!isControlled) setInternalSelected(value);
      onChange?.(value);
      closeList();
    },
    [isControlled, onChange, closeList],
  );

  const openList = useCallback(() => {
    setOpen(true);
    // focus the currently selected option when opening
    const idx = options.findIndex((o) => o.value === selected);
    setFocusedIdx(idx >= 0 ? idx : 0);
  }, [options, selected]);

  /* ── scroll focused option into view ── */
  useEffect(() => {
    if (open && focusedIdx >= 0) {
      optionRefs.current[focusedIdx]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, focusedIdx]);

  /* ── move DOM focus into listbox once open ── */
  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  /* ── close on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        closeList(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [closeList]);

  /* ── keyboard on the trigger button ── */
  const handleTriggerKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
        e.preventDefault();
        openList();
        break;
      case "ArrowUp":
        e.preventDefault();
        openList();
        break;
      default:
        break;
    }
  };

  /* ── keyboard inside listbox ── */
  const handleListKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIdx((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIdx((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setFocusedIdx(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIdx(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIdx >= 0) handleSelect(options[focusedIdx].value);
        break;
      case "Escape":
      case "Tab":
        e.preventDefault();
        closeList();
        break;
      default:
        // Type-ahead: jump to first option starting with pressed key
        if (e.key.length === 1) {
          const char = e.key.toLowerCase();
          const idx = options.findIndex((o) =>
            o.label.toLowerCase().startsWith(char),
          );
          if (idx >= 0) setFocusedIdx(idx);
        }
        break;
    }
  };

  return (
    <div className="wooden-select" ref={containerRef}>
      {label && (
        <label
          id={`${triggerId}-label`}
          className="wooden-select__label"
          htmlFor={triggerId}
        >
          {label}
        </label>
      )}

      {/* Trigger button — properly labelled */}
      <button
        id={triggerId}
        ref={triggerRef}
        className={`wooden-select__trigger ${open ? "is-open" : ""}`}
        onClick={() => (open ? closeList() : openList())}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? `${triggerId}-label ${triggerId}` : undefined}
        aria-controls={open ? listboxId : undefined}
      >
        <span>{selectedOption?.label ?? "— select —"}</span>
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

      {/* Dropdown listbox */}
      {open && (
        <ul
          id={listboxId}
          ref={listRef}
          className="wooden-select__dropdown"
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={
            focusedIdx >= 0 ? `${listboxId}-opt-${focusedIdx}` : undefined
          }
          onKeyDown={handleListKeyDown}
        >
          {options.map((opt, idx) => (
            <li
              key={opt.value}
              id={`${listboxId}-opt-${idx}`}
              ref={(el) => {
                optionRefs.current[idx] = el;
              }}
              className={[
                "wooden-select__option",
                opt.value === selected ? "is-selected" : "",
                idx === focusedIdx ? "is-focused" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              role="option"
              aria-selected={opt.value === selected}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(opt.value);
              }}
              onMouseEnter={() => setFocusedIdx(idx)}
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
