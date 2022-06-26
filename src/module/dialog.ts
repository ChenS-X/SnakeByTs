import '../style/dialog.scss';

class Dialog {
    element: HTMLElement;

    constructor() {
        if (!document.getElementById('myDialog')) {
            this.element = document.createElement('div');
        } else {
            this.element = document.getElementById('myDialog')!;
        }
        this.element.style.display = 'none';
        this.element.style.position = 'absolute';
        this.element.style.left = '0px';
        this.element.style.top = '0px';
        this.element.style.right = '0px';
        this.element.style.bottom = '0px';
        this.element.style.background = 'rgba(255, 255, 255, 0.8)'
        this.element.style.zIndex = '1000';

        document.body.appendChild(this.element);
    }

    show(message: String, title: String, btns: Array<string>, callback?: Function) {
        // this.callback = callback;
        const btnsId = Math.random() * Date.now();
        this.element.innerHTML = `
            <div id="sDialog">
                <p class="title">${title}</p>
                <p class="content">${message}</p>
                <p id="btns_${btnsId}" class="sbtns">
                    ${btns.map((item, index) => `<button data-item="${index}">${item}</button>`).join('')}
                </p>
            </div>
        `
        const self = this;
        // 监听按钮点击事件
        document.getElementById('btns_' + btnsId)?.addEventListener('click', function(event: Event) {
            const target:HTMLElement = event.target as HTMLElement;
            // console.log(target, target.tagName);
            if(target.tagName.toLowerCase() !== 'button') return;

            const dataset = target.dataset;

            dataset.item == '1' && (self.element.style.display = 'none');

            callback && callback(Number(dataset.item));
        });
        this.element.style.display = 'block';
    }
}

const SingleDialog = (function () {
    let instance: Dialog;
    return function () {
        if (!instance) {
            return (instance = new Dialog());
        }
        return instance;
    }
})();

export const sAlert = function (message = '', title = '提示', btns = ['确定'], callback?: Function) {
    const d = SingleDialog();
    d.show(message, title, btns, callback);
}