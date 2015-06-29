// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//default var
//Initialization.
//Get Licensed
var projectsid = '1FMGrlYtWL6SUQuD-RynfEU_1kf5Yf6__ysrWsY2aAJI'; Titanium.App.Properties.setString('project',projectsid);
var clientsid = '1ECkNoyzgeSu8WkVs3kBnlY8MjJRIAc787nVs6IJsA9w'; Titanium.App.Properties.setString('client',clientsid);
var invoicesid = '1-Wz7Apn4AvVpfqcNyMgfqyKA8OAoLNy5Bl0d_jQ9IZk'; Titanium.App.Properties.setString('invoice',invoicesid);
var inventorysid = '1zq6rj-qHxYUkHY1jK2k_25I8_xWYrVOowbsp6VblixA'; Titanium.App.Properties.setString('inventory',inventorysid);
var proposalsid = '1H95ytL9cA1f3YU1Hag4GAtMUV98NyBcYqzyP04BDSwk'; Titanium.App.Properties.setString('proposal',proposalsid);
var mastersid = '1WUtkBcD1q3ezozI98w0sq42rl1TwIOTMq25Yayj-sEk'; Titanium.App.Properties.setString('master',mastersid);
var schedulesid = '1c5Nj6XOMIEtlqmHLDoyGocdNu5MRG-WQhckIseVlU2I'; Titanium.App.Properties.setString('schedule',schedulesid);
var laborsid = '1-YaHKOuTqpRG1X83_1tZ6zHWrO1krEmV99HS7S130Hc'; Titanium.App.Properties.setString('labor',laborsid);
var joblogsid = '1SLNRI176qK51rkFWWCQvqToXswdNYlqINsdB2HM0ozk'; Titanium.App.Properties.setString('joblog',joblogsid);
Titanium.App.Properties.setString('employee',"Joe Fanney");

var coName = Titanium.App.Properties.getString('coName','Jack Mow Inc.');
var coAddress =  Titanium.App.Properties.getString('coAddress',"1125 Bluemound Rd., Brookfield, WI 53222");
var coPhone = Titanium.App.Properties.getString('coPhone',"262-290-3141");;
var coFax = Titanium.App.Properties.getString('coFax',"262-290-3142");
var coEmail = Titanium.App.Properties.getString('coEmail',"sales@jackmowinc.com");

console.log("alloy.js::TempDir: "+JSON.stringify(Ti.Filesystem.tempDirectory));
			
Alloy.Globals.writeFile = function (content, filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.write(content+"\n");
};			

Alloy.Globals.appendFile = function (content, filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.append(content+"\n");
};

Alloy.Globals.readFile = function (filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.read();
};


Alloy.Globals.writeFileinJSON = function(content, filename){
	
};

Alloy.Globals.writeFile("","joblogsid.txt");

Alloy.Globals.GoogleAuth_module = require('googleAuth');

Alloy.Globals.googleAuth = new Alloy.Globals.GoogleAuth_module({
	//clientId : '219575370718-u3vb42f04899h02es4mj4uh34otgr5pe.apps.googleusercontent.com',
	clientId : '693726333078-uncq4tte4lo9vfbhl6569d3uduvnn8fd.apps.googleusercontent.com',
	clientSecret : 'CrWBzHVXAWykCWJwDT1EY-1I',
	propertyName : 'googleToken',
	quiet: false,
	scope : [ 'https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/tasks.readonly' ]
});

Alloy.Globals.UpdateMap = function(latitude,longitude,title) {
	
	var latitude = latitude;
	var longitude = longitude;
	var subtitle = "None";
	console.log("alloy.js::map obtained with latitude: "+latitude+" longitude: "+longitude);
	
  if(Ti.Platform.osname == 'android'){
  		var Map = Titanium.Map;
  		
  		var name = Map.createAnnotation({
	    latitude:latitude,
	    longitude:longitude,
	    title:title,
	    pincolor:Map.ANNOTATION_RED,
	    myid:1 // Custom property to uniquely identify this annotation.
		});

  		var mapview = Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    region: {latitude:latitude, longitude:longitude,
	            latitudeDelta:0.1, longitudeDelta:0.1},
	    animate:true,
	    regionFit:false,
	    userLocation:true,
	    annotations:[name]
	});
  	} else {
		var Map = require('ti.map');
		
		var tollPlaza0 = Map.createAnnotation({
	    latitude:latitude,
	    longitude:longitude,
	    title:title,
	    pincolor:Map.ANNOTATION_RED,
	    myid:1 // Custom property to uniquely identify this annotation.
		});
		
		var addr = [];
		if (latitude === "all" || longitude === "all" || title === "all") {
			var addrdata = [];
			// fetch the labor database
			var thelabor = Alloy.Collections.instance('labor');
  			(thelabor) && thelabor.fetch();
  			var laborjson = thelabor.toJSON();
  			for( var i=0; i < laborjson.length; i++){
  				var title = laborjson[i].col2+' '+laborjson[i].col3;
  				var latitude = laborjson[i].col8.trim();
  				var longitude = laborjson[i].col9.trim();
  				addrdata.push({latitude: latitude,longitude:  longitude,title: title});
  			}
  			console.log("alloy.js::addrdata after push: "+JSON.stringify(addrdata));
		} else {
			var addrdata = [ {latitude: latitude,longitude:  longitude,title: title} ];
		}
				
		for (i=0;i<addrdata.length;i++){
			addr.push({
				latitude: addrdata[i].latitude,
				longitude: addrdata[i].longitude,
				title: addrdata[i].title,
				pincolor: Map.ANNOTATION_RED,
				myid:i,
				animate: 'true' 
			});
		};
		
		console.log("alloy.js::addrdata are: "+JSON.stringify(addrdata));
	    
	    var addrAnnotations = [];
		_.each(addr, function (addr) {
		  addrAnnotations.push(Map.createAnnotation({
		    title: addr.title,
		    pincolor: addr.pincolor,
		    latitude: addr.latitude,
		    longitude: addr.longitude,
		    myid: addr.myid
		  }));  
		});
		
			console.log("alloy.js::addrAnnotations are: "+JSON.stringify(addrAnnotations));

		var mapview = Map.createView({
	    mapType: Map.NORMAL_TYPE,
	    region: {latitude:latitude, longitude:longitude,
	            latitudeDelta:0.8, longitudeDelta:0.8},
	    animate:true,
	    userLocation:true,
	    regionFit:false,
	    annotations:addrAnnotations
	});
	
	}
	var win = Titanium.UI.createWindow({
		fullscreen: true,
		tabBarHidden : true,
		navBarHidden: false
	});	
//	Ti.API.info("mapview:" + JSON.stringify(mapview));
	
    if(Ti.Platform.osname == 'android'){
		alert("do nothing this is android");
   	} else {
	   	var btnBack = Ti.UI.createButton({ 
			title: '< Back', 
			top: 5,
			left: 10
		});
	   	var win1 = Titanium.UI.iOS.createNavigationWindow({
			Title: "MAP",
			backgroundColor: "transparent",
	   	  	window: win
	    });
	    win1.add(btnBack);
	    btnBack.addEventListener("click", function(_tab) { 
			console.debug("closing map" +_tab);
	//		Ti.API.info("tab:" + JSON.stringify(_tab));
			win1.close();
	});
   }; 
	// Handle click events on any annotations on this map.
	listener = function(evt){Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid +"  lat/lon: "+evt.annotation.latitude+"/"+evt.annotation.longitude);};
	mapview.addEventListener('click', listener);
	win.add(mapview);
	//win.open();
	if(Ti.Platform.osname == 'android'){
		win.open();
	} else {
		win1.open();
	};

};

Alloy.Globals.CheckLoc = function(){
	if (Ti.Geolocation.locationServicesEnabled) {
	Titanium.Geolocation.purpose = 'Get Current Location';
	Titanium.Geolocation.getCurrentPosition(function(e) {
	    if (e.error) {
	        Ti.API.error('Error: ' + e.error);
	    } else {
	        Ti.API.info(e.coords);
	        var coordslat =  e.coords.latitude;
	        alert("Thanks for updating your location. loc details: latitude :"+e.coords.latitude+" longitude : "+e.coords.longitude);
	        }
	    });
	} else {
	    alert('Please enable location services');
	}
};

