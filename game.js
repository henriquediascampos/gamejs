'use strict';

//criando canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
 
canvas.width = 737;
canvas.height = 480;
document.body.appendChild(canvas);

//imagem de fundo
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = 'imagens/fundo.jpg';

//imagem heroi
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = 'imagens/heroi.png';

//imagem monstro
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = 'imagens/m.png';

//objetos do jogo

var hero = {
    speed: 256 // movimento em pixels por seg.
};

var monster = {};
var monstersCaught = 0;

//controle do teclado

var kyesDown = {};

window.addEventListener('keydown', function (e) {
    kyesDown[e.keyCode] = true;
}, false);

window.addEventListener('keyup', function (e) {
    delete kyesDown[e.keyCode];
}, false);

//reseta o jogo
var reset = function reset() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    //posição do monstro
    monster.x = 32 + Math.random() * (canvas.width - 64);
    monster.y = 32 + Math.random() * (canvas.height - 64);
};

//atualiza os objetos
var update = function update(modifier) {
    if (38 in kyesDown) {
        // precionando a seta pra cima
        hero.y -= hero.speed * modifier;
    }

    if (40 in kyesDown) {
        //precioando a seta pra baixo
        hero.y += hero.speed * modifier;
    }

    if (37 in kyesDown) {
        // precionando a seta para esquerda
        hero.x -= hero.speed * modifier;
    }

    if (39 in kyesDown) {
        // precionando a seta para direita
        hero.x += hero.speed * modifier;
    }

    if (39 in kyesDown || 37 in kyesDown || 38 in kyesDown || 40 in kyesDown) {
        console.log('=================================');
        console.log('monster.x: ' + monster.x + 32);
        console.log('   hero.x: ' + hero.x + 32);
        console.log('                             ');
        console.log('monster.y: ' + monster.y + 32);
        console.log('   hero.y: ' + hero.y + 32);
        console.log('=================================');
    }
    //os personagens se encostaram?
    if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
        console.log(monster.x + 32);
        ++monstersCaught;
        reset();
    }
};

//rederização
var render = function render() {
    if (bgReady) {
        ctx.drawImage(bgImage, 1, 1);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    if (monsterReady) {
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
var main = function main() {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();
    then = now;

    //executa isso o mais breve possível
    requestAnimationFrame(main);
};

var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mosRequestAnimationFrame;

var then = Date.now();
reset();
main();
