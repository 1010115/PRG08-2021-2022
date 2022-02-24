let classifier;
let img = document.getElementById('image') ;
const synth = window.speechSynthesis;
const btn = document.getElementById('button');

 btn.addEventListener("click", () => {say(" hi")} )

function loadModel() {
    classifier = ml5.imageClassifier('MobileNet', modelLoaded);

}

function modelLoaded() {
    console.log('Model Loaded!')
}


function classifyImage() {
    classifier.classify(img, (err, results) => { console.log(results); });
x
}

function say(message) {
    console.log("speech trigger")
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