Alloy.Globals.openDetail = function(e){
	Ti.API.info('all info = ' + JSON.stringify(e));
	Ti.API.info('index = ' + JSON.stringify(e.index));
	Ti.API.info("in open_button click event title :"+e.row.title);
};

Alloy.Globals.getData = function(sid,type) {	
	var url = "https://spreadsheets.google.com/feeds/list/"+sid+"/od6/public/basic?hl=en_US&alt=json";
	var thefile = "gss"+sid+".txt";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
			// parse the retrieved data, turning it into a JavaScript object
	    	json = JSON.parse(this.responseText);
	    	//Ti.Api.Info("json data after download : " +json);
	    	var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile
			);
			if(file.exists() && file.writeable) {
			    var success = file.deleteFile();
			    Ti.API.info((success==true) ? 'success' : 'fail'); // outputs 'success'
			}
			file.write(this.responseText);
			(type == 'client') && Alloy.Collections.client.deleteAll();
			(type == 'project') && Alloy.Collections.project.deleteAll();
			(type == 'inventory') && Alloy.Collections.inventory.deleteAll();
			(type == 'invoice') && Alloy.Collections.invoice.deleteAll();
			(type == 'supplier') && Alloy.Collections.supplier.deleteAll();
			(type == 'proposal') && Alloy.Collections.proposal.deleteAll();
			(type == 'labor') && Alloy.Collections.labor.deleteAll();
			(type == 'joblog') && Alloy.Collections.joblog.deleteAll();
			for (var i=1; i < +json.feed.entry.length; i++) {
				var dataModel = Alloy.createModel(type,{
					col1 :  json.feed.entry[i].title.$t || "none",
					col2 : json.feed.entry[i].content.$t.split(',')[0] && json.feed.entry[i].content.$t.split(',')[0].split(':')[1] || "none",
					col3 : json.feed.entry[i].content.$t.split(',')[1] && json.feed.entry[i].content.$t.split(',')[1].split(':')[1] || "none",
					col4 : json.feed.entry[i].content.$t.split(',')[2] && json.feed.entry[i].content.$t.split(',')[2].split(':')[1] || "none",
					col5 : json.feed.entry[i].content.$t.split(',')[3] && json.feed.entry[i].content.$t.split(',')[3].split(':')[1] || "none",
					col6 : json.feed.entry[i].content.$t.split(',')[4] && json.feed.entry[i].content.$t.split(',')[4].split(':')[1] || "none",
					col7 : json.feed.entry[i].content.$t.split(',')[5] && json.feed.entry[i].content.$t.split(',')[5].split(':')[1] || "none",
					col8 : json.feed.entry[i].content.$t.split(',')[6] && json.feed.entry[i].content.$t.split(',')[6].split(':')[1] || "none",
					col9 : json.feed.entry[i].content.$t.split(',')[7] && json.feed.entry[i].content.$t.split(',')[7].split(':')[1] || "none",
					col10 :  json.feed.entry[i].content.$t.split(',')[8] && json.feed.entry[i].content.$t.split(',')[8].split(':')[1] || "none",
					col11 : json.feed.entry[i].content.$t.split(',')[9] && json.feed.entry[i].content.$t.split(',')[9].split(':')[1] || "none",
					col12 :  json.feed.entry[i].content.$t.split(',')[10] && json.feed.entry[i].content.$t.split(',')[10].split(':')[1] || "none",
					col13 :  json.feed.entry[i].content.$t.split(',')[11] && json.feed.entry[i].content.$t.split(',')[11].split(':')[1] || "none",
					col14 :  json.feed.entry[i].content.$t.split(',')[12] && json.feed.entry[i].content.$t.split(',')[12].split(':')[1] || "none",
					col15 :  json.feed.entry[i].content.$t.split(',')[13] && json.feed.entry[i].content.$t.split(',')[13].split(':')[1] || "none",
					col16 :  json.feed.entry[i].content.$t.split(',')[13] && json.feed.entry[i].content.$t.split(',')[13].split(':')[1] || "none",		
				});			
				dataModel.save();
			}
			//
			} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
	});
	xhr.onerror = function(e){
		alert(e);
	};
	xhr.open("GET", url);
	xhr.send();
	Ti.API.info(" Data were successfuly downloaded from "+url+". Please proceed.");
};

Alloy.Globals.createController = function(controller,sourcetab){
		var newController = Alloy.createController(controller);
		newController.openMainWindow(sourcetab);
};

Alloy.Globals.getPrivateData = function(sid,type) {	
	var data = [];
	var maxdebug = Titanium.App.Properties.getInt('maxdebug');
	var mindebug = Titanium.App.Properties.getInt('mindebug');
	console.log("alloy.js::Alloy.Globals.getPrivateData: type: min max debug: "+type+" :"+mindebug+" : "+maxdebug);
	//Alloy.Globals.checkGoogleisAuthorized();
	Alloy.Globals.checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
	//Google Auth check.
	var needAuth = Titanium.App.Properties.getString('needAuth');
	if(mindebug==1){console.log("alloy.js::needAuth is :  " +needAuth);};
	if (needAuth == "true") {googleAuthSheet.authorize();};
	var url = "https://spreadsheets.google.com/feeds/list/"+sid+"/od6/private/full";
	var thefile = "gss"+sid+".xml";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
			var xml = Titanium.XML.parseString(this.responseText);
			if(maxdebug==1){console.log("alloy.js::pop db:: response txt is: "+this.responseText);};
			if(maxdebug==1){console.log("alloy.js::pop db:: this xml is: " +xml);	};   
			var feed = xml.documentElement.getElementsByTagName("feed");
			var entry = xml.documentElement.getElementsByTagName("entry"); 
			(mindebug == 1) && console.log("alloy.js::this entry length is: " +entry.length);
			// deleting existing entry in database start
			(type == 'client') && Alloy.Collections.client.deleteAll();
			(type == 'project') && Alloy.Collections.project.deleteAll();
			(type == 'inventory') && Alloy.Collections.inventory.deleteAll();
			(type == 'invoice') && Alloy.Collections.invoice.deleteAll();
			(type == 'supplier') && Alloy.Collections.supplier.deleteAll();
			(type == 'proposal') && Alloy.Collections.proposal.deleteAll();
			(type == 'labor') && Alloy.Collections.labor.deleteAll();
			(type == 'joblog') && Alloy.Collections.joblog.deleteAll();
			(type == 'master') && Alloy.Collections.master.deleteAll();
			(type == 'joblogsid') && Alloy.Collections.joblogsid.deleteAll();
			(type == 'payment') && Alloy.Collections.payment.deleteAll();
			(type == 'paymentsid') && Alloy.Collections.paymentsid.deleteAll();
			// deleting existing entry done
			for (i=1;i<entry.length;i++){
				var col1 = entry.item(i).getElementsByTagName("gsx:col1").item(0).text;
				var col2 = entry.item(i).getElementsByTagName("gsx:col2").item(0).text;
				var col4 = entry.item(i).getElementsByTagName("gsx:col4").item(0).text;
				var idtag = entry.item(i).getElementsByTagName("id").item(0).text.replace(':','yCoLoNy');
				var link = entry.item(i).getElementsByTagName("link");
				for (y=0;y<link.length;y++){			
	    			var listitem = link.item(y);
	    			if (listitem.getAttribute("rel") == "edit"){ var edithref = listitem.getAttribute("href").replace(':','yCoLoNy');}
	    			if (listitem.getAttribute("rel") == "self"){ var selfhref = listitem.getAttribute("href").replace(':','yCoLoNy');}
    			}
				data.push({"identification":col1,"next column":col2,"col4":col4});
				(maxdebug==1) && console.log("alloy.js::updating database with data :"+JSON.stringify(data));
				(maxdebug==1) && console.log("alloy.js::updating database with data :"+col1+" url:"+idtag+" "+edithref);
				var dataModel = Alloy.createModel(type,{
					col1 :  entry.item(i).getElementsByTagName("gsx:col1").item(0).text || "none",
					col2 : entry.item(i).getElementsByTagName("gsx:col2").item(0).text || "none",
					col3 :  entry.item(i).getElementsByTagName("gsx:col3").item(0).text || "none",
					col4 :  entry.item(i).getElementsByTagName("gsx:col4").item(0).text || "none",
					col5 :  entry.item(i).getElementsByTagName("gsx:col5").item(0).text || "none",
					col6 :  entry.item(i).getElementsByTagName("gsx:col6").item(0).text || "none",
					col7 :  entry.item(i).getElementsByTagName("gsx:col7").item(0).text || "none",
					col8 :  entry.item(i).getElementsByTagName("gsx:col8").item(0).text || "none",
					col9 :  entry.item(i).getElementsByTagName("gsx:col9").item(0).text || "none",
					col10 :  entry.item(i).getElementsByTagName("gsx:col10").item(0).text || "none",
					col11 :  entry.item(i).getElementsByTagName("gsx:col11").item(0).text || "none",
					col12 :  entry.item(i).getElementsByTagName("gsx:col12").item(0).text || "none",
					col13 :  entry.item(i).getElementsByTagName("gsx:col13").item(0).text || "none",
					//col14 :  entry.item(i).getElementsByTagName("gsx:col14").item(0).text || "none",
					col14 :  idtag+"xCoLoNx"+selfhref+"xCoLoNx"+edithref+"xCoLoNx"+selfhref || "none",
					col15 :  entry.item(i).getElementsByTagName("gsx:col15").item(0).text || "none",
					col16 :  entry.item(i).getElementsByTagName("gsx:col16").item(0).text || "none",		
				});	
				dataModel.save();
			}
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile
			);
			if(file.exists() && file.writeable) {
			    var success = file.deleteFile();
			    Ti.API.info((success==true) ? 'success' : 'fail'); // outputs 'success'
			}
			file.write(this.responseText);
			console.log("alloy.js::checking data " +JSON.stringify(data));
			//
			} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
	});
	xhr.onerror = function(e){
		//alert(e);
		console.log("alloy.js::Alloy.Globals.getPrivateData::Unable to connect to the network. The "+type+" info displayed here is NOT the latest.");
		alert("	. The "+type+" info displayed here is NOT the latest.");
	};
	xhr.open("GET", url);
	xhr.send();
	Ti.API.info(" Data were successfuly downloaded from "+url+". Please proceed.");
};

