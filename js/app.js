var container = document.getElementById('game');
var canvas = document.getElementById('canvas');
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
var context = canvas.getContext('2d');
var bullets = [];
var enemies;
var plane;
window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 30);
    };
/**
 * 整个游戏对象
 */
var GAME = {
    /**
     * 初始化函数,这个函数只执行一次
     * @param  {object} opts
     * @return {[type]}      [description]
     */
    init: function (opts) {
        var self = this;
        resourceHelper.resourceLoad(CONFIG.resources, function () {
            self.status = 'start';
            self.bindEvent();
        })
    },

    bindEvent: function () {
        var self = this;
        var playBtn = document.querySelector('.js-play');
        // 开始游戏按钮绑定
        var $nextBtn = $(".js-next");
        var $replayBtn = $(".js-replay");
        $nextBtn.click(function () {
            self.next();
            music.clickMusicOn();
        });
        $replayBtn.click(function () {
            self.replay();
            music.clickMusicOn();
        });
        playBtn.onclick = function () {
            self.play(CONFIG);
            music.clickMusicOn();
        };


    },
    /**
     * 更新游戏状态，分别有以下几种状态：
     * start  游戏前
     * playing 游戏中
     * failed 游戏失败
     * success 游戏成功
     * all-success 游戏通过
     * stop 游戏暂停（可选）
     */
    setStatus: function (status) {
        this.status = status;
        container.setAttribute("data-status", status);
    },
    play: function (opts) {
        music.backgroundMusicOn();
        var self = this;
        this.setStatus('playing');
        //生成怪兽
        var enemyImage = resourceHelper.getImage("enemy");
        var boom = resourceHelper.getImage("boom");
        var opts = opts || {};
        var level = opts.level;
        var enemyNumber = opts.enemyNumber;
            //初始化二维怪兽数组
        enemies = new Array(level + 1);
        for (var k = 0; k < enemies.length; k++) {
            enemies[k] = new Array(enemyNumber);
        }
        var enemy = opts.enemy;
        enemy.image = enemyImage;
        enemy.boomImage = boom;
        for (var j = 0; j <= level; j++) {
            for (var i = 0; i < enemyNumber; i++) {
                enemy.x = 30 + i * (enemy.width + opts.enemyGap);
                enemy.y = 30 + j * (enemy.height +opts.enemyGap);
                enemies[j][i] = new Enemy(enemy);
            }
        }

        //生成飞机
        if ($.isEmptyObject(plane)) {
            var planeImage = resourceHelper.getImage("plane");
            var planeOpts = opts.hero;
            planeOpts.image = planeImage;
            plane = new Plane(planeOpts);
            plane.eventListener();
        }


        //更新画布
        this.update();
    },
    update: function () {
        var self = this;
        //清除、更新对象、绘制
        self.clear();
        self.updateElement(CONFIG);
        self.draw();
        //判断游戏结束
            //消灭怪兽，游戏成功，准备下一关
        if (Enemy.prototype.number[0] == 0) {
            this.clear();
            this.prepareNext();
            return;
        }
            //怪兽到达飞机水平位置，游戏失败
        if (enemies[enemies.length - 1][0].y > 440) {
            this.clear();
            this.end();
            return;
        }
        //游戏循环
        requestAnimationFrame(self.update.bind(self));
    },
    updateElement: function (opts) {
        var opts = opts || {};


        //更新敌人
        for (var k = 0; k < enemies.length; k++) {
            //
            var hasAliveEnemy = false;//判断敌人同一行status是否均为boomed的标志位
            for (var i = 0; i < enemies[k].length; i++) {
                var status = enemies[k][i].status;
                //更新敌人位置
                enemies[k][i].move(enemies[k].length, i, enemies[k][i].direction);
                //判断是否击中
                if (status === "normal") {
                    hasAliveEnemy = true;
                    plane.hasHit(enemies[k][i]);
                } else if (status === "booming") {
                    enemies[k][i].booming(enemies[k][i]);
                } else if (status === "boomed") {
                    //判定第一列或最后一列敌人status是否均为boomed，是则删除列
                    if (k === 0) {
                        if (i === 0 || i === enemies[0].length - 1) {
                            var flag = true;
                            for (var y = 0; y < enemies.length; y++) {
                                if (enemies[y][i].status !== "boomed") {
                                    flag = false;
                                    break;
                                }
                            }
                            if (flag === true) {
                                for (var z = 0; z < enemies.length; z++)
                                    enemies[z].splice(i, 1);
                            }
                        }
                    }
                }
            }
            //同一行敌人status均为boomed，则删除该行
            if (hasAliveEnemy === false) {
                if (k !== 0) {
                    // console.log("cut");
                    enemies.splice(k, 1);
                }
            }
        }

        //更新子弹位置
        var bulletLen = bullets.length;
        for (var j = bulletLen - 1; j >= 0; j--) {
            bullets[j].move();
            if (bullets[j].y < 0) {
                bullets.splice(j, 1);
            }
        }
        //更新飞机位置
        plane.move();
    },
    draw: function () {
        //循环绘制敌人
        for (var k = 0; k < enemies.length; k++)
            for (var i = 0; i < enemies[k].length; i++) {
                enemies[k][i].draw();
            }
        //循环绘制子弹
        var bulletLen = bullets.length;
        for (var j = bulletLen - 1; j >= 0; j--) {
            bullets[j].draw();
        }
        //绘制飞机
        plane.draw();
        //显示分数
        this.showScore();

    },
    clear: function () {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    },

    showScore: function () {
        var score = plane.score;
        context.fillStyle = "#919191";
        context.font = "25px 黑体";
        context.fillText("得分：" + score, 15, 30);
        context.fillStyle = "#fdfdfd";
        context.font = "25px 黑体";
        context.fillText("得分：" + score, 16, 31);

    },
    //游戏过关后，判定转跳页面
    prepareNext: function () {
        if (CONFIG.level > 3) {
            music.gameWinMusicOn();
            this.setStatus('all-success');
        } else {
            this.setStatus('success');
        }
    },
    //游戏失败，显示失败页面
    end: function () {
        $(".score").text(plane.score);
        music.backgroundMusicOff();
        music.gameOverMusicOn();
        this.setStatus('failed');
    },
    //重新游戏，初始化enemies、bullets、plane;
    replay: function () {
        CONFIG.level = 0;
        Enemy.prototype.number[0] = (CONFIG.level + 1) * 7;
        enemies.splice(0, enemies.length);
        bullets.splice(0, bullets.length);
        plane.score = 0;
        this.play(CONFIG);
    }
    ,
    //游戏过关，设置游戏level开始下一关
    next: function () {
        CONFIG.level += 1;
        Enemy.prototype.number[0] = (CONFIG.level + 1) * 7;
        // console.log(CONFIG.level);
        enemies.splice(0, enemies.length);
        bullets.splice(0, bullets.length);
        this.play(CONFIG);
    }
};


// 初始化
GAME.init();
