module.exports =  class Entity 
{
    id = 0;
    speedx = 0;
    speedy = 0;
    x = 250;
    y = 250;
    
    update = function () {
        this.updatePosition();
    }
    updatePosition = function () {
        this.x += this.speedx;
        this.y += this.speedy;
    }
}