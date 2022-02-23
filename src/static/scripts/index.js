'use strict'

const print=console.log;

//config block
const weightPercents = [0.5, 0.6, 0.7, 0.8, 0.9];

const rewardsInfo = [
    {
        weightBorder:   60,
        rank:           "Novice",
        icon:            "../images/reward_novice.png",
        description:    "U r novice!"
    },
    {
        weightBorder:   70,
        rank:           "Middle",
        icon:            "../images/reward_middle.png",
        description:    "U r middle!"
    },
    {
        weightBorder:   80,
        rank:           "Senior",
        icon:            "../images/reward_senior.png",
        description:    "U r senior!"
    },
];

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
        //icon
        divRewardIcon=document.createElement("div");
        divRewardIcon.setAttribute("id", "div_reward_icon");
        divReward.appendChild(divRewardIcon);
        //description
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

    //Calculate max weight
    const maxWeightValue=calcMaxWeight(
        +document.getElementById("textarea_calc_maxweight_barbellweight").value,
        +document.getElementById("textarea_calc_maxweight_repsamount").value);
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
    divMaxWeight.innerHTML=`Max weight: <b>${maxWeightValue}</b> kg`;

    //render additional info block
    divAdditionalInfo.innerHTML=`[div_additional_info]`;
    weightPercents.forEach(weightPercent => {
        divAdditionalInfo.innerHTML += `<p>${weightPercent * 100}% : ${maxWeightValue * weightPercent} kg </p><hr>`;
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