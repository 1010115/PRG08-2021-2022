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
  
  label = document.getElementById("label")

  function classify(){
    setInterval(()=>{
      classifier.classify(video, (err, result) => {
          if (err) console.log(err)
          console.log(result)
          label.innerHTML = result[0].label
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
  
