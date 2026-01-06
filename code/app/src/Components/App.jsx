import { useState } from 'react'

import Footer from './Footer'
import InputForm from './InputForm'
import ResultDisplay from './ResultDisplay'
import Reward from './Reward'
import SettingsModal from './SettingsModal'

import './App.css'

import settings from '../../settings.json'

import { stubCalcMaxWeight, convertKgToLbs, convertLbsToKg } from "../utilsCalc"

import {weightCalcMethods} from '../weightCalcMethods.js'


const { rewardsInfo } = settings


export default function App() {
  const [barbellWeight, setBarbellWeight] = useState('')
  const [repsAmount, setRepsAmount] = useState('')
  const [result, setResult] = useState(null)
  const [rankID, setRankID] = useState(null)
  const [unit, setUnit] = useState('KG')
  const [unitShown, setUnitShown] = useState('KG')
  const [showSettings, setShowSettings] = useState(false)
  const [calcMethod, setCalcMethod] = useState(Object.keys(weightCalcMethods)[0])

  const onSetCalcMethod = (i_method) => {
    setCalcMethod(i_method)
    console.log("onSetCalcMethod:", `+; calc method=${i_method}`)
  }

  const onCalculate = (weightArg, repsArg, unitArg) => {
    const w = Number(weightArg !== undefined ? weightArg : barbellWeight)
    const r = Number(repsArg !== undefined ? repsArg : repsAmount)
    const units = unitArg !== undefined ? unitArg : unit
    setUnitShown(units)
    // Convert input to kilograms for internal calculations if needed
    const inputKg = units === 'KG' ? w : convertLbsToKg(w)
    const maxWeightKg = stubCalcMaxWeight(inputKg, r, calcMethod)
    // result displayed in chosen unit
    const displayedResult = units === 'KG' ? Math.round(maxWeightKg) : Math.round( convertKgToLbs(maxWeightKg) )
    setResult(displayedResult)
    let found
    for (let i = 0; i < rewardsInfo.length; ++i) {
      if (maxWeightKg <= rewardsInfo[i].weightBorder) { found = i; break }
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
                  unit={unit}
                  setUnit={setUnit}
                  setShowSettings={setShowSettings}
                />

                {/* <div id="div_container_settings">
                  <img id="btn_settings" src="/assets/images/button_settings.png" alt="Settings" onClick={() => setShowSettings(true)} />
                </div> */}

                {result != null && (
                  <div>
                    <ResultDisplay
                      result={result}
                      unitShown={unitShown}
                    />
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
      <SettingsModal
        show={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={onSetCalcMethod}
        initialMethod={calcMethod}
      />
      <Footer />
    </div>
  )
}
