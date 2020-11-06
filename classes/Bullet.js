var Entity = require('../classes/Entity')
module.exports = class Bullet extends Entity{
    constructor(_angle, _x, _y, parents){
        super();
        this.id = Math.random();
        this.speedx = Math.cos(_angle/180*Math.PI)*10;
        this.speedy = Math.sin(_angle/180*Math.PI)*10;
        this.x = _x;
        this.y = _y;
        this.parent = parents.id;
    }
    timer = 0;
    toRemove = false;

    super_update = this.update;
    update = function(){
        this.timer++;
        if(this.timer > 100){
            this.toRemove = true;
        }
        this.super_update();
    }

    onColision = function(list)
    {
        for (var i in list) 
        {
            var p = list[i];
            if(this.getDistance(p) < 32 && this.parent !== p.id)
                this.toRemove = true;
        }
    }
    
}