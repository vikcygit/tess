	function renderMap(){
		var width = 460,
		height = 200;

		var projection = d3.geo.conicEqualArea()
		.scale(50)
		.translate([width / 2, height / 2])
		.center([0, 33])
		.precision(.1);

		var path = d3.geo.path()
		.projection(projection);

		var graticule = d3.geo.graticule();

		var svg = d3.select("#chart").append("svg")
		.attr("width", width)
		.attr("height", height);

		svg.append("defs").append("path")
		.datum({type: "Sphere"})
		.attr("id", "sphere")
		.attr("d", path);

		svg.append("use")
		.attr("class", "stroke")
		.attr("xlink:href", "#sphere");

		svg.append("use")
		.attr("class", "fill")
		.attr("xlink:href", "#sphere");

		svg.append("path")
		.datum(graticule)
		.attr("class", "graticule")
		.attr("d", path);

		d3.json("data/world.json", function(error, world) {
			if (error) throw error;

			projection.precision(0);

			svg.insert("path", ".graticule")
			.datum(topojson.feature(world, world.objects.land))
			.attr("class", "land")
			.attr("d", path);

			svg.insert("path", ".graticule")
			.datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
			.attr("class", "boundary")
			.attr("d", path);
		});

	}