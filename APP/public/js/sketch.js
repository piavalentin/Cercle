
var colortone;
var addcolortone;
var addcoltrue;
var newSong;

var mic;
var smoothed = 0;
var volume_data = [];
var vertex_data = [];
var t = 50;

var combination;
var micUse;
var buttonAudioON, buttonAudioOFF;
var buttonBackground;
var bg;




// https://codepen.io/flavaflo/pen/vKxzQz
var plus = 0;



var stars = [];
var speed;


var size2;
var angle1 = 0;
var x, y;


var generative;

var rad = 45;


var edgeValues;
var edgeCounter;
var counting;

function setup() {
    
      x = windowWidth/2;
      y = windowHeight/2;
    
      cercle = createCanvas(windowWidth, windowHeight);
      cercle.parent('sketch-holder');
      bg = 0;
      
      angleMode(DEGREES);
      rectMode(CENTER);
      
        addcoltrue = false;
        for (var i = 0; i < 70; i++) {
            stars[i] = new Star();
        }

          buttonAudioON = createDiv(' ');
          //buttonAudioON.position(65, 65);
          buttonAudioON.parent('id_interaction_menu');
          buttonAudioON.id('mic_button');
          buttonAudioON.class('interaction');
          buttonAudioON.mousePressed(audioON);
          buttonAudioOFF = createDiv(' ');
          //buttonAudioOFF.position(65, 65);
          buttonAudioOFF.parent('id_interaction_menu');
          buttonAudioOFF.id('mic_button_off');
          buttonAudioOFF.class('interaction button_hidden');
          buttonAudioOFF.mousePressed(audioOFF);
    
          cercle.mousePressed(refreshEdges);

      //buttonAudioOFF.addClass('button_hidden');
      /*
      buttonBackground = createButton('BG');
      buttonBackground.position(65, 5);
      buttonBackground.mousePressed(changeBG);
      */
      
      //newSong = Number(sessionStorage.newSong);
      colortone = 'fvalenceneg';
    
      combination = 4;
      micUse = false;
      generative = false;
    
     edgeValues = [190, 90, 45, 20, 60, 120];
      edgeCounter = random(edgeValues);
      //console.log('starting at: ' + edgeCounter);
      counting = true;
      setInterval(refreshEdges, 20000);
      setInterval(getColor, 1000);
}


function keyPressed() {
      // http://keycode.info/
      if (keyCode === 69) {
            refreshEdges();
      }
}


function getColor(){ 
    if(sessionStorage.newSong === "newSong"){
    colortone = sessionStorage.colcol;
 
        console.log('new: ' + colortone);
        if(sessionStorage.hasAddColl === "yes"){
            addcoltrue = true;
            addcolortone = sessionStorage.addCol;
            console.log(addcoltrue + ' *' + addcolortone);
        }
        else { addcoltrue = false; }
        sessionStorage.newSong = "oldSong";
    }
}

function refreshEdges(){
      if(counting && edgeCounter >= 200){
            counting = false;
      } else if (!counting && edgeCounter <= 20)  {
            counting = true;
      }
      
      if(counting){
            edgeCounter += 10;
      } else {
            edgeCounter -= 10;
      }
      
     // console.log(edgeCounter);
}


function draw() {
   
    if (generative === false){
      background(bg);
    }
     
    translate(x, y);
    noFill();

    

 

    speed = 25;
    for (var i = 0; i < stars.length; i++) {
          stars[i].update();
          stars[i].show();
    }
    

    
    if(micUse === true){
        var volume = mic.getLevel();
        // Amplitude
        volume_data.push(volume);
        //console.log(volume_data);
        // delete History
        if(volume_data.length > 360) {
            volume_data.splice(0,1);
        }
    }
    else { volume = 0.2 * noise(0.01*frameCount); }
    //noFill();
    
    
     for (var h = 0; h <= 360; h ++) {
        var f1 = h;
        rotateStuff(f1, volume);
        h += 20;
    }
      
  
      plus += 0.01;
      plus += 0.01;
      plus += 0.01;  
      
	var angle = TWO_PI * noise(0.02*frameCount + 30); // volume
	var rx = 60 * noise(0.01*frameCount + 40);
	var tx = 200 * noise(0.01*frameCount + 50);
	   size2 = 10 * noise(0.01*frameCount + 60);
 
      
    var red = map(noise(plus),0,1, 0, 255);
    var green = map(noise(plus),0,1, 0, 255);
    var blue = map(noise(plus),0,1, 0, 255);
    var alpha = map(noise(plus), 0, 1, 0, 100);

    /* -------------- */
        push();
        if(colortone === 'fdance'){
            /* Rot, Gelb, Orange, Blau, Gold, Grün */
            var red2 = map(noise(plus),0,1, 0, 255);
            var green2 = map(noise(plus),0,1, 0, 255);
            fill(red2,green2,0, alpha*0.5); //aplha*0.1
        }
        if(colortone === 'fenergyhigh'){
            /* Rot, Schwarz, Gelb */
            fill(red, 0, 0, alpha*0.5);
        }
    
        if(colortone === 'fenergyless'){
            /* Grau, Weiß, Rosa */
            var semidark = map(noise(plus),0,1, 0, 255);
            fill(semidark, semidark, semidark, alpha*0.8);
        }

        if(colortone=== 'fvalencepos'){
            /* Grün, Gelb, Gold, Orange */
            fill(0, green, 0, alpha*0.5);

        }

        if(colortone === 'fvalenceneg'){
            /* Schwarz, Grau, Braun */
            fill(0, 0, 0, 0);
        }
      
    
    if(windowWidth < windowHeight){
        var wi_width = windowWidth;
    }else {
        var wi_width = windowHeight;
    }
    
      for (var i = 0; i <= wi_width; i+= 15 ){ //5
      var tryin = windowHeight-100;
     
      
            var size = i * noise(0.01*frameCount + 160);
            beginShape();
             
            
            for (var d = 0; d < 405; d+=edgeCounter) { // 190 90 45 20 60 120
                  var e = (volume*100) + size;
                  var fx = e * cos(d);
                  var fy = e * sin(d);
                  strokeWeight(0.5);
             
                if(colortone === 'fdance'){
                    /* Rot, Gelb, Orange, Blau, Gold, Grün */
                    stroke(255, 215, 0, alpha*5); //aplha*0.1
                }
                if(colortone === 'fenergyhigh'){
                    /* Rot, Schwarz, Gelb */
                    stroke(0, 0, 0, alpha*5);
                }

                if(colortone === 'fenergyless'){
                    /* Grau, Weiß, Rosa */
                    var semidark = map(noise(plus),0,1, 0, 255);
                    stroke(255,255,255, alpha*10);
                }

                if(colortone=== 'fvalencepos'){
                    /* Grün, Gelb, Gold, Orange */
                    stroke(255, 255, 0, alpha*5);
                    // punkte orange
                }

                if(colortone === 'fvalenceneg'){
                    /* Schwarz, Grau, Braun */
                    noStroke();
                }

               
                  rotate(angle);
            
                  vertex(fx,fy);
                 
            }
      endShape();
      }
      pop();
    
    
   

}



