class Canvas {
    constructor() {
        this.bouton = document.querySelector('#confirmation');
        this.canvas = document.getElementById('signature');
        this.ctx = this.canvas.getContext("2d");
        this.suppression = document.querySelector("#suppression");
        this.canvasBlank = true;
        this.canvas.width = 500;
        this.canvas.height = 250;
        this.cursorX;
        this.cursorY;
        this.started = false;
        this.painting = false;
        this.interval = null;
        this.book();
        this.initEvents();
        this.signatureClear();
    }

    book() {
        this.bouton.addEventListener('click', () => {

            if (this.canvasBlank == true) {
                alert('Veuillez signer avant de confirmer !')
            } else {
                let timer1 = new Timer(1200, document.querySelector('#decompte'));
                timer1.start();
            }
        });
    };

    initEvents() {
        this.canvas.addEventListener("mousedown", () => {
            this.startPosition()
        });
        this.canvas.addEventListener("mousemove", e => {
            this.draw(e);
        });

        this.canvas.addEventListener("mouseup", () => {
            this.finishedPosition();
        });


        this.canvas.addEventListener("mouseleave", () => {
            this.finishedPosition();
        });


        // EVENEMENTS MOBILES
        this.canvas.addEventListener("touchstart", e => {
            this.startPosition()
        });

        this.canvas.addEventListener("touchend", e => {
            this.finishedPosition();
        });

        this.canvas.addEventListener("touchmove", e => {
            e.preventDefault();
            this.touchdraw(e);
        });
    };

    // En train de dessiner avec la souris
    touchdraw(e) {
        if (!this.painting) return;
        this.ctx.lineWidth = 2;
        this.ctx.lineTo((e.touches[0].pageX - e.touches[0].target.offsetLeft), (e.touches[0].pageY - e.touches[0].target.offsetTop));
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo((e.touches[0].pageX - e.touches[0].target.offsetLeft), (e.touches[0].pageY - e.touches[0].target.offsetTop));
    }


    startPosition() {
        this.painting = true;
        this.canvasBlank = false;
    }

    finishedPosition() {
        this.painting = false;
        this.ctx.beginPath();
    }

    draw(e) {
        if (!this.painting) return;
        this.ctx.lineWidth = 2;
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(e.offsetX, e.offsetY);
    }

    signatureClear() {
        this.suppression.addEventListener('click', e => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.canvasBlank = true;

        });
    }
}

let canva1 = new Canvas();