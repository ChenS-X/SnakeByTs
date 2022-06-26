import Snake from "./Snake";
import Food from "./Food";
import ScrolePanel from "./ScrolePanel";

class GameControl {
    snake: Snake;
    food: Food;
    scrolePanel: ScrolePanel;

    direction = '';

    isAlive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scrolePanel = new ScrolePanel();

        this.init();
    }


    init() {
        document.addEventListener('keydown', this.keyHandler.bind(this));

        this.run();
    }

    keyHandler(event: KeyboardEvent) {
        const key = event.key.toLowerCase();
        const direction = ['up', 'down', 'left', 'right'].find(item => key.indexOf(item) >= 0);

        if (direction) {
            this.direction = direction;
            // this.run();
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
            alert(error + ', Game Over!')
            this.isAlive = false;
        }

        this.isAlive && setTimeout(this.run.bind(this), 300 - ((this.scrolePanel.lever - 1) * 30));
    }

    checkEat(x:number,y:number) {
        if(x == this.food.X && y == this.food.Y) {
            console.log('吃食物了');
            this.food.change();
            this.snake.addBody();
            this.scrolePanel.addScrole();
        }
    }

}

export default GameControl;