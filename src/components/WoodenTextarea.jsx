import { useState, useRef, useEffect, useId } from 'react'
import './WoodenTextarea.css'

export function WoodenTextarea({
  label,
  placeholder = '',
  defaultValue = '',
  value: controlledValue,
  onChange,
  helper,
  error,
  disabled = false,
  readOnly = false,
  maxLength,
  rows = 4,
  autoResize = true,
}) {
  const id = useId()
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = isControlled ? controlledValue : internalValue
  const textareaRef = useRef(null)

  // auto-resize
  useEffect(() => {
    if (!autoResize || !textareaRef.current) return
    const el = textareaRef.current
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value, autoResize])

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value)
    onChange?.(e.target.value, e)
  }

  const variant = error ? 'error' : 'default'

  return (
    <div className={`wooden-textarea-wrap ${disabled ? 'is-disabled' : ''}`}>
      {label && (
        <label className="wooden-textarea__label" htmlFor={id}>
          {label}
        </label>
      )}

      <div className={`wooden-textarea__field wooden-textarea__field--${variant}`}>
        <textarea
          id={id}
          ref={textareaRef}
          className="wooden-textarea__el"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          rows={autoResize ? undefined : rows}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-err` : helper ? `${id}-help` : undefined
          }
        />
        {/* resize handle decoration */}
        <div className="wooden-textarea__resize-grip" aria-hidden="true">
          <span /><span /><span />
        </div>
      </div>

      {(error || helper || maxLength) && (
        <div className="wooden-textarea__meta">
          {error ? (
            <span className="wooden-textarea__error" id={`${id}-err`} role="alert">
              {error}
            </span>
          ) : helper ? (
            <span className="wooden-textarea__helper" id={`${id}-help`}>
              {helper}
            </span>
          ) : (
            <span />
          )}
          {maxLength && (
            <span className="wooden-textarea__counter">
              {value.length}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  )
}