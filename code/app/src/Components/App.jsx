import React, { useState, useEffect } from 'react'

import Footer from './Footer'
import InputForm from './InputForm'

import './App.css'

import settings from '../../settings.json'


const { weightPercents, rewardsInfo } = settings

function calcMaxWeight(weightKg, repsAmount) {
  // weightKg expected in kilograms; returns estimated 1RM in kilograms
  if (repsAmount === 1) return weightKg
  return weightKg * (1 + repsAmount / 30)
}

function Reward({ rankID }) {
  if (rankID == null) return null
  const r = rewardsInfo[rankID]
  return (
    <div id="div_reward">
      <div id="div_reward_rank">Rank: <b>{r.rank}</b></div>
      <hr />
      <div id="div_reward_icon"><img src={r.icon} alt={r.rank} /></div>
      <hr />
      <div id="div_reward_description">{r.description}</div>
    </div>
  )
}

export default function App() {
  const [barbellWeight, setBarbellWeight] = useState('')
  const [repsAmount, setRepsAmount] = useState('')
  const [result, setResult] = useState(null)
  const [rankID, setRankID] = useState(null)
  const [unit, setUnit] = useState('KG')

  function calculate(weightArg, repsArg, unitArg) {
    const w = Number(weightArg !== undefined ? weightArg : barbellWeight)
    const r = Number(repsArg !== undefined ? repsArg : repsAmount)
    const u = unitArg !== undefined ? unitArg : unit
    // Convert input to kilograms for internal calculations if needed
    const inputKg = u === 'KG' ? w : (w * 0.45359237)
    const maxWeightKg = calcMaxWeight(inputKg, r)
    // result displayed in chosen unit
    const displayedResult = u === 'KG' ? Math.round(maxWeightKg) : Math.round(maxWeightKg / 0.45359237)
    setResult(displayedResult)
    let found
    for (let i = 0; i < rewardsInfo.length; ++i) {
      if (maxWeightKg <= rewardsInfo[i].weightBorder) { found = i; break }
    }
    if (found === undefined) found = rewardsInfo.length - 1
    setRankID(found)
  }

  function onCalculate() {
    calculate()
  }

  useEffect(() => {
    if (result != null) {
      calculate()
    }
  }, [unit])

  return (
    <div id="div_mainarea">
      <div id="div_mainblock">
        <div id="div_header"></div>
        <div id="div_main">
          <div id="div_contents">
            <div id="div_contents_leftarea"></div>
            <div id="div_contents_centralarea">
              <div id="div_contents_mainarea">
                <div id="div_logo">atlt</div>
                <InputForm
                  barbellWeight={barbellWeight}
                  setBarbellWeight={setBarbellWeight}
                  repsAmount={repsAmount}
                  setRepsAmount={setRepsAmount}
                  onCalculate={onCalculate}
                  unit={unit}
                  setUnit={setUnit}
                />

                {result != null && (
                  <div>
                    <div id="div_contents_mainarea_resultmaxweight">Max weight: <p /> <span id="span_maxweight_value">{result}</span> {unit}</div>
                    <div id="div_additional_info">
                      {weightPercents.map(p => (
                        <div key={p} className="div_additional_info_weightpercents_item"><p>{p * 100}% : {Math.round(result * p)} {unit}</p></div>
                      ))}
                    </div>
                    <Reward rankID={rankID} />
                  </div>
                )}
              </div>
            </div>
            <div id="div_contents_rightarea"></div>
          </div>
          <div id="div_bottom_gap" />
        </div>
      </div>
      <Footer />
    </div>
  )
}
