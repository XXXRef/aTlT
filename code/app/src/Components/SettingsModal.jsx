import React, { useState, useEffect } from 'react'

export default function SettingsModal({ show, onClose, onSave, initialMethod = 'method 1' }) {
  const [method, setMethod] = useState(initialMethod)

  useEffect(() => {
    setMethod(initialMethod)
  }, [initialMethod, show])

  if (!show) return null

  const handleSave = () => {
    if (onSave) onSave(method)
    if (onClose) onClose()
  }

  const handleClose = () => {
    if (onClose) onClose()
  }

  return (
    <>
      <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title w-100 text-center">Settings</h5>
            </div>
            <div className="modal-body">
              <label htmlFor="selectCalcMethod">Calc method</label>
              <select
                id="selectCalcMethod"
                className="form-control"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="method 1">method 1</option>
                <option value="method 2">method 2</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  )
}
