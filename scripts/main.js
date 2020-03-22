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
const Time = require('Time');

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


const forehead = FaceTracking.face(0).forehead.top;
const chin = FaceTracking.face(0).chin.tip;
const maxText = Scene.root.find('2dText0');
const minText = Scene.root.find('2dText1');
const timerText = Scene.root.find('2dText2');
const noseSphere = Scene.root.find('noseSphere');

// 1) Detect when face is found
const numFaces = Reactive.round(FaceTracking.count); // the number of faces in the scene
var haveFoundFace = false; // whether we have found a face yet

numFaces.monitor().subscribe( function(e) {
    if (e.newValue == 1.0 && !haveFoundFace) {
        haveFoundFace = true;
        startNeutralFaceTimer();
    } 
});

var timerCountDownSeconds = 3;
var faceTimer;

// 2) Neutral face
var haveSetNeutral = false;
var neutralValue;

function startNeutralFaceTimer() {
    timerText.text = "Make a neutral face in " + timerCountDownSeconds.toString() + "...";
    faceTimer = Time.setInterval(getNeutralFaceValue, 1000);
};

function getNeutralFaceValue() {
    timerCountDownSeconds -= 1;
    timerText.text = "Make a neutral face in " + timerCountDownSeconds.toString() + "...";
        
    if (timerCountDownSeconds <= 0) {
        // Stop timer
        Time.clearInterval(faceTimer);

        // Compute neutral face
        neutralValue = Reactive.distance(chin, forehead).pinLastValue();
        haveSetNeutral = true;
        Diagnostics.log('Taking neutral face measurement: ' + neutralValue.toString());    

        // Reset variables
        timerCountDownSeconds = 3;
        faceTimer = null;

        // Start big face countdown timer
        timerText.text = "Make a BIG face in " + timerCountDownSeconds.toString() + "...";
        faceTimer = Time.setInterval(bigFaceCountdownTimer, 1000);
    }

    return 0;
};

// 3) Big face
var maxScore = 0.0;
var minScore = 0.0;
var settingBigFace = false;
var settingSmallFace = false;

function bigFaceCountdownTimer() {
    timerCountDownSeconds -= 1;
    timerText.text = "Make a big face in " + timerCountDownSeconds.toString() + "...";
        
    if (timerCountDownSeconds <= 0) {
        timerText.text = "Make a BIG face!";

        // Stop timer
        Time.clearInterval(faceTimer);

        // Reset variables
        timerCountDownSeconds = 9;
        faceTimer = null;

        // Start setting big face
        settingBigFace = true;
        faceTimer = Time.setInterval(getBigFaceValue, 1000);
    }
};

function getBigFaceValue() {
    timerCountDownSeconds -= 1;
    timerText.text = "Even bigger!";

    if (timerCountDownSeconds <= 0) {        
        // Stop timer
        Time.clearInterval(faceTimer);

        // Reset variables
        timerCountDownSeconds = 3;
        settingBigFace = false;
        faceTimer = null;
        
        // Start setting small face
        timerText.text = "Make a small face in " + timerCountDownSeconds.toString() + "...";
        faceTimer = Time.setInterval(smallFaceCountdownTimer, 1000);
    }
};

// Small face
function smallFaceCountdownTimer() {
    timerCountDownSeconds -= 1;
        
    if (timerCountDownSeconds <= 0) {
        timerText.text = "Make a small face!";

        // Stop timer
        Time.clearInterval(faceTimer);

        // Reset variables
        timerCountDownSeconds = 3;
        faceTimer = null;

        // Start setting big face
        settingSmallFace = true;
        faceTimer = Time.setInterval(getSmallFaceValue, 1000);
    }
};

function getSmallFaceValue() {
    timerCountDownSeconds -= 1;
    timerText.text = "Even smaller!";

    if (timerCountDownSeconds <= 0) {
        timerText.text = "Good job!";

        // Stop timer
        Time.clearInterval(faceTimer);

        // Reset variables
        settingSmallFace = false;
        faceTimer = null;
    }
}

Reactive.monitorMany({
    distance: Reactive.distance(chin, forehead),
  }).subscribe(({ newValues }) => {
    // // Set resting
    // if (haveSetNeutral == false && newValues.distance > 0.11 && newValues.distance < 0.25) {
    //     haveSetNeutral = true;
    //     neutralValue = newValues.distance;
    // }

    const score = newValues.distance - neutralValue;
    const scaledScore = cleanDistance(score);
   
    timerText.text = scaledScore.toString();

    // Set max
    if (haveSetNeutral == true && scaledScore > maxScore && settingBigFace) {
         maxScore = Math.round(scaledScore * 1000) / 1000;
    }

    // Set min
    if (haveSetNeutral == true && scaledScore < minScore && settingSmallFace) {
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

//// Helpers

function cleanDistance(distance) {
    const roundedScore = Math.round(distance * 10000) / 10000;
    const ret =  roundedScore * 100;
    return ret;  
}

Diagnostics.watch('numFaces =>', numFaces);

const dWatch = Reactive.distance(chin, forehead); 
Diagnostics.watch('raw distance =>', dWatch);