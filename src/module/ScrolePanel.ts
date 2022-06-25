class ScrolePanel {
    scroleU: number;
    maxLer: number;

    scrole = 0;
    lever = 1;

    scroleEl:HTMLElement;
    leverEl: HTMLElement;

    constructor(scroleU = 10, lever = 10) {
        this.scroleU = scroleU;
        this.maxLer = lever;


        this.scroleEl = document.getElementById('scrole')!;
        this.leverEl = document.getElementById('lever')!;

        this.scroleEl.innerHTML = 'scrole：' + this.scrole + '';
        this.leverEl.innerHTML = 'lever：' + this.lever + '';
    }


    addScrole() {
        if(this.lever >= this.maxLer) {
            return console.log('胜利了');
        }

        this.scrole += 1;
        this.lever = this.scrole % this.scroleU;

        this.scroleEl.innerHTML = 'scrole：' + this.scrole + '';
        this.leverEl.innerHTML = 'lever：' + this.lever + '';
    }
}

export default ScrolePanel;