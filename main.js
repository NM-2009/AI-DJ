song="";
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
scoreleftwrist=0;
scorerightwrist=0;

function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("PoseNet is initialized!");
    
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist = " + scoreleftwrist);

        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scorerightwrist ="+ scorerightwrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("RightWristX=" + rightWristX + "RightWristY =" + rightWristY);
        console.log("LeftWristX=" + leftWristX + "LeftWristY =" +leftWristY);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("yellow");
    stroke("black");
    if(scorerightwrist >0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristX >0 && rightWristX <=100){
            document.getElementById("speed_btn").innerHTML = "speed = 0.5x";
            song.rate(0.5); 
        }
        else if(rightWristX >100 && rightWristX <=200){
            document.getElementById("speed_btn").innerHTML = "speed = 1x";
            song.rate(1); 
        }
        else if(rightWristX >200 && rightWristX <=300){
            document.getElementById("speed_btn").innerHTML = "speed = 1.5x";
            song.rate(1.5); 
        }
        else if(rightWristX >300 && rightWristX <=400){
            document.getElementById("speed_btn").innerHTML = "speed = 2x";
            song.rate(2); 
        }
        else if(rightWristX >400 && rightWristX <=500){
            document.getElementById("speed_btn").innerHTML = "speed = 2.5x";
            song.rate(2.5); 
        }
        
    }
    if(scoreleftwrist >0.2){
    circle(leftWristX, leftWristY, 20);
    number = Number(leftWristY);
    removedecimal = floor(number);
    volume = removedecimal/500;
    document.getElementById("volume_btn").innerHTML = "volume =" + volume;
    song.setVolume(volume);
    }


}
