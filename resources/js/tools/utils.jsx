import i18n from "@/i18n";
import { differenceInMinutes, differenceInWeeks } from "date-fns";
import { format } from "date-fns";
import { differenceInDays, differenceInMonths } from "date-fns";
import { differenceInHours } from "date-fns";
import { t } from "i18next";
const nb_conduite_jour=10;
const default_heures= [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
const default_minutes= [0,15,30,45];
const montant_minimum_location=10000;

const DateToFront = (thedate, langs='fr',format='d/m/Y h:i:s') =>{
    let date = new Date(thedate);
    if (isNaN(date.getTime())) {
        console.error('Invalid date format');
        return null; 
      }
      if (!(date instanceof Date) || isNaN(date)) {
        console.error('Invalid Date object');
        return null; // or handle the error as needed
      }
    let lang=(langs==='fr'|| langs==='en')?langs:'fr';
    let d=String(date.getDate()).padStart(2, '0'),
    m=String(date.getMonth() + 1).padStart(2, '0'),
    year=date.getFullYear();
   
    if(format==='d/m/Y'){
        return   `${d}/${m}/${year}`;
    }
    if(lang==='fr'){
        return   `${d}/${m}/${year} à ${date.getHours()}H:${date.getMinutes()}min `;
    }
    return `${d}-${m}-${year}  at ${date.getHours()}H:${date.getMinutes()}min`;
}
function formaterMontant(montant, langue='fr-FR') {
    // Vérifier que le montant est un nombre
    if (isNaN(montant)) {
        return "-";
    }

    // Formater le montant en fonction de la langue
    if (langue === "fr" || langue==='fr-FR') {
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
function formaterHeure(heures,minutes) {
    //const [heures, minutes] = heure.split(':');
    heures=heures.toString();
    minutes=minutes.toString();

    // Ajouter un zéro devant les heures ou les minutes simples si nécessaire
    const heuresFormatees = heures.length == 1 ? '0' + heures : heures;
    const minutesFormatees = minutes.length == 1 ? '0' + minutes : minutes;
    console.log(`VOILLLLLA [${heures}] = ${heures.length}===> ${heuresFormatees}:${minutesFormatees}`)
    // Retourner l'heure formattée au format "HH:mm"
    return (`${heuresFormatees}:${minutesFormatees}`);
}
function DateToDbFormat(inputDate) {
    // Split the input date into day, month, and year
    if (inputDate === null || !inputDate) {return null}
    inputDate=inputDate.toString();
    const [day, month, year] = inputDate.split('/');
  
    // Create a Date object using the components
    const parsedDate = new Date(`${year}-${month}-${day}`);
    
    const formattedYear = String(parsedDate.getFullYear());
    const formattedMonth = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const formattedDay = String(parsedDate.getDate()).padStart(2, '0');
    const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;
  
    return formattedDate;
  }
  function formaterDateHeure(date, heure, minutes) {
        const fheure=formaterHeure(parseInt(heure),parseInt(minutes));
        //alert(fheure)
        const [jour, mois, annee] = date.split('/');
        const dateObj = (`${annee}-${mois}-${jour} ${fheure}`);
        
        return dateObj;
    }
  const isInFavoris=(tabs,id,type)=>{
    let r=false;
    if(Array.isArray(tabs)){
        tabs.map(({location_id,achat_id},index)=>{
            if(type=='ACHAT' && achat_id===id){
                r= true;
            }
            if(type=='LOCATION' && location_id===id){r= true;}
        })
        return r;
    }
    return r;
  }
const setTarif=(theure,tjour,thebdo,tmois)=>{
    if(theure>0){
        return formaterMontant(theure,i18n.language)+' / '+t('Heure');
    }
    if(tjour>0){
        return formaterMontant(tjour,i18n.language)+' / '+t('Jour');
    }
    if(thebdo>0){
        return formaterMontant(thebdo,i18n.language)+' / '+t('Semaine');
    }    
    if(tmois>0){
        return formaterMontant(tmois,i18n.language)+' / '+t('Mois');
    }
    return theure;
}
// __define-ocg__
function heuresEntreDeuxDates(date1, date2) {
    var dateDebut = new Date(date1);
    var dateFin = new Date((date2));
    
    var differenceEnMillisecondes = dateFin - dateDebut;
    //alert(date2)
    if(differenceEnMillisecondes>0){
        var differenceEnHeures = differenceEnMillisecondes / (1000 * 60 * 60);
        
        return (differenceEnHeures);
    }else{
        return 0;
    }
}
function joursEntreDeuxDates(date1, date2) {
    var dateDebut = new Date(date1);
    var dateFin = new Date(date2);
    var differenceEnMillisecondes = dateFin - dateDebut;

    var differenceEnJours = differenceEnMillisecondes / (1000 * 60 * 60 * 24);
    return (differenceEnJours);
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
const setMontantHeure=(theure,tjour, thebdo, tmois)=>{
    
    const th= isNaN(parseInt(theure)) ? 0 : parseInt(theure); 
    tjour = isNaN(parseInt(tjour)) ? 0 : parseInt(tjour);
    thebdo = isNaN(parseInt(thebdo)) ? 0 : parseInt(thebdo);
    tmois = isNaN(parseInt(tmois)) ? 0 : parseInt(tmois);
    let tarifjour=0;
    let nbc= nb_conduite_jour>0?nb_conduite_jour:24;
    if(th>0){tarifjour=th }
    else if(th==0 && (tjour)>0){
        tarifjour=(tjour/nbc);
    }
    else if(th===0 && (tjour)===0 && (thebdo)>0){
        tarifjour=(thebdo/(nbc*7));
    }
    else if(th===0 && (tjour)===0 && (thebdo)===0 && (tmois)>0){
        tarifjour=(tmois/(nbc*7*30));
    }
    //console.log("DATTTT", theure, tjour, thebdo, tmois)
    return tarifjour;
}
const setMontantJour=(theure, tjour, thebdo, tmois)=>{
    
    const th= isNaN(parseInt(theure)) ? 0 : parseInt(theure); 
    tjour = isNaN(parseInt(tjour)) ? 0 : parseInt(tjour);
    thebdo = isNaN(parseInt(thebdo)) ? 0 : parseInt(thebdo);
    tmois = isNaN(parseInt(tmois)) ? 0 : parseInt(tmois);
    let tarif=0;
    //alert(tjour+' '+thebdo+" "+tmois);
    if(tjour>0){tarif=tjour }
    else if(tjour===0 && (thebdo)>0){
        tarif=(thebdo/7);
    }
    else if(tjour===0 && (thebdo)===0 && (tmois)>0){
        tarif=(tmois/(30));
    }else if(tjour===0 && (thebdo)===0 && (tmois)===0 & th>0){
        return th*nb_conduite_jour;
    }
    //console.log("DATTTT", theure, tjour, thebdo, tmois)
    return tarif;
}
const setMontantSemaine=(theure, tjour, thebdo, tmois)=>{
    
    const th= isNaN(parseInt(theure)) ? 0 : parseInt(theure); 
    tjour = isNaN(parseInt(tjour)) ? 0 : parseInt(tjour);
    thebdo = isNaN(parseInt(thebdo)) ? 0 : parseInt(thebdo);
    tmois = isNaN(parseInt(tmois)) ? 0 : parseInt(tmois);
    let tarif=0;
    //alert(tjour+' '+thebdo+" "+tmois);
    if(thebdo>0){tarif=thebdo }
    else if(thebdo===0 && (tmois)>0){
        tarif=(tmois/4);
    }
    else if(thebdo===0 && (tmois)===0 && (tjour)>0){
        tarif=(tjour*7);
    }else if(thebdo===0 && (tmois)===0 && (tjour)===0 & th>0){
        return th*nb_conduite_jour*7;
    }
    //console.log("DATTTT", theure, tjour, thebdo, tmois)
    return tarif;
}
const setMontantMois=(theure, tjour, thebdo, tmois)=>{
    
    const th= isNaN(parseInt(theure)) ? 0 : parseInt(theure); 
    tjour = isNaN(parseInt(tjour)) ? 0 : parseInt(tjour);
    thebdo = isNaN(parseInt(thebdo)) ? 0 : parseInt(thebdo);
    tmois = isNaN(parseInt(tmois)) ? 0 : parseInt(tmois);
    let tarif=0;
    //alert(tjour+' '+thebdo+" "+tmois);
    if(tmois>0){tarif=tmois }
    else if(tmois===0 && (thebdo)>0){
        tarif=(thebdo*4);
    }
    else if(tmois===0 && thebdo===0 && (tjour)>0){
        tarif=(tjour*7*4);//1mois=4*7*1jour
    }else if(tmois===0 && (thebdo)===0 && (tjour)===0 & th>0){
        return th*nb_conduite_jour*7*4;
    }
    //console.log("DATTTT", theure, tjour, thebdo, tmois)
    return tarif;
}
const calculerMontantLocation = (date1, date2, theure, tjour, thebdo, tmois) => {
    let tarifheure = setMontantHeure(theure, tjour, thebdo, tmois);
    let tarifjour = setMontantJour(theure,tjour, thebdo, tmois);
    let tarifsemaine = setMontantSemaine(theure,tjour, thebdo, tmois);
    let tarifmois = setMontantMois(theure,tjour, thebdo, tmois);
   // alert(tarifjour)
    let nb_heures = heuresEntreDeuxDates(date1, date2);  // Utilisation de la fonction correcte
    //alert(date1+"__________"+date2)
    // Tarif par heure
    if (nb_heures < 24) {
        return tarifheure * nb_heures;
    }
    
    // Tarif par jour => nb_heures < 24heures * 7 jours
    else if (nb_heures >= 24 && nb_heures < 24 * 7) {
        let nb_jours = joursEntreDeuxDates(date1, date2);  // Utilisation de la fonction correcte
        //alert(nb_jours)
        return tarifjour * nb_jours;
    }

    // Tarif par semaine => nb_heures < 24heures * 7 jours * 4 semaines
    else if (nb_heures >= 24 * 7 && nb_heures < 24 * 7 * 4) {
        let nb_semaines = semainesEntreDeuxDates(date1, date2);  // Utilisation de la fonction correcte
        return tarifsemaine * nb_semaines;
    }

    // Tarif par mois
    else if (nb_heures >= 24 * 7 * 4 && nb_heures <= 24 * 7 * 4 * 6) {
        let nb_mois = moisEntreDeuxDates(date1, date2);  // Utilisation de la fonction correcte
        return tarifmois * nb_mois;
    }

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


export { DateToFront, formaterMontant,truncateString,setTarif, DateToDbFormat,formaterHeure, isInFavoris, calculerMontantLocation,
    joursEntreDeuxDates, semainesEntreDeuxDates,moisEntreDeuxDates, formaterDateHeure,differenceEntreDeuxDates
    ,default_heures,default_minutes,montant_minimum_location, nb_conduite_jour
};