import React, { useState, useEffect } from 'react'
import weightCalcMethods from '../weightCalcMethods'

export default function SettingsModal({ show, onClose, onSave, initialMethod = Object.keys(weightCalcMethods)[0] }) {
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
                {Object.keys(weightCalcMethods).map((methodName) => (
                  <option key={methodName} value={methodName}>{methodName}</option>
                ))}
              </select>
              <small className="form-text text-muted mt-2 d-block" style={{ whiteSpace: 'pre-line' }}>
                {weightCalcMethods[method]?.description}
              </small>
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
