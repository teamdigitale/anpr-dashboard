var anprLayers = [{
  "id": "subentro",
  "property": "data_subentro",
  "filter": function (d) {
    return (d.data_subentro !== undefined && d.data_subentro !== "");
  },
  "mapboxFilter": ["has", "data_subentro"],
  "sorter": function (a, b) {
    var diff = moment(a.data_subentro, "DD/MM/YYYY").diff(moment(b.data_subentro, "DD/MM/YYYY"), 'days');
    if (diff < 0) return 1;
    if (diff > 0) return -1;
    else return 0;
  },
  "Y": [{
    property: "popolazione",
    color: "black",
    label: Resources.Get("populationMigrated")
  }, {
    property: "comuni",
    color: "green",
    label: Resources.Get("municipalitiesMigrated")
  }],
  "color": "green",
  "options": {
    "pagination": true,
    "progressiveRender": true,
    //progressiveRender:"remote", //enable progressive rendering
    //ajaxURL:"/data/page", //set the ajax URL
    "columns": [{
      "title": Resources.Get("municipalityName"),
      "field": "label",
      "width": 180,
      "frozen": true
    }, {
      "title": Resources.Get("municipalityProvince"),
      "field": "PROVINCIA",
      "sorter": "string",
      "width": 100
    }, {
      "title": Resources.Get("municipalityRegion"),
      "field": "REGIONE",
      "sorter": "string",
      "width": 90
    }, {
      "title": Resources.Get("municipalityZone"),
      "field": "ZONA",
      "sorter": "string",
      "width": 80
    }, {
      "title": Resources.Get("municipalityPopulation"),
      "field": "popolazione",
      "align": "center",
      "sorter": "number",
      "width": 80
    }, {
      "title": Resources.Get("municipalityMigrationDate"),
      "field": "data_subentro",
      "align": "center",
      "width": 100,
      "sorter": "date",
      "sorterParams": {
        "format": "DD/MM/YYYY",
        "alignEmptyValues": "bottom"
      }
    }]
    //"resizableColumns": true
  }
}, {
  "id": "presubentro",
  "property": "data_presubentro",
  "filter": function (d) {
    return d.data_presubentro !== undefined;
  },
  "mapboxFilter": ["all", ["has", "data_presubentro"], ["!", ["has", "data_subentro"]]],
  "sorter": function (a, b) {
    var diff = moment(a.data_presubentro, "DD/MM/YYYY").diff(moment(b.data_presubentro, "DD/MM/YYYY"), 'days');
    if (diff < 0) return 1;
    if (diff > 0) return -1;
    else return 0;
  },
  "Y": [{
    property: "popolazione",
    color: "black",
    label: Resources.Get("populationMigrated")
  }, {
    property: "comuni",
    color: "orange",
    label: Resources.Get("municipalitiesMigrated")
  }],
  "color": "orange",
  "options": {
    "pagination": true,
    "progressiveRender": true,
    "columns": [{
      "title": Resources.Get("municipalityName"),
      "field": "label",
      "width": 180,
      "frozen": true
    }, {
      "title": Resources.Get("municipalityProvince"),
      "field": "PROVINCIA",
      "sorter": "string",
      "width": 100
    }, {
      "title": Resources.Get("municipalityRegion"),
      "field": "REGIONE",
      "sorter": "string",
      "width": 90
    }, {
      "title": Resources.Get("municipalityZone"),
      "field": "ZONA",
      "sorter": "string",
      "width": 80
    }, {
      "title": Resources.Get("municipalityPopulation"),
      "field": "popolazione",
      "align": "center",
      "sorter": "number",
      "width": 80
    }, {
      "title": Resources.Get("municipalityPreMigrationDate"),
      "field": "data_presubentro",
      "align": "center",
      "width": 100,
      "sorter": "date",
      "sorterParams": {
        "format": "DD/MM/YYYY",
        "alignEmptyValues": "bottom"
      }
    }]
    //"resizableColumns":       true
  }
}];


