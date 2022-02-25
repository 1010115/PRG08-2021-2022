let classifier;
let classifiedImg = document.getElementById('image');
let result;
const synth = window.speechSynthesis;
const classifyBtn = document.getElementById('classify');
const userImage = document.getElementById('output')
const fileButton = document.querySelector("#file")
let desiredResult = {
    label: "coffee mug",
    confidenc: 0.5
}
let checkBtn = document.getElementById('check');

fileButton.addEventListener("change", (event) => loadFile(event))

classifyBtn.addEventListener("click", () => classifyImage(classifiedImg))

userImage.addEventListener('load', () => userImageUploaded())

checkBtn.addEventListener('click', () => {classifyImage(userImage);compare(result)})

function loadFile(event) {
    userImage.src = URL.createObjectURL(event.target.files[0])
}

function loadModel() {
    classifier = ml5.imageClassifier('MobileNet', modelLoaded);

}

function userImageUploaded() {
    console.log("The image is now visible in the DOM")
}


function modelLoaded() {
    console.log('Model Loaded!')
}


function classifyImage(img) {
    classifier.classify(img, (err, results) => { (result = results[0]); });

    if (result !== undefined) {
        console.log(`I think this photo shows a ${result.label}, I am ${Math.round(result.confidence * 100)} % sure !`);
        say(`I think this photo shows a ${result.label}!, I am ${Math.round(result.confidence * 100)} % sure !`)
    }
}

function say(message) {
    if (synth.speaking) {
        console.log('speaking')
        return
    }
    if (message !== ' ') {
        let utterThis = new SpeechSynthesisUtterance(message)
        synth.speak(utterThis);
    }
}

function compare(result) {
    if ( result.label !== undefined && result.label == desiredResult.label) {
        say(`Congratulations this is a ${result.label}`);
        console.log(`Congratulations this is a ${result.label}`)
    } else {
        say(`this doesn't look like a ${desiredResult.label}, this looks more like a ${result.label}`);
        console.log(`this doesn't look like a ${desiredResult.label}, this looks more like a ${result.label}`)
    }
}

loadModel()

