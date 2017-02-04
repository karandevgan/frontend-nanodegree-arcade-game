
//////////////////////// Classes For the Game /////////////////////////////

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    // this.direction = direction;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var enemy = this;
    var newX = 0;

    // Updates the position of enemies`
    newX = enemy.x + enemy.speed * dt;
    if (newX > 820)
        newX = -100;
    enemy.x = newX;

    if (Game.isCollision(enemy, player)) {
        player.x = player.initialX;
        player.y = player.initialY;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
}

Player.prototype.update = function (dt) { }

Player.prototype.handleInput = function (input) {
    var topThreshold = 5;
    var downThreshold = 435;
    var leftThreshold = 10;
    var rightThreshold = 700;
    var delta = 25;

    if (input) {
        if (input === 'left') {
            var newX = this.x - delta;
            if (newX < leftThreshold)
                newX = leftThreshold;
            this.x = newX;
        }
        else if (input === 'right') {
            var newX = this.x + delta;
            if (newX > rightThreshold)
                newX = rightThreshold;
            this.x = newX;
        }
        else if (input === 'up') {
            var newY = this.y - delta;
            if (newY < topThreshold)
                newY = topThreshold;
            this.y = newY;
        }
        else if (input === 'down') {
            var newY = this.y + delta;
            if (newY > downThreshold)
                newY = downThreshold;
            this.y = newY;
        }
    }
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}



//////////////////////// Game functions and entities for the game /////////////////////////////

var Game = (function () {

    var gameObj = {};

    // Private objects for Game
    var _enemy1 = new Enemy(-100, 300, 150);
    var _enemy2 = new Enemy(-100, 150, 100);
    var _enemy3 = new Enemy(-200, 0, 200);
    var _player = new Player(200, 435);
    var _initialScore = 0;

    // Binding private methods with gameObj to expose using object
    gameObj.enemies = [_enemy1, _enemy2, _enemy3];
    gameObj.player = _player;
    gameObj.isCollision = _isCollision;
    gameObj.score = _initialScore;

    // Private methods for Game
    function _isCollision(enemy, player) {
        return _xTouches(enemy.x, player.x) && _yTouches(enemy.y, player.y);
    };

    function _xTouches(enemyX, playerX) {

        var enemyLeft = enemyX - 20;
        var enemyRight = enemyX + 72;

        var playerLeft = playerX;
        var playerRight = playerX + 65;

        return playerLeft <= enemyRight && playerRight >= enemyRight ||
            playerRight >= enemyLeft && playerLeft <= enemyLeft;
    };

    function _yTouches(enemyY, playerY) {
        var enemyTop = enemyY;
        var enemyBottom = enemyY + 79;

        var playerTop = playerY;
        var playerBottom = playerY + 60;
        return playerTop >= enemyTop && playerTop <= enemyBottom ||
            playerBottom >= enemyTop && playerBottom <= enemyBottom;
    }

    return gameObj;
})();


////////////////////////////// Set up the objects and functions for global scope ///////////////////////

var allEnemies = Game.enemies;
var player = Game.player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});