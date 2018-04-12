//父类
function Element(opts) {
    var opts=opts||{};
    this.x=opts.x;
    this.y=opts.y;
    this.width=opts.width;
    this.height=opts.height;
}

Element.prototype.move=function (xSpeed,ySpeed) {
     this.x+=xSpeed;
     this.y+=ySpeed;
};

Element.prototype.draw=function () {

};