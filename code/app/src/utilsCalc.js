const stubCalcMaxWeight = (weightKg, repsAmount) => {
    if (0 === repsAmount) {
        return 0
    }
    
    if (1 === repsAmount) {
        return weightKg
    }

    if (repsAmount < 0) {
        return NaN;
    }

    return calcMaxWeight(weightKg, repsAmount);
}


const calcMaxWeight = (weightKg, repsAmount) =>
    weightKg * (1 + repsAmount / 30)


const convertKgToLbs = (kg) => kg * 2.20462


const convertLbsToKg = (lbs) => lbs / 2.20462


export { stubCalcMaxWeight, convertKgToLbs, convertLbsToKg }