var anprAggregate = [{
  id: "aggr_by_regions",
  "options": {
    "pagination": true,
    "progressiveRender": true,
    "columns": [{
      "title": Resources.Get("municipalityRegion"),
      "field": "regione",
      "sorter": "string",
      "width": 90
    }, {
      "title": Resources.Get("municipalitiesMigrated"),
      "field": "comuni_subentro",
      "align": "center",
      "sorter": "number",
      "width": 80
    }, {
      "title": Resources.Get("populationMigrated"),
      "field": "popolazione_subentro",
      "align": "center",
      "sorter": "number",
      "width": 120
    }, {
      "title": Resources.Get("populationAIRE"),
      "field": "popolazione_aire_subentro",
      "align": "center",
      "sorter": "number",
      "width": 120
    }, {
      "title": Resources.Get("municipalitiesPreMigrated"),
      "field": "comuni_presubentro",
      "align": "center",
      "sorter": "number",
      "width": 120
    }, {
      "title": Resources.Get("populationPreMigrated"),
      "field": "popolazione_presubentro",
      "align": "center",
      "sorter": "number",
      "width": 120
    }, {
      "title": Resources.Get("populationAIRE"),
      "field": "popolazione_aire_presubentro",
      "align": "center",
      "sorter": "number",
      "width": 120
    }],
    //"resizableColumns":       true
  }
}, {
  id: "aggr_by_provinces",
  "options": {
    "pagination": true,
    "progressiveRender": true,
    "initialSort": [
      { "column": "regione", "dir": "asc" }, //sort by this first
    ],
    "columns": [{
      "title": Resources.Get("municipalityProvince"),
      "field": "provincia",
      "sorter": "string",
      "width": 90
    }, {
      "title": Resources.Get("municipalityRegion"),
      "field": "regione",
      "sorter": "string",
      "width": 90
    }, {
      "title": Resources.Get("municipalitiesMigrated"),
      "field": "comuni_subentro",
      "align": "center",
      "sorter": "number",
      "width": 80
    }, {
      "title": Resources.Get("populationMigrated"),
      "field": "popolazione_subentro",
      "align": "center",
      "sorter": "number",
      "width": 120
    }, {
      "title": Resources.Get("populationAIRE"),
      "field": "popolazione_aire_subentro",
      "align": "center",
      "sorter": "number",
      "width": 120
    }, {
      "title": Resources.Get("municipalitiesPreMigrated"),
      "field": "comuni_presubentro",
      "align": "center",
      "sorter": "number",
      "width": 120
    }, {
      "title": Resources.Get("populationPreMigrated"),
      "field": "popolazione_presubentro",
      "align": "center",
      "sorter": "number",
      "width": 120
    }, {
      "title": Resources.Get("populationAIRE"),
      "field": "popolazione_aire_presubentro",
      "align": "center",
      "sorter": "number",
      "width": 120
    }]
  }
}];

