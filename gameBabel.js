//criando canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 737;
canvas.height = 480;
document.body.appendChild(canvas);

//imagem de fundo
let bgReady = false;
const bgImage = new Image();
bgImage.onload = function (){
    bgReady = true;
};
bgImage.src='imagens/fundo.jpg';

//imagem heroi
let heroReady = false;
const heroImage = new Image();
heroImage.onload = function (){
    heroReady = true;
};
heroImage.src='imagens/heroi.png';

//imagem monstro
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function (){
    monsterReady = true;
};
monsterImage.src='imagens/m.png';

//objetos do jogo

const hero = {
    speed : 256  // movimento em pixels por seg.
};

const monster = {};
let monstersCaught = 0;

//controle do teclado

const kyesDown = {};

window.addEventListener('keydown', function(e){
    kyesDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function(e){
    delete kyesDown[e.keyCode];
}, false);

//reseta o jogo
const reset = function(){
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    //posição do monstro
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//atualiza os objetos
const update = function (modifier){
    if(38 in kyesDown){  // precionando a seta pra cima
        hero.y -= hero.speed * modifier;
    }

    if(40 in kyesDown){ //precioando a seta pra baixo
        hero.y += hero.speed * modifier;
    }

    if(37 in kyesDown){ // precionando a seta para esquerda
        hero.x -= hero.speed * modifier;
    }

    if(39 in kyesDown){ // precionando a seta para direita
        hero.x += hero.speed * modifier;
    }

    if(39 in kyesDown || 37 in kyesDown || 38 in kyesDown || 40 in kyesDown){
    console.log('=================================');
    console.log('monster.x: ' + monster.x + 32);
    console.log('   hero.x: ' + hero.x + 32);
    console.log('                             ');
    console.log('monster.y: ' + monster.y + 32);
    console.log('   hero.y: ' + hero.y + 32);
    console.log('=================================');
    }
    //os personagens se encostaram?
    if(
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ){
        console.log(monster.x + 32);
        ++monstersCaught;
        reset();
    }
};  

//rederização
const render = function(){
  if(bgReady){
    ctx.drawImage(bgImage, 1, 1);
  }  
  if(heroReady){
      ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if(monsterReady){
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }
  
  //pontuação
  ctx.fillStyle = 'rgb(250, 250, 250)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Monstros pegos: ' + monstersCaught, 32, 32);
};

// controla o loop do jogo
const main = function(){
    const now = Date.now();
    const delta = now - then;

    update(delta / 1000);
    render();
    then = now;
    
    //executa isso o mais breve possível
    requestAnimationFrame(main);
}

const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mosRequestAnimationFrame;

let then = Date.now();
reset();
main();


