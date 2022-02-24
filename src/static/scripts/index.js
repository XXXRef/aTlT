'use strict'

const print=console.log;

//config block
const weightPercents = [0.5, 0.6, 0.7, 0.8, 0.9];

const rewardsInfo = [
    {
        weightBorder:   60,
        rank:           "Novice",
        icon:            "../images/reward_icons/reward_novice.png",
        description:    "U r novice!"
    },
    {
        weightBorder:   70,
        rank:           "Middle",
        icon:            "../images/reward_icons/reward_middle.png",
        description:    "U r middle!"
    },
    {
        weightBorder:   80,
        rank:           "Senior",
        icon:            "../images/reward_icons/reward_senior.png",
        description:    "U r senior!"
    },
];

//state block
const lineEdit_barbellWeight_orig_borderColor = document.getElementById("textarea_calc_maxweight_barbellweight").style["border-color"];
const lineEdit_repsAmount_orig_borderColor = document.getElementById("textarea_calc_maxweight_repsamount").style["border-color"];

function calcMaxWeight(weight, repsAmount) {
    //https://ru.wikipedia.org/wiki/%D0%9E%D0%B4%D0%BD%D0%BE_%D0%BF%D0%BE%D0%B2%D1%82%D0%BE%D1%80%D0%B5%D0%BD%D0%B8%D0%B5_%D1%81_%D0%BC%D0%B0%D0%BA%D1%81%D0%B8%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC_%D0%B2%D0%B5%D1%81%D0%BE%D0%BC
    return weight * (1+repsAmount/30);
}

function renderReward(hostDiv, rankID) {
    let divReward = document.getElementById("div_reward");
    let divRewardRank, divRewardIcon, divRewardDescription;
    if (!divReward) {
        divReward=document.createElement("div");
        divReward.setAttribute("id", "div_reward");
        hostDiv.appendChild(divReward);
        //rank
        divRewardRank=document.createElement("div");
        divRewardRank.setAttribute("id", "div_reward_rank");
        divReward.appendChild(divRewardRank);
        divReward.appendChild(document.createElement("hr"));
        //icon
        divRewardIcon=document.createElement("div");
        divRewardIcon.setAttribute("id", "div_reward_icon");
        divReward.appendChild(divRewardIcon);
        //description
        divReward.appendChild(document.createElement("hr"));
        divRewardDescription=document.createElement("div");
        divRewardDescription.setAttribute("id", "div_reward_description");
        divReward.appendChild(divRewardDescription);
    }else{
        divRewardRank=document.getElementById("div_reward_rank");
        divRewardIcon=document.getElementById("div_reward_icon");
        divRewardDescription=document.getElementById("div_reward_description");
    }

    divRewardRank.innerHTML=`Rank: <b>${rewardsInfo[rankID].rank}</b>`;
    divRewardIcon.innerHTML=`<img src=${rewardsInfo[rankID].icon}>`;
    divRewardDescription.innerHTML=`${rewardsInfo[rankID].description}`;
}

function calc_weight_click(){
    print("calc_weight_click invoked");

    //Process input values
    const lineEdit_barbellweight = document.getElementById("textarea_calc_maxweight_barbellweight");
    const barbellWeightValue = +lineEdit_barbellweight.value;
    let flagInvalidInput = false;
    print(`barbellWeightValue=${barbellWeightValue}`);
    if ((lineEdit_barbellweight.value==="") || isNaN(barbellWeightValue) || (barbellWeightValue < 0)) {
        lineEdit_barbellweight.style["border-color"] = "red";
        flagInvalidInput = true;
    }else{
        lineEdit_barbellweight.style["border-color"] = lineEdit_barbellWeight_orig_borderColor;
    }

    const lineEdit_repsAmount = document.getElementById("textarea_calc_maxweight_repsamount");
    const repsAmountValue = +lineEdit_repsAmount.value;
    print(`repsAmountValue=${repsAmountValue}`);
    if ((lineEdit_repsAmount.value==="") || isNaN(repsAmountValue) || (repsAmountValue < 1)) {
        lineEdit_repsAmount.style["border-color"] = "red";
        flagInvalidInput = true;
    }else{
        lineEdit_repsAmount.style["border-color"] = lineEdit_repsAmount_orig_borderColor;
    }

    if (flagInvalidInput) {
        document.getElementById("div_contents_mainarea_resultmaxweight")?.remove();
        document.getElementById("div_additional_info")?.remove();
        document.getElementById("div_reward")?.remove();
        return;
    }

    //Calculate max weight
    const maxWeightValue=calcMaxWeight(barbellWeightValue, repsAmountValue);
    print(`Calculated maxWeightValue=${maxWeightValue}`);

    let flagResultsStuffAdded=document.getElementById("div_contents_mainarea_resultmaxweight") ? true: false;

    //dynamic elements
    let divMaxWeight;
    let divAdditionalInfo;

    let divMainArea=document.getElementById("div_contents_mainarea");

    if(!flagResultsStuffAdded) {
        //divMaxWeight
        divMaxWeight=document.createElement("div");
        divMaxWeight.setAttribute("id", "div_contents_mainarea_resultmaxweight");
        divMainArea.appendChild(divMaxWeight);
        //divAdditionalInfo
        divAdditionalInfo=document.createElement("div");
        divAdditionalInfo.setAttribute("id", "div_additional_info");
        divMainArea.appendChild(divAdditionalInfo);
        //divReward
        
    }else{
        divMaxWeight=document.getElementById("div_contents_mainarea_resultmaxweight");
        divAdditionalInfo=document.getElementById("div_additional_info");
    }

    //render max weight block
    divMaxWeight.innerHTML=`Max weight: <span id="span_maxweight_value">${Math.round(maxWeightValue)}</span> kg`;

    //render additional info block
    //divAdditionalInfo.innerHTML=`[div_additional_info]`;
    divAdditionalInfo.innerHTML="";
    weightPercents.forEach(weightPercent => {
        divAdditionalInfo.innerHTML += `<div class="div_additional_info_weightpercents_item"><p>${weightPercent * 100}% : ${Math.round(maxWeightValue * weightPercent)} kg </p></div>`;
    });

    //Process reward block
    let rankID;
    let i;
    for (i=0; i != rewardsInfo.length; ++i){
        if (maxWeightValue <= rewardsInfo[i].weightBorder){
            rankID = i;
            break;
        }
    }
    if (rankID === undefined) rankID = rewardsInfo.length - 1;

    renderReward(divMainArea, rankID);
}

function main(){
    print("DEADBEEF");
}

main();
