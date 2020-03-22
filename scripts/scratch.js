
////////////////

//const chin2 = Scene.root.child('Device').child('Camera').child('Focal Distance').child('faceTracker0').find('chin');

////////////////

// Store a reference to the mouth openness (scalar)signal of a detected face
const mouthOpenness = FaceTracking.face(0).mouth.openness;

// Add 1 to the signal using the scalarSignal add method
const mouthOpennessPlusOne = mouthOpenness.add(1);

// Multiply the signal by 2 using the reactive mul method
const doubleMouthOpenness = Reactive.mul(mouthOpenness,2);

// Store a constant mouth openness value when this code is executed
const lastMouthOpenness = mouthOpenness.pinLastValue();

// Watch the signal values in the Console
// Diagnostics.watch('Mouth Openness =>', mouthOpenness);
// Diagnostics.watch('Mouth Openness + 1 =>', mouthOpennessPlusOne);
// Diagnostics.watch('Mouth Openness * 2 =>', doubleMouthOpenness);
// Diagnostics.watch('lastMouthOpenness =>', lastMouthOpenness);


////////////////////////


// noseSphere.transform.scaleX = Reactive.mul(Reactive.distance(chin, forehead), 10);
// noseSphere.transform.scaleY = Reactive.mul(Reactive.distance(chin, forehead), 10);
// noseSphere.transform.scaleZ = Reactive.mul(Reactive.distance(chin, forehead), 10);

//Diagnostics.watch('Distance =>', Reactive.distance(chin, forehead));
//Diagnostics.watch('Fixed =>', Reactive.distance(chin, forehead);


//////////////////////////




// Diagnostics.watch('Mouth Openness + 1 =>', mouthOpennessPlusOne);
// Diagnostics.watch('Mouth Openness * 2 =>', doubleMouthOpenness);

//percentText.text = Math.sqrt( Math.pow((forehead.x - chin.transform.position.x),2) + Math.pow((forehead.transform.position.y - chin.transform.position.y),2) + Math.pow((forehead.transform.position.z - chin.transform.position.z),2)).toString();
// ssss

// function getDistance(point1,  point2){
//     return Math.sqrt( Math.pow((point1.x - point2.x),2) + Math.pow((point1.y - point2.y),2) + Math.pow((point1.z - point2.z),2));
// }
// chin
//const chin = Scene.root.find('chin');

//var distance = getDistance(forehead.transform.position, chin.transform.position);
//Diagnostics.log(forehead.transform.position.x.toString());
// const point1 = forehead.transform.position;
// const point2 = chin.transform.position;
// percentText.text = Math.sqrt( Math.pow((forehead.transform.position.x - chin.transform.position.x),2) + Math.pow((forehead.transform.position.y - chin.transform.position.y),2) + Math.pow((forehead.transform.position.z - chin.transform.position.z),2)).toString();

// const leftOpen = leftEye.openness;
// const rightOpen = rightEye.openness;

// Reactive.monitorMany([point1, point2]).subscribe(function(event) {
//     percentText.text = Math.sqrt( Math.pow((point1.x - point2.x),2) + Math.pow((point1.y - point2.y),2) + Math.pow((point1.z - point2.z),2));
//     // const isLeftOpen = event.newValues["0"] > 0.5;
//     // const isRightOpen = event.newValues["1"] > 0.5;

//     // if (isLeftOpen && isRightOpen) arrow.opacity = Reactive.val(1.0);
//     // else arrow.opacity = Reactive.val(0.0);
// }) 

// works
//percentText.text = forehead.transform.position.x.toString(); //distance.toString();//

// Nose
// const noseSphere = Scene.root.find('nose');
// const parameters = {
//     durationMilliseconds: 800,
//     loopCount: Infinity,
//     mirror: true
//     };

// const driver = Animation.timeDriver(parameters);
// driver.start();

// const sampler = Animation.samplers.easeInBounce(1.0, 2.0);

// const animation = Animation.animate(driver, sampler);

// noseSphere.transform.scaleX = animation;
// noseSphere.transform.scaleY = animation;
// noseSphere.transform.scaleZ = animation;


// Diagnostics.log('noseSphere: '+noseSphere);
// // Diagnostics.log('scale: '+noseSphere.transform.scaleX);

// noseSphere.transform.scaleX = Math.floor((Math.random() * 3) + 1);
// noseSphere.transform.scaleY = Math.floor((Math.random() * 3) + 1);
// noseSphere.transform.scaleZ = Math.floor((Math.random() * 3) + 1);
