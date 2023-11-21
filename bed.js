Status ="";
bed_image ="";
Objects =[];

function preload() {
    bed_image =loadImage("bed.jpg")
}

function setup() {
    canvas =createCanvas(640,350)
    canvas.position(315,200)
    object_detector =ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML ="Status :Detecting Objects";
}

function ModelLoaded() {
    console.log("Model is Loaded");
    Status =true;
    object_detector.detect(bed_image, gotResults)
}

function gotResults(error,results) {
    if(error) {
        console.error(eror);
    }
    console.log(results);
    Objects =results;
}

function draw() {
    image(bed_image,0,0,640,350)
    if(Status != "") {
        for(i =0; i < Objects.length; i++) {
            document.getElementById("status").innerHTML ="Status :Objects Detected";

            fill("red")
            percent =floor(Objects[i].confidence * 100);
            text(Objects[i].label + "  " +percent + "%",Objects[i].x, Objects[i].y )
            noFill()
            stroke("red")
            rect(Objects[i].x -800, Objects[i].y, Objects[i].width, Objects[i].height)
            
        }
    }
}