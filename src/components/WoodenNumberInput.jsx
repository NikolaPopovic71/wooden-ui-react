import { useState, useCallback, useRef, useEffect, useId } from "react";
import "./WoodenNumberInput.css";

export function WoodenNumberInput({
  label,
  min = -Infinity,
  max = Infinity,
  step = 1,
  defaultValue = 0,
  value: controlledValue,
  onChange,
  helper,
  error,
  disabled = false,
  unit,
  precision = 0,
}) {
  const id = useId();
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [inputStr, setInputStr] = useState(String(defaultValue));
  const [focused, setFocused] = useState(false);
  const intervalRef = useRef(null);

  const value = isControlled ? controlledValue : internalValue;

  // Keep latest props/value in refs — updated via useEffect, never during render
  const propsRef = useRef({
    min,
    max,
    step,
    precision,
    isControlled,
    onChange,
  });
  const valueRef = useRef(value);

  useEffect(() => {
    propsRef.current = { min, max, step, precision, isControlled, onChange };
  }, [min, max, step, precision, isControlled, onChange]);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // Stable commit — reads from ref, intentionally empty dep array
  const commit = useCallback((raw) => {
    const {
      min: mn,
      max: mx,
      precision: pr,
      isControlled: ic,
      onChange: oc,
    } = propsRef.current;
    const clamped = parseFloat(Math.min(mx, Math.max(mn, raw)).toFixed(pr));
    if (!ic) setInternalValue(clamped);
    setInputStr(String(clamped));
    oc?.(clamped);
  }, []);

  const increment = useCallback(() => {
    const { step: st, precision: pr } = propsRef.current;
    commit(parseFloat((valueRef.current + st).toFixed(pr)));
  }, [commit]);

  const decrement = useCallback(() => {
    const { step: st, precision: pr } = propsRef.current;
    commit(parseFloat((valueRef.current - st).toFixed(pr)));
  }, [commit]);

  // Long-press repeat — using pointer events to avoid mouse+touch double-fire on mobile
  const startRepeat = useCallback((fn) => {
    fn();
    intervalRef.current = setTimeout(() => {
      intervalRef.current = setInterval(fn, 80);
    }, 350);
  }, []);

  const stopRepeat = useCallback(() => {
    clearTimeout(intervalRef.current);
    clearInterval(intervalRef.current);
  }, []);

  const handleInputChange = (e) => setInputStr(e.target.value);

  const handleBlur = () => {
    setFocused(false);
    const parsed = parseFloat(inputStr);
    if (!isNaN(parsed)) commit(parsed);
    else setInputStr(String(valueRef.current));
  };

  const handleFocus = () => {
    setFocused(true);
    setInputStr(String(valueRef.current));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      increment();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      decrement();
    }
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const atMin = value <= min;
  const atMax = value >= max;
  const variant = error ? "error" : "default";

  return (
    <div className={`wooden-number-wrap ${disabled ? "is-disabled" : ""}`}>
      {label && (
        <label className="wooden-number__label" htmlFor={id}>
          {label}
        </label>
      )}

      <div className={`wooden-number__field wooden-number__field--${variant}`}>
        {/* decrement button */}
        <button
          className={`wooden-number__btn wooden-number__btn--dec ${atMin ? "is-limit" : ""}`}
          type="button"
          disabled={disabled || atMin}
          aria-label="Decrease"
          onPointerDown={(e) => {
            e.preventDefault();
            startRepeat(decrement);
          }}
          onPointerUp={stopRepeat}
          onPointerLeave={stopRepeat}
          onPointerCancel={stopRepeat}
        >
          <svg
            viewBox="0 0 10 2"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line
              x1="1"
              y1="1"
              x2="9"
              y2="1"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* number input */}
        <div className="wooden-number__input-wrap">
          <input
            id={id}
            className="wooden-number__el"
            type="text"
            inputMode="numeric"
            value={
              focused ? inputStr : unit ? `${value}${unit}` : String(value)
            }
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            aria-invalid={!!error}
            aria-valuenow={value}
            aria-valuemin={min === -Infinity ? undefined : min}
            aria-valuemax={max === Infinity ? undefined : max}
          />
        </div>

        {/* increment button */}
        <button
          className={`wooden-number__btn wooden-number__btn--inc ${atMax ? "is-limit" : ""}`}
          type="button"
          disabled={disabled || atMax}
          aria-label="Increase"
          onPointerDown={(e) => {
            e.preventDefault();
            startRepeat(increment);
          }}
          onPointerUp={stopRepeat}
          onPointerLeave={stopRepeat}
          onPointerCancel={stopRepeat}
        >
          <svg
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <line
              x1="5"
              y1="1"
              x2="5"
              y2="9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="5"
              x2="9"
              y2="5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {(error || helper) && (
        <div className="wooden-number__meta">
          {error ? (
            <span className="wooden-number__error" role="alert">
              {error}
            </span>
          ) : (
            <span className="wooden-number__helper">{helper}</span>
          )}
        </div>
      )}
    </div>
  );
}
