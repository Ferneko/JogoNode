
var Player = require('../JogoNode/classes/Player')
var Bullet = require('../JogoNode/classes/Bullet')
var express = require('express')
var app = express();
var serv = require('http').Server(app);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000)
console.log("Server started");

var SOCKET_LIST = {}
var Players = {
    list: [],
    onUpdate: function () {
        var pack = [];
        for (var i in Players.list) {
            var jogador = Players.list[i];
            jogador.AtualizarPlayer();
            pack.push({
                x: jogador.x,
                y: jogador.y,
                nome: jogador.nome,
            })

        }
        return pack;
    }
}
var Bullets = {
    list: [],
    onUpdate: function () {
        var pack = [];
        for (var i in Bullets.list) {
            var bullet = Bullets.list[i];
            bullet.update();

            bullet.onColision(Players.list)

            if (bullet.toRemove)
                delete Bullets.list[i]
            else
                pack.push({
                    x: bullet.x,
                    y: bullet.y,
                })

        }
        return pack;
    }
}

//Players.list = {};
/*
var Entity = function () {
    var self = {
        x: 250,
        y: 250,
        speedx: 0,
        speedy: 0,
        id: "",
    }
    self.update = function () {
        self.updatePosition();
    }
    self.updatePosition = function () {
        self.x += self.speedx;
        self.y += self.speedy;
    }

    return self;
}



var Player = function (id) {
    var self = Entity();

    self.id = id;
    self.nome = "" + Math.floor(10 * Math.random());
    self.pressingRight = false;
    self.pressingLeft = false;
    self.pressingUp = false;
    self.pressingDown = false;
    self.maxSpeed = 10;

    var super_update = self.update;
    self.update = function () {
        self.updateSpeed();
        super_update();
    }


    self.updateSpeed = function () {
        if (self.pressingRight)
            self.speedx = self.maxSpeed;
        else if (self.pressingLeft)
            self.speedx = -self.maxSpeed;
        else
            self.speedx = 0;

        if (self.pressingDown)
            self.speedy = self.maxSpeed;
        else if (self.pressingUp)
            self.speedy = -self.maxSpeed;
        else
            self.speedy = 0;
    }
    Player.list[id] = self;
    return self;
}




Players.onConnect = function (socket) {
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
*/


var AtualizaJogo = function () {
    var pack = [];

    return pack;
}
var io = require('socket.io')(serv, {});
io.sockets.on('connection', function (socket) {
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;
    console.log(socket.id);
    var jogador = new Player(socket.id)

    Players.list[socket.id] = jogador;
    socket.on('keyPress', function (data) {

        if (data.inputId === 'left')
            jogador.setPressingLeft(data.state);
        else if (data.inputId === 'right')
            jogador.setPressingRight(data.state);
        else if (data.inputId === 'down')
            jogador.setPressingDown(data.state);
        else if (data.inputId === 'up')
            jogador.setPressingUp(data.state);
        else if (data.inputId === 'atack') {
            jogador.pressingAttack = data.state;
            Bullets.list.push(new Bullet(jogador.pressingMouseAngle, jogador.x, jogador.y, jogador))
        }
        else if (data.inputId === 'mouseAngle')
            jogador.pressingMouseAngle = data.state;
    });

    socket.on('sendMessageToServer', function (data) {
        var playerName = socket.id;
        for (var i in SOCKET_LIST) {
            var socketItem = SOCKET_LIST[i];
            socketItem.emit('addToChat', playerName + ": " + data)
        }

    })


    socket.on('disconnect', function () {
        delete SOCKET_LIST[socket.id];
        delete Players.list[socket.id];

    })





})

setInterval(function () {
    var pack = {
        players: Players.onUpdate(),
        bullets: Bullets.onUpdate()
    }
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions', pack)
    }
}, 1000 / 60)