//载入图像与声音资源
var resourceHelper={
    images:[],
    //声音载入函数
    soundLoader:function(soundSrc,soundName,recallFun){
        var sound=document.createElement("audio");
        sound.setAttribute("src",soundSrc);
        sound.setAttribute('id',soundName);
        sound.setAttribute("autobuffer","true");
        // console.log(soundName);
        sound.autoplay=false;
        $("#game").append(sound);
        sound.addEventListener("canplay",function () {
            recallFun();
        })
    },
    //图像载入函数
    imageLoader:function (name,src,recallFun) {
        var image=new Image();
        image.src=src;
        this.images[name]=image;
        image.onload=function () {
            recallFun();
        }
    },
    resourceLoad:function (resource,recallFun) {
        var images=resource.images;
        var sounds=resource.sounds;
        var len=images.length+sounds.length;//资源数量
        var name;
        var src;
        var finish=0;//成功载入的资源数量
        // console.log('sounds',sounds.length);
        for(var j=0;j<sounds.length;j++){
            var soundName=sounds[j].name;
            var soundSrc=sounds[j].src;
            this.soundLoader(soundSrc,soundName,function () {
                finish++;
                //判定资源载入完成，则执行回调函数初始化游戏
                if(finish===len){
                    // console.log("sounds");
                    recallFun();//
                }
            });
        }
        for(var i=0;i<images.length;i++){
            name=images[i].name;
            src=images[i].src;
            this.imageLoader(name,src,function () {
                finish++;
                //判定资源载入完成，则执行回调函数初始化游戏
                if(finish===len){
                    // console.log("images");
                    recallFun();
                }
            });
        }
    },
    getImage:function (name) {
        var image=this.images[name];
        return image;
    }
}