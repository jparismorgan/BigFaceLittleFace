/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
//  
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
const Scene = require('Scene');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');
const Animation = require("Animation");
const NativeUI = require('NativeUI');
const Reactive = require('Reactive');
var FaceTracking = require("FaceTracking");
const CameraInfo = require("CameraInfo");
const Instruction = require("Instruction");

//import { distance } from 'Reactive';

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

// To access scene objects
// const directionalLight = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

// To log messages to the console
// Diagnostics.log('Console message logged from the script.');

//NativeUI.setText('2dText0','Default Text PARIS');

// Mouth is open: https://github.com/positlabs/spark-sample-projects/blob/a150a0b5c7905f7d2ffd1523ca9efc5d8d702606/vOld/Pizza%20Eats/scripts/script.js
// place baloons: https://github.com/positlabs/spark-sample-projects/blob/a150a0b5c7905f7d2ffd1523ca9efc5d8d702606/vOld/Birthday%20Balloons/Birthday%20Balloons%20Finished%20Effect/scripts/script.js
// touch gestures to move objects: https://github.com/positlabs/spark-sample-projects/blob/a150a0b5c7905f7d2ffd1523ca9efc5d8d702606/vOld/Mug/mug%20script.js

// CameraInfo.captureDevicePosition
//   .monitor({ fireOnInitialValue: true })
//   .subscribe(function(e) {
//     Diagnostics.log(e.newValue);
//     if (e.newValue === "FRONT") {
//       Instruction.bind(true, "switch_camera_view_to_place");
//     } else {
//       Instruction.bind(false, "switch_camera_view_to_place");
//     }
//   });


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

// Log the constant value in the Console
Diagnostics.log(lastMouthOpenness);

const maxText = Scene.root.find('2dText0');
const minText = Scene.root.find('2dText1');

//percentText.text = 'Test';

// forehead and chin
//const forehead1 = Scene.root.find('forehead');
//const chin2 = Scene.root.child('Device').child('Camera').child('Focal Distance').child('faceTracker0').find('chin');

const forehead = FaceTracking.face(0).forehead.top;
const chin = FaceTracking.face(0).chin.tip;

const base = Reactive.distance(chin, forehead).pinLastValue();

//percentText.text = (Reactive.distance(chin, forehead)).toString();

const noseSphere = Scene.root.find('nose');

// noseSphere.transform.scaleX = Reactive.mul(Reactive.distance(chin, forehead), 10);
// noseSphere.transform.scaleY = Reactive.mul(Reactive.distance(chin, forehead), 10);
// noseSphere.transform.scaleZ = Reactive.mul(Reactive.distance(chin, forehead), 10);

//Diagnostics.watch('Distance =>', Reactive.distance(chin, forehead));
//Diagnostics.watch('Fixed =>', Reactive.distance(chin, forehead);

var haveSetNeutral = false;
var neutralValue = 0.0;

var maxScore = 0.0;
var minScore = 0.0;

Reactive.monitorMany({
    distance: Reactive.distance(chin, forehead),
  }).subscribe(({ newValues }) => {
    // Set resting
    if (haveSetNeutral == false && newValues.distance > 0.11 && newValues.distance < 0.25) {
        haveSetNeutral = true;
        neutralValue = newValues.distance;
    }

    const score = newValues.distance - neutralValue;
    const roundedScore = Math.round(score * 10000) / 10000;
    const scaledScore = roundedScore * 100;

    // Set max
    if (haveSetNeutral == true && scaledScore > maxScore) {
         maxScore = Math.round(scaledScore * 1000) / 1000;
    }

    // Set min
    if (haveSetNeutral == true && scaledScore < minScore) {
        minScore = Math.round(scaledScore * 1000) / 1000;
    }

    // Diagnostics.log("neutralValue: " + neutralValue.toString());
    // Diagnostics.log("distance: " + newValues.distance.toString());
    // Diagnostics.log("roundedScore: " + roundedScore.toString());
    // Diagnostics.log("scaledScore: " + scaledScore.toString());

    maxText.text = "Max: " + maxScore.toString();
    minText.text = "Min: " + minScore.toString();

    noseSphere.transform.scaleX = scaledScore;
    noseSphere.transform.scaleY = scaledScore;
    noseSphere.transform.scaleZ = scaledScore;
});


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
