class Snake {
    element: HTMLElement;

    bodies: HTMLCollection;

    head: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.bodies = this.element.getElementsByTagName('div');

        this.head = this.bodies[0] as HTMLElement;


        // console.log(this.element, this.bodies);
    }


    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(val) {
        if(val < 0 || val >= 300) {
            throw '撞墙了'
        }
        this.head.style.left = val + 'px';
    }
    

    set Y(val) {
        if(val < 0 || val >= 300) {
            throw new Error('撞墙了');
        }
        this.head.style.top = val + 'px';
    }

    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }

    remove() {

    }
}

export default Snake;