var createSummaryBoxes = function (summaries, last_update) {

  var info = d3.select("body")
    .append("div")
    .attr("class", "info-tooltip")
    .style("opacity", 0);
  var summaryBoxes = [{
    id: "pop_pre",
    value: summaries.pop_pre,
    label: Resources.Get("populationPreMigrated"),
    description: Resources.Get("populationPreMigratedInfo")
  }, {
    id: "pop_sub",
    value: summaries.pop_sub,
    label: Resources.Get("populationMigrated"),
    description: Resources.Get("populationMigratedInfo")
  }, {
    id: "com_pre",
    value: summaries.com_pre,
    label: Resources.Get("municipalitiesPreMigrated"),
    description: Resources.Get("municipalitiesPreMigratedInfo")
  }, {
    id: "com_sub",
    value: summaries.com_sub,
    label: Resources.Get("municipalitiesMigrated"),
    description: Resources.Get("municipalitiesMigratedInfo")
  }, {
    id: "last_update",
    value: moment(last_update, "X").format("DD/MM/YYYY HH:mm"),
    label: Resources.Get("lastUpdate"),
    description: Resources.Get("lastUpdateInfo")
  }
  ];

  summaryBoxes.forEach(function (s) {
    d3.select("#" + s.id)
      .append("div")
      .style("font-size", "35px")
      .style("font-weight", "bold")
      .html(s.value.toLocaleString(Resources.GetLang()))
      .attr("dy", "0em");
    d3.select("#" + s.id)
      .append("span")
      .style("font-size", "14px")
      .html(s.label + "&nbsp")
    d3.select("#" + s.id)
      .append("i")
      .attr("id", s.id + "_i")
      .attr("class", "fas fa-info-circle fa-1x");
    d3.select("#" + s.id + "_i")
      .on("mouseover", function () {
        info.transition()
          .duration(100)
          .style("opacity", 1);
        info.html(s.description)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function () {
        info.transition()
          .duration(500)
          .style("opacity", 0);
      });
  });
};

// example input data: [{ "label":"ABANO TERME", "PROVINCIA":"PD", "REGIONE":"Veneto", "ZONA":"Nord-Est", "popolazione":19349}}, {"label": "ABBADIA CERRETO", "PROVINCIA":"LO", "REGIONE":"Lombardia", "ZONA":"Nord-Ovest", "popolazione":297 ,"data_subentro":"2018-10-26T00:00:00.000Z" ,"data_presubentro":"2018-05-22T00:00:00.000Z"}}]
var createSearchBar = function (data) {
  $.ui.autocomplete.filter = function (array, term) {
    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
    return $.grep(array, function (value) {
      return matcher.test(value.label);
    });
  };

  $(function () {
    $("#tags").autocomplete({
      source: data,
      autoFocus: true,
      select: function (event, ui) {
        event.preventDefault();
        $("#tags").val(ui.item.label);
        $("#popup").html(printPopup(ui.item));
      },
      change: function (event, ui) {
        $("#tags").val(ui.item ? ui.item.id : "");
      }
    });
  });
};


var loadMap = function (map, source, layer) {
  map.on("load", function () {
    var id = layer.id;
    var color = layer.color;
    var property = layer.property;
    var layerId = "layer-" + id;

    // test remember to delete


    if (id === 'subentro') {
      var newSource = {}
      newSource['features'] = source.features.filter(function (x) {
        return x.properties.hasOwnProperty('data_subentro')
      })
      newSource['type'] = "FeatureCollection"
      map.addSource(id, {
        "type": "geojson",
        "data": newSource,
        cluster: true,
        clusterMaxZoom: 5, // Max zoom to cluster points on
        clusterRadius: 50
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: id,
        filter: ["has", "point_count"],
        //filter: ["has", "data_subentro"],
        paint: {
          // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#3e95cd",
            100,
            "#3e95cd",
            750,
            "#3e95cd"
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            10,
            100,
            30,
            750,
            40
          ]
        }
      });

    } else {
      var preSource = {}
      preSource['features'] = source.features.filter(function (x) {
        return x.properties.hasOwnProperty('data_presubentro')
      })
      preSource['type'] = "FeatureCollection"
      map.addSource(id, {
        "type": "geojson",
        "data": preSource,
        cluster: true,
        clusterMaxZoom: 5, // Max zoom to cluster points on
        clusterRadius: 50
      })

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: id,
        filter: ["has", "point_count"],
        //filter: ["has", "data_subentro"],
        paint: {
          // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#FFF966",
            100,
            "#FFF966",
            750,
            "#FFF966"
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            10,
            100,
            30,
            750,
            40
          ]
        }
      });
    }

    /*	map.addSource(id, {
                "type": "geojson",
                "data": newSource,
                cluster: true,
                clusterMaxZoom: 5, // Max zoom to cluster points on
                clusterRadius: 50
        }); */

    // Find the index of the first symbol layer in the map style
    /*	var layers = map.getStyle().layers;
        var firstSymbolId = null;
        for (var j = 0; j < layers.length; j++) {
                if (layers[j].type === "symbol") {
            self.firstSymbolId = layers[j].id;
            break;
                }
        }*/

    // Test cluster
    /*
    map.addLayer({
        id: "clusters",
        type: "circle",
        source: id,
        filter: ["has", "point_count"],
        //filter: ["has", "data_subentro"],
        paint: {
            // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
                "step",
                ["get", "point_count"],
                "#3e95cd",
                100,
                "#3e95cd",
                750,
                "#3e95cd"
            ],
            "circle-radius": [
                "step",
                ["get", "point_count"],
                10,
                100,
                30,
                750,
                40
            ]
        }
    });
    */

    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: id,
      //filter: ["has", "point_count"],
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
      }
    });

    // =================
    /*
    map.addLayer({
            "id": layerId,
            "type": "circle",
            "source": id,
            filter: ["!", ["has", "point_count"]],
            "paint": {
        "circle-radius": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5, 2.5,
                    14, 30
            ],
        "circle-color": color,
        "circle-opacity": 0.7
        }
    }, firstSymbolId); */

    map.addLayer({
      id: "unclustered",
      type: "circle",
      source: id,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "#3e95cd",
        "circle-radius": 3 //,
        // "circle-stroke-width": 1,
        // "circle-stroke-color": "#fff"
      }
    });

    //map.setFilter(layerId) // layer.mapboxFilter);
    //map.setFilter(layerId)
    //POPUP ON EACH COMUNE
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on("mouseenter", "unclustered", function (e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";

      var coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      // }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(e.lngLat)
        .setHTML(printMsg(e.features[0].properties))
        .addTo(map);
    });

    map.on("mouseleave", "unclustered", function () {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });

    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: Resources.Get("search")
    }));

    map.addControl(new mapboxgl.NavigationControl());
  });
};

