function Bullet(opts) {
    var opts=opts;
    Element.call(this,opts);
    this.bulletSpeed=opts.bulletSpeed;
}

Bullet.prototype=new Element();
Bullet.prototype.constructor=Bullet;
//判断子弹是否与怪兽碰撞
Bullet.prototype.hasCrash=function (target) {
    if(target.status==="normal"){
        if(!(this.x+this.width<target.x)&&!(target.x+target.width<this.x)&&
            !(this.y+this.height<target.y)&&!(target.y+target.height<this.y)){
            return true;
        }else{
            return false;
        }
    }

};
Bullet.prototype.move=function () {
      this.y-=this.bulletSpeed;
};
Bullet.prototype.draw=function () {
    context.fillStyle="#cbcbcb";
    context.fillRect(this.x,this.y,this.width,this.height);
}