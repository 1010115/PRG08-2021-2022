import { DecisionTree } from "./libraries/decisiontree.js"
import { VegaTree } from "./libraries/vegatree.js"

const csvFile = "./data/mushrooms.csv"
const trainingLabel = "class"
const ignoredColumns = []
let guess = 0

// inladen csv data
function loadData() {j
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

    let shroom = testData[0]
    let shroomPrediction = decisionTree.predict(shroom)
    console.log(`Is poisonous : ${shroomPrediction}`)


    let json = decisionTree.toJSON()
    // Teken de boomstructuur - DOM element, breedte, hoogte, decision tree
    let visual = new VegaTree('#view', 800, 400, json)
    for (let i = 0; i < testData.length; i++){
        testShroom(testData[i], decisionTree, shroom)
       
    }

    console.log(guess / testData.length * 100)

}

function testShroom(shroomie, decisionTree, shroom) {
    const shroomWithoutLabel = Object.assign({}, shroomie)
    delete shroomWithoutLabel.class

    let prediction = decisionTree.predict(shroomWithoutLabel)

    if (prediction == shroom.class) {
        guess++
        console.log("Goed")
    }
}

loadData()
