import React from 'react'


const checkInputValue = (val) => {
    const valTrimmed = String(val ?? '').trim()
    if (valTrimmed === '') {
        return true
    }
    const valNum = Number(valTrimmed)
    return !Number.isNaN(valNum) && valNum >= 1
};


const setErrorVisualizationStyle = (i_bValidVal) => i_bValidVal ?
  undefined
  : { borderColor: 'red', borderWidth: '1px', borderStyle: 'solid' };


export default function InputForm({ barbellWeight, setBarbellWeight, repsAmount, setRepsAmount, onCalculate }) {
  const barbellWeightNorm = barbellWeight ?? ''
  const repsAmountNorm = repsAmount ?? ''

  const bBarbellWeightCorrect = checkInputValue(barbellWeightNorm)
  const bRepsAmountCorrect = checkInputValue(repsAmountNorm)

  const checkSubmitEnabled = () => {
    return barbellWeightNorm.trim() !== ''
    && repsAmountNorm.trim() !== ''
    && bBarbellWeightCorrect
     && bRepsAmountCorrect
  };

  return (
    <>
      <table id="table_form_calc_weight">
        <tbody>
          <tr>
            <td><b>Barbell weight</b> (kg):</td>
            <td>
              <input
                value={barbellWeightNorm}
                onChange={e => setBarbellWeight(e.target.value)}
                style={setErrorVisualizationStyle(bBarbellWeightCorrect)}
              />
            </td>
          </tr>
          <tr>
            <td><b>Rep amount:</b></td>
            <td>
              <input
                value={repsAmountNorm}
                onChange={e => setRepsAmount(e.target.value)}
                style={setErrorVisualizationStyle(bRepsAmountCorrect)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button
        id="button_calc_maxweight"
        type="button"
        onClick={() => { if (checkInputValue(barbellWeightNorm) && checkInputValue(repsAmountNorm) && typeof onCalculate === 'function') onCalculate() }}
        disabled={!checkSubmitEnabled()}
      >Calculate</button>
    </>
  )
}
