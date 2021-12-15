alertAudio = "" ;
objects = [] ;
status = "" ;

function preload() {
    alertAudio = loadSound("alarm.mp3") ;
}

function setup() {
    canvas = createCanvas(550,450) ;
    canvas.position(520, 240) ;
    video = createCapture(VIDEO) ;
    video.hide() ;
    detector = ml5.objectDetector('cocossd' , modelloaded) ;
    document.getElementById("status").innerHTML = "Status: Detecting objects" ;

}
function modelloaded() {
    console.log("cocossd is initialised.") ; 
    status = "true" ;
}
function gotResult(error, results) {
    if(error) {
        console.log(error) ;
    }
    else {
        console.log(results) ;
        objects = results ;
    }
}
function draw() {
    image(video, 0, 0, 550, 450) ;
    r = random(255) ;
    g = random(255) ;
    b = random(255) ;

    if(status != "" ) {
    detector.detect(video, gotResult) ;
    for(i = 0 ; i<objects.length ; i++) {
        if(objects[i].label == "person") {
        document.getElementById("status").innerHTML = "Status: Person detected." ;
        alertAudio.stop() ;
        }
        else {
        document.getElementById("status").innerHTML = "Status: = Person not detected. Raised alarm" ;
        alertAudio.play() ;
        }

    }
    }
}