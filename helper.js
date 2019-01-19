var anprLayers = [{
    "id": "subentro",
    "property": "data_subentro",
    "filter": (d) => {
        return d.data_subentro !== undefined;
    },
    "mapboxFilter": ["has", "data_subentro"], 
    "sorter": (a, b) => {
	var diff = moment(a.data_subentro, "DD/MM/YYYY").diff(moment(b.data_subentro, "DD/MM/YYYY"), 'days');
        if (diff < 0) return 1;
        if (diff > 0) return -1;
        else return 0;
    },
    "Y": [{
	property: "popolazione",
	color: "black",
	label: "popolazione subentrata"
    },{
	property: "comuni",
	color: "green",
	label: "comuni subentrati"
    }],
    "color": "green",
    "options": {
	"pagination": true,
	"progressiveRender": true,
	//progressiveRender:"remote", //enable progressive rendering
	//ajaxURL:"/data/page", //set the ajax URL
	"columns": [{
            "title": "Nome Comune",
            "field": "label",
            "width": 180,
            "frozen": true
	},{
            "title": "Provincia",
            "field": "PROVINCIA",
            "sorter": "string",
            "width": 100
	},{
            "title": "Regione",
            "field": "REGIONE",
            "sorter": "string",
            "width": 90
	},{
            "title":"Zona",
            "field":"ZONA",
            "sorter": "string",
            "width":80
	},{
            "title": "Abitanti",
            "field": "popolazione",
            "align": "center",
            "sorter": "number",
            "width": 80
	},{
            "title": "Data subentro",
            "field": "data_subentro",
            "align": "center",
            "width": 100,
            "sorter":"date",
            "sorterParams": {
            "format": "DD/MM/YYYY",
		"alignEmptyValues": "bottom"
            }
	}]
	//"resizableColumns": true
    }
},{
    "id": "presubentro",
    "property": "data_presubentro",
    "filter": (d) => {
        return d.data_presubentro !== undefined;
    },
    "mapboxFilter": ["all", ["has", "data_presubentro"], ["!", ["has", "data_subentro"]]],
    "sorter": (a,b) => {
	var diff = moment(a.data_presubentro, "DD/MM/YYYY").diff(moment(b.data_presubentro, "DD/MM/YYYY"), 'days');
        if (diff < 0) return 1;
        if (diff > 0) return -1;
        else return 0;
    },
    "Y": [{
        property: "popolazione",
	color: "black",
        label: "popolazione presubentrata"
    },{
        property: "comuni",
        color: "orange",
        label: "comuni presubentrati"
    }],
    "color": "orange",
    "options": {
	"pagination": true,
	"progressiveRender": true,
	"columns": [{
            "title": "Nome Comune",
            "field": "label",
            "width": 180,
            "frozen": true
	},{ "title": "Provincia",
            "field": "PROVINCIA",
            "sorter": "string",
            "width": 100
	  },{
              "title": "Regione",
              "field": "REGIONE",
              "sorter": "string",
              "width": 90
	  },{
              "title":"Zona",
              "field":"ZONA",
              "sorter":"string",
              "width": 80
	  },{
              "title": "Abitanti",
              "field": "popolazione",
              "align": "center",
              "sorter": "number",
              "width": 80
	  },{
              "title": "Data presubentro",
              "field": "data_presubentro",
              "align": "center",
              "width": 100,
              "sorter": "date",
              "sorterParams": {
		  "format": "DD/MM/YYYY",
		  "alignEmptyValues":"bottom"
              }
	  }]
	//"resizableColumns":       true
    }
}];

