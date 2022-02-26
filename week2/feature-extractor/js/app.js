if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
          video.srcObject = stream
      })
      .catch((err) => {
          console.log("Something went wrong!");
      });
}

const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded)
const video = document.getElementById('webcam')
function modelLoaded() {
    console.log('Model Loaded!')
    classifier = featureExtractor.classification(video, videoReady)
}

function videoReady(){
    console.log("the webcam is ready")
}

function customModelReady(){
  console.log("custom model is ready")
}

const maskbtn = document.getElementById("mask")
maskbtn.addEventListener("click", () => addMaskImage())

function addMaskImage() {
    classifier.addImage(video, 'wearing a mask', ()=>{
        console.log("added image to model!")
    })
}

const faceBtn = document.getElementById("face");
faceBtn.addEventListener("click", () => addFaceImg());

function addFaceImg(){
  classifier.addImage(video, 'no mask', ()=> {
    console.log("added no mask image to model");
  })
}

const trainBtn = document.getElementById("train");
trainBtn.addEventListener("click", () => classifier.train((lossValue) => {
  console.log('Loss is', lossValue)
  if(lossValue == null) console.log("Finished training")
}))


label = document.getElementById("label")
const classifyBtn = document.getElementById("classify");
classifyBtn.addEventListener("click", () => setInterval(()=>{
  classifier.classify(video, (err, result) => {
      if (err) console.log(err)
      console.log(result)
      label.innerHTML = result[0].label
  })
}, 1000)
)

const saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", ( )=> classifier.save())

const loadBtn = document.getElementById("load");
loadBtn.addEventListener("click", () => classifier.load('model/model.json', customModelReady()))
