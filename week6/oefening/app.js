import { VegaScatterplot } from "./libraries/vegascatterplot.js"
import { createFakedata } from "./libraries/fakedata.js"

let options = {task: 'regression', debug: true}
let nn = ml5.neuralNetwork(options)
let fakeData = createFakedata()
fakeData.sort(()=> (Math.random( - 0.5)))
for (let car of fakeData){
    nn.addData({ horsepower: car.horsepower}, { mpg: car.mpg})
} 
nn.normalizeData()
nn.train({ epochs: 10}, () => trainingFinished())


let plot

//
// teken de scatterplot voor de fake data
//
async function drawScatterPlot() {
    plot = new VegaScatterplot()
    await plot.initialise("horsepower", "mpg", 600, 400, fakeData)
}

//
// maak en train het neural network
//
async function createNeuralNetwork() {
    // maak neural network


    // voeg data toe aan neural network met addData
    for (let row of fakeData) {
        // nn.addData({ horsepower: row.horsepower }, { mpg: row.mpg })
    }

    // train neural network

}


//
// predictions
//
async function trainingFinished() {
    console.log(" finished training")
    // doe een enkele voorspelling om te zien of alles werkt
    let testCar = { horsepower: 220 }

    let results = await nn.predict(testCar)
    console.log(results)


    let prediction = results[0].value
    console.log(`deze auto zal een verbruik hebben van: ${prediction}`)
    // maak een voorspelling voor elk punt op de X as
    let predictions = []

    for(let i = 0; i< 400; i++) {
        let results = await nn.predict({ horsepower: i})
        let prediction = results[0].value
        
        predictions.push({horsepower: i, mpg: prediction})

    }
    plot.addPoints(predictions)
    console.log(predictions)


    // stuur nu de hele predictions array naar de scatterplot met "plot.addPoints"
    // ...
}
drawScatterPlot()

// start de applicatie
