import { useMemo, useState } from 'react'

export default function ParentPinModal({ mode = 'verify', savedPin = '', onSuccess }) {
  const [pin, setPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState('')

  const isSetup = mode === 'setup'
  const canSubmit = useMemo(() => {
    if (!/^\d{4}$/.test(pin)) return false
    return isSetup ? pin === confirmPin : true
  }, [pin, confirmPin, isSetup])

  const submit = event => {
    event.preventDefault()
    if (!/^\d{4}$/.test(pin)) {
      setError('Use exactly 4 numbers.')
      return
    }
    if (isSetup && pin !== confirmPin) {
      setError('The two PINs do not match.')
      return
    }
    if (!isSetup && pin !== savedPin) {
      setError('That PIN is not right. Try again.')
      setPin('')
      return
    }
    setError('')
    onSuccess(pin)
  }

  return <div className="modal-backdrop pin-backdrop">
    <form className="modal-card parent-pin-card" onSubmit={submit} aria-labelledby="parent-pin-title">
      <div className="pin-lock">🔒</div>
      <span className="eyebrow">PARENT SPACE</span>
      <h2 id="parent-pin-title">{isSetup ? 'Create your Parent PIN' : 'Grown-ups only'}</h2>
      <p className="muted">{isSetup
        ? 'Use a 4-digit PIN before handing KIDO to your child. You can change this later.'
        : 'Enter your 4-digit Parent PIN to manage habits and approvals.'}</p>

      <label className="field-label" htmlFor="parent-pin">{isSetup ? 'Create PIN' : 'Parent PIN'}</label>
      <input
        id="parent-pin"
        className="pin-input"
        inputMode="numeric"
        autoComplete="off"
        pattern="[0-9]{4}"
        maxLength="4"
        value={pin}
        onChange={event => setPin(event.target.value.replace(/\D/g, '').slice(0, 4))}
        placeholder="••••"
        autoFocus
      />

      {isSetup && <>
        <label className="field-label" htmlFor="confirm-pin">Confirm PIN</label>
        <input
          id="confirm-pin"
          className="pin-input"
          inputMode="numeric"
          autoComplete="off"
          pattern="[0-9]{4}"
          maxLength="4"
          value={confirmPin}
          onChange={event => setConfirmPin(event.target.value.replace(/\D/g, '').slice(0, 4))}
          placeholder="••••"
        />
      </>}

      {error && <p className="pin-error" role="alert">{error}</p>}
      <button className="button button-primary button-full" disabled={!canSubmit}>
        {isSetup ? 'Save Parent PIN' : 'Unlock Parent Mode'}
      </button>
      <small className="pin-note">Prototype note: this PIN is stored only on this device and is not cryptographic security.</small>
    </form>
  </div>
}
