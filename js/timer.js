class Timer {

    constructor(compteur, minuteur) {
        this.compteur = compteur;
        this.compteurInitial = compteur;
        this.minuteur = minuteur;
        this.annulation = document.getElementById('annulation');
        this.brillant = document.querySelector('#brillant');
        this.formulaire = document.querySelector('#form1');
        this.blocCanvas = document.querySelector('.canvas');
        this.interval;
        this.initCooldown();
        this.cancel();

    }

    initCooldown() {
        if (sessionStorage.getItem('minuteur')) {
            this.compteur = sessionStorage.getItem('minuteur');
            this.intervalFunction();
        }
    };

    start() {
        clearInterval(this.interval);

        document.getElementById('resume').textContent = "STATION RESERVEE PAR " + localStorage.getItem('localNom') + " " + localStorage.getItem('localPrenom') + " A L'ADRESSE " + sessionStorage.getItem('address');

        this.brillant.style.display = "flex";
        this.formulaire.style.display = "block";
        this.annulation.style.display = 'flex';
        this.blocCanvas.style.display = "none";

        sessionStorage.setItem('resume', document.getElementById('resume').textContent);

        // Lance le compte à rebours
        this.intervalFunction();
    }

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
        this.interval = setInterval(() => {
            this.decompte();
        }, 1000);

    };


}

let timer1 = new Timer(1200, document.querySelector('#decompte'));