import i18n from "@/i18n";
import { Chip } from "@material-tailwind/react";
import { differenceInMinutes, differenceInWeeks } from "date-fns";
import { format } from "date-fns";
import { differenceInDays, differenceInMonths } from "date-fns";
import { differenceInHours } from "date-fns";
import { t } from "i18next";
const nb_conduite_jour = 10;
const default_heures = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const default_minutes = [0, 15, 30, 45];
const types_transmission = [
    { value: 'Manuelle', label: 'Manuelle' },
    { value: 'Automatique', label: 'Automatique' },
    { value: 'Semi-automatique', label: 'Semi-automatique' },
    { value: 'À variation continue', label: 'À variation continue' },
    { value: 'Autres', label: 'Autres' }
];
const etat_achats = [
    { value: 1, label: 'Non payé' },
    { value: 2, label: 'Payé' },
    { value: 3, label: 'Validé' },
    { value: 4, label: 'Retiré' },
    { value: 5, label: 'Terminé' },
];
const etat_locations = [
    { value: 1, label: 'Non payée' },
    { value: 2, label: 'Payée' },
    { value: 3, label: 'Validée' },
    { value: 4, label: 'Retirée' },
    { value: 5, label: 'Rendue' },
    { value: 6, label: 'Terminée' },
];
const montant_minimum_location = 10000;

