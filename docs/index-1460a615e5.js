//NOTES TO SELF
//a teamdigitale access token is required
//possibility to do progressive rendering from ajax url of table
//there is no data on AIRE

mapboxgl.accessToken = "pk.eyJ1IjoidGVhbWRpZ2l0YWxlIiwiYSI6ImNqN3JsamdudjNqZG8yd3Q1Z3pxeG51YWUifQ.5fDbuvoLcC1f6n9g9nTgXA";

fetch(dataUrl)
    .then(function(response) {
			return response.json()})
    .then(function(json) {
	console.log("data elaborated and downloaded")

	//load summaries
	createSummaryBoxes(json.summaries);

	//load searchbar
	var properties = json.geojson.features.map(function(d){ return d.properties});
	createSearchBar(properties);

	//initialize maps
	var maps = [
	    new mapboxgl.Map({
		container: "map-subentro",
		style: "mapbox://styles/mapbox/dark-v9",
		center: [12.4829321,41.8933203],
		zoom: 4.5,
		minZoom: 4.5,
		maxZoom: 12,
		scrollZoom: false
	    }),
	    new mapboxgl.Map({
		container: "map-presubentro",
		//style: "mapbox://styles/mapbox/light-v9",
		style: "mapbox://styles/mapbox/dark-v9",
		center: [12.4829321,41.8933203],
		zoom: 4.5,
		minZoom: 4.5,
		maxZoom: 12,
		scrollZoom: false
	    })
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

	var subs = json.charts.subentro

	new Chart(document.getElementById("comSub"), {
		type: 'line',
		data: {
		  labels: subs.map(function(sub) { return sub.date}),
		  datasets: [{
			  data: subs.map(function(sub){ return sub.popolazione}),
				//label: "Popolazione",
				label : Resources.Get("population"),
			  borderColor: "#3e95cd",
			  //backgroundColor: "#3e95cd",
			  yAxisID: "pop" //,
			  // fill: true
			},
			{
				data: subs.map(function(sub) { return sub.comuni}),
				label:Resources.Get("municipalities"),
				borderColor: "#8e5ea2",
				//backgroundColor: "#8e5ea2",
				yAxisID: "com"
				 //,
				// fill: true
			} , 
			{
					data: subs.map(function(sub) {return sub.popolazione_aire}),
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
				}, 
				{
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
		  labels: presub.map(function(sub) { return sub.date}),
		  datasets: [{
			  data: presub.map(function(sub){return sub.popolazione}),
			  label: Resources.Get("population"),
			  borderColor: "#FFF966",
			  //backgroundColor: "#3e95cd",
			  yAxisID: "pop" //,
			  // fill: true
			},
			{
				data: presub.map(function(sub){return sub.comuni}),
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

			} ,
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

fetch(predictionUrl)
    .then(function(response) {return response.json()})
	  .then( function(json) {
		  var dates = json.dates.map(function(date) { return moment(date)})
		  let cumsum = []
		  json.populations.reduce(function(a,b,i) {
			  return cumsum[i] = a+b;
			}, 0)
		  var populations = cumsum.slice(0, json.populations.length - 11)
		  var predictions = cumsum.map(function(pop, index) {
			  if (index < cumsum.length - 12){
				  return null
			  }
			  return pop
		  })
		var totalPopPredictions = cumsum[cumsum.length - 1]
	d3.select("#" + "predictions" )
		.append("div")
		.style("font-size", "35px")
		.style("font-weight", "bold")
		.html(totalPopPredictions.toLocaleString("en"))
		.attr("dy", "0em");
	d3.select("#" + "predictions")
		.append("span")
		.style("font-size", "14px")
		.html("Previsione a 12 mesi" + "&nbsp")
	d3.select("#" + "predictions")
		.append("i")
		.attr("id", "predictions" + "_i")
	.attr("class", "fas fa-info-circle fa-1x")
		.style("visibility", "hidden");
	d3.select("#" + "predictions")
		.on("mouseover", function()  {
			return d3.select("#" + "predictions" + "_i").style("visibility", "visible");
		})
		.on("mouseout", function() {
			return d3.select("#" + "predictions" + "_i")
				.style("visibility", "hidden");
		});
	d3.select("#" + "predictions" + "_i")
		.on("mouseover", function() {
			info.transition()
				.duration(100)
				.style("opacity", 1);
			info.html("Previsione popolazione subentrata nei prossimi 12 mesi")
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function() {
			info.transition()
				.duration(500)
		.style("opacity", 0);
		});

		new Chart(document.getElementById("myChart"), {
			type: 'line',
			data: {
			  labels: dates,
			  datasets: [{
				  data: populations,
				  label: Resources.Get("population"),
				  borderColor: "#3e95cd",
				  backgroundColor: "#3e95cd" //,
				  // fill: true
				},
				{
				  data: predictions,
				  label: Resources.Get("expectedPopulation"),
				  borderColor: "#5FCE79", //,
				  backgroundColor: "#5FCE79"//"#8e5ea2"
				  //  fill: true
			  },
			  ]
			},
			options: {
			  title: {
				display: true,
				text: Resources.Get("expectedPopulationInfo"),

			  },
			  stacked: true,
			  scales: {
				xAxes: [{
					type: 'time',
					time: {
						unit: 'month'
					}
				}]
			}
			}
		  });
	  }
);

