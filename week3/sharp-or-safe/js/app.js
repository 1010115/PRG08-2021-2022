const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

function modelLoaded(){
    console.log("model is geladen");
}

classifier = featureExtractor.addImage(label)