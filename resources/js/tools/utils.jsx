import i18n from "@/i18n";
import { t } from "i18next";

const DateToFront = (thedate, langs='fr',format='d/m/Y h:i:s') =>{
    let date = new Date(thedate);
    let lang=(langs==='fr'|| langs==='en')?langs:'fr';
    let d=(date.getDate()>8)? date.getDate():'0'+(date.getDate()+1);
    let m=(date.getMonth()>8)? date.getMonth()+ 1:'0'+(date.getMonth()+1);
    if(format==='d/m/Y'){
        return   `${d}/${m}/${date.getFullYear()}`;

    }
    if(lang==='fr'){
        return   `${d}/${m}/${date.getFullYear()} à ${date.getHours()}H:${date.getMinutes()}min `;
    }
    return `${d}-${m}-${date.getFullYear()}  at ${date.getHours()}H:${date.getMinutes()}min`;
}
function formaterMontant(montant, langue) {
    // Vérifier que le montant est un nombre
    if (isNaN(montant)) {
        return "-";
    }

    // Formater le montant en fonction de la langue
    if (langue === "fr") {
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
const default_heures= [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
const default_minutes= [0,15,30,45];

export { DateToFront, formaterMontant,truncateString,setTarif,
    default_heures,default_minutes 
};