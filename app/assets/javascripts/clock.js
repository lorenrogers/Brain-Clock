// inner variables
var canvas, ctx;
var clockRadius = 250;
var clockImage;

// draw functions :
function clear() { // clear canvas function
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

/*
 * Draws an awesome clock hand!
 * Only uses fill for now.
 * 
 * Width and Rotation are both floats from 0-1, corresponding
 * to percentage.
 *
 * For rotation, 0 and 1 are at the top.
 *
 * For width 0.5 fills half of the circle, 0 fills none,
 * and 1 fills all.
 *
 * BUG: There seems to be a problem with using a width <~2
 */
function drawHand(width, rotation, color) {
    ctx.save();
    var handRadius = Math.PI * 2 * width;
    var theta = ((rotation-(width/2))*Math.PI*2) - (Math.PI/2);
    ctx.rotate(theta);

    ctx.beginPath();
    ctx.lineTo(clockRadius, 0);
    ctx.arc(0, 0, clockRadius, 0, handRadius, false);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
}

function drawScene() { // main drawScene function
    clear(); // clear canvas

    // get current time
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    hours = hours > 12 ? hours - 12 : hours;
    var hour = hours + minutes / 60;
    var minute = minutes + seconds / 60;

    // save current context
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    //Backing
    drawHand(1, 0, "rgba(246, 137, 31, 0.1)");

    // Hour Hand
    var hourRotation = hours / 24;
    drawHand(0.5, hourRotation, "rgba(246, 137, 31, 0.7)");

    // Minute Hand
    var minuteRotation = minutes / 60;
    drawHand(0.25, minuteRotation, "rgba(243, 109, 33, 0.7)");

    // Second Hand
    var secondRotation = seconds / 60;
    drawHand(0.15, secondRotation, "rgba(128, 76, 25, 0.6)");

    // Draw Numbers
    ctx.font = 'bold 55px Helvetica';
    ctx.fillStyle = "rgba(3, 3, 3, 0.8)";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(hours, -90, 210);
    ctx.fillText(minutes, 0, 210);
    ctx.fillText(seconds, 90, 210);

    //Restore the original context
    ctx.restore();

    // Draw Brain (as overlay)
    ctx.drawImage(clockImage, 0, 0, 500, 500);
}

// initialization
$(function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // var width = canvas.width;
    // var height = canvas.height;

    clockImage = new Image();
    clockImage.src="assets/brain-clear.png";

    setInterval(drawScene, 1000); // loop drawScene
});
