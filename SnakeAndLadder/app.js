
var scores=[0,0];
var snakeBite=[99,97,92,83,85,90,75,60,56,54,51,39,26,18,8];
var snakeLand=[63,87,25,45,59,48,28,23,1,36,6,5,10,1,4];
var ladder=[3,6,11,15,17,22,38,49,57,61,73,81,88];
var ladderLand=[20,14,28,34,75,37,59,67,76,78,86,98,91];
var activePlayer =0;
var game=true;
function initilize(){
    scores=[0,0];
    game=true;
    activePlayer=0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').innerHTML = 0;
    document.getElementById('score-1').innerHTML = 0;
    document.getElementById('current-0').innerHTML = 100;
    document.getElementById('current-1').innerHTML = 100;
    document.getElementById('name-0').innerHTML="Player 1";
    document.getElementById('name-1').innerHTML="Player 2"
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.getElementById('status').innerHTML="";
    document.querySelector('.player-0-panel').classList.add('active');
}
initilize();
document.querySelector('.btn-roll').addEventListener('click',()=>{
    if(game){
        if((scores[0]<100)&&(scores[1]<100))
        {
            play();
        }
    }
    else{
        game=false;

    }
})
function ssnake(s)
{
    for(var i=0;i<15;i=i+1)
    {
        if(snakeBite[i]===s)
        {
            return i;
        }
    }
    return -1;
}
function llader(s)
{
    for(var i=0;i<13;i=i+1)
    {
        if(ladder[i]===s)
        {
            return i;
        }
    }
    return -1;
}
document.querySelector('.btn-new').addEventListener('click',()=>{initilize();});
function play()
{
    var dice =Math.floor(Math.random()*6)+1;
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-'+dice +'.png';
    
    if(scores[activePlayer]>=94)
    {
        if((scores[activePlayer]+dice)<=100){
            scores[activePlayer]+=dice;
        }
    }
    else
    {
        scores[activePlayer]+=dice;
    }
    
    var x=ssnake(scores[activePlayer]);
    var y=llader(scores[activePlayer]);
    var z;
    if(x===-1 && y===-1)
    {
        z="YOU ARE SAFE";
    }
    else if(y===-1 && x!==-1){
        z="OPPS! YOU GOT A SNAKE BITE";
        scores[activePlayer]=snakeLand[x];
    }
    else{
        z="HURRAAH! YOU CLIMED THE LADDER";
        scores[activePlayer]=ladderLand[y];
    }
    if(scores[activePlayer]>=100)
    {
        document.getElementById('name-'+activePlayer).innerHTML="WINNER!";
        document.querySelector('.dice').style.display='none';
        setTimeout(()=>{document.querySelector('.player-' +activePlayer+ '-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');},2000)
        
        game=false;
    }
    document.getElementById('status').innerHTML=z;
    document.getElementById('score-' +activePlayer).innerHTML=scores[activePlayer];
    document.getElementById('current-'+activePlayer).innerHTML=(100-scores[activePlayer]);
    
    
    setTimeout(()=>{
        document.getElementById('status').innerHTML="";
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
        },500)

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

}