const setHeureDebutSearch = () => {
    let heuresAutorisees = default_heures;
    // Récupérer l'heure actuelle
    var dateActuelle = new Date();

    // Ajouter 4 heures à l'heure actuelle
    dateActuelle.setHours(dateActuelle.getHours() + 4);

    // Récupérer l'heure après l'ajout de 4 heures
    var nouvelleHeure = dateActuelle.getHours();

    // Assurer que l'heure est parmi les heures autorisées
    if (heuresAutorisees && heuresAutorisees.length > 0) {
        nouvelleHeure = heuresAutorisees.reduce(function (prev, curr) {
            return Math.abs(curr - nouvelleHeure) < Math.abs(prev - nouvelleHeure) ? curr : prev;
        });
    } else {
        // Si le tableau d'heures autorisées est vide, ajuster entre 7h et 20h
        nouvelleHeure = Math.max(7, Math.min(20, nouvelleHeure));
    }

    // Retourner l'heure au format souhaité (vous pouvez ajuster le format selon vos besoins)
    var heureFormatee = nouvelleHeure;//.toString() ;

    return heureFormatee;
}
const DateToFront = (thedate, langs = 'fr', format = 'd/m/Y h:i:s') => {
    let date = new Date(thedate);
    if (isNaN(date.getTime())) {
        console.error('Invalid date format');
        return null;
    }
    if (!(date instanceof Date) || isNaN(date)) {
        console.error('Invalid Date object');
        return null; // or handle the error as needed
    }
    let lang = (langs === 'fr' || langs === 'en') ? langs : 'fr';
    let d = String(date.getDate()).padStart(2, '0'),
        m = String(date.getMonth() + 1).padStart(2, '0'),
        min = String(date.getMinutes()).padStart(2, '0'),
        heure = String(date.getHours()).padStart(2, '0'),
        year = date.getFullYear();

    if (format === 'd/m/Y') {
        return `${d}/${m}/${year}`;
    }
    if (lang === 'fr' && format === "d/m/Y H:I:S") {
        return `${d}/${m}/${year} ${heure}:${min}`;
    }
    if (lang === 'fr') {
        return `${d}/${m}/${year} à ${heure}H:${min}min `;
    }

    // Utiliser moment.js pour analyser la date au format original
    /*var dateParsee = moment(thedate, "YYYY-MM-DD HH:mm:ss");
    
    // Utiliser moment.js pour formater la date dans le nouveau format
    var dateFormatee = dateParsee.format("DD/MM/YYYY à H:mm [min]");
        return dateFormatee;*/
    return `${d}-${m}-${year}  at ${date.getHours()}H:${date.getMinutes()}min`;
}
function formaterMontant(montant, langue = 'fr-FR') {
    // Vérifier que le montant est un nombre
    if (isNaN(montant)) {
        return "-";
    }

    // Formater le montant en fonction de la langue
    if (langue === "fr" || langue === 'fr-FR') {
        return montant.toLocaleString("fr-FR", { style: "currency", currency: "XOF" });
    } else if (langue === "en") {
        return montant.toLocaleString("en-US", { style: "currency", currency: "XOF" });
    } else {
        return montant;
    }
}
function truncateString(str, maxLength) {
    if (str?.length > maxLength) {
        return str.substring(0, maxLength - 3) + '...';
    } else {
        return str;
    }
}
function formaterHeure(heures, minutes) {
    //const [heures, minutes] = heure.split(':');
    heures = heures.toString();
    minutes = minutes.toString();

    // Ajouter un zéro devant les heures ou les minutes simples si nécessaire
    const heuresFormatees = heures.length == 1 ? '0' + heures : heures;
    const minutesFormatees = minutes.length == 1 ? '0' + minutes : minutes;
    // Retourner l'heure formattée au format "HH:mm"
    return (`${heuresFormatees}:${minutesFormatees}`);
}
function DateToDbFormat(inputDate) {
    // Split the input date into day, month, and year
    if (inputDate === null || !inputDate) { return null }
    inputDate = inputDate.toString();
    const [day, month, year] = inputDate.split('/');

    // Create a Date object using the components
    const parsedDate = new Date(`${year}-${month}-${day}`);

    const formattedYear = String(parsedDate.getFullYear());
    const formattedMonth = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const formattedDay = String(parsedDate.getDate()).padStart(2, '0');
    const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;

    return formattedDate;
}
function CheckIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 "
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function InfoIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
        </svg>
    );
}
function formaterDateHeure(date, heure, minutes) {
    const fheure = formaterHeure(parseInt(heure), parseInt(minutes));
    //alert(fheure)
    const [jour, mois, annee] = date.split('/');
    const dateObj = (`${annee}-${mois}-${jour} ${fheure}`);

    return dateObj;
}
const isInFavoris = (tabs, id, type) => {
    let r = false;
    if (Array.isArray(tabs)) {
        tabs.map(({ location_id, achat_id }, index) => {
            if (type == 'ACHAT' && achat_id === id) {
                r = true;
            }
            if (type == 'LOCATION' && location_id === id) { r = true; }
        })
        return r;
    }
    return r;
}
function getEtatReservation(etat, t = false) {
    let labelle = "-";
    etat_locations?.map(({ value, label }) => {
        if (value === etat) {
            labelle = label;
        }
    })
    if (t) {
        return labelle;
    }
    switch (etat) {
        case 1:
            return <Chip className="text-center font-bold rounded-full w-min" size="sm" value="Non validé" />;
        case 2:
            return <Chip className="text-center font-bold rounded-full w-min" size="sm" color="green" value={labelle} />;
        case 3:
            return <Chip className="text-center font-bold rounded-full w-min" size="sm" color="teal" value={labelle} />;
        case 4:
            return <Chip className="text-center dark:bg-yellow-100 font-bold rounded-full w-min" variant="ghost" size="sm" color="amber" value={labelle} />;
        case 5:
            return <Chip className="text-center dark:bg-red-200 font-bold rounded-full w-min" variant="ghost" size="sm" color="pink" value={labelle} />;
        case 6:
            return <Chip className="text-center  font-bold rounded-full w-min" variant="ghost" size="sm" color="black" value={labelle} />;
        default:
            return <Chip className="text-center dark:bg-gray-100 font-bold rounded-full w-min" variant="ghost" size="sm" color="blue" value="État inconnu" />;
     }
}
function getEtatAchat(etat) {
    let labelle = "-";
    etat_achats?.map(({ value, label }) => {
        if (value === etat) {
            labelle = label;
        }
    })
    switch (etat) {
        case 1:
            return <Chip className="text-center font-bold rounded-full w-min" size="sm" value="Non validé" />;
        case 2:
            return <Chip className="text-center font-bold rounded-full w-min" size="sm" color="green" value={labelle} />;
        case 3:
            return <Chip className="text-center font-bold rounded-full w-min" size="sm" color="teal" value={labelle} />;
        case 4:
            return <Chip className="text-center dark:bg-yellow-100 font-bold rounded-full w-min" variant="ghost" size="sm" color="amber" value={labelle} />;
        case 5:
            return <Chip className="text-center dark:bg-red-200 font-bold rounded-full w-min" variant="ghost" size="sm" color="pink" value={labelle} />;
        case 6:
            return <Chip className="text-center  font-bold rounded-full w-min" variant="ghost" size="sm" color="black" value={labelle} />;
        default:
            return <Chip className="text-center dark:bg-gray-100 font-bold rounded-full w-min" variant="ghost" size="sm" color="blue" value="État inconnu" />;
    }
}
const setTarif = (theure, tjour, thebdo, tmois) => {
    if (theure > 0) {
        return formaterMontant(theure, i18n.language) + ' / ' + t('Heure');
    }
    if (tjour > 0) {
        return formaterMontant(tjour, i18n.language) + ' / ' + t('Jour');
    }
    if (thebdo > 0) {
        return formaterMontant(thebdo, i18n.language) + ' / ' + t('Semaine');
    }
    if (tmois > 0) {
        return formaterMontant(tmois, i18n.language) + ' / ' + t('Mois');
    }
    return theure;
}
// __define-ocg__
function heuresEntreDeuxDates(date1, date2) {
    var dateDebut = new Date(date1);
    var dateFin = new Date((date2));

    var differenceEnMillisecondes = dateFin - dateDebut;
    //alert(date2)
    if (differenceEnMillisecondes > 0) {
        var differenceEnHeures = differenceEnMillisecondes / (1000 * 60 * 60);

        return (differenceEnHeures);
    } else {
        return 0;
    }
}
function getYearFromStringDate(dateStr) {
    var dateObj = new Date(dateStr);

    var annee = dateObj.getFullYear();
    return annee;
}
function joursEntreDeuxDates(date1, date2) {
    var dateDebut = new Date(date1);
    var dateFin = new Date(date2);
    var differenceEnMillisecondes = dateFin - dateDebut;

    var differenceEnJours = differenceEnMillisecondes / (1000 * 60 * 60 * 24);
    return (differenceEnJours);
}
const setCmdAchatIds = (achats) => {
    let t = setCmdAchatIdInArray(achats);
    return t.join('-');
}

