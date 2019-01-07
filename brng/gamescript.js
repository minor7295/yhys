// 캔버스 그림 환경
var canvas = document.getElementById("mycanvas"); //캔버스 객체
var ctx = canvas.getContext("2d"); // 그림객체

// 이미지 불러오기
var mycar = new Image();
mycar.src = "./imgs/mycar.png";

var enemy = new Image();
enemy.src = "imgs/enemy.png";

// 길이 정보. 픽셀단위


const line = 70;  // 각 도로 높이 70픽셀
const mlength = 120; // 내 차 길이 120픽셀
const elength = 170; // 적 차 길이 170픽셀

// 좌표정보 

var carx = 35; // 시작점 x좌표,35픽셀
var cary = 420; // 시작점 y좌표  420픽셀

var uppper_boarder = 350; // 도로 위 경계면 350픽셀
var lower_boarder = 560; // 도로 아래 경계면 560픽셀

var scorex = 50; // 점수판x 좌표
var scorey = 40;//점수판 y좌표
//점수

var score = 0;

// 적 모음
var enemies = [];

enemies[0] = {
    x : 900-35-elength, // 처음생성되는 좌표 끝, 중앙
    y : 420
}

// 그리기
function draw(){
    
    
    
    ctx.clearRect(0,0,900,608); // 이전 것 지움

    score += 1;//점수판

    ctx.fillStyle = "black";
    ctx.font = "45px Changa one";
    ctx.fillText(score+"M", scorex, scorey+40);

    ctx.drawImage(mycar,carx,cary); // 플레이어 
    
    for(var i=0; i<enemies.length; i++){
        ctx.drawImage(enemy, enemies[i].x, enemies[i].y);// 적 자동차
        
        enemies[i].x -= 10; // 적 자동차들 점점 왼쪽으로 이동
        
        
        if (enemies[i].x == 900-35-170*2 ){ // setInterval에 의해 반복 실행되는 중 특정 지점 지나면 또다른 적 개체 만듦
            enemies.unshift({
                x: 900-35-elength, // 처음생성되는 좌표 끝, 중앙
                y: 350 + Math.floor(Math.random()*3)*70 //420
            });
        } 

        if (enemies[i].x == 45){ // 화면 밖으로 나가기 전에 적 제거
            enemies.pop();
        } 
    }    

    stop();// 종료 
}

var game = setInterval(draw,50); // 무한반복 시작


function stop(){ // 종료조건 함수
    for(var i=0; i<enemies.length; i++){
        if (carx+mlength +20 > enemies[i].x && carx+mlength < enemies[i].x+elength && enemies[i].y == cary){
            clearInterval(game);

            document.getElementById("score").innerHTML = score;

            var message = document.getElementById("game-over");
            message.style.display="block";

            ctx.fillStyle = "black";
            ctx.font = "6px Changa one";
            ctx.fillText("다봉치킨 교환권", 740, 500);

            if (score >= 3000){
                var node = document.createElement("li");                 
                var textnode = document.createTextNode("비밀번호 : imjingang");         
                node.appendChild(textnode);                              
                document.getElementById("game-over-list").appendChild(node);   
            }
            
        }
    }
    
}



//키보드 조작

document.addEventListener("keydown", direction);

function direction(event){
    let key =event.keyCode;
    
    if (key == 38){ // 윗방향
        if(cary - line >= uppper_boarder){
            cary -= line;
            
        }
    }

    if (key == 40){ // 아랫방향
        if (cary + line < lower_boarder){
            cary += line;
            
        }
    }

}


(function ($) { // jQuery 영역
  
    /**
     * Click handlers for the different menu screens
     */
    $('.restart').click(function() {  // restart 버튼 눌렀을 때
      $('#game-over').hide();
    });
    
    })(jQuery);