var anprFornitori = {
  "options": {
    "pagination": true,
    "progressiveRender": true,

    "columns": [{
      "title": Resources.Get("supplierName"),
      "field": "nome",
      "width": 180,
      "frozen": true
    }, {
      "title": Resources.Get("supplierMigrationPerc"),
      "field": "percentuale_comuni_subentrati",
      "sorter": "number",
      "width": 220
    }, {
      "title": Resources.Get("supplierPreMigrationPerc"),
      "field": "percentuale_comuni_in_presubentro",
      "sorter": "number",
      "width": 250,
      "color": "orange"
    }, {
      "title": Resources.Get("supplierInactivePerc"),
      "field": "percentuale_comuni_inattivi",
      "sorter": "number",
      "width": 230
    }]
    //"resizableColumns":       true
  }
}
var ops = [{
  "text": Resources.Get("statusMigratedWhen"),
  "icon": "./img/hand_subentro.svg"
}, {
  "text": Resources.Get("statusPreMigratedWhen"),
  "icon": "./img/hand_presubentro.svg"
}, {
  "text": Resources.Get("statusInactive"),
  "icon": "./img/thumb-down.svg"
}];
var printMsg = function (d) {
  var i = 2, //default value: d.data_subentro === undefined && d.data_presubentro === undefined
    date = "",
    options = ops;

  if (d.data_subentro !== undefined) {
    date = moment(d.data_subentro, "DD/MM/YYYY").format("DD/MM/YYYY");
    if (!moment(date).isValid()) console.log(d.data_presubentro);
    i = 0;
  } else if (d.data_presubentro !== undefined) {
    date = moment(d.data_presubentro, "DD/MM/YYYY").format("DD/MM/YYYY");
    if (!moment(date).isValid()) console.log(d.data_presubentro);
    i = 1;
  }
  text = i == 2 ? Resources.GetWithArgs("statusInactiveText", [d.label]) : Resources.GetWithArgs("statusText", [d.label, options[i].text, date]);
  return "<p style='float: left;'><img src=" + options[i].icon + "></p>" + text;
}

var printPopup = function (d) {
  var i = 2, //default value: d.data_subentro === undefined && d.data_presubentro === undefined
    date = "",
    options = ops;

  if (d.data_subentro !== undefined) {
    date = moment(d.data_subentro, "DD/MM/YYYY").format("DD/MM/YYYY");
    if (!moment(date).isValid()) console.log(d.data_presubentro);
    i = 0;
  } else if (d.data_presubentro !== undefined) {
    date = moment(d.data_presubentro, "DD/MM/YYYY").format("DD/MM/YYYY");
    if (!moment(date).isValid()) console.log(d.data_presubentro);
    i = 1;
  }
  text = i == 2 ? Resources.GetWithArgs("statusInactiveText", [d.label]) : Resources.GetWithArgs("statusText", [d.label, options[i].text, date]);
  return (
    '<div class="row mx-auto mb-4 p-4 popup-class "><img class="pl-0 pr-2" src="' + options[i].icon + '">' +
    '<div>' + text + '</div></div>'
  )
}

var printPopupMap = function (d) {
  var i = 2, //default value: d.data_subentro === undefined && d.data_presubentro === undefined
    date = "",
    options = ops;

  if (d.data_subentro !== undefined) {
    date = moment(d.data_subentro, "DD/MM/YYYY").format("DD/MM/YYYY");
    if (!moment(date).isValid()) console.log(d.data_presubentro);
    i = 0;
  } else if (d.data_presubentro !== undefined) {
    date = moment(d.data_presubentro, "DD/MM/YYYY").format("DD/MM/YYYY");
    if (!moment(date).isValid()) console.log(d.data_presubentro);
    i = 1;
  }
  // return "<p style='float: left;'><img src=" + options[i].icon + "></p>Il <b>comune di " + d.label + "</b><br> è " + options[i].text + date;
  return (
    '<div><img class="pl-0 pr-2" src="' + options[i].icon + '">' +
    // '<div <img class="pl-0 pr-2" src="' +  options[i].icon + '">' +
    '<div>' +
    //Il <b>comune di ' + d.label + '</b><br> è ' + options[i].text + date
    Resources.GetWithArgs("statusText", [d.label, options[i].text, date]) + '</div></div>'
  )
}

var printTooltip = function (data1, data2) {
  "<span style='color: lightgrey;font-size: 13px;'>" +
    data1.label +
    ":</span> <b>" +
    data1.value +
    "</b><br>" +
    "<span style='color: lightgrey;font-size: 13px;'>" +
    data2.label +
    ":</span> <b>" +
    data2.value +
    "</b>";
}

var locale = d3.timeFormatLocale({
  "dateTime": "%A %e %B %Y, %X",
  "date": "%d/%m/%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
  "shortDays": ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
  "months": ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
  "shortMonths": ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"]
});