const setCmdAchatIdInArray = (achats) => {
    let t = []
    if (achats && achats.length > 0) {
        achats.map((achat) => {
            t.push(achat.id);
        });
    }
    return t;
}

function semainesEntreDeuxDates(date1, date2) {
    var dateDebut = new Date(date1);
    var dateFin = new Date(date2);

    var differenceEnMillisecondes = dateFin - dateDebut;
    var differenceEnSemaines = differenceEnMillisecondes / (1000 * 60 * 60 * 24 * 7);
    return (differenceEnSemaines);
}

function moisEntreDeuxDates(date1, date2) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const differenceEnJours = differenceInDays(endDate, startDate);
    const differenceEnMois = parseFloat(differenceEnJours / 30); // Environ 30 jours par mois
    return differenceEnMois;
}

const setMontantHeure = (theure, tjour, thebdo, tmois) => {

    const th = isNaN(parseInt(theure)) ? 0 : parseInt(theure);
    tjour = isNaN(parseInt(tjour)) ? 0 : parseInt(tjour);
    thebdo = isNaN(parseInt(thebdo)) ? 0 : parseInt(thebdo);
    tmois = isNaN(parseInt(tmois)) ? 0 : parseInt(tmois);
    let tarifjour = 0;
    let nbc = nb_conduite_jour > 0 ? nb_conduite_jour : 24;
    if (th > 0) { tarifjour = th }
    else if (th == 0 && (tjour) > 0) {
        tarifjour = (tjour / nbc);
    }
    else if (th === 0 && (tjour) === 0 && (thebdo) > 0) {
        tarifjour = (thebdo / (nbc * 7));
    }
    else if (th === 0 && (tjour) === 0 && (thebdo) === 0 && (tmois) > 0) {
        tarifjour = (tmois / (nbc * 7 * 30));
    }
    //console.log("DATTTT", theure, tjour, thebdo, tmois)
    return tarifjour;
}
const setMontantJour = (theure, tjour, thebdo, tmois) => {

    const th = isNaN(parseInt(theure)) ? 0 : parseInt(theure);
    tjour = isNaN(parseInt(tjour)) ? 0 : parseInt(tjour);
    thebdo = isNaN(parseInt(thebdo)) ? 0 : parseInt(thebdo);
    tmois = isNaN(parseInt(tmois)) ? 0 : parseInt(tmois);
    let tarif = 0;
    //alert(tjour+' '+thebdo+" "+tmois);
    if (tjour > 0) { tarif = tjour }
    else if (tjour === 0 && (thebdo) > 0) {
        tarif = (thebdo / 7);
    }
    else if (tjour === 0 && (thebdo) === 0 && (tmois) > 0) {
        tarif = (tmois / (30));
    } else if (tjour === 0 && (thebdo) === 0 && (tmois) === 0 & th > 0) {
        return th * nb_conduite_jour;
    }
    //console.log("DATTTT", theure, tjour, thebdo, tmois)
    return tarif;
}
const setMontantSemaine = (theure, tjour, thebdo, tmois) => {

    const th = isNaN(parseInt(theure)) ? 0 : parseInt(theure);
    tjour = isNaN(parseInt(tjour)) ? 0 : parseInt(tjour);
    thebdo = isNaN(parseInt(thebdo)) ? 0 : parseInt(thebdo);
    tmois = isNaN(parseInt(tmois)) ? 0 : parseInt(tmois);
    let tarif = 0;
    //alert(tjour+' '+thebdo+" "+tmois);
    if (thebdo > 0) { tarif = thebdo }
    else if (thebdo === 0 && (tmois) > 0) {
        tarif = (tmois / 4);
    }
    else if (thebdo === 0 && (tmois) === 0 && (tjour) > 0) {
        tarif = (tjour * 7);
    } else if (thebdo === 0 && (tmois) === 0 && (tjour) === 0 & th > 0) {
        return th * nb_conduite_jour * 7;
    }
    //console.log("DATTTT", theure, tjour, thebdo, tmois)
    return tarif;
}
const setMontantMois = (theure, tjour, thebdo, tmois) => {

    const th = isNaN(parseInt(theure)) ? 0 : parseInt(theure);
    tjour = isNaN(parseInt(tjour)) ? 0 : parseInt(tjour);
    thebdo = isNaN(parseInt(thebdo)) ? 0 : parseInt(thebdo);
    tmois = isNaN(parseInt(tmois)) ? 0 : parseInt(tmois);
    let tarif = 0;
    //alert(tjour+' '+thebdo+" "+tmois);
    if (tmois > 0) { tarif = tmois }
    else if (tmois === 0 && (thebdo) > 0) {
        tarif = (thebdo * 4);
    }
    else if (tmois === 0 && thebdo === 0 && (tjour) > 0) {
        tarif = (tjour * 7 * 4);//1mois=4*7*1jour
    } else if (tmois === 0 && (thebdo) === 0 && (tjour) === 0 & th > 0) {
        return th * nb_conduite_jour * 7 * 4;
    }
    //console.log("DATTTT", theure, tjour, thebdo, tmois)
    return tarif;
}
const calculerMontantLocation = (date1, date2, theure, tjour, thebdo, tmois) => {
    let tarifheure = setMontantHeure(theure, tjour, thebdo, tmois);
    let tarifjour = setMontantJour(theure, tjour, thebdo, tmois);
    let tarifsemaine = setMontantSemaine(theure, tjour, thebdo, tmois);
    let tarifmois = setMontantMois(theure, tjour, thebdo, tmois);
    // alert(tarifjour)
    let nb_heures = heuresEntreDeuxDates(date1, date2);  // Utilisation de la fonction correcte
    //alert(date1+"__________"+date2)
    // Tarif par heure
    if ((date1 == '' || date1 == null) || (date2 == '' || date2 == null)) { return 0; }
    if (nb_heures < 24) {
        return arrondirAuSuperieurMultipleDeCinq(tarifheure * nb_heures);
    }

    // Tarif par jour => nb_heures < 24heures * 7 jours
    else if (nb_heures >= 24 && nb_heures < 24 * 7) {
        let nb_jours = joursEntreDeuxDates(date1, date2);  // Utilisation de la fonction correcte
        //alert(nb_jours)
        return arrondirAuSuperieurMultipleDeCinq(tarifjour * nb_jours);
    }

    // Tarif par semaine => nb_heures < 24heures * 7 jours * 4 semaines
    else if (nb_heures >= 24 * 7 && nb_heures < 24 * 7 * 4) {
        let nb_semaines = semainesEntreDeuxDates(date1, date2);  // Utilisation de la fonction correcte
        return arrondirAuSuperieurMultipleDeCinq(tarifsemaine * nb_semaines);
    }

    // Tarif par mois
    else if (nb_heures >= 24 * 7 * 4 && nb_heures <= 24 * 7 * 4 * 6) {
        let nb_mois = moisEntreDeuxDates(date1, date2);  // Utilisation de la fonction correcte
        return arrondirAuSuperieurMultipleDeCinq(tarifmois * nb_mois);
    }

    return null;
}
function arrondirAuSuperieurMultipleDeCinq(montant) {
    return Math.ceil(montant / 5) * 5;
}
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    return document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(name) {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Vérifie si le nom du cookie correspond
        if (cookie.indexOf(name + "=") === 0) {
            // Récupère et retourne la valeur du cookie
            return cookie.substring(name.length + 1, cookie.length);
        }
    }

    // Retourne null si le cookie n'est pas trouvé
    return null;
}

