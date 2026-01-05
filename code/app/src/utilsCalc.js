import {weightCalcMethods} from './weightCalcMethods.js'


// 1RM calculation
const stubCalcMaxWeight = (weight, repsAmount, calcMethod) => {
    if (0 === repsAmount) {
        return 0
    }
    
    if (1 === repsAmount) {
        return weight
    }

    if (repsAmount < 0) {
        return NaN;
    }

    const valMaxWeight = weightCalcMethods[calcMethod].calcFunction(weight, repsAmount);

    return valMaxWeight;
}


// Conversion
const convertKgToLbs = (kg) => kg * 2.20462


const convertLbsToKg = (lbs) => lbs / 2.20462


export {
    stubCalcMaxWeight,
    convertKgToLbs,
    convertLbsToKg,
}
