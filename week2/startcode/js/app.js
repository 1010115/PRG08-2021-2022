let classifier;
let score = 0
let result;
let gamePhotos = ["siamese-cat.jpg", "mug.jpg", "hamster.jpg", "pomeranian.jpg"]
let gameArray = ["Siamese cat, Siamese", "coffee mug", "hamster", "Pomeranian"]
let randomNumber = Math.floor(Math.random() * gameArray.length)
let exampleImgDiv = document.getElementById("exampleImgDiv");
let exampleImg = document.createElement("img");
exampleImg.src = ` ./images/${gamePhotos[randomNumber]}`;
exampleImg.id = "image";
exampleImgDiv.appendChild(exampleImg);
let objectiveDiv = document.getElementById("objectiveDiv");
let objective = document.createElement("h2");
objective.innerText = `Take a picture of a ${gameArray[randomNumber]}`;
objectiveDiv.appendChild(objective);

let scoreDiv = document.getElementById("scoreDiv");
let scoreView = document.createElement("h2");
scoreView.innerText = `Your score is ${score}`;
scoreDiv.appendChild(scoreView);
let classifiedImg = document.getElementById('image');

const synth = window.speechSynthesis;
const classifyBtn = document.getElementById('classify');
const userImage = document.getElementById('output')
const fileButton = document.querySelector("#file")

let desiredResult = {
    label: gameArray[randomNumber],
    confidence: 0.5
}
let checkBtn = document.getElementById('check');
let compareBool = false;


fileButton.addEventListener("change", (event) => loadFile(event))

classifyBtn.addEventListener("click", () => classifyImage(classifiedImg))

userImage.addEventListener('load', () => userImageUploaded())

checkBtn.addEventListener('click', () => { classifyImage(userImage); compareBool = true; })

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
    result = 0;
    classifier.classify(img, (err, results) => {
        (result = results[0]);

        feedback();

        if (compareBool == true) {
            compare(result);
            compareBool = false;
        }
    });
}

function feedback() {
    if (result !== undefined && result !== 0) {
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
    if (result.label !== undefined && result.label == desiredResult.label && result !== 0) {
        score += 1;
        console.log(score)

        randomNumber = Math.floor(Math.random() * gameArray.length)
        desiredResult.label = gameArray[randomNumber];
        exampleImg.src = ` ./images/${gamePhotos[randomNumber]}`;
        exampleImgDiv.appendChild(exampleImg);
        scoreView.innerText = `Your score is ${score}`;
        scoreDiv.appendChild(scoreView);        

        console.log(desiredResult.label)


        say(`Congratulations this is a ${result.label}, your score is ${score}`);
        console.log(`Congratulations this is a ${result.label}, your score is ${score}`)
    } else if (result.label !== undefined && result !== 0) {
        say(`this doesn't look like a ${desiredResult.label}, this looks more like a ${result.label}`);
        console.log(`this doesn't look like a ${desiredResult.label}, this looks more like a ${result.label}`)
    }
}


loadModel()
console.log(desiredResult.label);