function differenceEntreDeuxDates(date1, date2) {

    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const mois = differenceInMonths(endDate, startDate);
    const semaines = differenceInWeeks(endDate, startDate);
    const jours = differenceInDays(endDate, startDate) % 7;
    const heures = differenceInHours(endDate, startDate) % 24;
    const minutes = differenceInMinutes(endDate, startDate) % 60;

    const tempsEc = [];

    if (mois > 0) {
        tempsEc.push(`${mois} ${mois === 1 ? 'mois' : 'mois'}`);
    }

    if (semaines > 0) {
        tempsEc.push(`${semaines} ${semaines === 1 ? 'semaine' : 'semaines'}`);
    }

    if (jours > 0) {
        tempsEc.push(`${jours} ${jours === 1 ? 'jour' : 'jours'}`);
    }

    if (heures > 0) {
        tempsEc.push(`${heures} ${heures === 1 ? 'heure' : 'heures'}`);
    }
    if (minutes > 0) {
        tempsEc.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
    }

    return tempsEc.join(', ');
}


function Unite(nombre) {
    var unite;
    switch (nombre) {
        case 0: unite = "zéro"; break;
        case 1: unite = "un"; break;
        case 2: unite = "deux"; break;
        case 3: unite = "trois"; break;
        case 4: unite = "quatre"; break;
        case 5: unite = "cinq"; break;
        case 6: unite = "six"; break;
        case 7: unite = "sept"; break;
        case 8: unite = "huit"; break;
        case 9: unite = "neuf"; break;
    }//fin switch
    return unite;
}//-----------------------------------------------------------------------

