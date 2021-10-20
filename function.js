// Daten hohlen und in einer Variablen abspeichern
let carts = document.querySelectorAll('.add-warenkorb');
let carts2 = document.querySelectorAll('.add-warenkorb2');

let produkte = [
    {
        name: 'Highway Damen',
        tag: 'highwaydamen',
        preis: 120,
        imWarenkorb:0
    },

    {
        name: 'Highway Herren',
        tag: 'highwayherren',
        preis: 349,
        imWarenkorb:0
    },
    {
        name: 'CafeRacer Damen',
        tag: 'caferacerdamen',
        preis: 279,
        imWarenkorb:0
    },
    {
        name: 'Funktionsshirt',
        tag: 'funktionsshirt',
        preis: 20,
        imWarenkorb:0
    },
    {
        name: 'Natural Lederjacke',
        tag: 'naturallederjacke',
        preis: 445,
        imWarenkorb:0
    },
    {
        name: 'Vanucci Lederkombi',
        tag: 'vanuccilederkombi',
        preis: 399,
        imWarenkorb:0
    },
    {
        name: 'Vanucci Damenkombi',
        tag: 'vanuccidamenkombi',
        preis: 420,
        imWarenkorb:0
    },
    
    
];

let produkte2 = [
    {
        name: 'scorpionhelm',
        tag: 'scorpionhelm',
        preis: 350,
        imWarenkorb:0
    },
    {
        name: 'sharkhelm',
        tag: 'sharkhelm',
        preis: 344,
        imWarenkorb:0
    },
    {
        name: 'helm',
        tag: 'helm',
        preis: 387,
        imWarenkorb:0
    },
    {
        name: 'hjchelm',
        tag: 'hjchelm',
        preis: 470,
        imWarenkorb:0
    },
    {
        name: 'smile',
        tag: 'smile',
        preis: 22,
        imWarenkorb:0
    },
    {
        name: 'scorpionairgalaxy',
        tag: 'scorpionairgalaxy',
        preis: 199,
        imWarenkorb:0
    },
    {
        name: 'highwayVintage',
        tag: 'highwayVintage',
        preis: 70,
        imWarenkorb:0
    },
];


//alle elemente durchgehen
for(let i = 0; i < carts.length; i++) {
    // angeklicketes element holen
    carts[i].addEventListener('click', () => {
        //
        warenkorbanzahl(produkte[i]);
        endPreis(produkte[i]);      
    })
}

for(let i = 0; i < carts2.length; i++) {
    // angeklicketes element holen
    carts2[i].addEventListener('click', () => {
        //
        warenkorbanzahl(produkte2[i]);
        endPreis(produkte2[i]); 
    })
}

// elemente im Warenkorb im Localstorage speichern

function produkteAusgeben(produkt) {
    let warenkorbItems = localStorage.getItem('produkteImKorb');
    //auslesen
    warenkorbItems = JSON.parse(warenkorbItems);

    let items = warenkorbItems;

    if(warenkorbItems != null){
        if(warenkorbItems[produkt.tag] == undefined) {
            warenkorbItems = {
                //...spread operator, bei mehrmaligen verwendungen
                ...items,
                [produkt.tag]: produkt}
        }
        warenkorbItems[produkt.tag].imWarenkorb += 1;
    } else {
        produkt.imWarenkorb = 1;
        warenkorbItems = {
            [produkt.tag]:produkt
        }
    }

    //speichern
    localStorage.setItem('produkteImKorb', JSON.stringify(warenkorbItems));
}


// Anzahl oben im Korb speichern/ausgeben?
    // Zählen wie viele elemente ausgewählt wurden

function warenkorbAnzahlLaden() {
    let produktnummer = localStorage.getItem('warenkorbanzahl');

    if(produktnummer) {
        document.querySelector('.cart span').textContent = produktnummer;
    }
}

