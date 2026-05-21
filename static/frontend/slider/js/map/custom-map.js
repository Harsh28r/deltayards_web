var mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#42a5b9"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

$.ajaxSetup({
    cache: true
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Google Map - Homepage
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createHomepageGoogleMap(_latitude,_longitude){
    /* setMapHeight(); */
    if( document.getElementById('map') != null ){
        $.getScript("js/map/locations.js", function(){
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 6,
                scrollwheel: false,
                center: new google.maps.LatLng(_latitude, _longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: mapStyles
            });
            var i;
            var newMarkers = [];
            for (i = 0; i < locations.length; i++) {
                var pictureLabel = document.createElement("img");
                pictureLabel.src = locations[i][7];
                var boxText = document.createElement("div");
                infoboxOptions = {
                    content: boxText,
                    disableAutoPan: false,
                    //maxWidth: 150,
                    pixelOffset: new google.maps.Size(-100, 0),
                    zIndex: null,
                    alignBottom: true,
                    boxClass: "infobox-wrapper",
                    enableEventPropagation: true,
                    closeBoxMargin: "0px 0px -8px 0px",
                    closeBoxURL: "images/map/close.png",
                    infoBoxClearance: new google.maps.Size(1, 1)
                };
                var marker = new MarkerWithLabel({
                    title: locations[i][1],
                    position: new google.maps.LatLng(locations[i][3], locations[i][4]),
                    map: map,
                    icon: 'images/map/marker.png',
                    labelContent: pictureLabel,
                    labelAnchor: new google.maps.Point(50, 0),
                    labelClass: "marker-style"
                });
                newMarkers.push(marker);
                boxText.innerHTML =
                    '<div class="thumbnail-map">' +
						'<div class="image-area overlay-black overfollow-hidden">' +
							'<a href="#">' +
							'<img src="' + locations[i][6] + '" alt="">' +
							'</a>' +
							'<div class="sale sale-position bg-primary color-white">' + locations[i][8] + '</div>' +
							'<div class="area-price price-position color-primary">' + locations[i][2] + ' <span class="color-white">' + locations[i][9] + ' /' + locations[i][10] + '</span></div>' +
						'</div>' +
						'<div class="thum-map-content">' +
							'<div class="thum-title color-secondary-a icon-primary">' +
								'<h5 class="mb-10"><a href="' + locations[i][5] + '">' + locations[i][0] + '</a></h5>' +
								'<span><i class="fa fa-map-marker" aria-hidden="true"></i>' + locations[i][1] + '</span>' +
							'</div>' +
						'</div>' +
					'</div>';
                //Define the infobox
                newMarkers[i].infobox = new InfoBox(infoboxOptions);
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        for (h = 0; h < newMarkers.length; h++) {
                            newMarkers[h].infobox.close();
                        }
                        newMarkers[i].infobox.open(map, this);
                    }
                })(marker, i));

            }
            var clusterStyles = [
                {
                    url: 'images/map/marker.png',
                    height: 60,
                    width: 60
                }
            ];
            var markerCluster = new MarkerClusterer(map, newMarkers, {styles: clusterStyles, maxZoom: 15});
            $('body').addClass('loaded');
            setTimeout(function() {
                $('body').removeClass('has-fullscreen-map');
            }, 1000);
            $('#map').removeClass('fade-map');

            //  Dynamically show/hide markers --------------------------------------------------------------

            google.maps.event.addListener(map, 'idle', function() {

                for (var i=0; i < locations.length; i++) {
                    if ( map.getBounds().contains(newMarkers[i].getPosition()) ){
                        // newMarkers[i].setVisible(true); // <- Uncomment this line to use dynamic displaying of markers

                        //newMarkers[i].setMap(map);
                        //markerCluster.setMap(map);
                    } else {
                        // newMarkers[i].setVisible(false); // <- Uncomment this line to use dynamic displaying of markers

                        //newMarkers[i].setMap(null);
                        //markerCluster.setMap(null);
                    }
                }
            });

            // Function which set marker to the user position
            function success(position) {
                var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.panTo(center);
                $('#map').removeClass('fade-map');
            }

        });
        // Enable Geo Location on button click
        $('.geo-location').on("click", function() {
            if (navigator.geolocation) {
                $('#map').addClass('fade-map');
                navigator.geolocation.getCurrentPosition(success);
            } else {
                error('Geo Location is not supported');
            }
        });
    }
}