var createSummaryBoxes = (summaries) => {
    var info = d3.select("body")
        .append("div")
        .attr("class", "info-tooltip")
        .style("opacity", 0);
    var summaryBoxes = [{
        id: "pop_pre",
        value: summaries.pop_pre,
        label: "Popolazione in presubentro",
        description: "Totale popolazione dei comuni che hanno già inviato la loro anagrafe (ANPR locale) ad ANPR per la validazione e stanno compiendo test di integrazione, bonificando i dati anagrafici o che non hanno ancora pianificato una data definitiva per il passaggio in produzione."
    },{
        id: "pop_sub",
        value: summaries.pop_sub,
        label: "Popolazione subentrata",
            description: "Totale popolazione dei comuni che hanno ultimato la loro migrazione ad ANPR e quindi operano nella loro attività quotidiana direttamente sulla piattaforma. Per i cittadini di questi comuni ANPR è la sorgente di informazioni anagrafiche."
    },{
        id: "com_pre",
        value: summaries.com_pre,
        label: "Comuni in presubentro",
        description: "Numero comuni che hanno già inviato la loro anagrafe (ANPR locale) ad ANPR per la validazione e stanno compiendo test di integrazione, bonificando i dati anagrafici o che non hanno ancora pianificato una data definitiva per il passaggio in produzione."
    },{
        id: "com_sub",
        value: summaries.com_sub,
        label: "Comuni subentrati",
        description: "Numero comuni che hanno ultimato la loro migrazione ad ANPR e quindi operano nella loro attività quotidiana direttamente sulla piattaforma. Per i cittadini di questi comuni ANPR è la sorgente di informazioni anagrafiche."
    }
];

    summaryBoxes.forEach((s) => {
        d3.select("#" + s.id)
            .append("div")
            .style("font-size", "35px")
            .style("font-weight", "bold")
            .html(s.value.toLocaleString("en"))
            .attr("dy", "0em");
        d3.select("#" + s.id)
            .append("span")
            .style("font-size", "14px")
            .html(s.label + "&nbsp")
        d3.select("#" + s.id)
            .append("i")
            .attr("id", s.id + "_i")
	    .attr("class", "fas fa-info-circle fa-1x")
            .style("visibility", "hidden");
        d3.select("#" + s.id)
            .on("mouseover", () => {
                d3.select("#" + s.id + "_i")
                    .style("visibility", "visible");
            })
            .on("mouseout", () => {
                d3.select("#" + s.id + "_i")
                    .style("visibility", "hidden");
            });
        d3.select("#" + s.id + "_i")
            .on("mouseover", () => {
                info.transition()
                    .duration(100)
                    .style("opacity", 1);
                info.html(s.description)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                info.transition()
                    .duration(500)
		    .style("opacity", 0);
            });
    });
};

// example input data: [{ "label":"ABANO TERME", "PROVINCIA":"PD", "REGIONE":"Veneto", "ZONA":"Nord-Est", "popolazione":19349}}, {"label": "ABBADIA CERRETO", "PROVINCIA":"LO", "REGIONE":"Lombardia", "ZONA":"Nord-Ovest", "popolazione":297 ,"data_subentro":"2018-10-26T00:00:00.000Z" ,"data_presubentro":"2018-05-22T00:00:00.000Z"}}]         
var createSearchBar = (data) => {
    $.ui.autocomplete.filter = (array, term) => {
        var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
        return $.grep(array, function (value) {
            return matcher.test(value.label);
        });
    };

    $(() => {
        $("#tags").autocomplete({
            source: data,
            autoFocus: true,
            select: function(event, ui) {
                event.preventDefault();
                $("#tags").val(ui.item.label);
                $("#popup").html(printPopup(ui.item));
            },
            change: function(event, ui) {
                    $("#tags").val(ui.item? ui.item.id : "");
            }
        });
    });
};


var loadMap = (map, source, layer) => {
    map.on("load", () => {
	var id = layer.id;
	var color = layer.color;
	var property = layer.property;
    var layerId = "layer-" + id;
    
    // test remember to delete
 

    if(id === 'subentro') {
        var newSource = {}
        newSource['features'] = source.features.filter(x => x.properties.hasOwnProperty('data_subentro'))
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
        preSource['features'] = source.features.filter(x => x.properties.hasOwnProperty('data_presubentro'))
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
	map.setFilter(layerId)
	//POPUP ON EACH COMUNE                           
	var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
	});
	
	map.on("mouseenter", "unclustered", (e) => {
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
	
	map.on("mouseleave", "unclustered", () => {
            map.getCanvas().style.cursor = "";
            popup.remove();
	});
	
	map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            placeholder: "Cerca il tuo comune"
    }));
	
	map.addControl(new mapboxgl.NavigationControl());
    });
};

