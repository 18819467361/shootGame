//配置文件
var CONFIG = {
    status:"pause",
    enemyNumber:7,
    enemyGap:10,
    level:0,
    hero: {
        width: 60,
        height: 100,
        x: 320,
        y: 480,
        bulletSpeed:10,
        xSpeed: 5
    },
    enemy: {
        width: 50,
        height: 50,
        xSpeed: 2,
        ySpeed:50,
        x: 30,
        y: 30
    },
    resources: {
        images: [
            {
                name: "bg",
                src: "img/bg.png"
            },
            {
              name:"bg-end",
              src:"./img/bg-end.png"
            },
            {
              name:"boom",
              src:"./img/boom.png"
            },
            {
                name:"enemy",
                src:"img/enemy.png"
            },
            {
                name:"plane",
                src:"img/plane.png"
            }
        ],
        sounds:[
            {
                name:"click",
                src:"music/click.mp3"
            },
            {
                name:"background",
                src:"music/background.mp3"
            },
            {
                name:"gameOver",
                src:"music/gameOver.mp3"
            },
            {
                name:"boom",
                src:"music/boom.mp3"
            },
            {
                name:"boom1",
                src:"music/boom1.mp3"
            },
            {
                name:"boom2",
                src:"music/boom2.mp3"
            },
            {
                name:"boom3",
                src:"music/boom3.mp3"
            },
            {
                name:"boom4",
                src:"music/boom4.mp3"
            },
            {
                name:"boom5",
                src:"music/boom5.mp3"
            },
            {
                name:"win",
                src:"music/win.mp3"
            }
        ]
    }
};