import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

const csvFile = "./data/heart_2020_cleaned.csv"
const trainingLabel = "HeartDisease"
const ignoredColumns = ["Race"]
let guess = 0

let hdtCount = 0
let hdfCount = 0
let nhdtCount = 0
let nhdfCount = 0
let hdt = document.getElementById('hdt')
let hdf = document.getElementById('hdf')
let nhdt = document.getElementById('nhdt')
let nhdf = document.getElementById('nhdf')

// inladen csv data
function loadData() {
    Papa.parse(csvFile, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => trainModel(results.data) // train het model met deze data
    })
}

//
// MACHINE LEARNING - Bouw de Decision Tree
//
function trainModel(data) {
    data.sort( () => (Math.random() - 0.5))
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)
    let decisionTree = new DecisionTree({
        ignoredAttributes: ignoredColumns,
        trainingSet: trainData,
        categoryAttr: trainingLabel
    })

    let json = decisionTree.toJSON()
    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let visual = new VegaTree('#view', 1000, 600, json)

    for (let game of testData){
        testGame(game,decisionTree);
    }

    console.log(guess / testData.length * 100)
    hdt.innerText = hdtCount
    nhdt.innerText = nhdtCount
    hdf.innerText = hdfCount
    nhdf.innerText = nhdfCount
}

function testGame(game,decisionTree) {
    const gameWithoutLabel = Object.assign({}, game)
    delete gameWithoutLabel.Label

    let prediction = decisionTree.predict(gameWithoutLabel)
    
   if (prediction == "Yes" && game.HeartDisease == "No"){
        nhdtCount++
        console.log("Hartklachten voorspeld maar heeft geen hartklachten")
    } else if(prediction == "No" && game.HeartDisease == "Yes"){
        hdfCount++
        console.log("Geen hartklachten voorspeld maar heeft hartklachten")
    }else if (prediction == "Yes" && game.HeartDisease == "Yes"){
        hdtCount++
        guess++
        console.log("Hartklachten voorspeld en heeft hartklachten")
    } else if (prediction == "No" && game.HeartDisease == "No"){
        nhdfCount++
        guess++
        console.log("Geen hartklachten voorspeld en heeft geen hartklachten")}

}

loadData()
