// 캔버스 그림 환경
var canvas = document.getElementById("mycanvas"); //캔버스 객체
var ctx = canvas.getContext("2d"); // 그림객체

// 이미지 불러오기
var yj = new Image();
yj.src = "./imgs/yj.png";

var breathe = new Image();
breathe.src = "./imgs/breathe.png";

var up = new Image();
up.src = "./imgs/up.png";

var down = new Image();
down.src = "./imgs/down.png";

var left = new Image();
left.src = "./imgs/left.png";

var right = new Image();
right.src = "./imgs/right.png";

var bar = new Image();
bar.src = "./imgs/bar.png";

//소리 불러오기
var beat = new Audio();
beat.src = "./sound/beat.mp3";

var bell = new Audio();
bell.src = "./sound/bell.mp3";

var cam = new Audio();
cam.src = "./sound/cam.mp3";

var drum = new Audio();
drum.src = "./sound/drum.mp3";

var windinst = new Audio();
windinst.src = "./sound/windinst.mp3";

// 길이 정보. 픽셀단위


const line = 90;  // 각 바 길이 90픽셀
const note = 30; // 노트 길이 30픽셀

// 좌표정보 

var yjx = 30; // 예진이 시작점 x좌표,20픽셀
var yjy = 250; // 예진이시작점 y좌표  230픽셀 

var scorex = 50; // 점수판x 좌표
var scorey = 40;//점수판 y좌표

var barx = 250; // 노트 x좌표
var bary = 45; //노트 y좌표

//점수

var score = 0;

// 노트 모음
var bars = [];

bars[0] = {
    x : barx, // 처음생성되는 좌표 끝, 중앙
    y : bary
}

// 그리기
var b = 0; 

function draw(){
    
    
    
    ctx.clearRect(0,0,627,608); // 이전 것 지움

    ctx.fillStyle = "black";
    ctx.font = "45px Changa one";
    ctx.fillText(score+"둠칫", scorex, scorey+40);

    
    if (b%6 == 0){ // 플레이어의 숨 상태 b가 실행을 반복하며 0과 1로 왔다갔다하게 하자
        if (d == 37) { //
            ctx.drawImage(left,yjx,yjy);  
            bell.play();
        }
        else if (d == 38){
            ctx.drawImage(up,yjx,yjy);  
            cam.play();
        }
        else if (d == 39){
            ctx.drawImage(right,yjx,yjy);  
            drum.play();
        }
        else if (d == 40){
            ctx.drawImage(down,yjx,yjy);  
            windinst.play();
        }

        else{
            ctx.drawImage(yj,yjx,yjy);  
        }
    }
    else {
        if (d == 37) { //
            ctx.drawImage(left,yjx,yjy);  
            bell.play();
        }
        else if (d == 38){
            ctx.drawImage(up,yjx,yjy);  
            cam.play();
        }
        else if (d == 39){
            ctx.drawImage(right,yjx,yjy);  
            drum.play();
        }
        else if (d == 40){
            ctx.drawImage(down,yjx,yjy);  
            windinst.play();
        }
        else{
            ctx.drawImage(breathe,yjx,yjy); 
        }   
    }
    b += 1;
    
    
    for(var i=0; i<bars.length; i++){
        ctx.drawImage(bar, bars[i].x, bars[i].y);// 노트생성
        
        bars[i].y += 10; // 노트를 점점 아래로 이동
        
        var line = Math.floor(Math.random()*4);

        if (bars[i].y == bary+70 ){ // setInterval에 의해 반복 실행되는 중 특정 지점 지나면 또다른 노트 만듦
            
            bars.unshift({                
                x: barx + 89* line, 
                y: bary
            });
            beat.play();
        } 
    } 
    
    if (bars[(bars.length)-1].y>=515 && bars[(bars.length)-1].y <= 535 && ((bars[(bars.length)-1].x)-barx)/89 == d-37){ // 라인에 지날 때 라인과 방향키 입력과 같으면 노트제거
        bars.pop();
        score += 1;
    } 

    if (bars[(bars.length)-1].y>= 525 && bars[(bars.length)-1].y < 535 ){ 
        ctx.fillStyle = "black";
        ctx.font = "6px Changa one";
        ctx.fillText("피아노 연주 1회권", 60, 190);
    }

    stop();// 종료 

    d = 0; // 키보드 입력 초기화
   
   
}

var game = setInterval(draw,100); // 무한반복 시작. 0.3초 단위로 실행 반복


function stop(){ // 종료조건 함수
    for(var i=0; i<bars.length; i++){
        if (bars[i].y == 535 && (line+37) != d){ // 라인 아래 끝에 닿았을 때 라인과 방향키 입력과 다름
            clearInterval(game);

            document.getElementById("score").innerHTML = score;

            var message = document.getElementById("game-over");
            message.style.display="block";

            if (score >= 50){
                var node = document.createElement("li");                 
                var textnode = document.createTextNode("비밀번호 : dongdaemoon");         
                node.appendChild(textnode);                              
                document.getElementById("game-over-list").appendChild(node);   
            }
        } 
    }
    
}



//키보드 조작
var d;

document.addEventListener("keydown", direction);

function direction(event){
    let key =event.keyCode;
    
    d =  key;
    console.log(d);
}
