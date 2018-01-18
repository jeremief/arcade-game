var gameParameters = {
    winningY: -20,
    possibleGameDifficulty: [1, 2, 3],
    gameDifficulty: 1,
    numberEnemies: 4,
    startPause: 3000
}


// Enemies our player must avoid
var Enemy = function(name, xCoordinates, yCoordinates, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var obj = Object.create(Enemy.prototype);

    objProperties = {
        x: xCoordinates,
        y: yCoordinates,
        width: 45,
        height: 25,
        sprite: 'images/enemy-bug.png',
        speed: speed
    };

    for (property in objProperties){
        obj[property] = objProperties[property];
    }

    return obj;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// Draw the enemy on the screen, required method for game
Enemy.prototype = {
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    update: function(dt){ // dt is a time delta between ticks that ensures that the game runs at the same speed for all computers
        if (this.x <= ctx.canvas.width){
            this.x = (this.x + 1 * dt) + this.speed;
        } else {
            this.x = 1;
        }
    }

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){

    var hero = {
        livesLeft: 3,
        startX: 202,
        startY: 380,
        x: this.startX,
        y: this.startY,
        width: 50,
        height: 100,
        collisionSensors: {
            c1: {},
            c2: {},
            c3: {},
            c4: {}
        },
        xPotential: 202,
        yPotential: 380,
        sprite:'images/char-boy.png',
        update: function(){
            this.x = this.xPotential;
            this.y = this.yPotential;
            this.collisionSensors.c1 = {x: (this.x - this.width /2), y: (this.y + this.height /8)}
            this.collisionSensors.c2 = {x: (this.x + this.width /2), y: (this.y + this.height /8)}
            this.collisionSensors.c3 = {x: (this.x + this.width /2), y: (this.y - this.height /8)}
            this.collisionSensors.c4 = {x: (this.x - this.width /2), y: (this.y - this.height /8)}
            // console.log(this.y);  

            if (this.y == gameParameters.winningY){
                reset();
            }


            },
        render:function(){
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        },
        handleInput: function(key){

            if (key == 'up' && this.y - 80 >= -20){
                this.yPotential = this.y - 80;
                this.xPotential = this.x;
            }
            if (key == 'down' && this.y + 80 <= 380){
                this.yPotential = this.y + 80;
                this.xPotential = this.x;
            }
            if (key == 'left' && this.x - 100 >= 0){
                this.xPotential = this.x - 100;
                this.yPotential = this.y;
            }
            if (key == 'right' && this.x + 100 <= 500) {
               this. xPotential = this.x + 100;
               this. yPotential= this.y;
            }
        },
        resetPosition() {
            this.xPotential = this.startX;
            this.yPotential = this.startY;
        }
        
    }
    return hero;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function generateEnemies(){
    var enemyPossibleStartX = 0;
    var enemyPossibleStartY = [60, 145, 225];
    var enemyPossibleSpeed = [1, 2, 3, 4, 5];
    var enemies = [];

    function randomiseEnemyStartY(possibleStartY){
         return possibleStartY[Math.floor(Math.random()*possibleStartY.length)];
    }

    function randomiseEnemySpeed(possibleSpeed){
        return possibleSpeed[Math.floor(Math.random()*possibleSpeed.length)];
    }

    for (var i = 1; i <= gameParameters.numberEnemies; i++){
        var enemy = Enemy(('enemy'+ i), enemyPossibleStartX, randomiseEnemyStartY(enemyPossibleStartY), randomiseEnemySpeed(enemyPossibleSpeed));
        enemies.push(enemy);
    }

    // var enemy1 = Enemy('enemy1', enemyPossibleStartX, randomiseEnemyStartY(enemyPossibleStartY), randomiseEnemySpeed(enemyPossibleSpeed));
    // var enemy2 = Enemy('enemy2', enemyPossibleStartX, randomiseEnemyStartY(enemyPossibleStartY), randomiseEnemySpeed(enemyPossibleSpeed));
    // var enemy3 = Enemy('enemy3', enemyPossibleStartX, randomiseEnemyStartY(enemyPossibleStartY), randomiseEnemySpeed(enemyPossibleSpeed));
    // var enemies = [enemy1, enemy2, enemy3];
    return enemies;
}

var allEnemies = generateEnemies();
var player = Player();



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


            /*
             For all enemies, check that the collision box does not intesect with the player's.
            Collision means that one of the player's corner is in the enemy's collision 
            box (between x1 and x2 and between y1 and y2)
            */
function checkCollisions(){
    for (var enemy of allEnemies){
            if(player.collisionSensors.c1.x >= enemy.x && player.collisionSensors.c1.x <= enemy.x + enemy.width && player.collisionSensors.c1.y >= enemy.y && player.collisionSensors.c1.y <= enemy.y + enemy.height) {
                reset();
            }
            if(player.collisionSensors.c2.x >= enemy.x && player.collisionSensors.c2.x <= enemy.x + enemy.width && player.collisionSensors.c2.y >= enemy.y && player.collisionSensors.c2.y <= enemy.y + enemy.height) {
                reset();
            }
            if(player.collisionSensors.c3.x >= enemy.x && player.collisionSensors.c3.x <= enemy.x + enemy.width && player.collisionSensors.c3.y >= enemy.y && player.collisionSensors.c3.y <= enemy.y + enemy.height) {
                reset();
            }
            if(player.collisionSensors.c4.x >= enemy.x && player.collisionSensors.c4.x <= enemy.x + enemy.width && player.collisionSensors.c4.y >= enemy.y && player.collisionSensors.c4.y <= enemy.y + enemy.height) {
                reset();
            }

        }
}

function reset(){
    allEnemies = generateEnemies();
    player.resetPosition();

}
