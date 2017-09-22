var el, stage, ball, human, background, balls;
var life;
var avgX, avgY, xscreen, yscreen;

function Ball (posX, posY, sizeX, sizeY) {
    this.xpc = posX;
    this.ypc = posY;
    this.xp = posX - (sizeX/2);
    this.yp = posY - (sizeY/2);
    this.startX = posX;
    this.startY = posY;
    this.xs = sizeX;
    this.ys = sizeY;
    this.isActive = true;
}

function init() {

	ScreenSize();
	
    xscreen = stage.canvas.width;
    yscreen = stage.canvas.height;
    avgX = stage.canvas.width/2;
    avgY = stage.canvas.height/2;
    
    balls = [];
    
    var x = Math.floor(Math.random()*xscreen);
    var y = Math.floor(Math.random()*yscreen);
    
	balls.push(new Ball(x, y, 100, 100));
    
	ball = new Image();
	ball.src="images/pokeball.png";
    human = new Image();
    human.src = "images/trainer-boy.png";
    background = new Image();
    background.src = "images/mystic";
    life = 5;

	createjs.Ticker.on("tick", mytick);
	createjs.Ticker.setFPS(30);
}

function drawXImage(i) {
	stage.drawImage(ball, balls[i].xpc, balls[i].ypc, balls[i].xs, balls[i].ys);
}

function mytick(event) {
	stage.drawImage(background, 0, 0, avgX * 2, avgY * 2); 
    stage.drawImage(human, avgX - 50, avgY - 100, 100, 200);
    stage.font = "30px Aldrich";
	stage.fillStyle = "white";
    stage.textAlign = "center";
    stage.fillText("You have " + life + " lives left", avgX, 50);
    
    if (createjs.Ticker.getTicks() % 30 == 0){
        var x = Math.floor(Math.random()*xscreen);
        var y = Math.floor(Math.random()*yscreen);

        balls.push(new Ball(x, y, 100, 100));   
    }
    
    for (var i = 0; i < balls.length; i++){
        if (balls[i].isActive == true){
            if(balls[i].startX > avgX && balls[i].startY < avgY){
                balls[i].yp += 5 * (Math.abs(avgY - balls[i].yp)/Math.abs(avgX - balls[i].xp));
                balls[i].xp -= 5;
                balls[i].xpc = balls[i].xp - (balls[i].xs/2);
                balls[i].ypc = balls[i].yp - (balls[i].ys/2);
            }
            else if(balls[i].startX < avgX && balls[i].startY < avgY){
                balls[i].yp += 5 * (Math.abs(avgY - balls[i].yp)/Math.abs(avgX - balls[i].xp));
                balls[i].xp += 5;
                balls[i].xpc = balls[i].xp - (balls[i].xs/2);
                balls[i].ypc = balls[i].yp - (balls[i].ys/2);            
            }
            else if(balls[i].startX < avgX && balls[i].startY > avgY){
                balls[i].yp -= 5 * (Math.abs(avgY - balls[i].yp)/Math.abs(avgX - balls[i].xp));
                balls[i].xp += 5;
                balls[i].xpc = balls[i].xp - (balls[i].xs/2);
                balls[i].ypc = balls[i].yp - (balls[i].ys/2);            
            }        
            else {
                balls[i].yp -= 5 * (Math.abs(avgY - balls[i].yp)/Math.abs(avgX - balls[i].xp));
                balls[i].xp -= 5;
                balls[i].xpc = balls[i].xp - (balls[i].xs/2);
                balls[i].ypc = balls[i].yp - (balls[i].ys/2);        
            }        
            
            drawXImage(i);
            
            if (overlap(i) == true){
                balls[i].isActive = false;
                life -= 1;
            }
        }
    }
    
    if (life == 1){
        window.location = "game%20over.html";
    }
}
		
		
function mouseDownEventHandler(e) {
    for (i = 0; i < balls.length; i++){
        if (tap(i, e.clientX, e.clientY) == true){
            balls[i].isActive = false;
        }
    }
}

function touchstartEventHandler(e) {
    for (i = 0; i < balls.length; i++){
        if (tap(i, e.touches[0].pageX, e.touches[0].pageY) == true){
            balls[i].isActive = false;
        }
    }
}

function overlap(n){
	if (avgX >= balls[n].xpc && avgX <= (balls[n].xpc + balls[n].xs) && avgY >= balls[n].ypc && avgY <= (balls[n].ypc + balls[n].ys)){
        return true;
    }
    return false;
}

function tap(n, x, y){
	if (x >= balls[n].xpc && x <= (balls[n].xpc + balls[n].xs) && y >= balls[n].ypc && y <= (balls[n].ypc + balls[n].ys)){
        return true;
    }
    return false;
}

function mouseUpEventHandler(e) {

}

function touchUpEventHandler(e) {
    
}

function mouseMoveEventHandler(e) {

	
}

function touchMoveEventHandler(e) {


}

function setUpHandler(isMouseandNotTouch, detectEvent) {
    removeRaceHandlers();
    if (isMouseandNotTouch) {
        el.addEventListener('mouseup', mouseUpEventHandler);
        el.addEventListener('mousemove', mouseMoveEventHandler);
        el.addEventListener('mousedown', mouseDownEventHandler);
        mouseDownEventHandler(detectEvent);
    } else {
        el.addEventListener('touchstart', touchstartEventHandler);
        el.addEventListener('touchmove', touchMoveEventHandler);
        el.addEventListener('touchend', touchUpEventHandler);
        touchstartEventHandler(detectEvent);
    }
}

function mouseWins(e) {
    setUpHandler(true, e);
}

function touchWins(e) {
    setUpHandler(false, e);
}

function removeRaceHandlers() {
    el.removeEventListener('mousedown', mouseWins);
    el.removeEventListener('touchstart', touchWins);
}

function ScreenSize() {

	el = document.getElementById('mycanvas');
	stage = el.getContext('2d');
	
	el.width = window.innerWidth;
	el.height = window.innerHeight;

	el.addEventListener('mousedown', mouseWins);
	el.addEventListener('touchstart', touchWins);

}


		