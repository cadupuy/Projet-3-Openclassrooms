// Récupération des données de la carte
class Carte {
    constructor(longitude, latitude, zoom, id, city) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.zoom = zoom;
        this.id = id;
        this.city = city;
        this.marker = null;
        this.yourAddress = document.getElementById("votreAdresse");
        this.bikeNumber = document.getElementById("nombreVelo");
        this.placeNumber = document.getElementById("nombrePlace");

        // initialisation de la map
        this.map = L.map(this.id).setView([this.longitude, this.latitude], this.zoom);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoiY2FkdXB1eSIsImEiOiJjazYwcW9iMnYwYTI3M2RzNjEyOW03amZjIn0.h7_C2LVS6pfwg6oDU8oo-w'
        }).addTo(this.map);

        //Défintion des marqueurs
        this.greenIcon = L.icon({
            iconUrl: 'vert.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41],
        });
        this.redIcon = L.icon({
            iconUrl: 'rouge.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41],
        });
        this.orangeIcon = L.icon({
            iconUrl: 'orange.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            shadowSize: [41, 41],
        });
        this.initMap();
    }

    // Fonction pour récupérer les données de l'API
    ajaxGet(url, callback) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.addEventListener("load", function() {
            if (req.status >= 200 && req.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requête
                callback(req.responseText);
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", function() {
            console.error("Erreur réseau avec l'URL " + url);
        });
        req.send(null);
    };

    // Récupération des données JSON et création des marqueurs
    initMap() {
        let that = this;
        this.ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=" + this.city + "&apiKey=4d7673b8b6bf63b39ed0903a7d434d1b7f0daacf", function(reponse) {
            let stations = JSON.parse(reponse);
            stations.forEach(function(station) {
                //Création des marqueurs pour chaque station
                if (station.status === "CLOSED" || station.available_bikes === 0) {
                    that.marker = L.marker((station.position), {
                        icon: that.redIcon
                    });
                } else if (station.status === "OPEN" & station.available_bikes < 6) {
                    that.marker = L.marker((station.position), {
                        icon: that.orangeIcon
                    });
                } else {
                    that.marker = L.marker((station.position), {
                        icon: that.greenIcon
                    });
                }
                that.marker.addTo(that.map).bindPopup(station.name);

                that.formInformation(station.address, station.available_bikes, station.bike_stands);
            });

        });
    }

    formInformation(address, bike, place) {
        this.marker.addEventListener('click', () => {
            this.yourAddress.textContent = address;
            sessionStorage.setItem('address', this.yourAddress.textContent);
            this.placeNumber.innerHTML = "Nombre de places total : " + " " + place;
            this.bikeNumber.textContent = "Nombre de vélo(s) disponible(s) : " + " " + bike;
        });
    }
};

let carte1 = new Carte(43.29695, 5.38007, 15, 'mapid', 'Marseille');
