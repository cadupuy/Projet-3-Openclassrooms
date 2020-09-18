class Diaporama {
    constructor(tempsInterval, afterButton, beforeButton, slides, controles) {
        this.tempsInterval = tempsInterval;
        this.afterButton = afterButton;
        this.beforeButton = beforeButton;
        this.slides = slides;
        this.controles = controles;
        this.currentSlide = 0;
        this.interval = null;
        this.auto = true;
        this.pressControles();
        this.pressAfter();
        this.pressBefore();
        this.keyboard();
        this.autoMode();
    }

    slideAfter() {
        this.slides[this.currentSlide].classList.remove('active')
        if (this.currentSlide == (this.slides.length - 1)) {
            this.currentSlide = 0;
        } else {
            this.currentSlide++;
        }
        this.slides[this.currentSlide].classList.add('active');
    }

    slideBefore() {
        this.slides[this.currentSlide].classList.remove('active')
        if (this.currentSlide == 0) {
            this.currentSlide = this.slides.length - 1;
        } else {
            this.currentSlide--;
        }
        this.slides[this.currentSlide].classList.add('active');
    }

    autoMode() {
        this.interval = setInterval(() => {
            this.slideAfter();
        }, this.tempsInterval);
    }

    pressControles() {
        this.controles.addEventListener('click', e => {
            if (this.auto) {
                clearInterval(this.interval);
                this.controles.innerHTML = '<i class="fas fa-play"></i>'
            } else {
                this.controles.innerHTML = "<i class='fas fa-pause'></i>"
                this.autoMode();
            }
            this.auto = !this.auto;
        });
    }

    pressAfter() {
        this.afterButton.addEventListener('click', e => {
            this.slideAfter();

        });
    }

    pressBefore() {
        this.beforeButton.addEventListener('click', e => {
            this.slideBefore();

        });
    }

    keyboard() {
        window.document.addEventListener("keydown", e => {
            if (e.keyCode === 39) {
                this.slideAfter();
            } else if (e.keyCode === 37) {
                this.slideBefore();
            }
        });
    }
}

let diapo1 = new Diaporama(5000, document.querySelector('#apres'), document.querySelector('#avant'),
    document.querySelectorAll('.slide'), document.getElementById('controles'));