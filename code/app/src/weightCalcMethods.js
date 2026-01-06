const weightCalcMethods = {
    "Epley":{
        description: "One of the most commonly used formulas for estimating one-rep max:\n1RM = weight * (1 + reps / 30)\nBest for moderate rep ranges (3–10 reps)",
        calcFunction: (weight, repsAmount) => weight * (1 + repsAmount / 30),
    },
    "Brzycki":{
        description: "Estimates one-rep max using the formula:\n1RM = weight / (1.0278 - 0.0278 × reps)\nConsidered accurate for ≤10 reps",
        calcFunction: (weight, repsAmount) => weight / (1.0278 - 0.0278 * repsAmount),
    },
    "Lander":{
        description: "Estimates one-rep max using the formula:\n1RM = (100 × weight) / (101.3 - 2.67123 × reps)\nMore accurate for higher reps (6–10)",
        calcFunction: (weight, repsAmount) => (100 * weight) / (101.3 - 2.67123 * repsAmount),
    },
    "Lombardi":{
        description: "Estimates one-rep max using the formula:\n1RM = weight × reps^0.1\nA power-based approach that works across various rep ranges",
        calcFunction: (weight, repsAmount) => weight * Math.pow(repsAmount, 0.1),
    },
    "Mayhew et al.":{
        description: "Estimates one-rep max using the exponential formula:\n1RM = (100 × weight) / (52.2 + 41.9 × e^(-0.055 × reps))\nGood for higher reps (>10)",
        calcFunction: (weight, repsAmount) => (100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * repsAmount)),
    },
    "O\"Conner":{
        description: "Estimates one-rep max using the formula:\n1RM = weight × (1 + reps / 40)\nTends to overestimate at higher reps",
        calcFunction: (weight, repsAmount) => weight * (1 + repsAmount / 40),
    },
    "Wathen":{
        "description": "Estimates one-rep max using the formula:\n1RM = (100 × weight) / (48.8 + 53.8 × e^(-0.075 × reps))\nUses exponential function for dynamic scaling",
        calcFunction: (weight, repsAmount) => (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * repsAmount)),
    },
}

export { weightCalcMethods }
export default weightCalcMethods
