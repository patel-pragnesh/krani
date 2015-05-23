exports.openMainWindow = function(_tab) {
  _tab.open($.labor_window);
  Ti.API.info("This is child widow checking _tab : " +JSON.stringify(_tab));
   	$.labor_table.search = $.search_history;
	Alloy.Collections.labor.fetch();	
	
	$.labor_window.addEventListener("click", function(e){
		Alloy.Globals.openDetail(e);
		var title = e.row.title;
		Ti.API.info('input details : '+title);
		var firstname = title.split(':')[1].trim();
		var lastname = title.split(':')[2].trim();
		var name = firstname+" "+lastname.trim();
		var latitude = title.split(':')[7].trim().toString();
		var longitude = title.split(':')[8].trim().toString();
		
		
		//Alloy.Globals.UpdateMap('41.981233','-87.868259',"None");	
		
		Alloy.Globals.UpdateMap(latitude,longitude,name);
});

  
};

function transformFunction(model) {
	var currentaddr;
	var transform = model.toJSON();
	///console.log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
	transform.custom = transform.col2+"  "+transform.col3;
	transform.phone = "Phone: "+transform.col5;
	transform.email = "Email: "+transform.col6;
	
	lat1=transform.col8;
	lon1=transform.col9;
	getAddress = function(latitude,longitude, callback){
    	Titanium.Geolocation.reverseGeocoder(latitude,longitude,function(evt)
        {
            Ti.API.info("reverse geolocation result = "+JSON.stringify(evt));
        	if(callback) {
            	callback.call(null, evt);
        	}
  		});
	};
	myCallback = function(e) {
    	//myComonent.setTitle(e.places.address);
    	console.log("JSON stringify e after callback : " +JSON.stringify(e));
    	          places = e.places;
            if (places && places.length) {
						console.log("JSON stringify : "+JSON.stringify(places));
						//currentaddr = places[0].address;
							currentaddr = places.address;				
					} else {
						currentaddr = "No address found";
			}
	};
 	if (lat1 && lon1) { getAddress(lat1,lon1, myCallback);};
	transform.address = "Lat: "+transform.col8+" , Lon:"+transform.col9;
	//transform.address = currentaddr?currentaddr:'No updated address';
	
	return transform;
}

function checkAllLoc() {
	Alloy.Globals.UpdateMap('all','all',"all");
}

function updateLoc() {
	Alloy.Globals.CheckLoc();
}