function rotateStuff(f1, volume){
        var alpha = map(noise(plus), 0, 1, 0, 100);
        var red = map(noise(plus),0,1, 0, 255);
        var green = map(noise(plus),0,1, 0, 255);
        var blue = map(noise(plus),0,1, 0, 255);
    
      rotate(rot);
      noStroke();
      
      var test = alpha - 0.8;
      push();
      for (var i = 0; i <= 356; i ++) {
          
            if(colortone === 'fdance'){
                    /* Rot, Gelb, Orange, Blau, Gold, Grün */
                    fill(0,0,255, alpha); //aplha*0.1
                }
                if(colortone === 'fenergyhigh'){
                    /* Rot, Schwarz, Gelb */
                    fill(255,255,0, alpha);
                   
                }

                if(colortone === 'fenergyless'){
                    /* Grau, Weiß, Rosa */
                    fill('#fae');
                }

                if(colortone=== 'fvalencepos'){
                    /* Grün, Gelb, Gold, Orange */
                    fill(255,165,0, alpha);
                }

                if(colortone === 'fvalenceneg'){
                    /* Schwarz, Grau, Braun */
                    var semidark = map(noise(plus),0,1, 0, 255);
                    fill(semidark, semidark, semidark, alpha);
                }
            
            //fill(red,165,0, test);
            var a = f1 * cos(angle1 + i);
            var b = f1 *  sin(angle1 + i);
            ellipse(a, b, volume*100,volume*100);
            
            for (var j = 0; j <= 1; j++) {
                  fill(red,165,0,alpha*0.5);
                  var c = (a*0.002)* cos(angle1 + j) + a;
                  var d = (b*0.002) * sin(angle1 + j) + b;
                  rect(c, d, 2, 2);
                  j += 90;
            }
            
            i += 5;
            
      }
    pop();
    // noFill();
    // noStroke();
}






function audioON(){
      mic = new p5.AudioIn();
      mic.start();
      
      micUse = true;
      buttonAudioON.addClass('button_hidden');
      buttonAudioOFF.removeClass('button_hidden');
}

function audioOFF(){
      mic.stop();
      micUse = false;
      buttonAudioOFF.addClass('button_hidden');
      buttonAudioON.removeClass('button_hidden');
}

function changeBG(){
      if (bg === 0){ bg = 255; }
      else { bg = 0; }
}







function windowResized() {
  cercle = resizeCanvas(windowWidth, windowHeight);
  x = windowWidth/2;
  y = windowHeight/2;
}





// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

function Star() {
  this.x = random(-width, width);
  this.y = random(-height, height);
  this.z = random(width);
  this.pz = this.z;

  this.update = function() {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  }

  this.show = function() {

    if(addcoltrue === false){ 
        noFill(); 
    }
    else { 
        if(addcolortone === 'colorsSpeech'){
            /* Blau, Grau, Grün */
            fill('rgba(0, 0, 255, 0.5)'); //aplha*0.1
        }
        if(addcolortone === 'colorsInstrumentalness'){
            /* Violett, Silber */
            fill('rgba(128, 0, 128, 0.5)');
        }
    
        if(addcolortone === 'colorsAcousticness'){
            /* Grün, Braun, Gold */
           // fill(0, green, 0, alpha*0.8);
            fill('rgba(0, 255, 0, 0.5)');
        }

        if(addcolortone === 'colorsLiveness'){
            /* Rot, Gold, Grün */
            fill('rgba(255, 0, 0, 0.5)');

        } 
    }

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var tx = map(this.x / this.z, 0, 1, 0, width/2);
    var ty = map(this.y / this.z, 0, 1, 0, height/2);
      
    var r = map(this.z, 0, width, 16, 0);
    ellipse(tx, ty, r*2, r*2);
    rect(sx, sy, r, r);
    
    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

  }
}