import React, { useState, useEffect } from 'react'
import weightCalcMethods from '../weightCalcMethods'
import { savePreferences, loadPreferences, getDefaultSettings } from '../utils/preferences'
import { convertKgToLbs, convertLbsToKg } from '../utilsCalc'

export default function SettingsModal({ show: i_bShowSettings, onClose, onSave, initialMethod = Object.keys(weightCalcMethods)[0], initialSelfWeightValueKg = '', initialGender = '' }) {
  console.log(`initialGender=${initialGender}`)
  const [weightCalcMethod, setWeightCalcMethod] = useState(initialMethod)
  const [bSaveToPreferences, setBSaveToPreferences] = useState(false)
  const [selfWeightValue, setSelfWeightValue] = useState('')
  const [selfWeightUnit, setSelfWeightUnit] = useState('KG')
  const [gender, setGender] = useState(initialGender)

  useEffect(() => {
    setWeightCalcMethod(initialMethod)
    // Load checkbox state and self weight display preferences when modal opens
    if (i_bShowSettings) {
      const userPrefs = loadPreferences()
      const defaultPrefs = getDefaultSettings()
      const bCheckboxState = userPrefs?.savePreferencesCheckbox ?? defaultPrefs.savePreferencesCheckbox
      setBSaveToPreferences(bCheckboxState)

      // Get display unit preference (default to KG)
      const displayUnit = userPrefs?.selfWeightDisplayUnit ?? defaultPrefs.selfWeightDisplayUnit
      setSelfWeightUnit(displayUnit)

      // Use initialGender from props (which reflects current App state) - it takes priority over preferences
      setGender(initialGender)

      // Convert normalized weight (kg) to display unit for UI
      const weightKg = parseFloat(initialSelfWeightValueKg) || 0
      if (displayUnit === 'KG') {
        setSelfWeightValue(weightKg > 0 ? weightKg.toString() : '')
      } else {
        const weightLbs = convertKgToLbs(weightKg)
        setSelfWeightValue(weightKg > 0 ? weightLbs.toString() : '')
      }
    } else {
      // Reset to initial values when modal closes
      setSelfWeightValue('')
      setSelfWeightUnit('KG')
      setGender(initialGender)
    }
  }, [initialMethod, initialSelfWeightValueKg, initialGender, i_bShowSettings])

  if (!i_bShowSettings) {
    return null
  }

  const handleSave = () => {
    // Convert display unit to normalized weight (kg) before saving
    const weightDisplay = parseFloat(selfWeightValue) || 0
    const weightKg = selfWeightUnit === 'KG' ? weightDisplay : convertLbsToKg(weightDisplay)
    const normalizedWeight = weightKg > 0 ? weightKg.toString() : ''

    // Pass all user-provided data to onSave
    if (onSave) {
      onSave({
        weightCalcMethod,
        selfWeightValue: normalizedWeight,
        gender
      })
    }

    // Handle preferences based on checkbox state
    if (bSaveToPreferences) {
      // Save settings to user preferences including checkbox state
      savePreferences({ 
        calcMethod: weightCalcMethod,
        savePreferencesCheckbox: true,
        selfWeightValue: normalizedWeight, // Store normalized weight in kg
        selfWeightDisplayUnit: selfWeightUnit, // Store user's preferred display unit
        gender: gender // Store gender selection
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

              {/* self weight setting */}
              <div className="mt-3">
                <label htmlFor="selfWeightInput">Self weight:</label>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    id="selfWeightInput"
                    type="number"
                    className="form-control"
                    value={selfWeightValue}
                    onChange={(e) => setSelfWeightValue(e.target.value)}
                    placeholder="0"
                    step="0.1"
                  />
                  <select
                    id="selfWeightUnit"
                    className="form-control form-select"
                    style={{ width: 'auto', minWidth: '80px' }}
                    value={selfWeightUnit}
                    onChange={(e) => setSelfWeightUnit(e.target.value)}
                  >
                    <option value="KG">KG</option>
                    <option value="LBS">LBS</option>
                  </select>
                </div>
              </div>

              {/* gender selection */}
              <div className="mt-3">
                <label htmlFor="genderSelect">Gender confession:</label>
                <select
                  id="genderSelect"
                  className="form-control"
                  value={gender}
                  onChange={(e) => {setGender(e.target.value); console.log("gender:", e.target.value);}}
                >
                  <option value="">not selected</option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </div>

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