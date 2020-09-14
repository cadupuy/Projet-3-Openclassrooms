class Reservation {
    constructor() {
        this.form = document.querySelector('#form1');
        this.canvas = document.querySelector('.canvas');
        this.name = document.getElementById('nom');
        this.secondName = document.getElementById('prenom');
        this.address = document.getElementById('votreAdresse').textContent;
        this.sendForm();
        this.getBookingInformation();
    }

    sendForm() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            if (document.querySelector('#nombreVelo').innerText == "Nombre de vélo(s) disponible(s) : 0") {
                alert('Cette station ne possède pas de vélo disponible');
            } else if (document.querySelector('#votreAdresse').textContent == 'Sélectionnez une station.') {
                alert('Veuillez choisir une station');

            }
            else if (sessionStorage.getItem('resume')) {
                alert('Vous avez déjà une réservation en cours !');

            }
            else {
                this.form.style.display = "none";
                this.canvas.style.display = "block";
                localStorage.setItem('localNom', this.name.value);
                localStorage.setItem('localPrenom', this.secondName.value);
            }
        });
    };

    getBookingInformation() {

        window.onload = function() {
            document.getElementById('nom').value = localStorage.getItem('localNom');
            document.getElementById('prenom').value = localStorage.getItem('localPrenom');
            if (sessionStorage.getItem('resume')) {
                this.brillant.style.display = "flex";
                this.annulation.style.display = "flex";
                document.getElementById('resume').textContent = "STATION RESERVEE PAR " + localStorage.getItem('localNom') + " " + localStorage.getItem('localPrenom') + " A L'ADRESSE " + sessionStorage.getItem('address');
            }
        }
    };
}

let resa1 = new Reservation();
