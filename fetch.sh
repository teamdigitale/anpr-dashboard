#!/bin/sh 

DATADIR=${DATADIR:-/var/cache/dashboard_scripts/anpr/}

FILES_TO_DOWNLOAD="
AnomalieAESchedeSoggettoPreSub.xml
AnomalieSchedeSoggettoPreSub.xml
AnomalieSchedeSoggettoPreSubV.2.xml
ComuniPresubentro.xml
ComuniSubentrati.xml
OperazioniPreSub_2017.xml
OperazioniTest_2017.xml
DatiCheckListV3.2.xml
DatiCheckListV3.3.xml
"

CSTORS_SHARE_ID='2ae87c79b57c7401949a'
CSTORS_INVITE="https://cstors.sogei.it/invitations/?share=${CSTORS_SHARE_ID}"
CSTORS_DL_PRE="https://cstors.sogei.it/invitations/webdav/share/${CSTORS_SHARE_ID}/"
CSTORS_DL_POST='?dl=true'

ANPR_DASHBOARD_APIKEY=${ANPR_DASHBOARD_APIKEY:-unset}

if [ "${ANPR_DASHBOARD_APIKEY}" == "unset" ]; then
  echo "ERROR: must specify ANPR_DASHBOARD_APIKEY variable."
  exit -1
fi

for file in ${FILES_TO_DOWNLOAD} ; do
    cookie_store=$(mktemp)
    curl -s -c ${cookie_store} "$CSTORS_INVITE" > /dev/null
    curl -f -s -b ${cookie_store} -o "${DATADIR}${file}" "${CSTORS_DL_PRE}${file}${CSTORS_DL_POST}"
    if [ $? -ne 0 ]; then
        echo "Failed to download ${file}"
    fi
    rm ${cookie_store}
done

curl -f -s -o "${DATADIR}pianosubentro.csv" -H "APIKey: ${ANPR_DASHBOARD_APIKEY}" 'https://dashboard.anpr.it/downloadpianosubentro?detailed_records=true'
if [ $? -ne 0 ]; then
    echo "Failed to download pianosubentro.csv"
fi
