import React, { useState } from 'react'
//import './../index.css'
import './App.css'
import Footer from './Components/Footer'
import InputForm from './Components/InputForm'

const weightPercents = [0.5, 0.6, 0.7, 0.8, 0.9]

const rewardsInfo = [
  { weightBorder: 80, rank: 'Pussy', icon: '/assets/images/reward_icons/reward_novice.jpg', description: `All you can? You are that type of person who asks his grandma to open toilet lid cos its too heavy when he goes to take a dump, decreasing his microscopic weight even more. Go eat and train fcking moron, albeit you're shit now, I believe in you.` },
  { weightBorder: 120, rank: 'Halfman', icon: '/assets/images/reward_icons/reward_middle.jpg', description: `Things are not so bad, still you can do way better. Go to gym and make me 20 squat reps with weight with which you usually do 10. Right now` },
  { weightBorder: 130, rank: 'Schwarz', icon: '/assets/images/reward_icons/reward_senior.gif', description: `You are perfection, my dear! Just try to keep being so beatiful and strong as long as you can to make this world a little nicer. Kissing you in all allowed (and mb not only) places 😘💋` }
]

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
    if (!barbellWeight || isNaN(w) || w < 0 || !repsAmount || isNaN(r) || r < 1) {
      setResult(null)
      setRankID(null)
      return
    }
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
