import { useState, useId } from "react";
import "./WoodenInput.css";

/*
  type:    'text' | 'email' | 'password' | 'number' | 'search'
  variant: 'default' | 'error' | 'success'
*/
export function WoodenInput({
  label,
  placeholder = "",
  type = "text",
  defaultValue = "",
  value: controlledValue,
  onChange,
  helper,
  error,
  disabled = false,
  readOnly = false,
  maxLength,
  iconBefore, // ReactNode
  iconAfter, // ReactNode
  onIconAfterClick,
}) {
  const id = useId();
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const variant = error ? "error" : "default";

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value, e);
  };

  return (
    <div className={`wooden-input-wrap ${disabled ? "is-disabled" : ""}`}>
      {label && (
        <label className="wooden-input__label" htmlFor={id}>
          {label}
        </label>
      )}

      <div className={`wooden-input__field wooden-input__field--${variant}`}>
        {iconBefore && (
          <span
            className="wooden-input__icon wooden-input__icon--before"
            aria-hidden="true"
          >
            {iconBefore}
          </span>
        )}

        <input
          id={id}
          className="wooden-input__el"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-err` : helper ? `${id}-help` : undefined
          }
          style={{
            paddingLeft: iconBefore ? "34px" : undefined,
            paddingRight: iconAfter ? "34px" : undefined,
          }}
        />

        {iconAfter && (
          <button
            className="wooden-input__icon wooden-input__icon--after"
            type="button"
            tabIndex={onIconAfterClick ? 0 : -1}
            onClick={onIconAfterClick}
            aria-label="input action"
          >
            {iconAfter}
          </button>
        )}
      </div>

      {/* max length counter */}
      {maxLength && (
        <div className="wooden-input__meta">
          {error && (
            <span className="wooden-input__error" id={`${id}-err`} role="alert">
              {error}
            </span>
          )}
          {!error && helper && (
            <span className="wooden-input__helper" id={`${id}-help`}>
              {helper}
            </span>
          )}
          <span className="wooden-input__counter">
            {value.length}/{maxLength}
          </span>
        </div>
      )}

      {!maxLength && (error || helper) && (
        <div className="wooden-input__meta">
          {error ? (
            <span className="wooden-input__error" id={`${id}-err`} role="alert">
              {error}
            </span>
          ) : (
            <span className="wooden-input__helper" id={`${id}-help`}>
              {helper}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
