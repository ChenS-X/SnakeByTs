class Snake {
    element: HTMLElement;

    bodies: HTMLCollection;

    head: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.bodies = this.element.getElementsByTagName('div');

        this.head = this.bodies[0] as HTMLElement;
    }


    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(val) {
        if(this.X == val) return;
        if(val < 0 || val >= 300) {
            throw '撞墙了'
        }

        const last = this.bodies[1] as HTMLElement;
        if(last && last.offsetLeft == val) {
            // console.log('左右掉头了', val, this.X);
            
            // 蛇在向左走，然后向右掉头了
            if(val > this.X) {
                console.log('向右掉头了');
                val = this.X - 10;
            } else if(val < this.X){
                val = this.X + 10;
                console.log('向左掉头了');

            }
        }
        
        // 检测是否撞到自己了
        this.checkCrash(val, this.Y);
        
        this.moveBody();

        this.head.style.left = val + 'px';
    }
    

    set Y(val) {
        if(this.Y == val) return;
        if(val < 0 || val >= 300) {
            throw new Error('撞墙了');
        }

        const last = this.bodies[1] as HTMLElement;
        if(last && last.offsetTop == val) {
            // 蛇在向上走，然后向下掉头了
            if(val > this.Y) {
                val = this.Y - 10;
            } else if(val < this.Y){
                val = this.Y + 10;
            }
        }

        // 检测是否撞到自己了
        this.checkCrash(this.X, val);

        this.moveBody();
        this.head.style.top = val + 'px';
    }

    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }

    moveBody() {
        for(let i = this.bodies.length - 1; i >0; i --) {
            let cur = this.bodies[i] as HTMLElement,
                pre = this.bodies[i - 1] as HTMLLIElement;
            if(pre) {
                cur.style.left = pre.offsetLeft + 'px';
                cur.style.top = pre.offsetTop + 'px'
            }
        }
    }

    checkCrash(x:number, y:number) {
        for(var i = 1; i < this.bodies.length; i ++) {
            const s = this.bodies[i] as HTMLElement;
            if(x === s.offsetLeft && y === s.offsetTop) {
                throw '撞到自己了'
            }
        }
    }
}

export default Snake;