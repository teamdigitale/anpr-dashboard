var Resources  = new Object;

//Population
Resources.population = {"it":"Popolazione","en":"Population"}
Resources.populationAIRE = {"it":"Popolazione AIRE","en":"Population AIRE"}
Resources.populationMigrated = {"it":"Popolazione subentrata","en":"Population migrated"}
Resources.populationMigratedInfo = {"it":"Totale della popolazione dei comuni che hanno ultimato la migrazione ad ANPR e quindi operano nella loro attività quotidiana direttamente sulla piattaforma. Per i cittadini di questi comuni ANPR è la sorgente di informazioni anagrafiche.","en":"Total population of municipalities that have already migrated to ANPR and their daily operations are performed on ANPR. For their citizens ANPR is already the source of information."}
Resources.populationPreMigrated = {"it":"Popolazione in pre subentro","en":"Population in pre migration"}
Resources.populationPreMigratedInfo = {"it":"Totale della popolazione dei comuni che hanno già inviato la loro anagrafe (APR locale) ad ANPR per la validazione e stanno compiendo test di integrazione, bonificando i dati anagrafici o che non hanno ancora pianificato una data definitiva per il passaggio in produzione.","en":"Total population of municipalities that have already sent their registry office to ANPR for validation and are doing integration test, cleaning their data or are planning to go live in production at an established date."}
Resources.populatioAndMunicMigrated = {"it":"Popolazione e comuni subentrati","en":"Population and municipalities migrated"}
Resources.populatioAndMunicPreMigrated = {"it":"Popolazione e comuni in pre subentro","en":"Population and municipalities in pre migration"}

//Municipalities
Resources.municipalities = {"it":"Comuni","en":"Municipalities"}
Resources.municipalitiesMigrated = {"it":"Comuni subentrati","en":"Municipalities migrated"}
Resources.municipalitiesMigratedInfo = {"it":"Comuni che hanno ultimato la migrazione ad ANPR e quindi operano nella loro attività quotidiana direttamente sulla piattaforma. Per i cittadini di questi comuni ANPR è la sorgente di informazioni anagrafiche. Il numero visualizzato è calcolato al netto dei comuni cessati o confluiti in altri comuni.","en":"Number of municipalities that have already migrated to ANPR and their daily operations are performed on ANPR. For their citizens ANPR is already the source of information. The number displayed is calculated net of municipalities that have ceased or have been merged into other municipalities."}
Resources.municipalitiesPreMigrated={"it":"Comuni in pre subentro","en":"Municipalities in pre migration"}
Resources.municipalitiesPreMigratedInfo={"it":"Numero comuni che hanno già inviato la loro anagrafe (APR locale) ad ANPR per la validazione e stanno compiendo test di integrazione, bonificando i dati anagrafici o che non hanno ancora pianificato una data definitiva per il passaggio in produzione.","en":"Number of municipalities that have already sent their registry office to ANPR for validation and are doing integration test, cleaning their data or are planning to go live in production at an established date."}

//Aggregates
Resources.dataAggrByRegion = {"it":"Dati aggregati per regione","en":"Data aggregates by region"}
Resources.dataAggrByProvince = {"it":"Dati aggregati per provincia","en":"Data aggregates by province"}

//LastUpdate
Resources.lastUpdate = {"it":"Ultimo aggiornamento","en":"Last update"}
Resources.lastUpdateInfo = {"it":"Data ultimo aggiornamento dei dati.","en":"Data last update."}

//Tables
Resources.municipalityName= {"it":"Nome del Comune","en":"Name"}
Resources.municipalityProvince= {"it":"Provincia","en":"Province"}
Resources.municipalityRegion= {"it":"Regione","en":"Region"}
Resources.municipalityArea= {"it":"Area","en":"Area"}
Resources.municipalityZone= {"it":"Zona","en":"Zone"}
Resources.municipalityPopulation= {"it":"Abitanti","en":"Population"}
Resources.municipalityDate= {"it":"Date","en":"Date"}
Resources.municipalityMigrationDate ={"it":"Data subentro","en": "Migration Date"}
Resources.municipalityPreMigrationDate ={"it":"Data pre subentro","en": "Pre migration Date"}
//Status
Resources.statusMigratedWhen = {"it":"subentrato il ","en":"migrated on "}
Resources.statusPreMigratedWhen = {"it":"in pre subentro dal ","en":"in pre migration from "}
Resources.statusInactive = {"it":"inattivo","en":"inactive"}
Resources.statusText = {"it":"Il <b>comune di ?</b><br> è ? ?","en":"? is ? from ? ?"}
Resources.statusInactiveText = {"it":"Il <b>comune di ?</b><br> è inattivo","en":"? is inactive"}


//Search
Resources.search ={"it":"Cerca il tuo comune","en":"Search your municipality"}
//Suppliers
Resources.supplierName ={"it":"Nome Fornitore","en":"Name"}
Resources.supplierMigrationPerc ={"it":"Percentuale di comuni subentrati","en":"Migrated municipalities (%)"}
Resources.supplierPreMigrationPerc ={"it":"Percentuale di comuni in pre subentro","en":"Municipalities in pre migration (%)"}
Resources.supplierInactivePerc ={"it":"Percentuale Comuni Inattivi","en":"Inactive (%)"}

//html page
Resources.supplierInfo={"it":"Fornitori - Percentuale Comuni Subentrati, In Presubentro, Inattivi","en":"Providers - municipalities migrates, in pre migration, inactive (%)"}
Resources.searchInfo ={"it":"A che punto è il tuo comune?","en":"How's your municipality?"}
Resources.migrationState ={"it":"ANPR - Stato della migrazione","en":"ANPR - Migration State"}
Resources.insertYourTown ={"it":"Inserisci il nome del tuo comune","en":"Search your municipality"}

Resources.getParameterByName =function(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**Get locale from query string if present */
Resources.Get = function(label){
    lang = Resources.getParameterByName("lang")=="en"?"en":"it";
    return  Resources[label][lang];
}
Resources.GetLang = function(){
    return lang = Resources.getParameterByName("lang")=="en"?"en":"it";

}
/**Accepts an array of arguments */
Resources.GetWithArgs = function(label,args){

    var _text = Resources.Get(label)
    for (i = 0;i<args.length;i++){
        _text= _text.replace("?",args[i]);
    }
    return _text;
}

