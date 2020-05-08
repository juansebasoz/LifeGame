

var c=document.getElementById("canvas");
var ctx;
var x =0, y=0;
var width;
var height;
var fillColor=getRandomColor();

var nxC =100;
var nyC= 75;

var dimX;
var dimY;
var n_heigh=0;


var gameState= [];
var newGameState = [];

var pauseGame=false;



window.onload = function() {
    console.log("Page Loaded");
    ctx = c.getContext('2d');
    width=c.width;
    height=c.height;

    dimX=width/nxC;
    dimY=height/nyC;


   for(var i=0; i< nyC; i++){
        gameState[i]=[];
        newGameState[i]=[];
        for( var j=0; j< nxC; j++){
            gameState[i][j]=0;
            newGameState[i][j]=0;
        }
    }

  //  gameState[2][4]=1;
   // gameState[3][4]=1;
   // gameState[4][4]=1;





   draw();
};
c.onmousedown=function(e) {

    console.log("click", e.clientX, e.clientY);

    pauseGame=true;
}

c.onmouseup= function (e) {
    pauseGame=false;
    console.log("release");
}

c.onmousemove =function (e) {
    if (pauseGame == true){
        console.log("move");
        var p= calcularCasiilla(e.clientX, e.clientY);
        gameState[p.y][p.x]=1;
    }

}

function calcularCasiilla(pX, pY){
    var pos={x:0, y:0};
    var vx=Math.floor((pX*nxC)/width);
    var vy=Math.floor((pY*nyC)/height);
    pos.x=vx;
    pos.y=vy;
    console.log(pos);
    return pos;
}


async function draw() {

   while(true){
        clear(ctx);

       newGameState = JSON.parse(JSON.stringify(gameState));


        for(var y=0; y<nyC; y++){
            for(var x=0; x<nxC; x++){
              //  console.log(x, y);
          if(pauseGame==false) {
              var n_heigh = gameState[mod(y - 1, nyC)][mod(x - 1, nxC)]
                  + gameState[mod(y - 1, nyC)][mod(x, nxC)]
                  + gameState[mod(y - 1, nyC)][mod(x + 1, nxC)]
                  + gameState[mod(y, nyC)][mod(x - 1, nxC)]
                  + gameState[mod(y, nyC)][mod(x + 1, nxC)]
                  + gameState[mod(y + 1, nyC)][mod(x - 1, nxC)]
                  + gameState[mod(y + 1, nyC)][mod(x, nxC)]
                  + gameState[mod((y + 1), nyC)][mod((x + 1), nxC)];

              if (gameState[y][x] == 0 && n_heigh == 3) {
                  newGameState[y][x] = 1;
              } else if (gameState[y][x] == 1) {

                  if (n_heigh < 2 || n_heigh > 3) {
                      //console.log("entra aqui");
                      newGameState[y][x] = 0;
                  }
              }
          }
                if(newGameState[y][x]==0) {

                    drawRect(x * dimX, y * dimY, dimX, dimY);
                }else if(newGameState[y][x]==1){
                    //console.log("viva");
                    drawPixel(x * dimX, y * dimY, dimX, dimY);
                }

            }
        }

       gameState= JSON.parse(JSON.stringify(newGameState));

        await sleep(100);
  }



}


function mod(a, b) {
    if(a<0){
        return (a%b)+b;
    }else{
        return (a%b);
    }
}

function getRandomColor() {
    var color="rgba("+getRandom(0,255)+","+getRandom(0,255)+","+getRandom(0,255)+",0.5)";
    return color;
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function clear(context){
    context.clearRect(0, 0, c.width, c.height);
}


function drawRect(x, y, dimX, dimY){
    ctx.beginPath();
    ctx.rect(x, y, dimX, dimY);
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.stroke();
}


function drawPixel(x, y, dimX, dimY){
    ctx.beginPath();
    ctx.rect(x, y, dimX, dimY);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.stroke();
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}