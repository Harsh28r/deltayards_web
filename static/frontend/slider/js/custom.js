

//----------------------------------------------------------------------------------
//  Tooltip
//	Table of Js
//  Auto active class adding with navigation
//  Layer Slider Testimonial
//  Navbar scrolling Header Fixed
//  Dropdown submenu on hover in desktopand dropdown sub menu on click in mobile
//  Scroll Top
//  Owl Carousal Slider Style One
//  Owl Carousal Slider Style Two
//  Owl Carousal Slider Style Three
//  Owl Carousal Slider Style Four
//  Owl Carousal Slider Style Five
//  Owl Carousal Slider Style Six
//  Owl Carousal Neighborhoods Slider
//  Owl Carousal Partners Slider
//  Owl Carousal Hot Property Slider
//  Search Bar Main Menu
//  Put slider space for nav not in mini screen
//  Fact Counter For Achivement Counting
//  Elements WoW Animation
//	Full Screen Map Height
//  Focus input 
//	Show pass
//  Pricing bar Filter
//  Area Range
//  Star Rating Creator
//----------------------------------------------------------------------------------
// Cache jQuery Selector
//=====================================================================================

(function ($) {
    "use strict";
	
	// Cache jQuery Selector
	//----------------------------------------------------------------------------------
	var $window   		= $(window),
		$dropdown  		= $('.dropdown-toggle'),
        $contact 		= $('#contact-form');

	//  Tooltip
	//----------------------------------------------------------------------------------
    $(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});
    //  Auto active class adding with navigation
	//----------------------------------------------------------------------------------
    $window.on('load', function() {
        var current = location.pathname;
        var $path = current.substring(current.lastIndexOf('https://themetrading.com/') + 1);
        $('#navbarSupportedContent li a').each(function(e) {
            var $this = $(this);
            // if the current path is like this link, make it active
            if ($path == $this.attr('href')) {
                $this.parent('li').addClass('active');
            } else if ($path == '') {
                $('.navbar-nav > li:first-child').addClass('active');
            }
        })
    });
    //  Layer Slider Testimonial
	//----------------------------------------------------------------------------------
  	$('#layer-testimonial').layerSlider({
		sliderVersion: '6.0.0',
		type: 'fullwidth',
		responsiveUnder: 1280,
		maxRatio: 1,
		slideBGSize: 'auto',
		hideUnder: 0,
		hideOver: 100000,
		skin: 'noskin',
		globalBGRepeat: 'repeat',
		globalBGAttachment: 'fixed',
		globalBGSize: 'contain',
		width: 1280,
		skinsPath: 'images/slider/skins/'
	});
	// Navbar scrolling Header Fixed
	//----------------------------------------------------------------------------------
    $window.on("scroll",function () {

      var bodyScroll = $window.scrollTop(),
        navbar = $("header");
      if(bodyScroll > 250){
        navbar.addClass("header-fixed");
      }else{
        navbar.removeClass("header-fixed");
      }

    });
    // Navbar scrolling Header Fixed
	//----------------------------------------------------------------------------------
    $window.on("scroll",function () {

      var bodyScroll = $window.scrollTop(),
        navbar = $(".dropdown-up");
      if(bodyScroll > 999){
        navbar.addClass("header-fixed");
      }else{
        navbar.removeClass("header-fixed");
      }

    });
	// Dropdown submenu on hover in desktopand dropdown sub menu on click in mobile
	//----------------------------------------------------------------------------------
	$('#navbarSupportedContent').each(function() {
		$dropdown.on('click', function(){
			if($window.width() < 992){
				if($(this).parent('.dropdown').hasClass('visible')){
					$(this).parent('.dropdown').children('.dropdown-menu').first().stop(true, true).slideUp(300);
					$(this).parent('.dropdown').removeClass('visible');
				}
				else{
					$(this).parent('.dropdown').children('.dropdown-menu').stop(true, true).slideDown(300);
					$(this).parent('.dropdown').addClass('visible');
				}
			}
		});
		
		$window.on('resize', function(){
			if($window.width() > 991){
				$('.dropdown-menu').removeAttr('style');
				$('.dropdown ').removeClass('visible');
			}
		});
		
	});

	// Scroll Top
	//----------------------------------------------------------------------------------
    $(window).scroll(function(){ 
	    if ($(this).scrollTop() > 800) { 
	      $('#scroll').fadeIn(); 
	    } else { 
	      $('#scroll').fadeOut(); 
	    } 
	  }); 
	  $('#scroll').click(function(){ 
	    $("html, body").animate({ scrollTop: 0 }, 1000); 
	    return false; 
    });
    // Owl Carousal Slider Style One
	//----------------------------------------------------------------------------------
	$('.slide-1').owlCarousel({
		 loop: true,
		 autoplay:true,
	     smartSpeed:1500,
	     autoplayTimeout:5000,
	     autoplayHoverPause:true,
		 margin: 0,
		 dots: true,
		 nav: false,
		 navText: ['<span class="fa fa-long-arrow-left"></span>','<span class="fa fa-long-arrow-right"></span>'],
		 responsive:{

		    0:{
		      items:1
		    }
	  	}
      
 	});
	// Owl Carousal Slider Style Two
	//----------------------------------------------------------------------------------
	$('.slide-2').owlCarousel({
		 loop: true,
		 autoplay:true,
	     smartSpeed:1500,
	     autoplayTimeout:5000,
	     autoplayHoverPause:true,
		 margin: 30,
		 dots: true,
		 nav: false,
		 navText: ['<span class="fa fa-long-arrow-left"></span>','<span class="fa fa-long-arrow-right"></span>'],
		 responsive:{

		    0:{
		      items:1
		    },
		    600:{
		      items:1
		    },
		    1024:{
		      items:2
		    },
		    1200:{
		      items:2
		    }
	  	}
      
 	});
  	// Owl Carousal Slider Style Three
	//----------------------------------------------------------------------------------
	$('.slide-3').owlCarousel({
		 loop: true,
		 autoplay:false,
	     smartSpeed:1500,
	     autoplayTimeout:5000,
	     autoplayHoverPause:true,
	     responsiveClass:true,
		 margin: 30,
		 dots: false,
		 nav: true,
		 navText: ['<span class="fa fa-long-arrow-left"></span>','<span class="fa fa-long-arrow-right"></span>'],
		 responsive:{

		    0:{
		      items:1
		    },
		    600:{
		      items:1
		    },
		    767:{
		      items:2
		    },
		    1024:{
		      items:2
		    },
		    1200:{
		      items:3
		    }
	  	}
 	});
 	// Owl Carousal Slider Style Four
	//----------------------------------------------------------------------------------
	$('.slide-4').owlCarousel({
		 loop: true,
		 autoplay:false,
	     smartSpeed:1500,
	     autoplayTimeout:5000,
	     autoplayHoverPause:true,
		 margin: 30,
		 dots: false,
		 nav: true,
		 navText: ['<span class="fa fa-long-arrow-left"></span>','<span class="fa fa-long-arrow-right"></span>'],
		 responsive:{

		    0:{
		      items:1
		    },
		    600:{
		      items:2
		    },
		    1024:{
		      items:3
		    },
		    1200:{
		      items:4
		    }
	  	}
      
 	});

 	// Owl Carousal Slider Style Five
	//----------------------------------------------------------------------------------
	$('.slide-5').owlCarousel({
		 loop: true,
		 autoplay:true,
	     smartSpeed:1500,
	     autoplayTimeout:5000,
	     autoplayHoverPause:true,
		 margin: 30,
		 dots: false,
		 nav: false,
		 navText: ['<span class="fa fa-long-arrow-left"></span>','<span class="fa fa-long-arrow-right"></span>'],
		 responsive:{

		    0:{
		      items:1
		    },
		    600:{
		      items:2
		    },
		    750:{
		      items:3
		    },
		    1024:{
		      items:4
		    },
		    1200:{
		      items:5
		    }
	  	}
 	});

	// Owl Carousal Slider Style Six
	//----------------------------------------------------------------------------------
	$('.slide-6').owlCarousel({
		 loop: true,
		 autoplay:true,
	     smartSpeed:1500,
	     autoplayTimeout:5000,
	     autoplayHoverPause:true,
		 margin: 30,
		 dots: true,
		 nav: false,
		 navText: ['<span class="fa fa-long-arrow-left"></span>','<span class="fa fa-long-arrow-right"></span>'],
		 responsive:{

		    0:{
		      items:1
		    },
		    600:{
		      items:1
		    },
		    1024:{
		      items:2
		    },
		    1200:{
		      items:2
		    }
	  	}
      
 	});
 	// Owl Carousal Neighborhoods Slider
	//----------------------------------------------------------------------------------
	$('.neighborhoods').owlCarousel({
		 loop: true,
		 autoplay:true,
	     smartSpeed:1500,
	     autoplayTimeout:5000,
	     autoplayHoverPause:true,
		 margin: 30,
		 dots: false,
		 nav: true,
		 navText: ['<span class="fa fa-long-arrow-left"></span>','<span class="fa fa-long-arrow-right"></span>'],
		 responsive:{

		    0:{
		      items:1
		    },
		    600:{
		      items:1
		    },
		    767:{
		      items:2
		    },
		    1024:{
		      items:2
		    },
		    1200:{
		      items:3
		    }
	  	}
 	});

 	// Owl Carousal Partners Slider
	//----------------------------------------------------------------------------------
	$('.partners').owlCarousel({
		 loop: true,
		 autoplay:true,
	     smartSpeed:1500,
	     autoplayTimeout:5000,
	     autoplayHoverPause:true,
		 margin: 30,
		 dots: false,
		 nav: false,
		 navText: ['<span class="fa fa-long-arrow-left"></span>','<span class="fa fa-long-arrow-right"></span>'],
		 responsive:{

		    0:{
		      items:2
		    },
		    600:{
		      items:2
		    },
		    768:{
		      items:4
		    },
		    1024:{
		      items:3
		    },
		    1200:{
		      items:3
		    }
	  	}
 	});
	// Owl Carousal Hot Property Slider
	//----------------------------------------------------------------------------------
 	$('.hot-property').owlCarousel({
	     loop: true,
	     center: true,
	     items:2,
	     loop:true,
		 autoplay:true,
	     smartSpeed:1500,
	     autoplayTimeout:5000,
	     autoplayHoverPause:true,
		 margin: 5,
		 dots: false,
		 nav: true,
		 navText: ['<span class="fa fa-long-arrow-left"></span>','<span class="fa fa-long-arrow-right"></span>'],
		 responsive:{

		    0:{
		      items:1
		    },
		    600:{
		      items:1
		    },
		    1024:{
		      items:3
		    },
		    1200:{
		      items:4
		    }
	  	}
	});
 	// Search Bar Main Menu
	//----------------------------------------------------------------------------------
	$(document).ready(function() {
		$('.search-field .fa-search').click(function() {
				$('.search-field .search').addClass('show');
				$('.search-field .fa-search').css({
						'display': 'none'
				});
				$('.search-field .fa-times').css({
						'display': 'block'
				});
		});
		$('.search-field .fa-times').click(function() {
				$('.search-field .search').removeClass('show').val('');
				$('.search-field .fa-times').css({
						'display': 'none'
				});
				$('.search-field .fa-search').css({
						'display': 'block'
				});

		});
	});

	// Put slider space for nav not in mini screen
	//----------------------------------------------------------------------------------
	if(document.querySelector('.nav-on-top') !== null) {
		var get_height = jQuery('.nav-on-top').height();
		if(get_height > 0 && $window.width() > 992){
			jQuery('.nav-on-top').next().css('margin-top', get_height);
		}
		$window.on('resize', function(){
			if($window.width() < 992){
				jQuery('.nav-on-top').next().css('margin-top', '0');
			}
			else {
				jQuery('.nav-on-top').next().css('margin-top', get_height);
			}
		});
	 }
	 if(document.querySelector('.nav-on-banner') !== null) {
		var get_height = jQuery('.nav-on-banner').height();
		if(get_height > 0 && $window.width() > 992){
			jQuery('.page-banner').css('padding-top', get_height);
		}
		$window.on('resize', function(){
			if($window.width() < 992){
				jQuery('.page-banner').css('padding-top', '0');
			}
			else {
				jQuery('.page-banner').css('padding-top', get_height);
			}
		});
	}

	//  Fact Counter For Achivement Counting
  	//----------------------------------------------------------------------------------
  	function factCounter() {
	    if($('.fact-counter').length){
	      $('.fact-counter .count.animated').each(function() {
	    
	        var $t = $(this),
	          n = $t.find(".count-num").attr("data-stop"),
	          r = parseInt($t.find(".count-num").attr("data-speed"), 10);
	          
	        if (!$t.hasClass("counted")) {
	          $t.addClass("counted");
	          $({
	            countNum: $t.find(".count-text").text()
	          }).animate({
	            countNum: n
	          }, {
	            duration: r,
	            easing: "linear",
	            step: function() {
	              $t.find(".count-num").text(Math.floor(this.countNum));
	            },
	            complete: function() {
	              $t.find(".count-num").text(this.countNum);
	            }
	          });
	        }
	        
	        //set skill building height

	          var size = $(this).children('.progress-bar').attr('aria-valuenow');
	          $(this).children('.progress-bar').css('width', size+'%');

	        
	      });
	    }
  	}

    $window.on('scroll', function() {
		factCounter();
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

	//	Full Screen Map Height
	//----------------------------------------------------------------------------------
	$window.on('resize', function(){
		setMapHeight();
	});
	
	function setMapHeight(){
		var $body = $('body');
		if($body.hasClass('full-page-map')) {
			$('#map').height($window.height() - $('header').height());
		}
	}
	
	setMapHeight();
	//Slide Up Advance Search Form On Map
	$('.form-up-btn').each(function(){
		$(this).on('click',function(e){
			if($('#find-location').is(".open"))
			{
				$('#find-location').removeClass("open");
				setTimeout(function(){$('#map-banner').removeClass("visible")},0);
			}
			else
			{
				$('#find-location').addClass("open");
				setTimeout(function(){
					$('#map-banner').addClass("visible")
				},400);
			}
		e.preventDefault();
		});
	});
	
	// Focus input 
	//--------------------------------------------
	$('.form-control').each(function(){
	    $(this).on('blur', function(){
	        if($(this).val().trim() != "") {
	            $(this).addClass('has-val');
	        }
	        else {
	            $(this).removeClass('has-val');
	        }
	    })    
	})
	
    //	Show pass
    //--------------------------------------------
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('fa-eye');
            $(this).find('i').addClass('fa-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('fa-eye');
            $(this).find('i').removeClass('fa-eye-off');
            showPass = 0;
        }
        
    });
	// Pricing bar Filter
	//----------------------------------------------------------------------------------
	$(".filter_price").slider({ 
		from: 0,
		to: 1000000,
		step: 1000,
		smooth: true,
		round: 0,
		dimension: "$",
		skin: "plastic" 
	});
	// Area Range
	//----------------------------------------------------------------------------------
	$("#filter_sqft").slider({
	   from: 100, 
	   to: 100000, 
	   step: 100, 
	   smooth: true, 
	   round: 0, 
	   dimension: "&nbsp; sqft", 
	   skin: "plastic" 
	});

	//  Star Rating Creator
	//----------------------------------------------------------------------------------
	function ratingEnable() {

        $('#example-reversed').barrating('show', {
            theme: 'bars-reversed',
            showSelectedRating: true,
        });

    ratingEnable();
    }


    //  Contact Form Validation
	//------------------------------------------------
	if($contact.length){
	    $contact.validate({  //#contact-form contact form id
	      rules: {
	        name: {
	          required: true    // Field name here
	        },
	        email: {
	          required: true, // Field name here
	          email: true
	        },
	        subject: {
	          required: true
	        },
	        message: {
	          required: true
	        }
	      },
	      
	      messages: {
	                name: "Please enter your Name", //Write here your error message that you want to show in contact form
	                email: "Please enter valid Email", //Write here your error message that you want to show in contact form
	                subject: "Please enter your Subject", //Write here your error message that you want to show in contact form
	                message: "Please write your Message" //Write here your error message that you want to show in contact form
	            },

	            submitHandler: function (form) {
	                $('#send').attr({'disabled' : 'true', 'value' : 'Sending...' });
	                $.ajax({
	                    type: "POST",
	                    url: "email.php",
	                    data: $(form).serialize(),
	                    success: function () {
	                        $('#send').removeAttr('disabled').attr('value', 'Send');
	                        $( "#success").slideDown( "slow" );
	                        setTimeout(function() {
	                        $( "#success").slideUp( "slow" );
	                        }, 5000);
	                        form.reset();
	                    },
	                    error: function() {
	                        $('#send').removeAttr('disabled').attr('value', 'Send');
	                        $( "#error").slideDown( "slow" );
	                        setTimeout(function() {
	                        $( "#error").slideUp( "slow" );
	                        }, 5000);
	                    }
	                });
	                return false; // required to block normal submit since you used ajax
	            }

	    });
	  }

})(jQuery);