var anprFornitori = {
    "options":  {
	"pagination": true,
	"progressiveRender": true,
	// "initialSort": [{ "column": "percentuale_comuni_subentrati", "dir": "desc" }],
	//progressiveRender:"remote", //enable progressive rendering
	//ajaxURL:"/data/page", //set the ajax URL
	"columns": [{
	"title": "Nome Fornitore",
	    "field": "nome",
	    "width": 180,
	    "frozen": true
	},{
	    "title": "Percentuale Comuni Subentrati",
	    "field": "percentuale_comuni_subentrati",
	    "sorter": "number",
	    "width": 220
	},{
	    "title": "Percentuale Comuni in Presubentro",
	    "field": "percentuale_comuni_in_presubentro",
	    "sorter": "number",
	    "width": 250,
	    "color": "orange"
	},{
	    "title": "Percentuale Comuni Inattivi",
	    "field": "percentuale_comuni_inattivi",
	    "sorter": "number",
	    "width": 230
	}]
	//"resizableColumns":       true
    }
}

var printMsg = (d) => {
    var i = 2, //default value: d.data_subentro === undefined && d.data_presubentro === undefined 
        date = "",
        options = [{
            "text": "subentrato in data ",
            "icon": "./img/hand_subentro.svg"
        },{
            "text": "in presubentro dal ",
            "icon": "./img/hand_presubentro.svg"
        },{
            "text": "inattivo al momento",
            "icon": "./img/thumb-down.svg"
        }];

    if (d.data_subentro !== undefined) {
        date = moment(d.data_subentro, "DD/MM/YYYY").format("DD/MM/YYYY");
	if (!moment(date).isValid()) console.log(d.data_presubentro);
        i = 0;
    } else if (d.data_presubentro !== undefined) {
        date = moment(d.data_presubentro, "DD/MM/YYYY").format("DD/MM/YYYY");
	if (!moment(date).isValid()) console.log(d.data_presubentro);
        i = 1;
    }

    return "<p style='float: left;'><img src=" + options[i].icon + "></p>Il <b>comune di " + d.label + "</b><br> è " + options[i].text + date;
}

var printPopup = (d) => {
    var i = 2, //default value: d.data_subentro === undefined && d.data_presubentro === undefined 
        date = "",
        options = [{
            "text": "subentrato in data ",
            "icon": "./img/hand_subentro.svg"
        },{
            "text": "in presubentro dal ",
            "icon": "./img/hand_presubentro.svg"
        },{
            "text": "inattivo al momento",
            "icon": "./img/thumb-down.svg"
        }];

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
        '<div class="row mx-auto mb-4 p-4 popup-class "><img class="pl-0 pr-2" src="' + options[i].icon + '">' +
        '<div>Il <b>comune di ' + d.label + '</b><br> è ' + options[i].text + date
        + '</div></div>'
    )
}

var printPopupMap = (d) => {
    var i = 2, //default value: d.data_subentro === undefined && d.data_presubentro === undefined 
        date = "",
        options = [{
            "text": "subentrato in data ",
            "icon": "./img/hand_subentro.svg"
        },{
            "text": "in presubentro dal ",
            "icon": "./img/hand_presubentro.svg"
        },{
            "text": "inattivo al momento",
            "icon": "./img/thumb-down.svg"
        }];

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
       '<div>Il <b>comune di ' + d.label + '</b><br> è ' + options[i].text + date
        + '</div></div>'
    )
}

var printTooltip = (data1, data2) => "<span style='color: lightgrey;font-size: 13px;'>" +
    data1.label +
    ":</span> <b>" +
    data1.value +
    "</b><br>" +
    "<span style='color: lightgrey;font-size: 13px;'>" +
    data2.label +
    ":</span> <b>" +
    data2.value +
    "</b>";

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
    
