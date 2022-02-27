if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
  }
  
  let precaution = '';
  const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded)
  const video = document.getElementById('webcam')
  const label = document.getElementById("label")
  
  function modelLoaded() {
      console.log('Model Loaded!');
      classifier = featureExtractor.classification(video, videoReady);
      classifier.load('model/model.json', customModelReady());
      classify();

  }
  
  function videoReady(){
      console.log("the webcam is ready")
  }
  
  function customModelReady(){
    console.log("custom model is ready")
  }

  function precautionMessage(result){

if (result.label == 'This is sharp' && result.confidence > 0.50 && result.confidence < 0.75){
  precaution = "Watch out, this could be sharp";
  return precaution
} else if (result.label == 'This is sharp' && result.confidence > 0.75 && result.confidence < 0.90){
  precaution = "Take care, this is most likely a sharp object";
  return precaution
} else if(result.label == 'This is sharp' && result.confidence > 0.90){
  precaution = "Sharp object, keep away from children";
  return precaution
} else {
  precaution = '';
  return precaution
}
}
 
  function classify(){
    setInterval(()=>{
      classifier.classify(video, (err, result) => {
          if (err) console.log(err);
          console.log(result);
          label.innerText = ` ${result[0].label}, I'm ${Math.floor(result[0].confidence * 100)}% sure. ${precautionMessage(result[0])}`;
      })
    }, 1000)
  }


  // const sharpBtn = document.getElementById("sharp")
  // sharpBtn.addEventListener("click", () => addSharpImg())
  
  // function addSharpImg() {
  //     classifier.addImage(video, 'This is sharp', ()=>{
  //         console.log("added sharp image to model!")
  //     })
  // }
  
  // const SafeBtn = document.getElementById("safe");
  // SafeBtn.addEventListener("click", () => addSafeImg());
  
  // function addSafeImg(){
  //   classifier.addImage(video, 'This is safe', ()=> {
  //     console.log("added safe image to model");
  //   })
  // }
  
  // const trainBtn = document.getElementById("train");
  // trainBtn.addEventListener("click", () => classifier.train((lossValue) => {
  //   console.log('Loss is', lossValue)
  //   if(lossValue == null) console.log("Finished training")
  // }))
  
  
  // const classifyBtn = document.getElementById("classify");
  // classifyBtn.addEventListener("click", () => setInterval(()=>{
  //   classifier.classify(video, (err, result) => {
  //       if (err) console.log(err)
  //       console.log(result)
  //       label.innerHTML = result[0].label
  //   })
  // }, 1000)
  // )
  
  // const saveBtn = document.getElementById("save");
  // saveBtn.addEventListener("click", ( )=> classifier.save())
  
  // const loadBtn = document.getElementById("load");
  // loadBtn.addEventListener("click", () => classifier.load('model/model.json', customModelReady()))
  
