'use strit';
// grid of the game
var UNIT_X = 101;
var UNIT_Y = 83;
// Enemies our player must avoid
var Enemy = function() {
    // start outside of the canvas
    this.x = - UNIT_X;
    //random y at 3 rows
    this.y =  Math.floor(Math.random()*3+1)*UNIT_Y-20;
    //random speed
    this.speed = 100 + Math.random()*50;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) { 
    // if out of bound, reset x, random y
    if (this.x > 606) {
        this.x = -101;
        this.y =  Math.floor(Math.random()*3+1)*UNIT_Y-20; // subtract 20 to fit the grid
    } else {
        this.x = this.x + this.speed * dt;
    }
    //collision check using absolute distance 
    if ( (Math.abs(player.y - this.y) < 1) && Math.abs(player.x - this.x) < 70 ) {
        player.x = player.initialx;
        player.y = player.initialy;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player
var Player = function() {
    // initial location of the player
    this.initialx = 2 * UNIT_X;
    this.initialy = 5 * UNIT_Y - 20; //subtract 20 to fit the grid
    this.x = this.initialx;
    this.y = this.initialy;
    this.sprite = 'images/char-boy.png';

    // keyboard input
    this.keyInput = null;
};

// update position of player
Player.prototype.update = function(dt) {
    if(this.keyInput === 'left' && this.x >= UNIT_X){ 
        this.x = this.x - UNIT_X;
    //if right key is pressed and player is not on edge of map increment x 
    }else if(this.keyInput === 'right' && this.x < 4 * UNIT_X){
        this.x = this.x + UNIT_X;
    //if up key is pressed increment y 
    }else if(this.keyInput === 'up'){
        this.y = this.y - UNIT_Y;
    //if down key is pressed and player is not on edge of map decrement y 
    }else if (this.keyInput === 'down' && this.y < 4 * UNIT_Y){
        this.y = this.y + UNIT_Y;
    }   
    //If on water, reset
    if(this.y < 10){
        this.x = this.initialx;
        this.y = this.initialy;
    }
    this.keyInput = null;
};

// render player
Player.prototype.render = function(dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// input of keyboard
Player.prototype.handleInput = function(key){
    this.keyInput = key;
};

// instantiate 4 enemy
var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());

// instantiate a player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
