import React, { useState, useEffect } from 'react'
import weightCalcMethods from '../weightCalcMethods'
import { savePreferences, loadPreferences, getDefaultSettings } from '../utils/preferences'

export default function SettingsModal({ show: i_bShowSettings, onClose, onSave, initialMethod = Object.keys(weightCalcMethods)[0] }) {
  const [weightCalcMethod, setWeightCalcMethod] = useState(initialMethod)
  const [bSaveToPreferences, setBSaveToPreferences] = useState(true)

  useEffect(() => {
    setWeightCalcMethod(initialMethod)
    // Load checkbox state from preferences when modal opens
    if (i_bShowSettings) {
      const userPrefs = loadPreferences()
      const defaultPrefs = getDefaultSettings()
      const bCheckboxState = userPrefs?.savePreferencesCheckbox ?? defaultPrefs.savePreferencesCheckbox

      setBSaveToPreferences(bCheckboxState)
    }
  }, [initialMethod, i_bShowSettings])

  if (!i_bShowSettings) {
    return null
  }

  const handleSave = () => {
    if (onSave) {
      onSave(weightCalcMethod)
    }

    // Handle preferences based on checkbox state
    if (bSaveToPreferences) {
      // Save settings to user preferences including checkbox state
      savePreferences({ 
        calcMethod: weightCalcMethod,
        savePreferencesCheckbox: true
      })
    } else {
      // Save checkbox state as false, clear other preferences
      savePreferences({ 
        savePreferencesCheckbox: false
      })
    }
    
    if (onClose) {
      onClose()
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
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
              {/* selectbox to choose the calculation method */}
              <label htmlFor="selectCalcMethod">Calc method</label>
              <select
                id="selectCalcMethod"
                className="form-control"
                value={weightCalcMethod}
                onChange={(e) => setWeightCalcMethod(e.target.value)}
              >
                {Object.keys(weightCalcMethods).map((methodName) => (
                  <option key={methodName} value={methodName}>{methodName}</option>
                ))}
              </select>
              <small className="form-text text-muted mt-2 d-block" style={{ whiteSpace: 'pre-line' }}>
                {weightCalcMethods[weightCalcMethod]?.description}
              </small>

              {/* checkbox to save preferences */}
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="savePreferencesCheckbox"
                  checked={bSaveToPreferences}
                  onChange={(e) => setBSaveToPreferences(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="savePreferencesCheckbox">
                  Save preferences
                </label>
              </div>
            </div>

            {/* save/close buttons */}
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
