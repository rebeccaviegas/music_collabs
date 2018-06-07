/* 	
	
	
	The purpose of this code is to provide a visual representation of popular recording artists and how many collaborations they have produced with each other. The two categories represent male and female recording artists, and there are yellow lines to represent a connection between artists in a different category, and green lines to show collaborations within the same gender category.

	The purpose of the transition is to enhance the colour properties of the chart, fading to a black background from white, and animating the green and yellow lines (repesenting the connections) to show the large amount of connections between all artists from different categories. The circles also animate in to further define colour and size of each artist. 

*/

window.onload = function () {
	
	var drawOptions = {		
		
		// dimensions of svg element 
		SVG_WIDTH:        800,
		SVG_HEIGHT:       600,	

		SHRINK_FACTOR: .5,

		BIG_CIRCLE: 200

	};

	var SPACE = 60;

	//main data set
	var recordingArtists = [
		{
			name: 	 'Rihanna',
			sym:     'RF',
			gender: 'female', 
			netWorth: 230
		}
		,
		{
			name: 	 'Beyonce',
			sym:     'BK', 
			gender: 'female', 
			netWorth: 350	
		}
		,
		{
			name: 	 'Nicki Minaj',
			sym:     'NM',
			gender: 'female', 
			netWorth: 75		
		}
		,
		{
			name:	'Alicia Keys',
			sym:	'AK',
			gender: 'female', 
			netWorth: 70
		}
		,
		{
			name:	'Jay-Z',
			sym:	'JZ',
			gender: 'male', 
			netWorth: 810
		}
		,
		{
			name:	'Kanye West',
			sym:	'KW',
			gender: 'male', 
			netWorth: 145
		}
		,
		{
			name:	'Drake',
			sym:	'DG',
			gender: 'male', 
			netWorth: 90
		}
		,
		{
			name:	'Eminem',
			sym:	'EM',
			gender: 'male', 
			netWorth: 190
		}
	];	

	//connections that represent artists that have collaborated on a song together
	var connections = [
		//cross category connections
		{
			source: 'BK',
			target: 'JZ',
			num: 15
		}
		,
		{
			source:'BK',
			target:'KW',
			num: 3

		}
		,
		{
			source:'BK',
			target:'DG',
			num: 1
		}
		,
		{
			source:'AK',
			target:'JZ',
			num:1
		}
		,
		{
			source:'NM',
			target:'JZ',
			num:1
		}
		,
		{
			source:'NM',
			target:'KW',
			num: 2
		}
		,
		{
			source:'NM',
			target:'EM',
			num: 1
		}
		,
		{
			source:'NM',
			target:'DG',
			num:6
		}
		,
		{
			source:'RF',
			target:'JZ',
			num:3
		}
		,
		{
			source:'RF',
			target:'KW',
			num: 2
		}
		,
		{
			source:'RF',
			target:'EM',
			num: 2
		}
		,
		{
			source:'RF',
			target:'DG',
			num: 4
		}
		,
		//same category connections - female
		{
			source:'BK',
			target:'NM',
			num: 2
		}
		,
		{
			source:'BK',
			target:'AK',
			num: 1
		}
		,
		{
			source:'RF',
			target:'NM',
			num: 2
		}
		,
		{
			source:'AK',
			target:'NM',
			num: 1
		}
		,
		//same category connections - male
		{
			source:'JZ',
			target:'KW',
			num: 17
		}
		,
		{
			source:'JZ',
			target:'EM',
			num: 1
		}
		,
		{
			source:'KW',
			target:'DG',
			num: 1
		}
		,
		{
			source:'KW',
			target:'EM',
			num: 1
		}
	];
	
	//draw svg container
	d3.select('#graphicsContainer').append('svg')
				.attr('width', drawOptions.SVG_WIDTH).attr('height', drawOptions.SVG_HEIGHT);

	d3.select('svg')
				.transition()
				.duration(2000)
				.style("background-color", "black")


	//add ID "symbol" to each circle rendered 
	d3.select('svg').selectAll('circle').data(recordingArtists).enter().append('circle')
					.attr('id',function (d,i) {return recordingArtists[i].sym});

	//draw circles to represent each recording artist
	d3.select('svg').selectAll('circle')
					.attr('r',function(d,i){return Math.sqrt(d.netWorth)/drawOptions.SHRINK_FACTOR})
					.attr('cx', function(d,i) {

						return drawOptions.SVG_WIDTH/2 + drawOptions.BIG_CIRCLE * Math.sin(i * 2 * Math.PI/recordingArtists.length);

					})

					.attr('cy', function(d,i){

						return drawOptions.SVG_HEIGHT/2 + drawOptions.BIG_CIRCLE * Math.cos(i * 2 * Math.PI/recordingArtists.length);

					})

					d3.select('svg').selectAll('circle')
						.append('image')
						// .attr('xlink:href', './assets/img/beyonce.png')
						.style('background-image', 'url(./assets/img/beyonce.png)')
						.attr('class', 'artistImages')

				
	//draw lines between each connection data set			
	d3.select('svg').selectAll('line').data(connections).enter().append('line')
					.attr('id', function(d,i)
								{return d.source + "-" + d.target})

	//amend the x and y coordinates of each line to match the cx of the circle it is attached to
	d3.selectAll('line')
					.attr('x1', function(d,i){
					
						var srcCircle = d3.select('#' + d.source);
						return srcCircle.attr('cx');
					})

					.attr('y1', function(d,i){

						var srcCircle = d3.select('#' + d.source);
						return srcCircle.attr('cy');					
					})

					.attr('x2', function(d,i){

						var tgtCircle = d3.select('#' + d.target);
						return tgtCircle.attr('cx');
					})
					
					.attr('y2', function(d,i){

						var tgtCircle = d3.select('#' + d.target);
						return tgtCircle.attr('cy');
					}
					
				)
				.style("opacity", 0)
				.style("stroke-width",3)
				.style("stroke", function(d,i){
					
					var srcCircle = d3.select('#' + d.source);
					var tgtCircle = d3.select('#' + d.target);
					
					if(d3.select('#' + d.source).datum().gender !== d3.select('#' + d.target).datum().gender){

											return "#FFB900";

					}else if(d3.select('#' + d.source).datum().gender === d3.select('#' + d.target).datum().gender){

											return "#08BA00";
										}
											
								})
				.lower();


	d3.selectAll('line')
				.transition()
				.delay(1000)
				.duration(2000)
				.style("opacity", 1)

			//changing the color of each circle based on the artist's gender
			d3.select('svg').selectAll('circle')
					.style("opacity", 0)
					.attr('fill',
						function(d,i){

							var thisCircle = d3.select(this);
							if(d.gender === "female"){
								return "#820333";

							}else{

								return "#0071BC";
							}

						}
					)

			d3.selectAll('circle')
					.transition()
					.ease(d3.easeLinear)
					.delay(1000)
					.duration(1000)
					.style("opacity", 1)

		//adding additional functions to seperate the dragging functions into start, drag and end. 
		d3.selectAll('circle').call(d3.drag()
								.on('start', displayName)
								.on('drag', dragCircle)
								.on('end', removeName));

	
		//display title and change stroke with on mouseover
		d3.selectAll('line').on("mouseover", displayCrossingInfo)
		
			function displayCrossingInfo(d,i){
			
				var thisLine = d3.select(this);

				thisLine.style("stroke-width",5)
							
				var textX = thisLine.attr('cx') - thisLine.attr('r');
				var textY = thisLine.attr('cy') - thisLine.attr('r');
						

				d3.selectAll("line")
					.append('title')
					.text(function(d,i){
		
						if(d.num === 1){

							return d3.select('#' + d.source).datum().name + " and " + d3.select('#' + d.target).datum().name + " have produced " + d.num + " collaboration.";

						}else if(d.num > 1){

							return d3.select('#' + d.source).datum().name + " and " + d3.select('#' + d.target).datum().name + " have produced " + d.num + " collaborations.";	

						}
					})									
				}

	//display name of musical artist on mouseover circle
	d3.selectAll('circle').on("mouseover", displayArtistInfo)

	//display name function
	function displayArtistInfo(d, i) {

		var thisCircle = d3.select(this);

		console.log(recordingArtists[i].name);

		d3.selectAll('circle')
			.append('title')
			.text(function(d,i){

				//displays the name of the artist if you hover over
				return recordingArtists[i].name;

			})

			
	}
	

	
		// d3.selectAll('circle')
		// 	.append('title')
		// 	.text(function(d,i){

		// 		return recordingArtists[i].name;
		// 	})

		// }

		// thisCircle.style("stroke", "2px solid white")

		// var textX = thisLine.attr('cx') - thisLine.attr('r');
		// var textY = thisLine.attr('cy') - thisLine.attr('r');

		// d3.selectAll("circle")
		// 	.append('name')
		// 	.text(function (d, i) {

		// 		if (d.num === 1) {

		// 			return d3.select('#' + d.source).datum().name + " and " + d3.select('#' + d.target).datum().name + " have produced " + d.num + " collaboration.";

		// 		} else if (d.num > 1) {

		// 			return d3.select('#' + d.source).datum().name + " and " + d3.select('#' + d.target).datum().name + " have produced " + d.num + " collaborations.";

		// 		}
		// 	})


		//remove stroke width and return to normal on moust out
		d3.selectAll('line').on("mouseout", removeStroke)

				function removeStroke(d,i){

					var thisLine = d3.select(this);

					thisLine.style("stroke-width", 3)

				}
	
		//drag circle
		function dragCircle(d){

			var thisCircle = d3.select(this);

			thisCircle.attr('cx', d3.event.x).attr('cy', d3.event.y);

			d3.selectAll('line')
				.attr('x1',
					function (d,i){

						if(d.source === thisCircle.attr('id')){

							return thisCircle.attr('cx');

						}else{

							return d3.select(this).attr('x1');
						}
					}
				)

				.attr('y1', 
					
					function(d,i){
						if(d.source === thisCircle.attr('id')){

							return thisCircle.attr('cy');

						}else{

							return d3.select(this).attr('y1');

						}
					}
			
				)

				.attr('x2', 
					
					function(d,i){
						
						if(d.target === thisCircle.attr('id')){
					
							return thisCircle.attr('cx');
					
						}else{
					
							return d3.select(this).attr('x2');
					
						}
					}
								
				)

				.attr('y2', 
										
					function(d,i){
						
						if(d.target === thisCircle.attr('id')){
										
							return thisCircle.attr('cy');
										
						}else{
										
							return d3.select(this).attr('y2');
										
						}
					}
								
				);
						
			
				d3.selectAll('text')
				
                    .attr('x', function(d,i){

                        return thisCircle.attr('cx');

                    	}
                        
                    )
                    .attr('y', function(d,i){

                        return (thisCircle.attr('cy') + SPACE);
                    
						}
                        
                    )
		};


				//display name function
				function displayName (d){

					//set reference to circle being dragged via "this"
					var thisCircle = d3.select(this);

					var textX = thisCircle.attr('cx') - thisCircle.attr('r');
					var textY = thisCircle.attr('cy') - thisCircle.attr('r');

					d3.select('svg')
						.append('text')
						.attr('id', 'dragName')
						.attr('x', textX)
						.attr('y', textY)
						.text(d.name)
						.attr('fill', '#fff')
						.style('font-family', 'Raleway')
						.attr('font-size', 20);
                        
                }
                
                function removeName(d){

                    d3.select('#dragName').remove();

					}

                        
}

