class Snake {
    element: HTMLElement;

    bodies: HTMLCollection;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.bodies = this.element.getElementsByTagName('div');


        console.log(this.element, this.bodies);
    }
}

export default Snake;