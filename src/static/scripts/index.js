'use strict'

const print=console.log;

function calcMaxWeight(weight, repsAmount){
    //https://ru.wikipedia.org/wiki/%D0%9E%D0%B4%D0%BD%D0%BE_%D0%BF%D0%BE%D0%B2%D1%82%D0%BE%D1%80%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81_%D0%BC%D0%B0%D0%BA%D1%81%D0%B8%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC_%D0%B2%D0%B5%D1%81%D0%BE%D0%BC
    return weight * (1+repsAmount/30);
}

function calc_weight_click(){
    print("calc_weight_click invoked");

    //Calculate max weight
    const maxWeightValue=calcMaxWeight(
        +document.getElementById("textarea_calc_maxweight_barbellweight").value,
        +document.getElementById("textarea_calc_maxweight_repsamount").value);
    print(`Calculated maxWeightValue=${maxWeightValue}`);

    let flagResultsStuffAdded=document.getElementById("div_contents_mainarea_resultmaxweight") ? true: false;

    let divMaxWeight;

    if(!flagResultsStuffAdded) {
        let divMainArea=document.getElementById("div_contents_mainarea");
        divMaxWeight=document.createElement("div");
        divMaxWeight.setAttribute("id", "div_contents_mainarea_resultmaxweight");
        divMainArea.appendChild(divMaxWeight);
    }else{
        divMaxWeight=document.getElementById("div_contents_mainarea_resultmaxweight");
    }

    divMaxWeight.innerHTML=`Max weight: <b>${maxWeightValue}</b> kg`;

    print("DEBUG3");
}

function main(){
    print("DEADBEEF");
}

main();