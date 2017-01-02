/**
 * Created by Administrator on 2016/12/15.
 */
//���Ƶ�ͼ,һ����Ҫ����map�Ŀ�ߣ�ʹ�����ı�
var map = document.getElementById('map');
var score = document.getElementById('score');
var rows= 25;
var cols = 20;
map.style.width = cols*20+'px';
map.style.height = rows*20+'px';
//��Ҫһ����ά���鴢��map��div������
var mapDivPosition = [];

for(var i=0;i<rows;i++){
    //��Ҫһά���鴢��ÿһ�е�div
    var rowArr = [];
    var rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    map.appendChild(rowDiv);

    for(var j=0;j<cols;j++){
        var colDiv = document.createElement('div');
        colDiv.className = 'col';
        rowDiv.appendChild(colDiv);
        rowArr.push(colDiv);
    }
    mapDivPosition.push(rowArr);
}

//�����¼�
var direction = 'right';
var changeDir = true;
var delayTimer = null;
document.addEventListener('keydown',function(event){

    event = event || window.event;
    if(!changeDir){
        return;
    }
    //�����������ƶ������ĳ�ͻ
    if(direction === 'right'&&event.keyCode === 37){
        return;
    }
    if(direction === 'left'&&event.keyCode === 39){
        return;
    }
    if(direction === 'up'&&event.keyCode === 40){
        return;
    }
    if(direction === 'down'&&event.keyCode === 38){
        return
    }
    //��������趨����direction
    switch(event.keyCode){
        case 37:
            direction = 'left';
            break;
        case 38:
            direction = 'up';
            break;
        case 39:
            direction = 'right';
            break;
        case 40:
            direction = 'down';
            break;
    }
    //�ı䷽������ٴθı䷽�����50����,��ֹbug
    changeDir = false;
    delayTimer = setTimeout(function(){//error
        changeDir = true;
    },50)
});

//x,yΪ��ͷ��λ��
var x = 2;
var y = 0;
//����λ��
var eggX = 0;
var eggY = 0;
//���������������
var snake = [];
var scoreCount = 0;
//��������ĳ���һ��ʼΪ3
for(var k=0;k<3;k++){
    snake[k] = mapDivPosition[0][k];
    snake[k].className = 'col activeSnake';
}

//�����ƶ��߼�
function snakeMove(){
    //����direction�Ĳ�ͬ����x��y��ͷλ�õ��������Լ�
    switch(direction){
        case 'right':
            x++;
            break;
        case 'left':
            x--;
            break;
        case 'up':
            y--;
            break;
        case 'down':
            y++;
            break;
    }
    //�趨��Ϸ����������
    //ײ�߽磬����
    if(x<0 || y<0 || x>=cols || y>=rows){//error
        alert('Game Over!!');
        clearInterval(moveTimer);
        return;
    }
    //�Լ�ײ�Լ�������
    for(var i=0;i<snake.length;i++){
        if(snake[i]===mapDivPosition[y][x]){
            alert('Game Over!!');
            clearInterval(moveTimer);
            return;
        }
    }
    //�Ե����ƶ����߼�
    //�Ե�������λ������ͷλ���ص�,���Ե��Ļ����ƶ�,�ƶ������Ƚ����
    if(eggX===x && eggY===y){
        mapDivPosition[eggY][eggX].className = 'col activeSnake';
        snake.push(mapDivPosition[eggY][eggX]);
        scoreCount++;
        score.innerHTML = scoreCount;
        createNewEgg();
    }else{
        snake[0].className = 'col';
        snake.shift();
        mapDivPosition[y][x].className = 'col activeSnake';
        snake.push(mapDivPosition[y][x]);
    }
}
//�����ȡֵ����
function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
//�����߼�
function createNewEgg(){
    //�ڵ�ͼ��Χ���������
    eggX = random(0,cols-1);
    eggY = random(0,rows-1);
    //����λ��������λ���ص�����������
    if(mapDivPosition[eggY][eggX].className === 'col activeSnake'){
        createNewEgg();
    }else{
        mapDivPosition[eggY][eggX].className = 'col egg';
    }
}
//һ��ʼ��Ҫ�е�
createNewEgg();
//���������߼�
var moveTimer;
var start = document.getElementById('Start'),
    pause = document.getElementById('Pause'),
    refresh = document.getElementById('Refresh'),
    accelerate = document.getElementById('Accelerate');

start.addEventListener('click',function(){
    moveTimer = setInterval('snakeMove()',speed1);
});
pause.addEventListener('click',function(){
    clearInterval(moveTimer);
});
refresh.addEventListener('click',function(){
    window.location.reload();
});
var speed1 = 300;
accelerate.addEventListener('click',function(){
    speed1 -= 20;
    clearInterval(moveTimer);
    moveTimer = setInterval('snakeMove()',speed1);
});

