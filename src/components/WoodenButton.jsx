import './WoodenButton.css'

/*
  variants: 'default' | 'primary' | 'danger'
  sizes:    'sm' | 'md' | 'lg'
*/
export function WoodenButton({
  children,
  variant = 'default',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  icon,         // optional leading icon (ReactNode)
  iconAfter,    // optional trailing icon (ReactNode)
}) {
  return (
    <button
      className={[
        'wooden-btn',
        `wooden-btn--${variant}`,
        `wooden-btn--${size}`,
        fullWidth ? 'wooden-btn--full' : '',
        disabled ? 'is-disabled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {/* pressed-in grain layer */}
      <span className="wooden-btn__grain" aria-hidden="true" />

      {icon && <span className="wooden-btn__icon wooden-btn__icon--before">{icon}</span>}
      <span className="wooden-btn__label">{children}</span>
      {iconAfter && <span className="wooden-btn__icon wooden-btn__icon--after">{iconAfter}</span>}
    </button>
  )
}

/* ── Convenience wrappers ── */
export const WoodenButtonPrimary = (props) => <WoodenButton variant="primary" {...props} />
export const WoodenButtonDanger  = (props) => <WoodenButton variant="danger"  {...props} />