Alloy.Globals.xmlToJson = function(xml) {	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};


var scope = ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly','https://www.googleapis.com/auth/drive'];
scope.push ("https://www.googleapis.com/auth/drive.appdata");
scope.push ("https://www.googleapis.com/auth/drive.apps.readonly");
scope.push ("https://www.googleapis.com/auth/drive.file");
scope.push ("https://www.googleapis.com/auth/plus.login");

var GoogleAuth = require('googleAuth');
var googleAuthSheet = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	//scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly','https://www.googleapis.com/auth/drive'],
	scope : scope,
	quiet: false
});

Alloy.Globals.googleAuthSheet = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	//scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'],
	scope : scope,
	quiet: false
});

Alloy.Globals.googleAuthCalendar = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	//scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'],
	scope : scope,
	quiet: false
});

Alloy.Globals.LaunchWindowGoogleAuth = function() {
	//authorize first
	//setTimeout("googleAuthSheet.authorize()", 100);
	//googleAuthSheet.authorize();	
			var win = Titanium.UI.createWindow({
				fullscreen: false,
				tabBarHidden : false,
				navBarHidden: false,
				height: "85%",
				modal: true
			});	
			var btnBack = Ti.UI.createButton({ 
				title: '< Back', 
				top: 5,
				left: 10
			});
	   		var win1 = Titanium.UI.iOS.createNavigationWindow({
				Title: "Authentication",
				backgroundColor: "transparent",
		   	  	window: win,
		   	  	height: "85%"
	    	});
	    	var view = Titanium.UI.createView({
				   borderRadius:10
			});	    	
	    	btnBack.addEventListener("click", function(_tab) { 
				console.debug("closing window" +_tab);
		//		Ti.API.info("tab:" + JSON.stringify(_tab));
				win1.close();
			});
			Ti.API.info('Authorized first: ');
			//view.add(googleAuthSheet.authorize());							
			view.add(googleAuthSheet.authorize());
			win1.add(btnBack);	
			//window.add(view);
			win1.open({modal:true});

};
	
Alloy.Globals.checkGoogleisAuthorized = function () {
	Titanium.App.Properties.setString('needAuth',"true");
	googleAuthSheet.isAuthorized(function() {
		console.log('Access Token: ' + googleAuthSheet.getAccessToken());
		Titanium.App.Properties.setString('needAuth',"false");
	}, function() {
		console.log('Fr AlloyGlobal Authorized first, see next window: '+(new  Date()));
		Titanium.App.Properties.setString('needAuth',"true");
		//Alloy.Globals.LaunchWindowGoogleAuth();
	});
};	
	
Alloy.Globals.updateSpreadsheet = function (sid){
	 	var now = new Date();
 	var clientlastname = Titanium.App.Properties.getString('clientlastname',"none");
 	var clientfirstname = Titanium.App.Properties.getString('clientfirstname',"none");
 	var clientphone = Titanium.App.Properties.getString('clientphone',"none");
 	var clientemail = Titanium.App.Properties.getString('clientemail',"none");
 	var clientstreetaddress = Titanium.App.Properties.getString('clientstreetaddress',"none");
 	var clientcity = Titanium.App.Properties.getString('clientcity',"none");
 	var clientstate = Titanium.App.Properties.getString('clientstate',"none");
 	var clientproject = Titanium.App.Properties.getString('clientproject',"none");
 	var clientcompany = Titanium.App.Properties.getString('clientcompany',"none");
 	alert("On "+now+" : Info on: "+clientfirstname+" "+clientlastname+" with "+clientphone+" and email "+clientemail+" at "+clientstreetaddress+", "+clientcity+", "+clientstate+". submitted");
 	var fcsv = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.csv');
 	var ftxt = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.txt');
	fcsv.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file
	ftxt.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file
	var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
	+'<gsx:col1>'+clientfirstname+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
	+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
	+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8><gsx:col9>'+clientstate
	+'</gsx:col9><gsx:col10>'+'USA'+'</gsx:col10><gsx:col11>'+'NA'+'</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>NA</gsx:col14><gsx:col15>NA</gsx:col15><gsx:col16>NA</gsx:col16></entry>';
	Ti.API.info('xmldatastring to POST: '+xmldatastring);
	var xhr =  Titanium.Network.createHTTPClient({
    onload: function() {
    	try {
    		Ti.API.info(this.responseText); 
    	} catch(e){
    		Ti.API.info("cathing e: "+JSON.stringify(e));
    	}     
    },
    onerror: function(e) {
    	Ti.API.info("error e: "+JSON.stringify(e));
    }
});
	xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+sid+'/od6/private/full');
	xhr.setRequestHeader("Content-type", "application/atom+xml");
	xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuth.getAccessToken());
	xhr.send(xmldatastring);
	Ti.API.info('done POSTed');


};

Alloy.Globals.checkNetworkAndGoogleAuthorized = function(sid){
	var url = "https://spreadsheets.google.com/feeds/list/"+sid+"/od6/public/basic?hl=en_US&alt=json";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		Ti.API.info("network is good. Replies are: "+this.responseText);
	    		Alloy.Globals.checkGoogleisAuthorized();
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
	});
	xhr.onerror = function(e){
		alert("No network connection. Information update will NOT be immediately synchronized to central location. Please take note.");
	};
	xhr.open("GET", url);
	xhr.send();
};

