document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let doodlerLeftSpace = 50;
    let doodlerBottomSpace = 150;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimeId;
    let downTimerId;

    function createDoodler(){
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
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
        upTimeId = setInterval(function(){
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace > 350){
                fall();
            }
        }, 30);
    }

    function fall(){
        clearInterval(upTimeId);
        downTimerId = setInterval(function(){
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
        }, 30);

    }
    
    function start(){
        if(!isGameOver){
            createDoodler();
            createPlatforms();
            setInterval(movePlatforms, 30);
            jump();
        }
    }
    //attach to buttom
    start();
});

//At end of ... 19:53 moving our platforms
//https://www.youtube.com/watch?v=8xPsg6yv7TU&t=555s