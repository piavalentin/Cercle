var alph;

function setup() {
      welcomeCercle = createCanvas(windowWidth, windowHeight);
      welcomeCercle.style('position', 'fixed');
      welcomeCercle.parent('loginSection');
      welcomeCercle.style('z-index', 0);
      alph = 0;
}


function draw() {
      background(55); 
      
      x = windowWidth/2;
      y = windowHeight/2;
      translate(x, y);
  

      
      push();
      noFill();
      for (var i = 0; i <= windowWidth; i+= 15 ){ //5
      
      if(i <= 65){
           alph = 0; 
      }
      
      else if(i > 65) {
            if(alph <= 1){
            alph = i*0.002;
            }
      }
      var size = i * noise(0.01*frameCount + 160);
      beginShape();
            
            for (var d = 0; d < 360; d+=45) { 
                  
                  var e = 0.2 * noise(0.01*frameCount) + size; 
                  var fx = e * cos(d);
                  var fy = e * sin(d);
                  strokeWeight(0.2);
                  c = color('rgba(30, 215, 96, '+alph+')');
                  stroke(c);
            
                  rotate(TWO_PI * noise(0.0002*frameCount));
            
                  vertex(fx,fy);
                
               
            }
    
      endShape();
      }
      pop();
}


function windowResized() {
    cercle = resizeCanvas(windowWidth, windowHeight);
    x = windowWidth/2;
    y = windowHeight/2;
}

