import React from 'react'

export default function InputForm({ barbellWeight, setBarbellWeight, repsAmount, setRepsAmount, onCalculate }) {
  const isInvalidValue = (val) => {
    const s = String(val ?? '').trim()
    if (s === '') return true
    if (!/^\d+(?:\.\d+)?$/.test(s)) return true
    return parseFloat(s) < 1
  }

  const barbellInvalid = isInvalidValue(barbellWeight)
  const repsInvalid = isInvalidValue(repsAmount)

  const inputStyle = (invalid) => invalid ? { borderColor: 'red' } : {}

  return (
    <>
      <table id="table_form_calc_weight">
        <tbody>
          <tr>
            <td><b>Barbell weight</b> (kg):</td>
            <td>
              <input
                value={barbellWeight}
                onChange={e => setBarbellWeight(e.target.value)}
                style={inputStyle(barbellInvalid)}
                aria-invalid={barbellInvalid}
              />
            </td>
          </tr>
          <tr>
            <td><b>Rep amount:</b></td>
            <td>
              <input
                value={repsAmount}
                onChange={e => setRepsAmount(e.target.value)}
                style={inputStyle(repsInvalid)}
                aria-invalid={repsInvalid}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button id="button_calc_maxweight" onClick={onCalculate}>Calculate</button>
    </>
  )
}
