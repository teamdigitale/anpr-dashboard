//NOTES TO SELF
//a teamdigitale access token is required
//possibility to do progressive rendering from ajax url of table
//there is no data on AIRE

mapboxgl.accessToken = "pk.eyJ1IjoidGVhbWRpZ2l0YWxlIiwiYSI6ImNqN3JsamdudjNqZG8yd3Q1Z3pxeG51YWUifQ.5fDbuvoLcC1f6n9g9nTgXA";

function checkUrl(data) {
  var urlParams = new URLSearchParams(window.location.search);
  var comune = urlParams.get('comune')
  if (comune) {
    var choosen = data.filter(function (item) {
      return (item.label === comune.toUpperCase())
    })
    if (choosen.length > 0) {
      $("#tags").val(comune.toUpperCase())
      $("#popup").html(printPopup(choosen[0]));
    }
  }
}



fetch(dataUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    //load summaries
    createSummaryBoxes(json.summaries, json.last_update);

    //load searchbar
    var properties = json.geojson.features.map(function (d) { return d.properties });
    createSearchBar(properties);
    checkUrl(properties);

    //initialize maps
    var maps = [
      new mapboxgl.Map({
        container: "map-subentro",
        style: "mapbox://styles/mapbox/dark-v9",
        center: [12.4829321, 41.8933203],
        zoom: 4.5,
        minZoom: 4.5,
        maxZoom: 12,
        scrollZoom: false
      }),
      new mapboxgl.Map({
        container: "map-presubentro",
        //style: "mapbox://styles/mapbox/light-v9",
        style: "mapbox://styles/mapbox/dark-v9",
        center: [12.4829321, 41.8933203],
        zoom: 4.5,
        minZoom: 4.5,
        maxZoom: 12,
        scrollZoom: false
      }),
    ];

    //initialize chart
    var X = {
      property: "date",
      min: new Date(2016, 8, 1)
    };

    //load maps, tables, charts
    for (var i = 0; i < 2; i++) {
      //load map
      loadMap(maps[i], json.geojson, anprLayers[i]);

      //load table
      var filtered = properties.filter(anprLayers[i].filter);
      $("#table-" + anprLayers[i].id).tabulator(anprLayers[i].options);
      $("#table-" + anprLayers[i].id).tabulator("setData", filtered);

      //load chart
      var Y0 = anprLayers[i].Y[0];
      var Y1 = anprLayers[i].Y[1];
      var id = anprLayers[i].id;
      //  createChart(json.charts[id], X, Y0, Y1, id);
    }

    //load table
    $("#table-fornitori").tabulator(anprFornitori.options);
    $("#table-fornitori").tabulator("setData", json.fornitori);

    anprAggregate.map(table => {
      //load table
      $("#table-" + table.id.toLowerCase()).tabulator(table.options);
      $("#table-" + table.id.toLowerCase()).tabulator("setData", json.aggregates[table.id]);
    });

    var subs = json.charts.subentro

    new Chart(document.getElementById("comSub"), {
      type: 'line',
      data: {
        labels: subs.map(function (sub) { return sub.date }),
        datasets: [{
          data: subs.map(function (sub) { return sub.popolazione }),
          //label: "Popolazione",
          label: Resources.Get("population"),
          borderColor: "#3e95cd",
          //backgroundColor: "#3e95cd",
          yAxisID: "pop" //,
          // fill: true
        },
        {
          data: subs.map(function (sub) { return sub.comuni }),
          label: Resources.Get("municipalities"),
          borderColor: "#8e5ea2",
          //backgroundColor: "#8e5ea2",
          yAxisID: "com"
          //,
          // fill: true
        },
        {
          data: subs.map(function (sub) { return sub.popolazione_aire }),
          label: Resources.Get("populationAIRE"),
          borderColor: "#3BB273",
          backgroundColor: "#3BB273",
          yAxisID: "pop",
          //,
          fill: true
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: Resources.Get("populatioAndMunicMigrated"),
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            }
          }],
          yAxes: [
            {
              id: 'com',
              type: 'linear',
              position: 'left',
            }, {
              id: 'pop',
              type: 'linear',
              position: 'right'
            }
          ]
        }
      }
    });


    var presub = json.charts.presubentro
    new Chart(document.getElementById("comPreSub"), {
      type: 'line',
      data: {
        labels: presub.map(function (sub) { return sub.date }),
        datasets: [{
          data: presub.map(function (sub) { return sub.popolazione }),
          label: Resources.Get("population"),
          borderColor: "#FFF966",
          //backgroundColor: "#3e95cd",
          yAxisID: "pop" //,
          // fill: true
        },
        {
          data: presub.map(function (sub) { return sub.comuni }),
          label: Resources.Get("municipalities"),
          borderColor: "#8e5ea2",
          //backgroundColor: "#8e5ea2",
          yAxisID: "com"
          //,
          // fill: true
        }
        ]
      },
      options: {
        title: {
          display: true,
          text: Resources.Get("populatioAndMunicPreMigrated"),
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            }
          }],
          yAxes: [{
            id: 'com',
            type: 'linear',
            position: 'left',
          }, {
            id: 'pop',
            type: 'linear',
            position: 'right'
          }]
        }
      }
    });

  });