function Dizaine(nombre) {
    var dizaine;
    switch (nombre) {
        case 10: dizaine = "dix"; break;
        case 11: dizaine = "onze"; break;
        case 12: dizaine = "douze"; break;
        case 13: dizaine = "treize"; break;
        case 14: dizaine = "quatorze"; break;
        case 15: dizaine = "quinze"; break;
        case 16: dizaine = "seize"; break;
        case 17: dizaine = "dix-sept"; break;
        case 18: dizaine = "dix-huit"; break;
        case 19: dizaine = "dix-neuf"; break;
        case 20: dizaine = "vingt"; break;
        case 30: dizaine = "trente"; break;
        case 40: dizaine = "quarante"; break;
        case 50: dizaine = "cinquante"; break;
        case 60: dizaine = "soixante"; break;
        case 70: dizaine = "soixante-dix"; break;
        case 80: dizaine = "quatre-vingt"; break;
        case 90: dizaine = "quatre-vingt-dix"; break;
    }//fin switch
    return dizaine;
}//-----------------------------------------------------------------------

function NumberToLetter(nombre) {
    var i, j, n, quotient, reste, nb;
    var ch
    var numberToLetter = '';
    //__________________________________

    if (nombre.toString().replace(/ /gi, "").length > 15) return "dépassement de capacité";
    if (isNaN(nombre.toString().replace(/ /gi, ""))) return "Nombre non valide";

    nb = parseFloat(nombre.toString().replace(/ /gi, ""));
    if (Math.ceil(nb) != nb) return "Nombre avec virgule non géré.";

    n = nb.toString().length;
    switch (n) {
        case 1: numberToLetter = Unite(nb); break;
        case 2: if (nb > 19) {
            quotient = Math.floor(nb / 10);
            reste = nb % 10;
            if (nb < 71 || (nb > 79 && nb < 91)) {
                if (reste == 0) numberToLetter = Dizaine(quotient * 10);
                if (reste == 1) numberToLetter = Dizaine(quotient * 10) + "-et-" + Unite(reste);
                if (reste > 1) numberToLetter = Dizaine(quotient * 10) + "-" + Unite(reste);
            } else numberToLetter = Dizaine((quotient - 1) * 10) + "-" + Dizaine(10 + reste);
        } else numberToLetter = Dizaine(nb);
            break;
        case 3: quotient = Math.floor(nb / 100);
            reste = nb % 100;
            if (quotient == 1 && reste == 0) numberToLetter = "cent";
            if (quotient == 1 && reste != 0) numberToLetter = "cent" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = Unite(quotient) + " cents";
            if (quotient > 1 && reste != 0) numberToLetter = Unite(quotient) + " cent " + NumberToLetter(reste);
            break;
        case 4: quotient = Math.floor(nb / 1000);
            reste = nb - quotient * 1000;
            if (quotient == 1 && reste == 0) numberToLetter = "mille";
            if (quotient == 1 && reste != 0) numberToLetter = "mille" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " mille";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " mille " + NumberToLetter(reste);
            break;
        case 5: quotient = Math.floor(nb / 1000);
            reste = nb - quotient * 1000;
            if (quotient == 1 && reste == 0) numberToLetter = "mille";
            if (quotient == 1 && reste != 0) numberToLetter = "mille" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " mille";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " mille " + NumberToLetter(reste);
            break;
        case 6: quotient = Math.floor(nb / 1000);
            reste = nb - quotient * 1000;
            if (quotient == 1 && reste == 0) numberToLetter = "mille";
            if (quotient == 1 && reste != 0) numberToLetter = "mille" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " mille";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " mille " + NumberToLetter(reste);
            break;
        case 7: quotient = Math.floor(nb / 1000000);
            reste = nb % 1000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un million";
            if (quotient == 1 && reste != 0) numberToLetter = "un million" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " millions";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
            break;
        case 8: quotient = Math.floor(nb / 1000000);
            reste = nb % 1000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un million";
            if (quotient == 1 && reste != 0) numberToLetter = "un million" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " millions";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
            break;
        case 9: quotient = Math.floor(nb / 1000000);
            reste = nb % 1000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un million";
            if (quotient == 1 && reste != 0) numberToLetter = "un million" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " millions";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
            break;
        case 10: quotient = Math.floor(nb / 1000000000);
            reste = nb - quotient * 1000000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un milliard";
            if (quotient == 1 && reste != 0) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " milliards";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
            break;
        case 11: quotient = Math.floor(nb / 1000000000);
            reste = nb - quotient * 1000000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un milliard";
            if (quotient == 1 && reste != 0) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " milliards";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
            break;
        case 12: quotient = Math.floor(nb / 1000000000);
            reste = nb - quotient * 1000000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un milliard";
            if (quotient == 1 && reste != 0) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " milliards";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
            break;
        case 13: quotient = Math.floor(nb / 1000000000000);
            reste = nb - quotient * 1000000000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un billion";
            if (quotient == 1 && reste != 0) numberToLetter = "un billion" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " billions";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
            break;
        case 14: quotient = Math.floor(nb / 1000000000000);
            reste = nb - quotient * 1000000000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un billion";
            if (quotient == 1 && reste != 0) numberToLetter = "un billion" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " billions";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
            break;
        case 15: quotient = Math.floor(nb / 1000000000000);
            reste = nb - quotient * 1000000000000;
            if (quotient == 1 && reste == 0) numberToLetter = "un billion";
            if (quotient == 1 && reste != 0) numberToLetter = "un billion" + " " + NumberToLetter(reste);
            if (quotient > 1 && reste == 0) numberToLetter = NumberToLetter(quotient) + " billions";
            if (quotient > 1 && reste != 0) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
            break;
    }//fin switch
    /*respect de l'accord de quatre-vingt*/
    if (numberToLetter.substr(numberToLetter.length - "quatre-vingt".length, "quatre-vingt".length) == "quatre-vingt") numberToLetter = numberToLetter + "s";

    return (numberToLetter);
}
function coveMonnaie(n) {
    if (n > 1) {
        return " francs CFA";
    } else {
        return " franc CFA";

    }
}
function convertDateToDiff(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // Difference in seconds

    if (diff < 60) {
        return "Il y a quelques secondes";
    } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return `Il y a ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `Il y a ${hours} heure${hours !== 1 ? 's' : ''}`;
    } else if (diff < 604800) {
        const days = Math.floor(diff / 86400);
        return `Il y a ${days} jour${days !== 1 ? 's' : ''}`;
    } else {
        const formattedDate = `${date.getDate()} ${getMonthShortName(date.getMonth())}. ${date.getFullYear()} à ${padWithZero(date.getHours())}H:${padWithZero(date.getMinutes())}min ${padWithZero(date.getSeconds())} sec.`;
        return formattedDate;
    }
}

function getMonthShortName(monthIndex) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthIndex] ?? '';
}

function padWithZero(number) {
    return number < 10 ? '0' + number : number;
}
//-----------------------------------------------------------------------
function convertirMontantEnLettres(montant) {
    var unites = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
    var dizaines = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];
    var nombresSpeciaux = {
        11: 'onze', 12: 'douze', 13: 'treize', 14: 'quatorze', 15: 'quinze', 16: 'seize',
        70: 'soixante-dix', 80: 'quatre-vingts', 90: 'quatre-vingt-dix'
    };

    function convertirNombreEnLettres(n) {
        if (n < 10) {
            return unites[n];
        } else if (n < 20 || (n < 100 && n % 10 === 0)) {
            return nombresSpeciaux[n] || (dizaines[Math.floor(n / 10)] + (n % 10 === 0 ? '' : '-' + unites[n % 10]));
        } else {
            return dizaines[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + unites[n % 10] : '');
        }
    }

    function convertirMontant(montant) {
        if (montant < 100 || montant > 300000000) {
            return 'Montant non pris en charge';
        }

        var montantEnLettres = '';

        var millions = Math.floor(montant / 1000000);
        var milliers = Math.floor((montant % 1000000) / 1000);
        var unite = montant % 1000;

        if (millions > 0) {
            montantEnLettres += convertirNombreEnLettres(millions) + ' million' + (millions > 1 ? 's' : '') + ' ';
        }

        if (milliers > 0) {
            if (milliers >= 100) {
                montantEnLettres += convertirNombreEnLettres(Math.floor(milliers / 100)) + ' cent ';
                milliers %= 100;
            }
            montantEnLettres += convertirNombreEnLettres(milliers) + ' mille ';
        }

        if (unite > 0) {
            montantEnLettres += convertirNombreEnLettres(unite);
        }
        return montantEnLettres.trim();
    }
    var partieEntiere = Math.floor(montant);
    var partieDecimale = Math.round((montant - partieEntiere) * 100);
    var montantEnLettres = convertirMontant(partieEntiere);

    if (partieDecimale > 0) {
        montantEnLettres += ' virgule ' + convertirMontant(partieDecimale);
    }
    return montantEnLettres;
}
function formaterMontantCFA(montant = 0) {
    // Ajouter le séparateur de milliers
    var montantFormate = montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    // Ajouter la devise "FCFA"
    montantFormate += ' FCFA';
    return montantFormate;
}

export {
    InfoIcon, DateToFront, formaterMontant, truncateString, setTarif, DateToDbFormat, formaterHeure, isInFavoris, calculerMontantLocation,
    joursEntreDeuxDates, semainesEntreDeuxDates, moisEntreDeuxDates, formaterDateHeure, differenceEntreDeuxDates, setCookie, getCookie,
    getYearFromStringDate, CheckIcon, setHeureDebutSearch, convertirMontantEnLettres, getEtatReservation, formaterMontantCFA, NumberToLetter, coveMonnaie
    , setCmdAchatIds, setCmdAchatIdInArray, getEtatAchat, convertDateToDiff,
    default_heures, default_minutes, montant_minimum_location, nb_conduite_jour, types_transmission,
    etat_locations, etat_achats,
};