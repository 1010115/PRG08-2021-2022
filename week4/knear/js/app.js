const k = 3
const machine = new kNear(k)


// training - todo: meerdere voorbeelden voor cats en dogs nodig!
machine.learn([11, 5, 10], 'cat')

machine.learn([18, 9.2, 8.1], 'cat')
machine.learn([17,9.1,9], 'cat')
machine.learn([16,9.0,10], 'cat')

machine.learn([20.1, 17, 15.5], 'dog')
machine.learn([23.5, 20, 20],'dog')
machine.learn([21, 16.7, 16],'dog')

// predicting
let prediction = machine.classify([20, 9, 7])
console.log(`I think it's a ${prediction}`)
let h1= document.createElement('h1');
h1.innerText = prediction;
document.body.appendChild(h1);