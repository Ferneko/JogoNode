var Entity = require('../classes/Entity')
module.exports = class Bullet extends Entity{
    constructor(_angle){
        super();
        this.id = Math.random();
        this.speedx = Math.cos(_angle/180*Math.PI)*10;
        this.speedy = Math.sin(_angle/180*Math.PI)*10;
    }
    timer = 0;
    toRemove = false;

    super_update = this.update;
    update = function(){
        if(this.timer ++ > 100){
            this.toRemove = true;
        }
        this.super_update();
    }
    
}