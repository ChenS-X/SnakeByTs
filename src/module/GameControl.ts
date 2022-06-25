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
        try {
            switch (this.direction) {
                case 'up':
                    this.snake.Y = this.snake.Y - 10;
                    break;
                case 'down':
                    this.snake.Y += 10;
                    break;
                case 'right':
                    this.snake.X = this.snake.X + 10;
                    break;
                case 'left':
                    this.snake.X -= 10;
                    break;
                default:
                    break;
            }
        } catch (error) {
            alert(error + ', Game Over!')
            this.isAlive = false;
        }

        // 检查蛇吃食物
        this.checkEat();

        this.isAlive && setTimeout(this.run.bind(this), 300);
    }

    checkEat() {
        if(this.snake.X == this.food.X && this.snake.Y == this.food.Y) {
            console.log('吃食物了');
            this.food.change();
        }
    }

}

export default GameControl;