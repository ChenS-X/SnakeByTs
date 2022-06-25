class Food {
    element: HTMLElement
    X: number
    Y: number

    constructor() {
        // 因为document.getElementById获取的元素有可能为null，在后面加一个！，表示此元素不为空
        this.element = document.getElementById('food')!

        this.X = this.random();
        this.Y = this.random();

        this.element.style.left = this.X + 'px';
        this.element.style.top = this.Y + 'px'
    }


    // 随机生成食物的坐标
    random():number {
        return Math.floor(Math.random() * 30) * 10;
    }

    // 改变食物的坐标
    change():void{
        this.X = this.random();
        this.Y = this.random();

        this.element.style.left = this.X + 'px';
        this.element.style.top = this.Y + 'px';
    }
}

export default Food;