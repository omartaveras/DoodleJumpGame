document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;    
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimeId;
    let downTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false; 
    let leftTimeId = true;
    let rightTimeId = true;   

    function createDoodler(){
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
    }

    class Platform{
        constructor(newPlatBottom) {
            this.left = Math.random() * 315;
            this.bottom = newPlatBottom;
            this.visual = document.createElement('div');
      
            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function createPlatforms(){
        for(let i=0; i< platformCount; i++){
            let platGap = 600 / platformCount;
            let newPlatBottom = 100 + i * platGap;
            let newPlatform = new Platform (newPlatBottom);
            platforms.push(newPlatform);
            console.log(platforms);
        }
    }

    function movePlatforms(){
        if(doodlerBottomSpace > 200){
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';
            });
        }
    }

    function jump(){
        clearInterval(downTimerId);
        isJumping= true;
        upTimeId = setInterval(function(){
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace > startPoint + 200){
                fall();
            }
        }, 30);
    }

    function fall(){
        clearInterval(upTimeId);
        isJumping = false;        
        downTimerId = setInterval(function(){
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace <= 0){
                gameOver();
            }
            platforms.forEach(platform =>{
                if(
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= (platform.bottom + 15)) &&
                    ((doodlerLeftSpace + 60) >= platform.left) && 
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ){
                    console.log('Landed');
                    startPoint = doodlerBottomSpace;
                    jump();
                }
            })

        }, 30);
    }

    function gameOver(){
        console.log('GAME OVER');
        isGameOver = true;
        clearInterval(upTimeId);
        clearInterval(downTimerId);

    }

    function control(e){
        if(e.key === "ArrowLeft"){
            //move left
            moveLeft();
        }else if(e.key === "ArrowRight"){
            //move right
            moveRight();
        }else if(e.key === "ArrowUp"){
            //moveStraight
        }
    }

    function moveLeft(){
        if(isGoingLeft){
            clearInterval(rightTimeId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimeId = setInterval(function(){
            if(doodlerLeftSpace >= 0){
                doodlerLeftSpace -=5;
                doodler.style.left = doodlerLeftSpace + 'px';
            }else{
                moveRight();
            }
            
        }, 30);
    }

    function moveRight(){
        if(isGoingLeft){
            clearInterval(leftTimeId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        rightTimeId = setInterval(function(){
            if(doodlerLeftSpace <= 340){
                doodlerLeftSpace += 5;
                doodler.style.left = doodlerLeftSpace + 'px';
            }else{
                moveLeft();
            }
        }, 30);
    }
    
    function start(){
        if(!isGameOver){
            createPlatforms();
            createDoodler();            
            setInterval(movePlatforms, 30);
            jump();
            document.addEventListener('keyup', control);
        }
    }
    //attach to buttom
    start();
});

//At end of ... 36:00 moving our platforms
//https://www.youtube.com/watch?v=8xPsg6yv7TU&t=555s