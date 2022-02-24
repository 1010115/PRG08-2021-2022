let classifier;
let img = document.getElementById('image') ;
const synth = window.speechSynthesis;
const btn = document.getElementById('button');

const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event)=>loadFile(event))

function loadFile(event) {
	image.src = URL.createObjectURL(event.target.files[0])
}


btn.addEventListener("click", () => say("hi"))

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
    classifier.classify(img, (err, results) => { console.log(results); });

     say(`I think this photo shows a tennis ball!`)

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