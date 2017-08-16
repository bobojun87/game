// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = Math.floor(Math.random() * 3) * 85 + 90;
    this.speed = 50 + Math.random() * 50;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 判定Enemy对象位置，使其无限循环在屏幕内移动
    if (this.x > 505) {
        this.x = -100;
        this.y = Math.floor(Math.random() * 3) * 85 + 90;
        this.speed = 50 + Math.random() * 50;
    }
    // 给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 80, 130);
};

// 玩家类
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 405;
};
//限定玩家的移动范围
Player.prototype.update = function(){
    if (this.x < 0) {
        this.x = 0;
    }else if(this.x > 400){
        this.x = 400;
    }else if(this.y < -10){
        this.y = -10;
    }else if (this.y > 405) {
        this.y = 405;
    }
};
//负责在屏幕上画出玩家
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//玩家的动作,定义每次触发键盘事件上下左右移动的距离
Player.prototype.handleInput = function(allowedKey){
    switch (allowedKey)
    {
        case 'left':
            this.x -= 100;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'down':
            this.y += 83;
            break;
    }


};

//菜单类
var Menu = function (gameMenu, j) {
    this.name = gameMenu;
    this.x = 253;
    this.y = 200 + 60 * j;
    this.onMouse = false;
}
//显示菜单
Menu.prototype.render = function() {
    
    ctx.fillStyle = "blue";
    ctx.save();

    ctx.font = "36pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    if(this.onMouse == true){
        ctx.restore();
    }
    this.width = ctx.measureText(this.name).width;
    //console.log(this.width);
    ctx.fillText(this.name, this.x, this.y);
    ctx.strokeText(this.name, this.x, this.y);
}

// 定义数组，实例化敌人的对象放进数组
var allEnemies = [];
for (var i = 0; i < 5; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}
//实例化玩家对象
var player = new Player();

//定义菜单对象数组
var allMenus = [];
//定义菜单数组
var gameMenu = [
    "GAME START",
    "OPTION",
    "EXIT"
];
//实例化菜单对象
for (var j = 0; j < gameMenu.length; j++) {
    var menu = new Menu(gameMenu[j], j);
    allMenus.push(menu);
}

document.addEventListener("mousemove", function(e){
    //var canvas = document.querySelector("canvas");
    this.x = e.clientX - canvas.offsetLeft;
    this.y = e.clientY;
    //console.log(this.x + "," + this.y);
    checkMenuPos(this.x, this.y);
});
//检测鼠标位置在哪个菜单上
function checkMenuPos(x, y) {
    allMenus.forEach(function(menu){
        var menuWidth = menu.width;
        var menuX = menu.x - menuWidth / 2,
            menuY = menu.y - 60;;
        var posX = x - menuX,
            posY = y - menuY;
        console.log(menuX);
        if(posX > 0 && posX < menuWidth && posY > 20 && posY < 60){
            menu.onMouse = true;
            menu.render();
        }else{
            menu.onMouse = false;
            menu.render();
        }
    });
}

// 监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到
// Play.handleInput()方法里面。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };
    player.handleInput(allowedKeys[e.keyCode]);
});