Alloy.Globals.postCreateEvent = function(startdateTime,enddateTime,location,summary,description,organizerdisplayName,organizeremail,colorid,attendeeslist) {
	var startdateTime = startdateTime || "2015-03-05T15:30:00-06:00";
	var enddateTime = enddateTime || "2015-03-05T15:40:00-06:00";
	var location = location || "2258 S Sanctuary Dr., New Berlin, WI 53151";
	var summary = summary || "Dave Danish LawnMowing";
	var description = description || "client: Deb Smith house";
	var organizerdisplayName = organizerdisplayName|| "Eric Cole";
	var organizeremail = organizeremail || "phakhruddin1@gmail.com";
	var colorid = colorid || "3";
	var organizerself ="true";
	//var url = 'https://www.googleapis.com/calendar/v3/calendars/idevice.net%40gmail.com/events?access_token='+googleAuthCalendar.getAccessToken();
	var url = 'https://www.googleapis.com/calendar/v3/calendars/idevice.net@gmail.com/events';
	var recurrences ="";
	var attendeesstrbody = [];
	var attendeesstrstart = '\"attendees\": \[';
	var attendeesstrend = "\],";
	//var attendeeslist = "";
	var attendeeslist = ["phakhruddin1@gmail.com","deen@idevice.net"];
	if (attendeeslist.length>0){
		for (i=0;i<attendeeslist.length;i++) {	
			var attendeesstr = '\{ \"email\": \"'+attendeeslist[i]
			+'\", \"responseStatus\" : \"needsAction\"\}';	
			attendeesstrbody.push(attendeesstr);
		}
		var eventattendees = attendeesstrstart+""+attendeesstrbody+""+attendeesstrend;
	} else {
		var eventattendees = "";
	}
	var event = '\{'
	+'\"start\": \{ \"dateTime\": \"'+startdateTime+'\"\},'
	+'\"location\": \"'+location+'\",'
	+'\"end\": \{\"dateTime\": \"'+enddateTime+'\"\},'
	+'\"summary\": \"'+summary+'\",'
	+'\"description\": \"'+description+'\",'
	+'\"colorid\": \"'+colorid+'\",'
	+eventattendees
	+'\"organizer\": \{'
	+	'\"email\": \"'+organizeremail+'\",'
	+	'\"displayName\": \"'+organizerdisplayName+'\",'
	+	'\"self\": \"'+organizerself+'\"'
	+	'\}'	
	+recurrences
	+'\}';
	console.log("alloy.js::event strings are: "+event);
	var xhr =  Titanium.Network.createHTTPClient({
    onload: function() {
    	try {
    		Ti.API.info(this.responseText); 
    	} catch(e){
    		Ti.API.info("cathing e: "+JSON.stringify(e));
    	}     
    },
    onerror: function(e) {
    	Ti.API.info("error e: "+JSON.stringify(e));
        alert("Unable to communicate to the cloud. Please try again"); 
    }
});
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.setRequestHeader("Authorization", 'Bearer '+Alloy.Globals.googleAuthSheet.getAccessToken());
	xhr.send(event);
	Ti.API.info('done POSTed');
};

Alloy.Globals.uploadFile = function(file,filename) {
		var fileget = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,file);
    	//var fileget = Ti.Filesystem.getFile(file);
		var fileread = fileget.read();
		var filebase64 = Ti.Utils.base64encode(fileread);
 		console.log('Access Token for File upload is: ' + googleAuthSheet.getAccessToken());
 		var parts = [];
 		var bound = 287032396531387;
 		var meta = '\{'
 		+	'\"title\": \"'+filename+'\"'
		+	'\}';
		var parts = [];
        parts.push('--' + bound);
        parts.push('Content-Type: application/json');
        parts.push('');
        parts.push(meta);
        parts.push('--' + bound);
		parts.push('Content-Type: application/pdf');
        parts.push('Content-Transfer-Encoding: base64');
        parts.push('');
        parts.push(filebase64);
        parts.push('--' + bound + '--');
 		var url = "https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart";
 		var xhr =  Titanium.Network.createHTTPClient({
		    onload: function() {
		    	try {
		    		Ti.API.info(this.responseText); 
		    	} catch(e){
		    		Ti.API.info("cathing e: "+JSON.stringify(e));
		    	}     
		    },
		    onerror: function(e) {
		    	Ti.API.info("error e: "+JSON.stringify(e));
		        alert("unable to talk to the cloud, will try later"); 
		    }
		});
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-type", "multipart/mixed; boundary=" + bound);
		xhr.setRequestHeader("Authorization", 'Bearer '+googleAuthSheet.getAccessToken());
		xhr.setRequestHeader("Content-Length", "2000000");
		xhr.send(parts.join("\r\n"));
		Ti.API.info('done POSTed');
};

Alloy.Globals.formatAMPM = 	function(date) {
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ampm;
	  return strTime;
};

Alloy.Globals.checkFileExistThenCreateSS = function(filename){
		var jsonlist = " ";
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var jsonlist = JSON.parse(this.responseText);
	    		Ti.API.info("Alloy.Globals.checkFileExistThenCreateSS::response of jsonlist is: "+JSON.stringify(jsonlist));
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
			console.log("alloy.js::Alloy.Globals.checkFileExistThenCreateSS::jsonlist.items.length: "+jsonlist.items.length);
			if (jsonlist.items.length == "0" ){
				console.log("alloy.js::File DOES NOT EXIST");
				var fileexist = "false";
				Alloy.Globals.createSpreadsheet(filename);  // create file when does not exists
				Titanium.App.Properties.setString(filename,sid); // stamp the ssid.
			} else {
				var fileexist = "true";
				var sid = jsonlist.items[0].id;
				console.log("alloy.js::Alloy.Globals.checkFileExistThenCreateSS::File exist. sid is: "+jsonlist.items[0].id+" Skipped.");
				Titanium.App.Properties.setString(filename,sid);
			};
		}
		});
	xhr.onerror = function(e){
		alert("Unable to connect to the cloud.");
	};
	var rawquerystring = '?q=title+%3D+\''+filename+'\'+and+mimeType+%3D+\'application%2Fvnd.google-apps.spreadsheet\'+and+trashed+%3D+false&fields=items(id%2CmimeType%2Clabels%2Ctitle)';
	xhr.open("GET", 'https://www.googleapis.com/drive/v2/files'+rawquerystring);
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
	xhr.send();
};

Alloy.Globals.checkFileExistThenUpdateSID = function(filename){
		var jsonlist = " ";
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var jsonlist = JSON.parse(this.responseText);
	    		Ti.API.info("Alloy.Globals.checkFileExistThenUpdateSID::response of jsonlist is: "+JSON.stringify(jsonlist));
	    		Titanium.App.Properties.setString("status","passed"); 	 		
	    	} catch(e){
				Ti.API.info("Alloy.Globals.checkFileExistThenUpdateSID::cathing e: "+JSON.stringify(e));
				Titanium.App.Properties.setString("status","failed"); 	; 	
			}
			console.log("alloy.js::Alloy.Globals.checkFileExistThenUpdateSID::jsonlist.items.length: "+jsonlist.items.length);
			if (jsonlist.items.length == "0" ){
				console.log("alloy.js::Alloy.Globals.checkFileExistThenUpdateSID::File DOES NOT EXIST");
				var fileexist = "false";
				Titanium.App.Properties.setString("status","failed"); 	
			} else {
				var fileexist = "true";
				var sid = jsonlist.items[0].id;
				console.log("alloy.js::Alloy.Globals.checkFileExistThenUpdateSID::File exist. sid is: "+jsonlist.items[0].id+" Skipped.");
				Titanium.App.Properties.setString(filename,sid);
				// Write contents.
				var content = filename+','+sid;
				Alloy.Globals.appendFile(content,"joblogsid.txt");
				Titanium.App.Properties.setString("status","passed"); 	
			};
		}
		});
	xhr.onerror = function(e){
		alert("Unable to connect to the cloud.");
		Alloy.Globals.Status ={ "success" : "failed"};
		Titanium.App.Properties.setString("status","failed");	
	};
	var rawquerystring = '?q=title+%3D+\''+filename+'\'+and+mimeType+%3D+\'application%2Fvnd.google-apps.spreadsheet\'+and+trashed+%3D+false&fields=items(id%2CmimeType%2Clabels%2Ctitle)';
	xhr.open("GET", 'https://www.googleapis.com/drive/v2/files'+rawquerystring);
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
	xhr.send();
	console.log("alloy.js::::JSON.stringify(Alloy.Globals.Status) :"+JSON.stringify(Alloy.Globals.Status)+" Titanium.App.Properties.getString(\"status\"): " +Titanium.App.Properties.getString("status"));
	
};


Alloy.Globals.createSpreadsheet = function(filename) {
	console.log("alloy.js::create ss with filename: "+filename);
	var jsonpost = '{'
		 +'\"title\": \"'+filename+'\",'
		 +'\"mimeType\": \"application/vnd.google-apps.spreadsheet\"'
		+'}';
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		Ti.API.info("response is: "+this.responseText);
	    		var json = JSON.parse(this.responseText);
	    		var sid = json.id;
	    		//populate header
	    		for (i=1;i<17;i++){
					var value = "col"+i;
					Alloy.Globals.editTheCell(sid,1,i,value);
				}
				Alloy.Globals.editTheCell(sid,2,1,"Project Name");
				Alloy.Globals.editTheCell(sid,2,2,"sid");
				Alloy.Globals.editTheCell(sid,2,4,"Date Created");
				Alloy.Globals.editTheCell(sid,2,5,"Date Modified");
	    		Titanium.App.Properties.setString('sid',sid); // 1st sid created.
	    		console.log("alloy.js::sid : "+sid);
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
		});
	xhr.onerror = function(e){
		alert("Unable to connect to the cloud.");
	};
	xhr.open("POST", 'https://www.googleapis.com/drive/v2/files');	
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
    console.log("alloy.js::json post: "+jsonpost);
	xhr.send(jsonpost);
};