function warenkorbanzahl(produkt) {
    let produktnummer = localStorage.getItem('warenkorbanzahl');
    //String in eine Zahl umwandeln
    produktnummer = parseInt(produktnummer);

    if(produktnummer) {
        localStorage.setItem('warenkorbanzahl', produktnummer + 1);
        document.querySelector('.cart span').textContent = produktnummer + 1;
    } else {
        localStorage.setItem('warenkorbanzahl', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    produkteAusgeben(produkt);
}


// Warenkorb ausgeben
function warenkorbAnzeigen() {
// Produkte aus dem localStorage hohlen
let warenkorbItems = localStorage.getItem('produkteImKorb');
warenkorbItems = JSON.parse(warenkorbItems)

//Container hohlen wo die Produkte rein sollen
let produktContainer = document.querySelector('.produkte');
let zuZahlen = localStorage.getItem('endPreis');

if(warenkorbItems && produktContainer)
{
    // let karte = new Map(warenkorbItems);
    produktContainer.innerHTML = '';
    Object.values(warenkorbItems).map(item => {
        produktContainer.innerHTML += `
        <div class="produkt">
        <i class="delete bi bi-trash">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
         </svg>
         </i>
        <img src="./img/${item.tag}.jpg"/>
        <span>${item.name}</span>
        </div>
        <div class="preis">  ${item.preis},00€ </div>
        <div class="menge"> 
        <i class="wenigerProdukte bi bi-dash-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
            </svg>
        </i>
        <span> ${item.imWarenkorb} </span>
        <i class="mehrProdukte bi bi-plus-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </i>
        </div>
        <div class="gesamt">
         ${item.imWarenkorb * item.preis},00€
        </div>
        `
      
    });

      produktContainer.innerHTML += `
        <div class="endPreisContainer">
        <h5 class="endPreisHeader">
        Gesamtsumme:
        </h5>
        <h5 class="EndPreis">
        € ${zuZahlen},00
        </h5>
        </div>
        <div class="nutzer">
        <input type="checkbox" id="nutzer" name="nutzer" class="nutzerText">
        <label for="nutzer">
        Ich akzeptiere die Allgemeine Geschäftsbedingungen und bestätige, dass ich mein Widerrufsrecht zur Kenntnis genommen habe.</label>
        </div>
        <button class="kasse">weiter zur Kasse</button>
        `
    }

    deleteProdukt();
    anzahlProdukteAnpassen();
}



// Kosten Produkte
function endPreis(produkt) {
    let warenkorbPreis = localStorage.getItem('endPreis');
     
    if(warenkorbPreis != null)
    {
        warenkorbPreis = parseInt(warenkorbPreis);
        localStorage.setItem('endPreis', warenkorbPreis + produkt.preis)
    } else {
        warenkorbPreis = parseInt(warenkorbPreis);
        localStorage.setItem('endPreis', produkt.preis);
    }
}


function deleteProdukt(){
    let deleteButton = document.querySelectorAll('.delete');
    let produktName;
    let warenkorbItems = localStorage.getItem('produkteImKorb');
        warenkorbItems = JSON.parse(warenkorbItems);
    let warenkorbanzahl =localStorage.getItem('warenkorbanzahl');
    let endPreis = localStorage.getItem('endPreis');

    for(let i = 0; i<deleteButton.length; i++){
        deleteButton[i].addEventListener('click', () => {
            produktName = deleteButton[i].parentElement.textContent.trim().toLowerCase().split(" ").join("");

            // gewälte Produkte reduzieren
            localStorage.setItem('warenkorbanzahl', warenkorbanzahl - warenkorbItems[produktName].imWarenkorb);
            //end-Ergebnis abziehen
            localStorage.setItem('endPreis', endPreis - (warenkorbItems[produktName].preis * warenkorbItems[produktName].imWarenkorb))
            delete warenkorbItems[produktName];

            localStorage.setItem('produkteImKorb', JSON.stringify(warenkorbItems));

            warenkorbAnzahlLaden();
            warenkorbAnzeigen();
        });
    }
}

function anzahlProdukteAnpassen(produkt){
    let warenkorbItems = localStorage.getItem('produkteImKorb');
        warenkorbItems = JSON.parse(warenkorbItems);
    let warenkorbanzahl = localStorage.getItem('warenkorbanzahl');

    let produktName;
    let wenigerButton = document.querySelectorAll('.wenigerProdukte');
    let mehrButton = document.querySelectorAll('.mehrProdukte');
    let endPreis = localStorage.getItem('endPreis');
    endPreis = parseInt(endPreis);

    for(let i = 0; i < wenigerButton.length; i++ ){
        wenigerButton[i].addEventListener('click', () => {
            produktName = wenigerButton[i].parentElement.previousElementSibling.previousElementSibling.textContent.trim().toLowerCase().split(" ").join("");

            if(warenkorbItems[produktName].imWarenkorb > 1){

                console.log(warenkorbItems);
                //Warenkorbnummer ändern
                localStorage.setItem('produkteImKorb', warenkorbanzahl + warenkorbItems[produktName].imWarenkorb + 1);

                //anzahl veringern
                localStorage.setItem('warenkorbanzahl', Number(warenkorbanzahl)-1);
                warenkorbItems[produktName].imWarenkorb -= 1;

            localStorage.setItem('endPreis', endPreis - warenkorbItems[produktName].preis);

            localStorage.setItem('produkteImKorb', JSON.stringify(warenkorbItems));

            
            warenkorbAnzeigen();
            warenkorbAnzahlLaden();
            }
        });
    }

    for(let i = 0; i < mehrButton.length; i++ ){
        mehrButton[i].addEventListener('click', () => {
            produktName = wenigerButton[i].parentElement.previousElementSibling.previousElementSibling.textContent.trim().toLowerCase().split(" ").join("");

            //Warenkorbnummer ändern
            localStorage.setItem('produkteImKorb', warenkorbanzahl + warenkorbItems[produktName].imWarenkorb - 1);
            
            //anzahl erhöhen
            localStorage.setItem('warenkorbanzahl', Number(warenkorbanzahl) +1);
            warenkorbItems[produktName].imWarenkorb += 1;

            localStorage.setItem('endPreis', endPreis + warenkorbItems[produktName].preis);
            localStorage.setItem('produkteImKorb', JSON.stringify(warenkorbItems));

            
            warenkorbAnzeigen();
            warenkorbAnzahlLaden();
        });
    }
}


warenkorbAnzahlLaden();
warenkorbAnzeigen();