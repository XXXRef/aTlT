import React from 'react'

const checkInputValue = (val) => {
  const valTrimmed = String(val ?? '').trim()
  if (valTrimmed === '') {
    return true
  }
  const valNum = Number(valTrimmed)
  return !Number.isNaN(valNum) && valNum >= 1
}

export default function InputForm({ barbellWeight, setBarbellWeight, repsAmount, setRepsAmount, onCalculate, unit, setUnit }) {
  const barbellWeightNorm = barbellWeight ?? ''
  const repsAmountNorm = repsAmount ?? ''

  const bBarbellWeightCorrect = checkInputValue(barbellWeightNorm)
  const bRepsAmountCorrect = checkInputValue(repsAmountNorm)

  const checkSubmitEnabled = () => {
    return barbellWeightNorm.trim() !== ''
      && repsAmountNorm.trim() !== ''
      && bBarbellWeightCorrect
      && bRepsAmountCorrect
  }

  const showBarbellInvalid = barbellWeightNorm.trim() !== '' && !bBarbellWeightCorrect
  const showRepsInvalid = repsAmountNorm.trim() !== '' && !bRepsAmountCorrect

  const handleSubmit = (e) => {
    e.preventDefault()
    if (checkSubmitEnabled() && typeof onCalculate === 'function') onCalculate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-2 align-items-center mb-2">
        <div className="col-md-4">
          <label className="col-form-label"><b>Barbell weight</b>:</label>
        </div>
        <div className="col-md-8">
          <div className="d-flex align-items-center">
            <input
              type="text"
              className={"form-control text-center rounded-0" + (showBarbellInvalid ? ' is-invalid' : '')}
              value={barbellWeightNorm}
              onChange={e => setBarbellWeight(e.target.value)}
              aria-invalid={showBarbellInvalid}
            />

            <select
              id="select_unit"
              className="form-select rounded-0 ms-2"
              value={unit}
              onChange={e => setUnit(e.target.value)}
              style={{ width: 85 }}
            >
              <option value="KG">KG</option>
              <option value="LBS">LBS</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row g-2 align-items-center mt-2">
        <div className="col-md-4">
          <label className="col-form-label"><b>Rep amount:</b></label>
        </div>
        <div className="col-md-8">
          <input
            type="text"
            className={"form-control text-center rounded-0" + (showRepsInvalid ? ' is-invalid' : '')}
            value={repsAmountNorm}
            onChange={e => setRepsAmount(e.target.value)}
            aria-invalid={showRepsInvalid}
          />
        </div>
      </div>

      <div className="mt-3">
        <button
          id="button_calc_maxweight"
          type="submit"
          className="btn btn-primary rounded-0"
          disabled={!checkSubmitEnabled()}
        >Calculate</button>
      </div>
    </form>
  )
}