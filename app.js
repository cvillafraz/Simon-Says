window.onload=()=>{ 
    // credits:https://medium.com/front-end-hacking/create-simon-game-in-javascript-d53b474a7416
    //variables
    const boxes=document.querySelectorAll('.box'),
    start=document.querySelector('.start'),
    strict=document.querySelector('.strict'),
    score=document.querySelector('#score'),
    simon=document.querySelector('h1'),
    possibilities = ['blue', 'red', 'green', 'yellow'],
    audio=[ 
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
    ];
    let strictOn=false;
    let count=0;
    let round=[];
    let playerGame=[];
    //functions
    function simonWrong() {
        if(simon.classList.contains('text-secondary')){
            simon.classList.remove('text-secondary')
            simon.classList.add('text-danger');
            simon.textContent='Wrong!';
        }else{
            simon.classList.remove('text-danger')
            simon.classList.add('text-secondary');
            simon.textContent = 'Simon says:';
        }
    }
    function simonWin() {
        simon.classList.remove('text-secondary')
        simon.classList.add('text-info');
        simon.textContent = 'You Won!';
    }
    function move(){
        setTimeout(()=>{if (simon.classList.contains('text-info')){
                simon.classList.remove('text-info')
            simon.classList.add('text-secondary');
                simon.textContent = 'Simon says:';
            
        } clear();},600)
        
    }
    function clear(){
        count = 0;
        round.splice(0);
        score.textContent=0;
        playerGame.splice(0);
        pcmove();
    }
    function player() {
        boxes.forEach(box => {
            box.addEventListener('click', playerMove);
        });
    }
    function playerMove(e){
       
            let index = Array.from(boxes).indexOf(e.target);
            audio[index].play();
            
            playerGame.push(possibilities[index]);

            
        if (playerGame[playerGame.length - 1] == round[playerGame.length - 1]) {
            if (playerGame.length === round.length) {
                if (count !== 20) {
                    score.textContent = round.length;
                    count++;
                    pcmove();
                } else {
                    simonWin();
                    move();
                }
            }
            
        } else {
            simonWrong();
            stop();
        }
        }
        
    function stop(){
       setTimeout(()=>{
           simonWrong();
           if(strictOn){
               clear();
           }else{
               recall();
           }
       },500)
        }
    
    function pcmove() {
        let random = Math.floor(Math.random() * 4);
        
        round.push(possibilities[random]);
        recall();
    }
    
    function recall(){
            let i=0;
            let int=setInterval(()=>{
                playGame(round[i]);
                i++;
                if(i>=round.length) clearInterval(int);
            },1000)
            clearPlayer();
            player();
    }
    function clearPlayer(){
        playerGame.splice(0);
    }
    
    function playGame(r){
        document.getElementById(r).style.opacity = '.6';
        audio[possibilities.indexOf(r)].play();
        setTimeout(() => {
            document.getElementById(r).style.opacity = '';
        }, 500);
    }
    //events
    start.addEventListener('click',move);
    strict.addEventListener('click',e=>{
        if(e.target.classList.contains('btn-warning')){
            e.target.classList.remove('btn-warning');
            e.target.classList.add('btn-danger');
            e.target.innerHTML = 'Strict: ON';
            strictOn=true;
        }else{
            e.target.classList.remove('btn-danger');
            e.target.classList.add('btn-warning');
            e.target.innerHTML = 'Strict: OFF';
            strictOn=false;
        }
        
    });
    
}

    
    