Alloy.Globals.editTheCell = function(sid,rowno,colno,value) {
	var pos = "R"+rowno+"C"+colno;
	console.log("alloy.js::get SS Cell on :  https://spreadsheets.google.com/feeds/cells/"+sid+"/od6/private/full/"+pos);
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var xml = Titanium.XML.parseString(this.responseText);
	    		Ti.API.info("Alloy.Globals.editTheCell:: response is: "+this.responseText);
	    		Ti.API.info("Alloy.Globals.editTheCell:: xml response is: "+xml);
	    		var entry = xml.documentElement.getElementsByTagName("entry");
	    		var link = xml.documentElement.getElementsByTagName("link");
	    		console.log("alloy.js:: number of link found: " +link+ " length: "+link.length);
	    		for (i=0;i<link.length;i++){			
	    			var listitem = link.item(i);
	    			if (listitem.getAttribute("rel") == "edit"){ var edithref = listitem.getAttribute("href");}
	    			if (listitem.getAttribute("rel") == "self"){ var selfhref = listitem.getAttribute("href");}
	    		}
	    		Ti.API.info("Alloy.Globals.editTheCell:: self href is : "+selfhref);
				Ti.API.info("Alloy.Globals.editTheCell:: edit href is : "+edithref);
	    		Alloy.Globals.editCell(sid,rowno,colno,edithref,selfhref,value);	    				    			
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
		});
	xhr.onerror = function(e){
		alert("Unable to connect to the cloud. "+e);
	};
	xhr.open("GET", 'https://spreadsheets.google.com/feeds/cells/'+sid+'/od6/private/full/'+pos);
	xhr.setRequestHeader("Content-type", "application/atom+xml");
    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
	xhr.send();
};

Alloy.Globals.editCell = function(sid,rowno,colno,edithref,selfhref,value){ 
		var xmldatastring = ['<entry xmlns=\'http://www.w3.org/2005/Atom\' '
 		+' xmlns:gs=\'http://schemas.google.com/spreadsheets/2006\'>'
 		+'<id>'+selfhref+'</id>'
 		+'<link rel=\'edit\' type=\'application/atom+xml\''
 		+' href=\''+edithref+'\'/>'
 		+'<gs:cell row=\''+rowno+'\' col=\''+colno+'\' inputValue=\''+value+'\'>'
 		+'</gs:cell>'
 		+'</entry>'].join('');
 		console.log("alloy.js::xmldatastring: "+xmldatastring);
       var xhr =  Titanium.Network.createHTTPClient({
    onload: function() {
        try {
                Ti.API.info(this.responseText); 
        } catch(e){
                Ti.API.info("cathing e: "+JSON.stringify(e));
        }     
    },
    onerror: function(e) {
        Ti.API.info("error e: "+JSON.stringify(e));
        alert("Unable to communicate to the cloud. Please try again"); 
    }
});
        xhr.open("PUT", ''+edithref+'');
        xhr.setRequestHeader("Content-type", "application/atom+xml");
        xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
        xhr.send(xmldatastring);
        Ti.API.info('done POSTed');
};

Alloy.Globals.updateSpreadsheet = function(sid,col1,col2,col3,col4,col5,col6,col7,col8,col9,col10,col11,col12,col13,col14,col15,col16){
	var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
	+'<gsx:col1>'+col1+'</gsx:col1><gsx:col2>'+col2+'</gsx:col2><gsx:col3>'
	+col3+'</gsx:col3><gsx:col4>'+col4+'</gsx:col4><gsx:col5>'
	+col5+'</gsx:col5><gsx:col6>'+col6+'</gsx:col6><gsx:col7>'+col7+'</gsx:col7><gsx:col8>'+col8+'</gsx:col8><gsx:col9>'+col9
	+'</gsx:col9><gsx:col10>'+col10+'</gsx:col10><gsx:col11>'+col11+'</gsx:col11><gsx:col12>'+col12+'</gsx:col12><gsx:col13>'+col13+'</gsx:col13><gsx:col14>'+col14+'</gsx:col14><gsx:col15>'+col15+'</gsx:col15><gsx:col16>'+col16+'</gsx:col16></entry>';
	Ti.API.info('xmldatastring to POST: '+xmldatastring);
	var xhr =  Titanium.Network.createHTTPClient({
    onload: function() {
    	try {
    		Ti.API.info(this.responseText); 
    	} catch(e){
    		Ti.API.info("cathing e: "+JSON.stringify(e));
    	}     
    },
    onerror: function(e) {
    	Ti.API.info("error e: "+JSON.stringify(e));
        alert("Unable to communicate to the cloud. Please try again"); 
    }
});
	xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+sid+'/od6/private/full');
	xhr.setRequestHeader("Content-type", "application/atom+xml");
	xhr.setRequestHeader("Authorization", 'Bearer '+ Alloy.Globals.googleAuthSheet.getAccessToken());
	xhr.send(xmldatastring);
	Ti.API.info('done POSTed');
};

Alloy.Globals.saveHandler = function(type){
 	console.log("alloy.js::Alloy.Globals.saveHandler::saving all data JSON e: "+JSON.stringify(e));
 	var tabledata = [];	
 	var noentry = "none";
 	var getvalue = ["clientfirstname","clientlastname","clientphone","clientemail","clientstreetaddress","clientcity","clientstate","clientcompany","notes"];
 	for (i=0;i<$.enterclient_table.data[0].rowCount;i++) {		
 		console.log("children count : "	+$.enterclient_table.data[0].rows[i].children.length);
 		for (j=0;j<+$.enterclient_table.data[0].rows[i].children.length;j++) { 			
			console.log("JSON stringify table 0 row "+i+' : ' +JSON.stringify($.enterclient_table.data[0].rows[i]));
			console.log("JSON stringify table 0 row "+i+'w/children '+j+' : ' +JSON.stringify($.enterclient_table.data[0].rows[i].children[j]));
			tabledata.push({data1:$.enterclient_table.data[0].rows[i].children[j].id || "none",data2:$.enterclient_table.data[0].rows[i].children[j].value || "none"});
			for (z=0;z<getvalue.length;z++){
				var subject = getvalue[z];
				if ( $.enterclient_table.data[0].rows[i].children[j].id == subject+"_tf") {					
					 	eval("var "+subject+" = $.enterclient_table.data[0].rows[i].children[j].value || $.enterclient_table.data[0].rows[i].children[j].text || noentry;");		 
				};
			}		
		};
	};
	console.log("tabledata are: "+JSON.stringify(tabledata));
	console.log("alloy.js::Alloy.Globals.saveHandler:: detect array dyn variable: "+clientfirstname+","+clientlastname+","+clientphone+","+clientemail+","+clientstreetaddress
	+","+clientcity+","+clientstate+","+clientcompany);
	//once tabledata is populated, find submission value
	var name = clientfirstname+' '+clientlastname;
	var customerid = e.source.titleid;
	console.log("alloy.js::Alloy.Globals.saveHandler::clientfirstname: "+clientfirstname+" clientlastname "+clientlastname);	
	Alloy.Globals.submit(type,clientfirstname,clientlastname,clientcompany,clientphone,clientemail,clientstreetaddress,clientcity,clientstate,"USA","pending",notes,"0","6/1/2015","7/1/2015",customerid);
	///console.log('submit('+clientnumber+','+name+','+customerno+','+total+','+bal+','+paid+','+lastpaiddate+','+followupdate+','+clientphone+','+clientemail+','+duedate+','
	///+currency+','+status+')');
 }; 


