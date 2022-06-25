import Snake from "./Snake";
import Food from "./Food";
import ScrolePanel from "./ScrolePanel";

class GameControl {
    snake:Snake;
    food: Food;
    scrolePanel: ScrolePanel;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scrolePanel = new ScrolePanel();
    }

}

export default GameControl;