function createChart(datavals, width, height, scale, forceStrength, padding){
	var svg = d3.select("#chart")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")
	
	var radiusScale = d3.scaleSqrt().domain([scale[0], scale[1]]).range([scale[2], scale[3]])
	
	var simulation = d3.forceSimulation()
		.force("xforce", d3.forceX(width/2).strength(forceStrength))
		.force("yforce", d3.forceY(height/2).strength(forceStrength))
		.force("collide", d3.forceCollide(function(d) {return radiusScale(d.value) + padding;}))
									     
	var circles = svg.selectAll(".datapoint")
		.data(datavals)
		.enter().append("circle")
		.attr("class", "datapoint")
		.attr("r", function(d){return radiusScale(d.values);})
		.attr("fill", "lightblue")
	
	simulation.nodes(datavals).on("tick", tickfunction)
	
	
	function tickfunction(){
		circles
			.attr("cx", function(d){return d.x;})
			.attr("cy", function(d){return d.y;})
	}
}

createChart([{name : "it1", value : "60"},{name : "it2", value : "40"},{name : "it3", value : "70"}], 500, 500, [1, 300, 10, 80], 0.05, 1)
