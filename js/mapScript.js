var map;

function initialize() {
  var longitude;
  var latitude;	
  var mapOptions = {
    zoom: 10
  };
   var useragent = navigator.userAgent;
   var mapdiv = document.getElementById("map-canvas");

          if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
            mapdiv.style.width = '100%';
            mapdiv.style.height = '100%';
          } else {
            mapdiv.style.width = '100%';
            mapdiv.style.height = '600px';
          }

   map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
     longitude=position.coords.latitude;
     latitude=latitude;

      var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'Current Location'
        });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);s
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

 function handleNoGeolocation(errorFlag) {
   if (errorFlag) {
     var content = 'Error: The Geolocation service failed.';
   } else {
     var content = 'Error: Your browser doesn\'t support geolocation.';
   }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);