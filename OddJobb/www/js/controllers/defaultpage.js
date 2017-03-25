myApp.onPageInit('defaultpage', function (page) {
    myApp.params.swipePanel = false;
	new GMaps({
	  div: '#map',
	  lat: -12.043333,
	  lng: -77.028333 
	}); 
	$$('#addressButton').on('click', function (e){
		address();
	});
});

function address(){         
GMaps.geocode({
			  address: $('#address').val(),
			  callback: function(results, status) {
				if (status == 'OK') {
				  var latlng = results[0].geometry.location;
				  map.setCenter(latlng.lat(), latlng.lng());
				  map.addMarker({
					lat: latlng.lat(),
					lng: latlng.lng()
				  });
				}
			  }
			});
}