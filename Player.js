var Entity = require('../classes/Entity');

module.exports = class Player extends Entity {

    constructor(_id) {
        super();
        this.id = _id;
    }


    nome = "" + Math.floor(10 * Math.random());
    pressingRight = false;
    pressingLeft = false;
    pressingUp = false;
    pressingDown = false;
    maxSpeed = 10;

    setPressingRight(state){
        this.pressingRight = state;
    }
    setPressingLeft(state){
        this.pressingLeft = state;
    }
    setPressingUp(state){
        this.pressingUp = state;
    }
    setPressingDown(state){
        this.pressingDown = state;
    }

    AtualizarPlayer = function () {
        this.updateSpeed();
        this.update();
    }


    updateSpeed = function () {
        if (this.pressingRight)
            this.speedx = this.maxSpeed;
        else if (this.pressingLeft)
            this.speedx = -this.maxSpeed;
        else
            this.speedx = 0;

        if (this.pressingDown)
            this.speedy = this.maxSpeed;
        else if (this.pressingUp)
            this.speedy = -this.maxSpeed;
        else
            this.speedy = 0;
    }
    /*
        onConnect = function (socket) {
            player = new Player(socket.id)
            Players.list.push(player);
            socket.on('keyPress', function (data) {
                if (data.inputId === 'left')
                    player.pressingLeft = data.state;
                if (data.inputId === 'right')
                    player.pressingRight = data.state;
                if (data.inputId === 'down')
                    player.pressingDown = data.state;
                if (data.inputId === 'up')
                    player.pressingUp = data.state;
            });
        }
    
        onDisconnect = function (socket) {
            delete Players.list[socket.id];
        }
    
        */
}