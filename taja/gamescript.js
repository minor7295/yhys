var score = 0;

var movTime=900; //단어 움직임

var makeTime=1700; //화면에 단어가 만들어지는 시간차이

var endCnt=0;

var jsStudy = [ "오빠", "혹시", "제가요", "굳이", "필요",

                "금요일" , "요즘", "요리", "가요", "그렇대요",

                "수요일", "잠시만요", "뭐해요", "요런", "요거",

                "이번주", "이이이이", "힝", "이따", "뭔가",

                "그런건가", "가능", "에이", "에잉", "에에에",

                "뿌에에엥", "아아아", "으아아", "아이코", "아니",

                "아", "이당", "하당", "한당", "근데",

                "그른가", "그냥", "그랭", "그", "그르네",

                "생각해봤는데"          
              ];

var onDiv=[]; // 현재 화면에서 움직이는 div

/** jsStudy배열에서 단어 뽑아 화면에 보이기 **/

function wordsManufacture(){

    var wordRanId=Math.round(Math.random()*(jsStudy.length-1)); // 글자 인덱스값

    var wordRanX=Math.round(Math.random()*480); // 글자 생성 x좌표

    var newDiv=eval("m"+wordRanId);

    var wordWidth=newDiv.innerHTML.length*20;

    newDiv.style.width=wordWidth+"px";

    newDiv.style.left=wordRanX+"px";

    newDiv.style.display="block";

    onDiv.push(newDiv);

    if(endCnt % 4 == 0) {

      tajaStart.value="해장권";

    } else {

      setTimeout(wordsManufacture,makeTime);

      tajaStart.value="시작";

   }

}

/** 뽑은 단어 움직이기 **/

function wordsMove(){

  

  for(var i=0; i<onDiv.length; i++){

      if(onDiv[i]=="") continue;

         var speed=Math.round(Math.random()*20)+1;

         onDiv[i].style.top=(parseInt(onDiv[i].style.top)+speed)+"px";

         if(parseInt(onDiv[i].style.top) > 400){

            document.getElementById("score").innerHTML = score;

            var message = document.getElementById("game-over");
            message.style.display="block";

            if (score >= 40){
               var node = document.createElement("li");                 
               var textnode = document.createTextNode("비밀번호 : cafe");         
               node.appendChild(textnode);                              
               document.getElementById("game-over-list").appendChild(node);
           }

         
            break;
         }
      }

      if(endCnt % 4 == 0) {

        tajaStart.value="해장권";

     } else {

        setTimeout(wordsMove,movTime);

        tajaStart.value="시작";

     }

}

/** 2개 함수 호출 **/

function tajaGoGo(){

  endCnt++;

  tajaTyping.focus();

  wordsManufacture();

  wordsMove();

}

/** 엔터키 입력 되었을 때 처리**/

function wordsCheck(evt){

  var wordAnswer=tajaTyping.value;

  if(evt.keyCode==13){

     for(var i=0; i<onDiv.length; i++){

       if(onDiv[i]=="") continue;

       if(onDiv[i].innerHTML==wordAnswer){

          onDiv[i].style.display="none";

          onDiv[i].style.top="-30px";

          onDiv[i]="";

          score+=1;

       }

     }

     tajaTyping.value="";

  }

}

/**jsStudy 배열 만큼 div 태그 만들고,

시작 클릭과, 엔터키 입력 이벤트 함수에 연결 **/

function tajaInit(){

  var movDiv="";

  for(var i=0; i < jsStudy.length; i++)

  {

     movDiv=movDiv+"<DIV id=m" + i + // 내려오는 글자들 속성

     " style='position:absolute;left:30px;top:10px;width:50px;height:22px;" + 

     "background-color:#fff;z-index:1; color:#000;display:none;" +

     " text-align:center; padding: 3px; border:1px solid #0000ff;" + 

     "font-weight:bold; box-shadow:1px 1px 3px rgba(0,0,0,0.5);'>" + 

     jsStudy[i]+"</div>";

  }

  tajaBackground.innerHTML=movDiv; 

  tajaStart.onclick=tajaGoGo;

  tajaTyping.onkeypress=wordsCheck;

}

/** 로딩되면 자동으로 tajaInit 함수 호출 **/

window.onload=tajaInit;