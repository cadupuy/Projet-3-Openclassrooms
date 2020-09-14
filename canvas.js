class Canvas {
    constructor(compteur, minuteur, bouton) {
        this.compteur = compteur;
        this.compteurInitial = compteur;
        this.minuteur = minuteur;
        this.bouton = bouton;
        this.annulation = document.getElementById('annulation');
        this.resume = document.querySelector('#resume');
        this.votreAdresse = document.querySelector("#votreAdresse");
        this.brillant = document.querySelector('#brillant');
        this.canvas = document.getElementById('signature');
        this.ctx = this.canvas.getContext("2d");
        this.suppression = document.querySelector("#suppression");
        this.formulaire = document.querySelector('#form1');
        this.blocCanvas = document.querySelector('.canvas');
        this.canvasBlank = true;
        this.canvas.width = 500;
        this.canvas.height = 250;
        this.cursorX;
        this.cursorY;
        this.started = false;
        this.painting = false;
        this.interval = null;
        this.initCooldown();
        this.book();
        this.cancel();
        this.initEvents();
        this.signatureClear();
    }

    initCooldown() {
        if (sessionStorage.getItem('minuteur')) {
            this.compteur = sessionStorage.getItem('minuteur');
            this.intervalFunction();
        }
    };

    book() {
        this.bouton.addEventListener('click', e => {

            if (this.canvasBlank == true) {
                alert('Veuillez signer avant de confirmer !')
            } else {
                clearInterval(this.interval);
                document.getElementById('resume').textContent = "STATION RESERVEE PAR " + localStorage.getItem('localNom') + " " + localStorage.getItem('localPrenom') + " A L'ADRESSE " + sessionStorage.getItem('address');
                this.brillant.style.display = "flex";
                this.formulaire.style.display = "block";
                this.annulation.style.display = 'flex';
                this.blocCanvas.style.display = "none";
                sessionStorage.setItem('resume', document.getElementById('resume').textContent);
                this.intervalFunction();
            }
        });
    };

    cancel() {
        this.annulation.addEventListener('click', () => {
            this.brillant.style.display = "none";
            sessionStorage.clear();
            clearInterval(this.interval);
            this.compteur = this.compteurInitial;
        });
    };

    decompte() {
        if (this.compteur > 0) {
            this.compteur--;
            sessionStorage.setItem('minuteur', this.compteur);
            let minutes = Math.floor(this.compteur / 60) + "m " + (this.compteur - (Math.floor(this.compteur / 60) * 60) + "s");
            this.minuteur.textContent = "Temps restant: " + minutes + " avant l'expiration de la session";
            this.minuteur.style.color = "red";

        } else {
            this.minuteur.textContent = "Votre réservation a expirée !"
            sessionStorage.clear();
            this.compteur = this.compteurInitial;
            clearInterval(this.interval);
        }
    };

    intervalFunction() {
        let that = this;
        this.interval = setInterval(function() {
            that.decompte();
        }, 1000);
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

let canva1 = new Canvas(1200, document.querySelector('#decompte'), document.querySelector('#confirmation'));
