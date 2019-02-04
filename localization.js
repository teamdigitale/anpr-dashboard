var Resources  = {};

//Population
Resources.population = {"it":"Popolazione","en":"Population"}
Resources.populationAIRE = {"it":"Popolazione AIRE","en":"Population AIRE"}
Resources.populationMigrated = {"it":"Popolazione subentrata","en":"Population migrated"}
Resources.populationMigratedInfo = {"it":"Popolazione subentrata","en":"Population migrated"}
Resources.populationPreMigrated = {"it":"Popolazione in pre subentro","en":"Population in pre migration"}
Resources.populationPreMigratedInfo = {"it":"Popolazione in pre subentro","en":"Total population of municipalities that have already sent their registry office to ANPR for validation and are doing integration test, cleaning their data or are planning to go live in production at an established date."}


//Municipalities
Resources.municipalities = {"it":"Comuni","en":"Municipalities"}
Resources.municipalitiesMigrated = {"it":"Comuni subentrati","en":"Municipalities migrated"}
Resources.municipalitiesMigratedInfo = {"it":"Comuni che hanno ultimato la migrazione ad ANPR e quindi operano nella loro attività quotidiana direttamente sulla piattaforma. Per i cittadini di questi comuni ANPR è la sorgente di informazioni anagrafiche.","en":"Number of municipalities that have already migrated to ANPR and their daily operations are performed on ANPR. For their citizens ANPR is already the source of information."}
Resources.municipalitiesPreMigrated={"it":"Comuni in pre subentro","en":"Municipalities in pre migration"}
Resources.municipalitiesPreMigratedInfo={"it":"Numero comuni che hanno già inviato la loro anagrafe (APR locale) ad ANPR per la validazione e stanno compiendo test di integrazione, bonificando i dati anagrafici o che non hanno ancora pianificato una data definitiva per il passaggio in produzione.","en":"Number of municipalities that have already sent their registry office to ANPR for validation and are doing integration test, cleaning their data or are planning to go live in production at an established date."}

//Tables 
Resources.municipalityName= {"it":"Nome del Comune","en":"Municapality Name"}
Resources.municipalityProvince= {"it":"Provincia","en":"Province"}
Resources.municipalityRegion= {"it":"Regione","en":"Region"}
Resources.municipalityArea= {"it":"Area","en":"Area"}
Resources.municipalityZone= {"it":"Zona","en":"Zone"}






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


