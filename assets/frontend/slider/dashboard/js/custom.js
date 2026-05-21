
(function ($) {
    "use strict";
	
	// Cache jQuery Selector
	//----------------------------------------------------------------------------------
	var $window   		= $(window)
	
	//  Auto active class adding with navigation
	//----------------------------------------------------------------------------------
    $window.on('load', function() {
        var current = location.pathname;
        var $path = current.substring(current.lastIndexOf('https://themetrading.com/') + 1);
        $('.list-unstyled li a').each(function(e) {
            var $this = $(this);
            // if the current path is like this link, make it active
            if ($path == $this.attr('href')) {
                $this.parent('li').addClass('active');
            } else if ($path == '') {
                $('.list-unstyled li:first-child').addClass('active');
            }
        })
    });
    // Circle Progress Bar
    //----------------------------------
    $(".circle_percent").each(function() {
    var $this = $(this),
		$dataV = $this.data("percent"),
		$dataDeg = $dataV * 3.6,
		$round = $this.find(".round_per");
		$round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");	
		$this.append('<div class="circle_inbox"><span class="percent_text"></span></div>');
		$this.prop('Counter', 0).animate({Counter: $dataV},
		{
			duration: 2000, 
			easing: 'swing', 
			step: function (now) {
	            $this.find(".percent_text").text(Math.ceil(now)+"%");
	        }
	    });
		if($dataV >= 51){
			$round.css("transform", "rotate(" + 360 + "deg)");
			setTimeout(function(){
				$this.addClass("percent_more");
			},1000);
			setTimeout(function(){
				$round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");
			},1000);
		} 
	});
    // Earning Comparison Chart
	//---------------------------------------------
    var ctx = $("#line-chart");
	var lineChart = new Chart(ctx, {
	  type: 'line',
	  data: {
	    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	    datasets: [
	      {
	        label: "2019",
	        backgroundColor: "white",
	        borderWidth: 1,
	        borderColor: "#8463FF",
	        fill: false,
	        data: [6,10,9,6,14,12,16,13,9,7,6,10]
	      },
	      {
	        label: "2020",
	        backgroundColor: "white",
	        borderWidth: 1,
	        borderColor: "#fd9834",
	        fill: false,
	        data: [10,8,6,5,12,8,16,17,6,7,6,10]
	      }
	    ]
	  },
	  options: {
	    maintainAspectRatio: false,
	    scales: {
	      yAxes: [{stacked: true}]
	    }
	  }
	});
	// Pie Chart (Top 5 Countries)
	//---------------------------------------------
	var oilCanvas = document.getElementById("oilChart");
	Chart.defaults.global.defaultFontFamily = "Montserrat";
	Chart.defaults.global.defaultFontSize = 16;
	var oilData = {
	    labels: [
	        "America",
	        "Russia",
	        "Australia",
	        "Canada"
	    ],
	    datasets: [
	        {
	            data: [95.3, 86.2, 52.2, 58.2],
	            backgroundColor: [
	                "#fd9834",
	                "#8463FF",
	                "#ff6a6a",
	                "#6384FF"
	            ]
	        }]
	};

	var pieChart = new Chart(oilCanvas, {
	  type: 'pie',
	  data: oilData
	});
    // Visitors Appearance Chart
	//---------------------------------------------
    var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart(ctx, {
	  type: 'bar',
	  data: {
	    labels: ["M", "T", "W", "T", "F", "S", "S"],
	    datasets: [{
	      label: 'Agents',
	      data: [12, 19, 3, 17, 28, 24, 7],
	      backgroundColor: "rgba(299,155,32,1)"
	    }, {
	      label: 'Customers',
	      data: [30, 29, 5, 5, 20, 3, 10],
	      backgroundColor: "rgba(253,152,52,1)"
	    }]
	  }
	});

	// Analitics Chart
	//---------------------------------------------
	var data = {
	  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	  datasets: [{
	    label: "Property Submitted, 2020",
	    backgroundColor: "rgba(253,152,52,0.2)",
	    borderColor: "rgba(253,152,52,1)",
	    borderWidth: 2,
	    hoverBackgroundColor: "rgba(253,152,52,0.9)",
	    hoverBorderColor: "rgba(253,152,52,1)",
	    data: [65, 59, 20, 81, 56, 55, 40, 46, 56, 85, 76, 95],
	  }]
	};

	var options = {
	  maintainAspectRatio: false,
	  scales: {
	    yAxes: [{
	      stacked: true,
	      gridLines: {
	        display: true,
	        color: "rgba(253,152,52,0.2)"
	      }
	    }],
	    xAxes: [{
	      gridLines: {
	        display: false
	      }
	    }]
	  }
	};

	Chart.Bar('chart', {
	  options: options,
	  data: data
	});


	// Elements WoW Animation
	//----------------------------------------------------------------------------------
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}


	// Color Map js
	//---------------------------------------------
	
})(jQuery);