/**
 * Created by Administrator on 2016/12/15.
 */
//绘制地图,一定不要定死map的宽高，使其灵活改变
var map = document.getElementById('map');
var score = document.getElementById('score');
var rows= 25;
var cols = 20;
map.style.width = cols*20+'px';
map.style.height = rows*20+'px';
//需要一个二维数组储存map中div的坐标
var mapDivPosition = [];

for(var i=0;i<rows;i++){
    //需要一维数组储存每一行的div
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

//键盘事件
var direction = 'right';
var changeDir = true;
var delayTimer = null;
document.addEventListener('keydown',function(event){

    event = event || window.event;
    if(!changeDir){
        return;
    }
    //解决方向键与移动方向间的冲突
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
    //给方向键设定方向direction
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
    //改变方向后想再次改变方向需等50毫秒,防止bug
    changeDir = false;
    delayTimer = setTimeout(function(){//error
        changeDir = true;
    },50)
});

//x,y为蛇头的位置
var x = 2;
var y = 0;
//蛋的位置
var eggX = 0;
var eggY = 0;
//将蛇身存入数组中
var snake = [];
var scoreCount = 0;
//假设蛇身的长度一开始为3
for(var k=0;k<3;k++){
    snake[k] = mapDivPosition[0][k];
    snake[k].className = 'col activeSnake';
}

//蛇身移动逻辑
function snakeMove(){
    //根据direction的不同设置x、y蛇头位置的自增和自减
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
    //设定游戏结束的条件
    //撞边界，结束
    if(x<0 || y<0 || x>=cols || y>=rows){//error
        alert('Game Over!!');
        clearInterval(moveTimer);
        return;
    }
    //自己撞自己，结束
    for(var i=0;i<snake.length;i++){
        if(snake[i]===mapDivPosition[y][x]){
            alert('Game Over!!');
            clearInterval(moveTimer);
            return;
        }
    }
    //吃蛋和移动的逻辑
    //吃蛋即蛋的位置与蛇头位置重叠,不吃蛋的话则移动,移动利用先进后出
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
//随机的取值函数
function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
//生蛋逻辑
function createNewEgg(){
    //在地图范围内随机生蛋
    eggX = random(0,cols-1);
    eggY = random(0,rows-1);
    //若蛋位置与蛇身位置重叠则重新生蛋
    if(mapDivPosition[eggY][eggX].className === 'col activeSnake'){
        createNewEgg();
    }else{
        mapDivPosition[eggY][eggX].className = 'col egg';
    }
}
//一开始就要有蛋
createNewEgg();
//蛇身永动逻辑
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

