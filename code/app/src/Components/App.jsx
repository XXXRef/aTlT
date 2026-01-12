import { useState, useEffect } from 'react'

import Footer from './Footer'
import InputForm from './InputForm'
import ResultDisplay from './ResultDisplay'
import ResultLeaguesRank from './ResultLeaguesRank'
import Reward from './Reward'
import SettingsModal from './SettingsModal'

import './App.css'

import settings from '../../settings.json'

import { stubCalcMaxWeight, convertKgToLbs, convertLbsToKg } from "../utilsCalc"

import {weightCalcMethods} from '../weightCalcMethods.js'
import { loadPreferences, mergeWithDefaults, getDefaultSettings } from '../utils/preferences'


const { rewardsInfo } = settings

// Get default calculation method
const defaultCalcMethod = Object.keys(weightCalcMethods)[0]


export default function App() {
  const [barbellWeight, setBarbellWeight] = useState('')
  const [repsAmount, setRepsAmount] = useState('')
  const [result, setResult] = useState(null)
  const [rankID, setRankID] = useState(null)
  const [unit, setUnit] = useState('KG')
  const [unitShown, setUnitShown] = useState('KG')
  const [showSettings, setShowSettings] = useState(false)
  const [calcMethod, setCalcMethod] = useState(defaultCalcMethod)
  const [selfWeightValue, setSelfWeightValue] = useState('') // Normalized weight in kg
  const [gender, setGender] = useState('')

  // Load user preferences on mount
  useEffect(() => {
    const userPrefs = loadPreferences()
    const defaults = { ...getDefaultSettings(), calcMethod: defaultCalcMethod }
    const mergedSettings = mergeWithDefaults(userPrefs, defaults)
    
    // Set calculation method from preferences or default
    if (mergedSettings.calcMethod && Object.keys(weightCalcMethods).includes(mergedSettings.calcMethod)) {
      setCalcMethod(mergedSettings.calcMethod)
    } else {
      setCalcMethod(defaultCalcMethod)
    }

    // Set self weight from preferences or default (already normalized in kg)
    setSelfWeightValue(mergedSettings.selfWeightValue ?? defaults.selfWeightValue)

    // Set gender from preferences or default
    setGender(mergedSettings.gender ?? defaults.gender)

    console.log("Init selfWeightValue:", selfWeightValue)
    console.log("mergedSettings.gender ?? defaults.gender:", mergedSettings.gender ?? defaults.gender)
    console.log("Init mergedSettings.selfWeightValue:", mergedSettings.selfWeightValue)
    console.log("Init defaults.selfWeightValue:", defaults.selfWeightValue)
  }, [])

  const onSaveSettings = ({ weightCalcMethod, selfWeightValue, gender }) => {
    setCalcMethod(weightCalcMethod)
    setSelfWeightValue(selfWeightValue)
    setGender(gender)
    console.log("onSaveSettings:", `calc method=${weightCalcMethod}, selfWeight=${selfWeightValue}, gender=${gender}`)
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
                    <ResultLeaguesRank 
                      weight={result}
                      selfWeight={selfWeightValue}
                      gender={gender}
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
        onClose={() => {
          setShowSettings(false)
          // Reload preferences after closing settings modal
          const userPrefs = loadPreferences()
          const defaults = { ...getDefaultSettings(), calcMethod: defaultCalcMethod }
          const mergedSettings = mergeWithDefaults(userPrefs, defaults)
          
          // setSelfWeightValue(mergedSettings.selfWeightValue ?? defaults.selfWeightValue)
          // setGender(mergedSettings.gender ?? defaults.gender)
        }}
        onSave={onSaveSettings}
        initialMethod={calcMethod}
        initialSelfWeightValueKg={selfWeightValue}
        initialGender={gender}
      />
      <Footer />
    </div>
  )
}
