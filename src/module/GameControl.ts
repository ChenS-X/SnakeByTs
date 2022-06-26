import Snake from "./Snake";
import Food from "./Food";
import ScrolePanel from "./ScrolePanel";
import {sAlert} from './dialog';

// const sDialog = Dialog();

class GameControl {
    snake: Snake;
    food: Food;
    scrolePanel: ScrolePanel;

    // 暂停开始按钮
    pauseBtn: HTMLElement;

    // 吃到食物的音乐控件
    eatBgmEl: HTMLAudioElement;
    // gameover的音乐控件
    goBgmEl: HTMLAudioElement;

    direction = '';

    isPause = true;

    isAlive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scrolePanel = new ScrolePanel();

        this.pauseBtn = document.getElementById('pause')!;

        this.eatBgmEl = document.getElementById('eatBgm')! as HTMLAudioElement;
        this.goBgmEl = document.getElementById('gameoverBgm')! as HTMLAudioElement;

        this.init();
    }


    init() {
        document.addEventListener('keydown', this.keyHandler.bind(this));

        // 暂停按钮事件
        this.pauseBtn.addEventListener('click', this.pauseHandler.bind(this));

        // this.run();
    }

    pauseHandler() {
        this.isPause = !this.isPause;
        this.pauseBtn.innerText = this.isPause === true ? '开始' : '暂停';

        this.isPause === false && this.run();

        if(this.direction === '' && this.isPause === false) {
            this.direction = ['right', 'down'][Math.round(Math.random())];
        }
    }

    keyHandler(event: KeyboardEvent) {
        if(event.keyCode === 32) return this.pauseHandler();

        const key = event.key.toLowerCase();
        const direction = ['up', 'down', 'left', 'right'].find(item => key.indexOf(item) >= 0);

        if (direction) {
            this.direction = direction;
        }
    }

    run() {
        let x = this.snake.X;
        let y = this.snake.Y;

        switch (this.direction) {
            case 'up':
                y -= 10;
                break;
            case 'down':
                y += 10;
                break;
            case 'right':
                x += 10;
                break;
            case 'left':
                x -= 10;
                break;
            default:
                break;
        }

        // 检查蛇吃食物
        this.checkEat(x, y);

        try {
            this.snake.X = x;
            this.snake.Y = y;
        } catch (error) {
            // confirm()
            this.goBgmEl.play();
            // alert(error + ', Game Over!');
            sAlert(error + '，Game Over！', '提示', ['重新开始', '确定'], (res:number) => {
                // console.log('res:', res);
                
                res == 0 && (window.location.href = window.location.href);
            });
            this.isAlive = false;
        }

        this.isAlive && !this.isPause && setTimeout(this.run.bind(this), 300 - ((this.scrolePanel.lever - 1) * 30));
    }

    checkEat(x:number,y:number) {
        if(x == this.food.X && y == this.food.Y) {
            // console.log('吃食物了');
            // 播放迟到食物的声音
            this.eatBgmEl.play();
            // 食物更换位置（可以加上食物位置不能与蛇身重合）
            this.food.change();
            // 蛇添加身体
            this.snake.addBody();
            // 记分牌+1
            this.scrolePanel.addScrole();
        }
    }

}

export default GameControl;