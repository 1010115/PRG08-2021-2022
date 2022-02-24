let classifier;
let img = document.getElementById('image') ;
let result ;
const synth = window.speechSynthesis;
const btn = document.getElementById('button');

const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event)=>loadFile(event))

function loadFile(event) {
	image.src = URL.createObjectURL(event.target.files[0])
}


btn.addEventListener("click", () => classifyImage())

function loadModel() {
    classifier = ml5.imageClassifier('MobileNet', modelLoaded);

}

image.addEventListener('load', () => userImageUploaded())

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
}


function modelLoaded() {
    console.log('Model Loaded!')
}


function classifyImage() {
    classifier.classify(img, (err, results) => { (result = results[0].label); });
    
     say(`I think this photo shows a ${result}!`)

}

function say(message) {
    console.log("say function triggered");
    if (synth.speaking){
        console.log('speaking')
        return
    }
    if (message !== ' '){
        let utterThis = new SpeechSynthesisUtterance(message)
        synth.speak(utterThis);
    }
}



loadModel()
classifyImage()