import i18n from "@/i18n";
import { t } from "i18next";

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
function DateToDbFormat(inputDate) {
    // Split the input date into day, month, and year
    if (inputDate == null) {return null}
    const [day, month, year] = inputDate.split('/');
  
    // Create a Date object using the components
    const parsedDate = new Date(`${year}-${month}-${day}`);
    
    const formattedYear = String(parsedDate.getFullYear());
    const formattedMonth = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const formattedDay = String(parsedDate.getDate()).padStart(2, '0');
    const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;
  
    return formattedDate;
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
const default_heures= [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
const default_minutes= [0,15,30,45];

export { DateToFront, formaterMontant,truncateString,setTarif, DateToDbFormat,isInFavoris
    ,default_heures,default_minutes 
};