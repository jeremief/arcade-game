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
            // console.log([this.x, this.speed, dt]);
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
        x:202,
        y:420,
        speed: 1,
        direction:'',
        sprite:'images/char-boy.png',
        update: function(dt, key){ // dt is a time delta between ticks that ensures that the game runs at the same speed for all computers
        // update: function(dt,key){ // dt is a time delta between ticks that ensures that the game runs at the same speed for all computers
            // console.log(key);
                if (this.y >= 0 && key == 'up'){
                    this.y = (this.y - 1 * dt) - this.speed;
                } else {
                    this.y = 420;
                }
                console.log([this.y, dt, key, ctx.canvas.height]);
            },
        render:function(){
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        },
        handleInput: function(key){
            // if (key == 'up' && this.y <= ctx.canvas.height && this.y >= 0){
            // if (key == 'up'){
                // this.y = (this.y - 1) - this.speed;
                // this.y = (this.y - 1) * this.speed;
                // this.y = this.y - 1 * this.speed;
                // console.log(this.y);
                // player.update(key);
            // }
            // if (key == 'down' && this.y <= ctx.canvas.height && this.y >= 0){
            //     this.y = (this.y + 1) + this.speed;
            // }
            // if (key == 'left' && this.x <= 412 && this.x >= 0){
            //     this.x = (this.x - 1) - this.speed;
            // }
            // if (key == 'right' && this.x <= 412 && this.x >= 0){
            //     this.x = (this.x + 1) + this.speed;
            // }
            console.log(key);

            }
        
    }
    return hero;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = Enemy('enemy1', 1, 1, 2);
// var enemy2 = Enemy('enemy2', 50, 60, 2);
var allEnemies = [enemy1];
// var allEnemies = [enemy1, enemy2];
// allEnemies.push(enemy1);
// console.log(enemy1);
// console.log(enemy1 instanceof Enemy);
// console.log(allEnemies);

var player = Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    // player.update(allowedKeys[e.keyCode]);
});
