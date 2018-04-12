function Enemy(opts) {
    var opts = opts || {};
    Element.call(this, opts);
    this.xSpeed = opts.xSpeed;
    this.ySpeed = opts.ySpeed;
    this.image = opts.image;
    this.boomImage = opts.boomImage;
    this.direction = "right";
    this.status = "normal";
    this.boomingCount = 10;
}

Enemy.prototype = new Element();
Enemy.prototype.number = new Array(1);
Enemy.prototype.number[0] = CONFIG.enemyNumber;
Enemy.prototype.constructor = Enemy;
Enemy.prototype.draw = function () {
    switch (this.status) {
        case "normal":
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            break;
        case "booming":
            context.drawImage(this.boomImage, this.x, this.y, this.width, this.height);
            break;
        case "boomed":

            break;
        default:
            break;

    }

};
Enemy.prototype.move = function (len, index, direction) {
    switch (direction) {
        case "right":
            // console.log(this.xSpeed);
            this.x += this.xSpeed;
            if (this.x > 670 - 60 * (len - index)) {
                this.y += this.ySpeed;
                this.direction = "left"
            }
            break;
        case "left":
            this.x -= this.xSpeed;
            if (this.x <= 30 + 60 * index) {
                this.y += this.ySpeed;
                this.direction = "right";
            }
    }
};

Enemy.prototype.booming = function (target) {
    var self = target;
    self.boomingCount--;
    if (self.boomingCount > 0) {
        self.status = "booming";

    } else {
        self.status = "boomed";
    }
};
