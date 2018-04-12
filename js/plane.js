function Plane(opts) {
    var opts = opts || {};
    Element.call(this, opts);//组合继承
    this.image = opts.image;
    this.xSpeed = opts.xSpeed;
    this.moveLeft = "off";
    this.moveRight = "off";
    this.bulletSpeed = opts.bulletSpeed;
    this.shoot = "off";
    this.score=0;
}

Plane.prototype = new Element();
Plane.prototype.constructor = Plane;
Plane.prototype.draw = function () {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
};
//监听键盘事件，设置plane的moveLeft、moveRight、shoot的状态
Plane.prototype.eventListener = function () {
    $body = $("body");
    var self = this;
    var shootInterval;
    $body.keydown(function (event) {
        var keyCode = event.which;
        switch (keyCode) {
            case 32:
                if (self.shoot === "off") {
                    self.beginShoot();
                    shootInterval = setInterval(self.beginShoot.bind(self), 200);
                    self.shoot = "on";
                }
                break;
            case 37:
                self.moveLeft = "on";
                break;
            case 39:
                self.moveRight = "on";
                break;
            default:
                break;
        }
    });
    $body.keyup(function (event) {
        var keyCode = event.which;
        switch (keyCode) {
            case 32:
                self.shoot = "off";
                clearInterval(shootInterval);
                break;
            case 37:
                self.moveLeft = "off";
                break;
            case 39:
                self.moveRight = "off";
                break;
            default:
                break;
        }
    });
};

Plane.prototype.move = function () {
    if (this.moveLeft === "on") {
        this.x -= this.xSpeed;
        if (this.x < 30) {
            this.x = 30;
        }
    }
    if (this.moveRight === "on") {
        this.x += this.xSpeed;
        if (this.x > 610) {
            this.x = 610;
        }
    }
};
//生成子弹数组
Plane.prototype.beginShoot = function () {
    var self = this;
    var bulletConfig = {
        x: self.x + self.width / 2,
        y: self.y,
        width: 2,
        height: 6,
        bulletSpeed: self.bulletSpeed
    };
    bullets.push(new Bullet(bulletConfig));


};
//判定飞机是否击中怪兽
Plane.prototype.hasHit = function (target) {
    var len=bullets.length;
    for(var i=len-1;i>=0;i--){
        if(bullets[i].hasCrash(target)){
            music.boomMusicOn();
            bullets.splice(i,1);
            target.booming(target);
            Enemy.prototype.number[0]-=1;//记录剩余敌人数
            this.score+=1;
            break;
        }
    }
};