var createChart = (data, X, Y0, Y1, id) => {
    var point = d3.select("body")
        .append("div")
        .attr("class", "point-tooltip")
        .style("opacity", 0);

    var margin = {
        top: 35,
        right:  (window.innerWidth > 767) ? 40 : 80,
        bottom: 70,
        left: 60
    },
        width = (window.innerWidth > 767) ? window.innerWidth / 2 : window.innerWidth, //parseInt(d3.select(element).style('width'), 10),
        width = width - margin.left - margin.right - 70,
        height = 320 - margin.top - margin.bottom;

    var x = d3.scaleTime()
	.range([0, width])
	.domain([X.min, d3.extent(data, (d) => new Date(d[X.property]))[1]]);
    var y0 = d3.scaleLinear()
	.range([height, 0])
	.domain([0, d3.max(data, (d) => Math.max(d[Y0.property]))]);
    var y1 = d3.scaleLinear()
	.range([height, 0])
	.domain([0, d3.max(data, (d) => Math.max(d[Y1.property]))]);
    
    var valueline = d3.line()
        .x((d) => x(new Date(d[X.property])))
        .y((d) => y0(d[Y0.property]));
    
    // define the 2nd line                 
    var valueline2 = d3.line()
        .x((d) => x(new Date(d[X.property])))
        .y((d) => y1(d[Y1.property]));

    // define the area   
    var area = d3.area()
        .x((d) => x(new Date(d[X.property])))
	.y0(height)
	.y1((d) => y0(d[Y0.property]));

    var area2 = d3.area()
        .x((d) => x(new Date(d[X.property]))) 
	.y0(height)
	.y1((d) => y1(d[Y1.property]));
    
    var svg = d3.select("#chart-"+ id)
        .append("svg");

    var svgChart = svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
//	.attr("viewBox", "0,0," + width + "," + height)
        .append("g")
	.attr("viewBox", "0,0," + width + "," + height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
    // Add the valueline path.                  
    svgChart.append("path")
        .data([data])
        .attr("class", "line")
	.attr("id", "lineblack-" + id)
        .style("stroke", "black")
        .attr("d", valueline);
    
    svgChart.append("path")
        .data([data])
        .attr("class", "area")
        .attr("id", "areablack-" + id)
        .style("stroke", "black")
        .attr("d", area);
    
    // Add the valueline2 path.
    svgChart.append("path")
        .data([data])
        .attr("class", "line")
	.attr("id", "linecolor-" + id)
        .style("stroke", Y1.color)
        .attr("d", valueline2);

    svgChart.append("path")
        .data([data])
        .attr("class", "area")
        .attr("id", "areacolor-" + id)
	.style("fill", Y1.color)
	.style("opacity", 0.3)
        .attr("d", area2);
    
    // Add the X Axis
    svgChart.append("g")
        .attr("class", "axis" )
	.attr("id", "axis-" + id)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
              .tickFormat(locale.format("%b %Y")))
        .selectAll("text")
	.attr("id", "xticks")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
	.style("font-size", "10px")
        .attr("transform", () => {return "rotate(" + ((window.innerWidth > 575) ? -60 : -30) + ")";});
    
    // Add the Y0 Axis  
    svgChart.append("g")
        .attr("class", "axisblack")
        .call(d3.axisLeft(y0));

    svgChart.append("g")
        .attr("class", "grid")
	.attr("id", "grid-" + id)
        .call(d3.axisLeft(y0).tickSize(-width).tickFormat(""));

    // Add the Y1 Axis
    svgChart.append("g")
        .attr("class", "axis" + Y1.color)
        .attr("transform", "translate( " + width + ", 0 )")
        .call(d3.axisRight(y1));

    // Add tooltip and circle on hover
    var pointTooltip = svgChart.selectAll("dot")
        .data(data)
        .enter();

    pointTooltip
        .append("circle")
	.attr("class", "circlecolor-" + id)
        .attr("id", (d, i) => "circlecolor-" + id + "-" + i)
        .attr("r", 5)
        .attr("cx", (d) => x(new Date(d[X.property])))
        .attr("cy", (d) => y1(d[Y1.property]))
	.style("stroke", Y1.color)
        .style("fill", Y1.color)
	.style("fill-opacity", 0.3)
        .style("opacity", 0)
        .on("mouseover", (d, i) => {
            point.transition()
                .duration(200)
                .style("opacity", 1);
            point.html(printTooltip({
		label: "Data",
		value: moment(d.date).format("DD/MM/YYYY")
	    },{
		label: "Numero di comuni",
		value: d.comuni
	    }))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 78) + "px");
            d3.select("#circlecolor-" + id + "-" + i)
		.transition()
                .duration(200)
		.style("opacity", 1);
        })
        .on("mouseout", (d, i) => {
            point.transition()
                .duration(500)
                .style("opacity", 0);
	    d3.select("#circlecolor-" + id + "-" + i)
                .transition()
                .duration(500)
		.style("opacity", 0);
        });

    pointTooltip
        .append("circle")
	.attr("class", "circleblack-" + id)
        .attr("id", (d, i) => "circleblack-" + id + "-" + i)
        .attr("r", 5)
        .attr("cx", (d) => x(new Date(d[X.property])))
        .attr("cy", (d) => y0(d[Y0.property]))
        .style("stroke", "black")
        .style("fill", "black")
	.style("fill-opacity", 0.3)
        .style("opacity", 0)     
        .on("mouseover", (d, i) => {
            point.transition()
                .duration(200)
                .style("opacity", 1);
            point.html(printTooltip({
		label: "Data",
		value: moment(d.date).format("DD/MM/YYYY")
	    },{
		label: "Popolazione",
		value: d.popolazione
	    }))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 78) + "px");
	    d3.select("#circleblack-" + id + "-" + i)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseout", (d, i) => {
            point.transition()
                .duration(500)
                .style("opacity", 0);
	    d3.select("#circleblack-" + id + "-" + i)
                .transition()
                .duration(500)
                .style("opacity", 0);
        });
    
    // Add chart legend
    var legend = svg.selectAll(".legend")
        .data([Y0, Y1])
        .enter().append("g")
        .attr("id", "legend-" + id)
        .attr("transform", (d, i) => {
	    var deltax, deltay;
	    if (i === 1) {
		if (width < 350) {
		    deltax = 85;
		    deltay = -13;
		} else {
		    deltax = width * 0.9;
		    deltay = 0;
		}
	    } else {
		deltax = 120;
		deltay = 0;
	    }
	    return "translate( " + (deltax + margin.left) + ", " + deltay + ")";
        });
    
    legend.append("line")
        .attr("class", "legendLine")
        .attr("x1", 20)
        .attr("x2", 45)
        .attr("y1", 20)
        .attr("y2", 20)
        .style("stroke", (d) => d.color)
        .style("fill", "none");
    
    legend.append("text")
        .attr("x", 15)
        .attr("y", 20)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("font-size", "15px")
        .text((d) => d.label);

    d3.select(".domain").remove();
    
    $(window).resize(() => {
	if (window.innerWidth < 350) {
	    d3.select("#tags").attr("placeholder", "Cerca");
	} else {
	    d3.select("#tags").attr("placeholder", "Inserisci il nome del tuo comune");
	}
	// update width
	width = (window.innerWidth > 575) ? window.innerWidth / 2 : window.innerWidth, 
	width = width - margin.left - margin.right - 70;
	    
	d3.select(".axis" + Y1.color)
            .attr("transform", "translate( " + width + ", 0 )");
	
	x = d3.scaleTime()
	    .range([0, width])
            .domain([X.min, d3.extent(data, (d) => new Date(d[X.property]))[1]]);

	d3.selectAll("#xticks")
	    .attr("transform", () => {
		return "rotate(" + ((window.innerWidth > 575) ? -60 : -30) + ")";
	    });

	d3.select("#axis-" + id)
	    .call(d3.axisBottom(x)
		  .tickFormat(locale.format("%b %Y")));

	d3.select("#grid-" + id)
            .call(d3.axisLeft(y0).tickSize(-width).tickFormat(""));
	
	d3.select("#linecolor-" + id)
	    .attr("d", valueline2);
	d3.select("#lineblack-" + id)
	    .attr("d", valueline);
	d3.select("#areacolor-" + id)
            .attr("d", area2);
        d3.select("#areablack-" + id)
            .attr("d", area);

	d3.selectAll(".circlecolor-" + id)
	    .attr("cx", (d) => x(new Date(d[X.property])))
            .attr("cy", (d) => y1(d[Y1.property]));

	d3.selectAll(".circleblack-" + id)
            .attr("cx", (d) => x(new Date(d[X.property])))
            .attr("cy", (d) => y0(d[Y0.property]));

	d3.selectAll("#legend-" + id)
	    .attr("transform", (d, i) => {
		var deltax, deltay;
		if (i === 1) {
                    if (width < 350) {
			deltax = 85;
			deltay = -13;
                    } else {
			deltax = width * 0.9;
			deltay = 0;
                    }
		} else {
                    deltax = 120;
                    deltay = 0;
		}
		return "translate( " + (deltax + margin.left) + ", " + deltay + ")";
            });
	
	svg.attr("width", width + margin.left + margin.right);
    });
};
