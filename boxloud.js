!(function (d3) {

    $("acontent").empty();

    

var labels = true; // show the text labels beside individual boxplots?
var margin = {top: 30, right: 50, bottom: 70, left: 50};
var  width = 800 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;
	
var min = Infinity,
    max = -Infinity;
	
// parse in the data	
d3.csv("johnchrys.github.io/box2.csv", function(error, csv) {
	// using an array of arrays with
	// data[n][2] 
	// where n = number of columns in the csv file 
	// data[i][0] = name of the ith column
	// data[i][1] = array of values of ith column
	var data = [];
	data[0] = [];
	data[1] = [];
	data[2] = [];
    data[3] = [];
    data[4] = [];
    data[5] = [];
    data[6] = [];
    data[7] = [];
    data[8] = [];
    data[9] = [];
    data[10] = [];
    data[11] = [];

	// add more rows if your csv file has more columns
	// add here the header of the csv file
	data[0][0] = "A";
	data[1][0] = "Bb";
	data[2][0] = "B";
    data[3][0] = "C";
    data[4][0] = "Dd";
    data[5][0] = "D";
    data[6][0] = "Ed";
    data[7][0] = "E";
    data[8][0] = "F";
    data[9][0] = "Gd";
    data[10][0] = "G";
    data[11][0] = "Ad";






	// add more rows if your csv file has more columns
	data[0][1] = [];
	data[1][1] = [];
	data[2][1] = [];
    data[3][1] = [];
    data[4][1] = [];
    data[5][1] = [];
    data[6][1] = [];
    data[7][1] = [];
    data[8][1] = [];
    data[8][1] = [];
    data[9][1] = [];
    data[10][1] = [];
    data[11][1] = [];

	csv.forEach(function(x) {
		var v1 = Math.floor(x.A),
			v2 = Math.floor(x.Bb),
			v3 = Math.floor(x.B),
            v4 = Math.floor(x.C);
            v5 = Math.floor(x.Dd);
            v6 = Math.floor(x.D);
            v7 = Math.floor(x.Ed);
            v8 = Math.floor(x.E);
            v9 = Math.floor(x.F);
            v10 = Math.floor(x.Gd);
            v11 = Math.floor(x.G);
            v12 = Math.floor(x.Ad);


			// add more variables if your csv file has more columns
			
		var rowMax = Math.max(v1, Math.max(v2, Math.max(v3,v4)));
		var rowMin = Math.min(v1, Math.min(v2, Math.min(v3,v4)));
		data[0][1].push(v1);
		data[1][1].push(v2);
		data[2][1].push(v3);
        data[3][1].push(v4);
        data[4][1].push(v5);
        data[5][1].push(v6);
        data[6][1].push(v7);
        data[7][1].push(v8);
        data[8][1].push(v9);
        data[9][1].push(v10);
        data[10][1].push(v11);
        data[11][1].push(v12);
        

		 // add more rows if your csv file has more columns
		 
		if (rowMax > max) max = rowMax;
		if (rowMin < min) min = rowMin;	
	});
  
	var chart = d3.box()
		.whiskers(iqr(1.5))
		.height(height)	
		.domain([min, max])
		.showLabels(labels);
	var svg = d3.select("acontent").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.attr("class", "box")    
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	// the x-axis
	var x = d3.scale.ordinal()	   
		.domain( data.map(function(d) { console.log(d); return d[0] } ) )	    
		.rangeRoundBands([0 , width], 0.7, 0.3); 		
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");
	// the y-axis
	var y = d3.scale.linear()
		.domain([min, max])
		.range([height + margin.top, 0 + margin.top]);
	
	var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
	// draw the boxplots	
	svg.selectAll(".box")	   
      .data(data)
	  .enter().append("g")
		.attr("transform", function(d) { return "translate(" +  x(d[0])  + "," + margin.top + ")"; } )
      .call(chart.width(x.rangeBand())); 
	
	      
	// add a title
	svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "18px");
      
 
	 // draw y axis
	svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.append("text") // and text1
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .style("font-size", "16px") 
		  .text("Loudness");		
	
	// draw x axis	
	svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height  + margin.top + 10) + ")")
      .call(xAxis)
	  .append("text")             // text label for the x axis
        .attr("x", (width / 2) )
        .attr("y",  10 )
		.attr("dy", ".71em")
        .style("text-anchor", "middle")
		.style("font-size", "16px") 
        .text("Key"); 
});
// Returns a function to compute the interquartile range.
function randomize(d) {
    if (!d.randomizer) d.randomizer = randomizer(d);
    return d.map(d.randomizer);
  }
  
  function randomizer(d) {
    var k = d3.max(d) * .02;
    return function(d) {
      return Math.max(min, Math.min(max, d + k * (Math.random() - .5)));
    };
  }
  
  
function iqr(k) {
  return function(d, i) {
    var q1 = d.quartiles[0],
        q3 = d.quartiles[2],
        iqr = (q3 - q1) * k,
        i = -1,
        j = d.length;
    while (d[++i] < q1 - iqr);
    while (d[--j] > q3 + iqr);
    return [i, j];
  };
}

})(d3);
