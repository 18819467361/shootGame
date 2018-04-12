//管理music
var music = {
    backgroundMusicOn: function () {
            var backgroundMusic = document.getElementById("background");
            backgroundMusic.play();
            backgroundMusic.setAttribute("loop", "loop");
    },
    backgroundMusicOff: function () {
            var backgroundMusic = document.getElementById("background");
            backgroundMusic.pause();
    },
    clickMusicOn: function () {
            var clickMusic = document.getElementById("click");
            clickMusic.play();
    },
    gameWinMusicOn: function () {
            var gameWinMusic = document.getElementById("win");
            gameWinMusic.play();
    },
    gameOverMusicOn: function () {
            var gameOverMusic = document.getElementById("gameOver");
            gameOverMusic.play();
    },
    boomMusicOn: function () {
        var boomMusic = document.getElementById("boom");
        var boomMusic1 = document.getElementById("boom1");
        var boomMusic2 = document.getElementById("boom2");
        var boomMusic3 = document.getElementById("boom3");
        var boomMusic4 = document.getElementById("boom4");
        var boomMusic5 = document.getElementById("boom5");
        if(boomMusic.paused){
            boomMusic.play();
            // console.log("0")
        }else if(boomMusic1.paused){
            boomMusic1.play();
            // console.log("1")
        }else if(boomMusic2.paused){
            boomMusic2.play();
            // console.log("2")
        }else if(boomMusic3.paused){
            boomMusic3.play();
            // console.log("3")
        }else if(boomMusic4.paused){
            boomMusic4.play();
            // console.log("4")
        }else if(boomMusic5.paused){
            boomMusic5.play();
            // console.log("5")
        }
    }
};