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
      setError('Gunakan tepat 4 angka.')
      return
    }

    if (isSetup && pin !== confirmPin) {
      setError('Kedua PIN belum sama.')
      return
    }

    if (!isSetup && pin !== savedPin) {
      setError('PIN belum tepat. Coba lagi.')
      setPin('')
      return
    }

    setError('')
    onSuccess(pin)
  }

  return <div className="modal-backdrop pin-backdrop">
    <form className="modal-card parent-pin-card" onSubmit={submit} aria-labelledby="parent-pin-title">
      <div className="pin-lock">🔒</div>
      <span className="eyebrow">AREA ORANG TUA</span>
      <h2 id="parent-pin-title">{isSetup ? 'Terakhir, buat PIN orang tua' : 'Khusus orang tua'}</h2>
      <p className="muted">{isSetup
        ? 'PIN 4 angka menjaga pengaturan KIDO agar tidak diubah anak.'
        : 'Masukkan PIN 4 angka untuk membuka pengaturan dan persetujuan.'}</p>

      <label className="field-label" htmlFor="parent-pin">{isSetup ? 'Buat PIN' : 'PIN orang tua'}</label>
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
        <label className="field-label" htmlFor="confirm-pin">Ulangi PIN</label>
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
        {isSetup ? 'Simpan & buka KIDO untuk anak' : 'Buka Area Orang Tua'}
      </button>
      <small className="pin-note">Pada prototipe ini, PIN hanya tersimpan di perangkat yang sedang digunakan.</small>
    </form>
  </div>
}