Alloy.Globals.submit = function(type,clientfirstname,clientlastname,clientcompany,clientphone,clientemail,clientstreetaddress,clientcity,clientstate,country,status,notes,percentcompletion,nextappt,datedue,customerid) {	
 	//var spreadsheet_id = '1-Wz7Apn4AvVpfqcNyMgfqyKA8OAoLNy5Bl0d_jQ9IZk';
    var spreadsheet_id = Titanium.App.Properties.getString(type);
    var existingedithref = Titanium.App.Properties.getString('edithref');
    var edithref = Titanium.App.Properties.getString('edithref');
   /// var existingedithref = edithref;
    var idtag = Titanium.App.Properties.getString('idtag');
    //var edithref = existingedithref;
    var selfhref = Titanium.App.Properties.getString('selfhref');
    var now = Date.now();
 	var captimestamp = now;
    console.log("alloy.js::Alloy.Globals.submit::existing edit href is: "+existingedithref+' idtag :'+idtag);
	var xhr =  Titanium.Network.createHTTPClient({
	    onload: function() {
	    	try {
	    		Ti.API.info(this.responseText);
	    		var xml = Titanium.XML.parseString(this.responseText);
	    		var entry = xml.documentElement.getElementsByTagName("entry");
	    		var link = xml.documentElement.getElementsByTagName("link");
	    		var idtag = xml.documentElement.getElementsByTagName("id").item(0).text;
	    		console.log("alloy.js::submit: number of link found: " +link+ " length: "+link.length);
	    		for (i=0;i<link.length;i++){			
	    			var listitem = link.item(i);
	    			if (listitem.getAttribute("rel") == "edit"){ var edithref = listitem.getAttribute("href");}
	    			if (listitem.getAttribute("rel") == "self"){ var selfhref = listitem.getAttribute("href");}
	    		}
	    		Titanium.App.Properties.setString('edithref',edithref);
	    		Titanium.App.Properties.setString('idtag',idtag);
	    		Titanium.App.Properties.setString('selfhref',selfhref);
	    		Ti.API.info("alloy.js::submit: self href is : "+selfhref+" edit href is: "+edithref);
	    		Ti.API.info("alloy.js::submit: idtag is : "+idtag);
	    	} catch(e){
	    		Ti.API.info("cathing e: "+JSON.stringify(e));
	    	}     
	    },
	    onerror: function(e) {
	    	Ti.API.info("error e: "+JSON.stringify(e));
	        alert("Unable to communicate to the cloud. Please try again."); 
	    }
	});
	eval("var "+type+" = Alloy.Collections.instance('"+type+"')");
	//var clients = Alloy.Collections.instance('client');
	if (existingedithref) {
			console.log("alloy.js::Alloy.Globals.submit::PUT on existing edit href is: "+existingedithref);
			xhr.open("PUT", existingedithref);
			var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
				+'<id>'+idtag+'</id>'
				+'<updated>2015-05-16T08:01:19.680Z</updated>'
				+'<category scheme=\'http://schemas.google.com/spreadsheets/2006\' term=\'http://schemas.google.com/spreadsheets/2006#list\'/>'
				+'<title type=\'text\'>'+customerid+'</title>'
				+'<content type=\'text\'>col2: '+clientfirstname+', col3: '+clientlastname+', col4: '+clientcompany+', col5: '+clientphone+', col6: '+clientemail+', col7: '+clientstreetaddress
				+', col8: '+clientcity+', col9: '+clientstate+', col10: '+country+', col11: NA, col12: NA, col13: NA, col14: '+captimestamp+', col15: none, col16: '+now+'</content>'
				+'<link rel=\'self\' type=\'application/atom+xml\' href=\''+selfhref+'\'/>'
				+'<link rel=\'edit\' type=\'application/atom+xml\' href=\''+edithref+'\'/>'
				+'<gsx:col1>'+customerid+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
				+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
				+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8>'
				+'<gsx:col9>'+clientstate+'</gsx:col9><gsx:col10>'+country+'</gsx:col10><gsx:col11>NA</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>'+customerid+'</gsx:col14>'
				+'<gsx:col15>'+notes+'</gsx:col15><gsx:col16>'+customerid+'</gsx:col16></entry>';
			Ti.API.info('xmldatastring existing to PUT: '+xmldatastring);
			eval("type.fetch()");
			//clients.fetch();
			console.log("alloy.js::Alloy.Globals.submit:: update DB with customerid :" +customerid);
				clients.get(customerid).set({
					col1: 	customerid.toString(),
					col2:	clientfirstname,
					col3:	clientlastname,
					col4:	clientcompany,
					col5:	clientphone,
					col6:	clientemail,
					col7:	clientstreetaddress,
					col8:	clientcity,
					col9:	clientstate,
					col10:	country
				}).save();
			alert('Modified & Saved Successfully!');
		} else {
			var customerid = now;
			$.save_button.titleid = customerid; //feed id the save button of the customer id.
			var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
				+'<gsx:col1>'+customerid+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
				+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
				+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8>'
				+'<gsx:col9>'+clientstate+'</gsx:col9><gsx:col10>'+country+'</gsx:col10><gsx:col11>NA</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>'+customerid+'</gsx:col14>'
				+'<gsx:col15>'+notes+'</gsx:col15><gsx:col16>'+customerid+'</gsx:col16></entry>';
				Ti.API.info('xmldatastring to POST: '+xmldatastring);
			xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+spreadsheet_id+'/od6/private/full');
			console.log("alloy.js::Alloy.Globals.submit:: add DB with customerid :" +customerid);
			var dataModel = Alloy.createModel('client',{
					col1: 	customerid.toString(),
					col2:	(clientfirstname == " ")?'none':clientfirstname,
					col3:	(clientlastname == " ")?'none':clientlastname,
					col4:	(clientcompany == " ")?'none':clientcompany,
					col5:	(clientphone == " ")?'none':clientphone,
					col6:	(clientemail == " ")?'none':clientemail,
					col7:	(clientstreetaddress == " ")?'none':clientstreetaddress,
					col8:	(clientcity == " ")?'none':clientcity,
					col9:	(clientstate == " ")?'none':clientstate,
					col10:	(country == " ")?'none':country,
					col11: "none",
					col12: "none",
					col13: "none",
					col14: "none",
					col15: "none",
					col16: "none"
				});			
				dataModel.save();
			alert('Saved Successfully!');
		} 
	xhr.setRequestHeader("Content-type", "application/atom+xml");
	xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuth.getAccessToken());
	xhr.send(xmldatastring);
 };
 
 Alloy.Globals.emailpdf = function(firstname,lastname,address,city,state,phone,email,invoicenumber,company,total,balance,paid,lastpaiddate,duedate,price){
	console.log("invoicedetail.js::emailpdf::  firstname " + firstname 	+" lastname " + lastname 	+" address " + address 	+" city " + city 	
	+" state " + state 	+" phone " + phone 	+" email " + email 	+" invoicenumber " + invoicenumber 	+" company " + company 	+" total " + total 	
	+" balance " + balance 	+" paid " + paid 	+" lastpaiddate " + lastpaiddate 	+" duedate " + duedate 	+" price " + price);
	
	var html2pdf = require('com.factisresearch.html2pdf');  
 	Ti.API.info("module is => " + html2pdf);  
 	var adhocs = Alloy.Collections.instance('adhoc');
   
 	html2pdf.addEventListener('pdfready', function(e) {  
	     var file = Ti.Filesystem.getFile(e.pdf);   
	    console.log("invoicedetail.js::html2pdf.addEventListener:: Ti.Filesystem.applicationDataDirectory "+Ti.Filesystem.applicationDataDirectory);
		var oldfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'invoice.pdf');
		if (oldfile.exists()) { oldfile.deleteFile(); }
		var orgfile =  Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'Expose.pdf');
        var renamesuccess = orgfile.rename('invoice.pdf');
        console.log("invoicedetail.js::html2pdf.addEventListener:: renamesuccess "+renamesuccess);
	     var file = 'invoice.pdf';
	     console.log("opening viewpdf(url) on "+file);
     	 viewpdf(file);
     	 Alloy.Globals.checkGoogleisAuthorized();
     	 Alloy.Globals.uploadFile(file,"invdeen1.pdf") ;
 	});  
 	
 	//var html = '<html><body><p>dBayCo Inc. limited </p></body></html>'; 
 	
 	//var html="";
	//html += "<html><body><div id=\"top-bar\"><div id=\"doc-title\"><span class=\"name\">sample invoice : Sheet1<\/span><\/div><\/div><div id=\"sheets-viewport\"><div id=\"0\" style=\"display:none;position:relative;\" dir=\"ltr\"><div class=\"ritz grid-container\" dir=\"ltr\"><table class=\"waffle\" cellspacing=\"0\" cellpadding=\"0\"><thead><tr><th class=\"row-header freezebar-origin-ltr header-shim row-header-shim\"><\/th><th id=\"0C0\" style=\"width:195px\" class=\"header-shim\"><\/th><th id=\"0C1\" style=\"width:286px\" class=\"header-shim\"><\/th><th id=\"0C2\" style=\"width:100px\" class=\"header-shim\"><\/th><th id=\"0C3\" style=\"width:100px\" class=\"header-shim\"><\/th><th id=\"0C4\" style=\"width:100px\" class=\"header-shim\"><\/th><\/tr><\/thead><tbody><tr style='height:20px;'><th id=\"0R0\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">1<\/div><\/th><td><\/td><td><\/td><td><\/td><td><\/td><td><\/td><\/tr><tr style='height:20px;'><th id=\"0R1\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">2<\/div><\/th><td class=\"s0\" dir=\"ltr\" colspan=\"5\">DbayCo Inc. 130 Moreland Rd., Brookfield, WI 53222<\/td><\/tr><tr style='height:20px;'><th id=\"0R2\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">3<\/div><\/th><td class=\"s1\" dir=\"ltr\" colspan=\"5\">Phone: 262-501-2948, Fax: 262-290-3141. Email: deen@idevice.net<\/td><\/tr><tr style='height:20px;'><th id=\"0R3\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">4<\/div><\/th><td class=\"s2\" colspan=\"5\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R4\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">5<\/div><\/th><td class=\"s3\" dir=\"ltr\" colspan=\"3\">INVOICE<\/td><td class=\"s0\" dir=\"ltr\" colspan=\"2\">WAN-20150225-1<\/td><\/tr><tr style='height:20px;'><th id=\"0R5\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">6<\/div><\/th><td class=\"s2\" colspan=\"2\" rowspan=\"2\"><\/td><td class=\"s2\" colspan=\"3\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R6\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">7<\/div><\/th><td class=\"s4\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R7\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">8<\/div><\/th><td class=\"s2\" dir=\"ltr\">Wannoorbaya WChik<\/td><td class=\"s2\" rowspan=\"4\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\">230<\/td><td class=\"s5\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R8\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">9<\/div><\/th><td class=\"s2\" dir=\"ltr\">2258 S Sanctuary Dr<\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s6\" dir=\"ltr\">due 4\/1\/2015<\/td><\/tr><tr style='height:20px;'><th id=\"0R9\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">10<\/div><\/th><td class=\"s2\" dir=\"ltr\">New Berlin, WI 53151<\/td><td class=\"s2\" colspan=\"3\" rowspan=\"2\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R10\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">11<\/div><\/th><td class=\"s2\" dir=\"ltr\">Date: 2\/28\/2014<\/td><\/tr><tr style='height:20px;'><th id=\"0R11\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">12<\/div><\/th><td class=\"s2\" colspan=\"5\" rowspan=\"2\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R12\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">13<\/div><\/th><\/tr><tr style='height:20px;'><th id=\"0R13\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">14<\/div><\/th><td class=\"s7\" dir=\"ltr\">Item no.<\/td><td class=\"s7\" dir=\"ltr\">Description<\/td><td class=\"s7\" dir=\"ltr\">Qty<\/td><td class=\"s7\" dir=\"ltr\">Unit\/Price<\/td><td class=\"s8\" dir=\"ltr\">Price<\/td><\/tr><tr style='height:20px;'><th id=\"0R14\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">15<\/div><\/th><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R15\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">16<\/div><\/th><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s2\" dir=\"ltr\">Mow Lawn<\/td><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s9\" dir=\"ltr\">100<\/td><td class=\"s10\" dir=\"ltr\">100<\/td><\/tr><tr style='height:20px;'><th id=\"0R16\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">17<\/div><\/th><td class=\"s9\" dir=\"ltr\">2<\/td><td class=\"s2\" dir=\"ltr\">Cut Trees<\/td><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s9\" dir=\"ltr\">120<\/td><td class=\"s10\" dir=\"ltr\">120<\/td><\/tr><tr style='height:20px;'><th id=\"0R17\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">18<\/div><\/th><td class=\"s11\"><\/td><td class=\"s11\"><\/td><td class=\"s11\"><\/td><td class=\"s11\" dir=\"ltr\"><\/td><td class=\"s12\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R18\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">19<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">SubTotal<\/td><td class=\"s10\" dir=\"ltr\">220<\/td><\/tr><tr style='height:20px;'><th id=\"0R19\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">20<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Tax<\/td><td class=\"s10\" dir=\"ltr\">10<\/td><\/tr><tr style='height:20px;'><th id=\"0R20\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">21<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Other<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R21\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">22<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Discount<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R22\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">23<\/div><\/th><td><\/td><td><\/td><td class=\"s13\" dir=\"ltr\"><\/td><td class=\"s13\" dir=\"ltr\">Paid<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R23\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">24<\/div><\/th><td><\/td><td><\/td><td class=\"s14\" dir=\"ltr\">Total due by<\/td><td class=\"s15\" dir=\"ltr\">4\/1\/2015<\/td><td class=\"s15\" dir=\"ltr\">230<\/td><\/tr><\/tbody><\/table><\/div><\/div><\/div><\/body><\/html>";
	var coName = 'Jack Mow Inc.';
	var coAddress = "1125 Bluemound Rd., Brookfield, WI 53222";
	var coPhone = "262-290-3141";
	var coFax = "262-290-3142";
	var coEmail = "sales@jackmowinc.com";
	
	var invoiceno = "002345";
	
	adhocs.fetch();
	console.log("invoicedetail.js::emailpdf:: adhocs contents "+JSON.stringify(adhocs)); 
	console.log("invoicedetail.js::emailpdf:: adhocs.length: "+adhocs.length); 
	var strVarItems="";
	for (i=0;i<adhocs.length;i++){
		console.log("invoicedetail.js::emailpdf:: adhocs.models["+i+"].toJSON().col3: "+adhocs.models[i].toJSON().col3);
		var jobitemstring=adhocs.models[i].toJSON().col3.replace(/xSqBracketOpen/,'[').replace(/xSqBracketClose/,']');
		console.log("invoicedetail.js::emailpdf:: adhocs extraction: jobitemstring.length "+jobitemstring.length+ "jobitemstring : "+jobitemstring);
		var jobitemjson = JSON.parse(jobitemstring);
		for (j=0;j<jobitemjson.length;j++){
			var names=jobitemjson[0].names;
			console.log("invoicedetail.js::emailpdf:: adhocs extraction:  names : "+jobitemjson[j].names+" : "+jobitemjson[j].descr+" : "+jobitemjson[j].lineitem+" : "+jobitemjson[j].price+" : "+jobitemjson[j].qty);
			strVarItems += "				<tbody>";
			strVarItems += "					<tr>";
			if(j>0){
				console.log("invoicedetail.js::emailpdf:: names comparison:  "+jobitemjson[j].names+" vs. "+jobitemjson[j-1].names);
				if(jobitemjson[j].names==jobitemjson[j-1].names){
					strVarItems += "						<td><a class=\"cut\">-<\/a><span contenteditable> <\/span><\/td>";
				} else {
					strVarItems += "						<td><a class=\"cut\">-<\/a><span contenteditable>"+jobitemjson[j].names+"<\/span><\/td>";
				}
				if(jobitemjson[j].descr==jobitemjson[j-1].descr){
					strVarItems += "						<td><span contenteditable> <\/span><\/td>";
				} else {
					strVarItems += "						<td><span contenteditable>"+jobitemjson[j].descr+"<\/span><\/td>";
				}
			} else {
				strVarItems += "						<td><a class=\"cut\">-<\/a><span contenteditable>"+jobitemjson[j].names+"<\/span><\/td>";
				strVarItems += "						<td><span contenteditable>"+jobitemjson[j].descr+"<\/span><\/td>";
			}
			strVarItems += "						<td><span contenteditable>"+jobitemjson[j].lineitem+"<\/span><\/td>";
			strVarItems += "						<td><span contenteditable>"+jobitemjson[j].qty+"<\/span><\/td>";
			(isNaN(jobitemjson[j].price))?strVarItems += "						<td><span>"+jobitemjson[j].price+"<\/span><\/td>":strVarItems += "						<td><span data-prefix>$<\/span><span>"+jobitemjson[j].price+"<\/span><\/td>";
			strVarItems += "					<\/tr>";
			strVarItems += "				<\/tbody>";
		}
	}
  
	var strVar="";
	strVar += "<html>";
	strVar += "	<head>";
	strVar += "		<meta charset=\"utf-8\">";
	strVar += "		<title>Invoice<\/title>";
	strVar += "<style>";
	strVar += "    \/* reset *\/";
	strVar += "";
	strVar += "*";
	strVar += "{";
	strVar += "	border: 0;";
	strVar += "	box-sizing: content-box;";
	strVar += "	color: inherit;";
	strVar += "	font-family: inherit;";
	strVar += "	font-size: inherit;";
	strVar += "	font-style: inherit;";
	strVar += "	font-weight: inherit;";
	strVar += "	line-height: inherit;";
	strVar += "	list-style: none;";
	strVar += "	margin: 0;";
	strVar += "	padding: 0;";
	strVar += "	text-decoration: none;";
	strVar += "	vertical-align: top;";
	strVar += "}";
	strVar += "";
	strVar += "\/* content editable *\/";
	strVar += "";
	strVar += "*[contenteditable] { border-radius: 0.25em; min-width: 1em; outline: 0; }";
	strVar += "";
	strVar += "*[contenteditable] { cursor: pointer; }";
	strVar += "";
	strVar += "*[contenteditable]:hover, *[contenteditable]:focus, td:hover *[contenteditable], td:focus *[contenteditable], img.hover { background: #DEF; box-shadow: 0 0 1em 0.5em #DEF; }";
	strVar += "";
	strVar += "span[contenteditable] { display: inline-block; }";
	strVar += "";
	strVar += "\/* heading *\/";
	strVar += "";
	strVar += "h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }";
	strVar += "";
	strVar += "\/* table *\/";
	strVar += "";
	strVar += "table { font-size: 75%; table-layout: fixed; width: 100%; }";
	strVar += "table { border-collapse: separate; border-spacing: 2px; }";
	strVar += "th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }";
	strVar += "th, td { border-radius: 0.25em; border-style: solid; }";
	strVar += "th { background: #EEE; border-color: #BBB; }";
	strVar += "td { border-color: #DDD; }";
	strVar += "";
	strVar += "\/* page *\/";
	strVar += "";
	strVar += "html { font: 16px\/1 'Open Sans', sans-serif; overflow: auto; padding: 0.5in; }";
	strVar += "html { background: #999; cursor: default; }";
	strVar += "";
	strVar += "body { box-sizing: border-box; height: 11in; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in; }";
	strVar += "body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }";
	strVar += "";
	strVar += "\/* header *\/";
	strVar += "";
	strVar += "header { margin: 0 0 3em; }";
	strVar += "header:after { clear: both; content: \"\"; display: table; }";
	strVar += "";
	strVar += "header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }";
	strVar += "header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }";
	strVar += "header address p { margin: 0 0 0.25em; }";
	strVar += "header span, header img { display: block; float: right; }";
	strVar += "header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }";
	strVar += "header img { max-height: 100%; max-width: 100%; }";
	strVar += "header input { cursor: pointer; -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%; }";
	strVar += "";
	strVar += "\/* article *\/";
	strVar += "";
	strVar += "article, article address, table.meta, table.inventory { margin: 0 0 3em; }";
	strVar += "article:after { clear: both; content: \"\"; display: table; }";
	strVar += "article h1 { clip: rect(0 0 0 0); position: absolute; }";
	strVar += "";
	strVar += "article address { float: left; font-size: 125%; font-weight: bold; }";
	strVar += "";
	strVar += "\/* table meta & balance *\/";
	strVar += "";
	strVar += "table.meta, table.balance { float: right; width: 36%; }";
	strVar += "table.meta:after, table.balance:after { clear: both; content: \"\"; display: table; }";
	strVar += "";
	strVar += "\/* table meta *\/";
	strVar += "";
	strVar += "table.meta th { width: 40%; }";
	strVar += "table.meta td { width: 60%; }";
	strVar += "";
	strVar += "\/* table items *\/";
	strVar += "";
	strVar += "table.inventory { clear: both; width: 100%; }";
	strVar += "table.inventory th { font-weight: bold; text-align: center; }";
	strVar += "";
	strVar += "table.inventory td:nth-child(1) { width: 26%; }";
	strVar += "table.inventory td:nth-child(2) { width: 38%; }";
	strVar += "table.inventory td:nth-child(3) { text-align: right; width: 12%; }";
	strVar += "table.inventory td:nth-child(4) { text-align: right; width: 12%; }";
	strVar += "table.inventory td:nth-child(5) { text-align: right; width: 12%; }";
	strVar += "";
	strVar += "\/* table balance *\/";
	strVar += "";
	strVar += "table.balance th, table.balance td { width: 50%; }";
	strVar += "table.balance td { text-align: right; }";
	strVar += "";
	strVar += "\/* aside *\/";
	strVar += "";
	strVar += "aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }";
	strVar += "aside h1 { border-color: #999; border-bottom-style: solid; }";
	strVar += "";
	strVar += "";
	strVar += "@media print {";
	strVar += "	* { -webkit-print-color-adjust: exact; }";
	strVar += "	html { background: none; padding: 0; }";
	strVar += "	body { box-shadow: none; margin: 0; }";
	strVar += "	span:empty { display: none; }";
	strVar += "	.add, .cut { display: none; }";
	strVar += "}";
	strVar += "";
	strVar += "@page { margin: 0; }";
	strVar += "            <\/style>";
	strVar += "	<\/head>";
	strVar += "	<body>";
	strVar += "		<header>";
	strVar += "			<h1>Invoice<\/h1>";
	strVar += "			<address contenteditable>";
	strVar += "				<p>"+coName+"<\/p>";
	strVar += "				<p>"+coAddress+"<\/p>";
	strVar += "				<p>"+coPhone+"<\/p>";
	strVar += "				<p>"+coFax+"<\/p>";
	strVar += "				<p>"+coEmail+"<\/p>";
	strVar += "			<\/address>";
	strVar += "			<span><img alt=\"\" src=\""+logourl+"\"><input type=\"file\" accept=\"image\/*\"><\/span>";
	strVar += "		<\/header>";
	strVar += "		<article>";
	strVar += "			<h1>Recipient<\/h1>";
	strVar += "			<address contenteditable>";
	strVar += "				<p>"+firstname+" "+lastname+"<br>"+address+"<br>"+city+", "+state+"<br> phone:  "+phone+"<br> email: "+email+"<\/p>";
	strVar += "			<\/address>";
	strVar += "			<table class=\"meta\">";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Invoice #<\/span><\/th>";
	strVar += "					<td><span contenteditable>"+invoicenumber+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Date<\/span><\/th>";
	strVar += "					<td><span contenteditable>"+(new Date()).toString().slice(4,16)+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Amount Due<\/span><\/th>";
	strVar += "					<td><span id=\"prefix\" contenteditable>$<\/span><span>600.00<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "			<\/table>";
	strVar += "			<table class=\"inventory\">";
	strVar += "				<thead>";
	strVar += "					<tr>";
	strVar += "						<th><span contenteditable>Project<\/span><\/th>";
	strVar += "						<th><span contenteditable>Description<\/span><\/th>";
	strVar += "						<th><span contenteditable>Item<\/span><\/th>";
	strVar += "						<th><span contenteditable>Quantity<\/span><\/th>";
	strVar += "						<th><span contenteditable>Price<\/span><\/th>";
	strVar += "					<\/tr>";
	strVar += "				<\/thead>";
	strVar += strVarItems;
	strVar += "			<\/table>";
	strVar += "			<table class=\"balance\">";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Total<\/span><\/th>";
	strVar += "					<td><span data-prefix>$<\/span><span>"+subtotal+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Amount Paid<\/span><\/th>";
	strVar += "					<td><span data-prefix>$<\/span><span contenteditable>"+paid+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Balance Due<\/span><\/th>";
	strVar += "					<td><span data-prefix>$<\/span><span>"+balance+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "			<\/table>";
	strVar += "		<\/article>";
	strVar += "		<aside>";
	strVar += "			<h1><span contenteditable>Additional Notes<\/span><\/h1>";
	strVar += "			<div contenteditable>";
	strVar += "				<p>A finance charge of 1.5% will be made on unpaid balances after 30 days.<\/p>";
	strVar += "			<\/div>";
	strVar += "		<\/aside>";
	strVar += "	<\/body>";
	strVar += "<\/html>";
   
 	html2pdf.setHtmlString(strVar); 
 };
