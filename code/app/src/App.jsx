import React, { useState } from 'react'

import Footer from './Components/Footer'
import InputForm from './Components/InputForm'

import './App.css'

import settings from '../settings.json'


const { weightPercents, rewardsInfo } = settings

function calcMaxWeight(weight, repsAmount) {
  if (repsAmount === 1) return weight
  return weight * (1 + repsAmount / 30)
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

  function onCalculate() {
    const w = Number(barbellWeight)
    const r = Number(repsAmount)
    
    const maxWeightValue = calcMaxWeight(w, r)
    setResult(Math.round(maxWeightValue))
    let found
    for (let i = 0; i < rewardsInfo.length; ++i) {
      if (maxWeightValue <= rewardsInfo[i].weightBorder) { found = i; break }
    }
    if (found === undefined) found = rewardsInfo.length - 1
    setRankID(found)
  }

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
                />

                {result != null && (
                  <div>
                    <div id="div_contents_mainarea_resultmaxweight">Max weight: <span id="span_maxweight_value">{result}</span> kg</div>
                    <div id="div_additional_info">
                      {weightPercents.map(p => (
                        <div key={p} className="div_additional_info_weightpercents_item"><p>{p * 100}% : {Math.round(result * p)} kg</p></div>
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
