var args = arguments[0] || {};
Titanium.App.Properties.setString('selectclient',"false");
exports.openMainWindow = function(_tab) {
  _tab.open($.enterproject_window);
  Ti.API.info("enterproject.js::openMainWindow::this is child widow " +JSON.stringify(_tab));
 (Alloy.Globals.googleAuthSheet.getAccessToken()) || Alloy.Globals.googleAuthSheet.authorize();
  //var backButtonTitle = _tab.window.title; 
 // Alloy.Globals.Log("enterproject.js::openMainWindow:: set back_button title to: "+backButtonTitle);
  //$.back_button.title = "< "+backButtonTitle;	
};
$.save_button.selectclient = 'no';
var savedata = {col1:"",col2:"",col3:"",col4:"",col5:"",col6:"",col7:"",col8:"",col9:"",col10:"",col11:"",col12:"",col13:"",col14:"",col15:"",col16:""};
$.save_button.savedata = savedata;
item = [{descr:""}];
item.push({lineitem:"",qty:"",price:""});$.addrow_button.item = item;savedata.col12=JSON.stringify(item).toString().replace(/:/g,'cOlOn');$.save_button.savedata=savedata;
$.projectname_tf.addEventListener('change',function(e){savedata.col1 = e.value;$.addrow_button.item = item;savedata.col12=JSON.stringify(item).toString().replace(/:/g,'cOlOn');$.save_button.savedata=savedata;Alloy.Globals.Log("enteproject.js::projectname_tf:savedata: "+JSON.stringify(savedata));});
$.projectdescr_tf.addEventListener('change',function(e){item[0].descr = e.value;$.addrow_button.item = item;savedata.col12=JSON.stringify(item).toString().replace(/:/g,'cOlOn');$.save_button.savedata=savedata;Alloy.Globals.Log("enteproject.js::projectdescr_tf:item: "+JSON.stringify(item));});
$.lineitem_tf.addEventListener('blur',function(e){item[1].lineitem = e.value;$.addrow_button.item = item;savedata.col12=JSON.stringify(item).toString().replace(/:/g,'cOlOn');$.save_button.savedata=savedata;Alloy.Globals.Log("enteproject.js::lineitem_tf:item: "+JSON.stringify(item));});
$.lineitemqty_tf.addEventListener('blur',function(e){item[1].qty = e.value;$.addrow_button.item = item;savedata.col12=JSON.stringify(item).toString().replace(/:/g,'cOlOn');$.save_button.savedata=savedata;Alloy.Globals.Log("enteproject.js::lineitemqty_tf:item: "+JSON.stringify(item));});
$.lineitemprice_tf.addEventListener('blur',function(e){item[1].price = e.value;$.addrow_button.item = item;savedata.col12=JSON.stringify(item).toString().replace(/:/g,'cOlOn');$.save_button.savedata=savedata;Alloy.Globals.Log("enteproject.js::lineitemprice_tf:item: "+JSON.stringify(item));});

//$.back_button.sid = "1234";

//Alloy.Globals.checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');


//reset all variables.
	Ti.App.Properties.removeProperty('dbNeedSync');
    Ti.App.Properties.removeProperty('edithref'); //clear ref to previous spreadsheet
    Ti.App.Properties.removeProperty('idtag'); //clear ref to previous spreadsheet
    Ti.App.Properties.removeProperty('selfhref'); //clear ref to previous spreadsheet
    

Alloy.Globals.Log("enterproject.js::JSON.stringify(args): "+JSON.stringify(args));

(args.firstname)?$.projectclientfirstname_tf.value=args.firstname:$.projectclientfirstname_tf.value=" ";
(args.lastname)?$.projectclientlastname_tf.value=args.lastname:$.projectclientlastname_tf.value=" ";
(args.company)?$.projectclientcompany_tf.value=args.company:$.projectclientcompany_tf.value=" ";
(args.phone)?$.projectclientphone_tf.value=args.phone:$.projectclientphone_tf.value=" ";
(args.email)?$.projectclientemail_tf.value=args.email:$.projectclientemail_tf.value=" ";
(args.address)?$.projectclientstreetaddress_tf.value=args.address:$.projectclientstreetaddress_tf.value=" ";
(args.city)?$.projectclientcity_tf.value=args.city:$.projectclientcity_tf.value=" ";
(args.state)?$.projectclientstate_tf.value=args.state:$.projectclientstate_tf.value=" ";
if (args.projectname) { $.projectname_tf.value=args.projectname; savedata.col1 = args.projectname;$.save_button.savedata = savedata;};
(args.selectclient)?$.save_button.selectclient = 'yes':$.save_button.selectclient = 'no';



if (args.projectid && args.customerid ) {
	//tag ids to the button.
	var projectid = args.projectid.trim(); $.save_button.titleid = projectid;
	var customerid = args.customerid.trim(); $.save_button.customerid = customerid;
	var projects = Alloy.Collections.instance('project');
	projects.fetch();	
	if (args.edithref){$.save_button.projectedithref = args.edithref;};
	if (args.idtag){$.save_button.projectidtag = args.idtag;};
	if (args.selfhref){$.save_button.projectselfhref = args.selfhref;};
	var clients = Alloy.Collections.instance('client');
	clients.fetch();
	var theclient = clients.where({col1:customerid}); //FILTER
	if (theclient.length > 0 ){
		for (j=0;j<theclient.length;j++){
			   var theclientjson = theclient[j].toJSON(); // EXTRACT ONE ROW. IF MANY. FOR LOOP.
    		   Alloy.Globals.Log("enteproject.js::theclientjson.col1 :"+theclientjson.col1+" col14: "+theclientjson.col14);
		}
	}
	if (theclient.length > 0 ){
		var clienthref=theclient[0].toJSON().col14;
		var clientidtag = clienthref.replace(/xCoLoNx/g,',').split(',')[0].replace('yCoLoNy',':');$.save_button.clientidtag = clientidtag;
		var clientselfhref = clienthref.replace(/xCoLoNx/g,',').split(',')[1].replace('yCoLoNy',':');$.save_button.clientselfhref = clientselfhref;
		var clientedithref = clienthref.replace(/xCoLoNx/g,',').split(',')[2].replace('yCoLoNy',':');$.save_button.clientedithref = clientedithref;
		Alloy.Globals.Log("enteproject.js::clienthref :"+clienthref);
		Alloy.Globals.Log("enteproject.js::clientidtag :"+clientidtag+" clientselfhref: "+clientselfhref+" clientedithref: "+clientedithref);
		};
	
	
	
		
	Titanium.App.Properties.setString('edithref',args.edithref);
	Titanium.App.Properties.setString('idtag',args.idtag);
	Titanium.App.Properties.setString('selfhref',args.selfhref);
}
    

function addRows(){
 Alloy.Globals.Log("JSON stringify e : " +JSON.stringify(e));
// Defining new row
var newRow = Ti.UI.createTableViewRow({
title : 'Row ' + ($.enterproject_table.data[0].rowCount + 1)
});
 
// Adding row to the table view
$.enterproject_table.appendRow(newRow);
}


var count = 3; //row where line item is entered
Titanium.App.Properties.setInt('count',count);
c=1;
function addItem(e){
	c=(c)?c+1:2;
	Alloy.Globals.Log('enterproject.js::addItem:: JSON stringify e : ' +JSON.stringify(e));
	var item = e.source.item;
	item.push({lineitem:"",qty:"",price:""});$.addrow_button.item = item;
    Alloy.Globals.Log('c :' +c);
	//log	
	Alloy.Globals.Log('enterproject.js::addItem:: item: ' +JSON.stringify(item));
	var itemval = c - 1;
	// Defining new test field
	eval("var itemLabellist"+c+"= Ti.UI.createLabel({text:'Line item ' + c +' : ',font : {fontSize: '14'},left:'20',top:'10',color:'#3B708A'})");
	eval("var itemTextField"+c+"= Titanium.UI.createTextField({borderColor:'white',width: Ti.UI.FILL,left:'120',top: '12',font: {fontSize: '14'},value: (e == 'modify')?item["+c+"].lineitem:''})");
	eval("itemTextField"+c+".addEventListener('change',function(e){item["+c+"].lineitem = e.value;$.addrow_button.item = item;savedata.col12=JSON.stringify(item).toString().replace(/:/g,'cOlOn');$.save_button.savedata=savedata;Alloy.Globals.Log('enteproject.js::lineitem_tf:item:' +JSON.stringify(item));})");
	eval("var itemLabelqty"+c+"= Ti.UI.createLabel({text:'qty(opt) : ',font : {fontSize: '14'},top:'30',left:'20',color:'#3B708A'})");
	eval("var itemTextFieldqty"+c+"= Titanium.UI.createTextField({top:32,left:90,width:40,hintText:'1',width:60,value:(e == 'modify')?isNaN(item["+c+"].qty)?item["+c+"].qty=0:item["+c+"].qty:''})");
	eval("itemTextFieldqty"+c+".font={fontSize:14}");;
	eval("itemTextFieldqty"+c+".keyboardType=Ti.UI.KEYBOARD_NUMBER_PAD");
	eval("itemTextFieldqty"+c+".returnKeyType=Ti.UI.RETURNKEY_DONE");
	eval("itemTextFieldqty"+c+".borderColor='white'");
	eval("itemTextFieldqty"+c+".addEventListener('change',function(e){item["+c+"].qty = e.value;$.addrow_button.item = item;savedata.col12=JSON.stringify(item).toString().replace(/:/g,'cOlOn');$.save_button.savedata=savedata;Alloy.Globals.Log('enteproject.js::qty_tf:item:' +JSON.stringify(item));})");
	eval("isNaN(item["+c+"].qty)?item["+c+"].qty=0:item["+c+"].qty;");
	eval("var itemLabelprice"+c+"= Ti.UI.createLabel({text:'price(opt) : ',font:{fontSize:14},top:30,left:180,color: '#3B708A'})");
	eval("var itemTextFieldprice"+c+"= Titanium.UI.createTextField({borderColor:'white',top:32,left:260,hintText: '160',width:100,border: 1,value: (e == 'modify')?item["+c+"].price:''})");
	eval("itemTextFieldprice"+c+".keyboardType = Ti.UI.KEYBOARD_DECIMAL_PAD");
	eval("itemTextFieldprice"+c+".returnKeyType = Ti.UI.RETURNKEY_DONE");
	eval("itemTextFieldprice"+c+".font = {fontSize: '14'}");
	eval("var toolbarDone"+c+"= Ti.UI.createButton({systemButton: Titanium.UI.iPhone.SystemButton.DONE})");
	eval("var flexSpace"+c+"= Titanium.UI.createButton({systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE})");
	eval("toolbarDone"+c+".addEventListener('click', function(){itemTextFieldprice"+c+".blur()})");
	eval("itemTextFieldprice"+c+".keyboardToolbarColor = '#80c342'");
	eval("itemTextFieldprice"+c+".keyboardToolbar = [flexSpace"+c+", toolbarDone"+c+"]");
	eval("itemTextFieldprice"+c+".addEventListener('change',function(e){item["+c+"].price = e.value;$.addrow_button.item = item;savedata.col12=JSON.stringify(item).toString().replace(/:/g,'cOlOn');$.save_button.savedata=savedata;Alloy.Globals.Log('enteproject.js::price_tf:item:' +JSON.stringify(item));})");
	eval("isNaN(item["+c+"].price)?item["+c+"].price=0:item["+c+"].price;");

	// Defining new row
	var newView = Ti.UI.createView();
	var newRow = Ti.UI.createTableViewRow({
		height: '50',
		borderColor : 'white',
		backgroundColor : 'white'
	});
	eval("newView.add(itemLabellist"+c+")");
	eval("newView.add(itemTextField"+c+")");
	eval("newView.add(itemLabelqty"+c+")");
	eval("newView.add(itemTextFieldqty"+c+")");
	eval("newView.add(itemLabelprice"+c+")");
	eval("newView.add(itemTextFieldprice"+c+")");
	newRow.add(newView);
    
	// Adding row to the table view
	$.enterproject_table.insertRowAfter(c+1,newRow);
	//var c = c+1;
	//Alloy.Globals.Log('new c :' +c);
	//Titanium.App.Properties.setInt('c',c);
	//var textfield = Ti.UI.createTextField({keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD, returnKeyType: Ti.UI.RETURNKEY_DONE, backgroundColor: '#262626', border: 1, width: 100});

}

$.lineitem_tf.addEventListener('blur', function(_e) {
    var clientproject = $.lineitem_tf.value;
    item[1].lineitem = _e.value;
    Alloy.Globals.Log("enterproject:js:lineitem_tf:blur:JSON.stringify(item) "+JSON.stringify(item));
    Ti.API.info("clientproject entered is: "+clientproject);
    Titanium.App.Properties.setString('clientproject',clientproject);
    Ti.API.info("clientproject obtained is: "+Titanium.App.Properties.getString('clientproject',"none"));
    Alloy.Globals.Log("e JSON of textfield: "+JSON.stringify(_e));
 });
 
 var itemvalue =[];

 function saveHandler(e){
 	//$.back_button.titleid = "dbNeedSync";
 	Alloy.Globals.Log("enterproject.js::saveHandler::JSON.stringify(e): "+JSON.stringify(e));
 	Alloy.Globals.Log("enterproject.js::saveHandler::JSON.stringify(e.source.savedata): "+JSON.stringify(e.source.savedata));
 	var savedata = e.source.savedata;
 	Alloy.Globals.Log("saving all data ");
 	var tabledata = [];	
 	var getvalue = ["clientfirstname","clientlastname","clientphone","clientemail","clientstreetaddress","clientcity","clientstate","clientcompany"];
 	for (i=0;i<$.enterproject_table.data[0].rowCount;i++) {		
 		Alloy.Globals.Log("children count : "	+$.enterproject_table.data[0].rows[i].children.length);
 		for (j=0;j<+$.enterproject_table.data[0].rows[i].children.length;j++) { 			
			Alloy.Globals.Log("JSON stringify table 0 row "+i+' : ' +JSON.stringify($.enterproject_table.data[0].rows[i]));
			Alloy.Globals.Log("JSON stringify table 0 row "+i+'w/children '+j+' : ' +JSON.stringify($.enterproject_table.data[0].rows[i].children[j]));
			tabledata.push({data1:$.enterproject_table.data[0].rows[i].children[j].id || "none",data2:$.enterproject_table.data[0].rows[i].children[j].value || "none"});
			for (z=0;z<getvalue.length;z++){
				var subject = getvalue[z];
				if ( $.enterproject_table.data[0].rows[i].children[j].id == "project"+subject+"_tf") {					
					 	eval("var "+subject+" = $.enterproject_table.data[0].rows[i].children[j].value || $.enterproject_table.data[0].rows[i].children[j].text;");		 
				};
			}		
		};
	};
	Alloy.Globals.Log("tabledata are: "+JSON.stringify(tabledata));
	Alloy.Globals.Log("enterproject.js::saveHandler:: detect array dyn variable: "+clientfirstname+","+clientlastname+","+clientphone+","+clientemail+","+clientstreetaddress
	+","+clientcity+","+clientstate+","+clientcompany);
	//once tabledata is populated, find submission value
	Alloy.Globals.Log("enterproject::saveHandler:JSON.stringify(item): "+JSON.stringify(item));
	var projectnumber = "10";
	var name = clientfirstname+' '+clientlastname;
	var customerno = "2";
	var total = "200";
	var bal = "200";
	var paid = "50%";
	var dates = "[{\"nextapptdate\"cOlOn\"10/1/2015\",\"duedate\"cOlOn\"6/1/2015\",\"lastpaiddate\"cOlOn\"4/1/2015\"}]";
	var currency = "USD";
	var status = (status)?status:"Not Started";
	var country = "USA";
	var clientproject = savedata.col1;
	var notes = JSON.stringify(item).toString().replace(/:/g,'cOlOn');
	var projectid = e.source.titleid || Date.now();
	var customerid = e.source.customerid || Date.now();
	Alloy.Globals.Log("enterproject.js::saveHandler::clientproject: "+clientproject+" clientfirstname: "+clientfirstname+" projectid: "+projectid+" customerid: "+customerid);	
	submit(e,clientproject.trim(),clientfirstname.trim(),clientlastname.trim(),clientcompany,clientphone,clientemail,clientstreetaddress,clientcity,clientstate,country,status,notes,"0","none",dates,projectid,customerid,"project");
	(e.source.selectclient == "no") && submit(e,customerid,clientfirstname.trim(),clientlastname.trim(),clientcompany,clientphone,clientemail,clientstreetaddress,clientcity,clientstate,country,status,notes,"0","none",dates,projectid,customerid,"client");
	///Alloy.Globals.Log('submit('+projectnumber+','+name+','+customerno+','+total+','+bal+','+paid+','+lastpaiddate+','+followupdate+','+clientphone+','+clientemail+','+duedate+','
	///+currency+','+status+')');
 }; 
 var notes = savedata.col12;
 function submit(e,clientproject,clientfirstname,clientlastname,clientcompany,clientphone,clientemail,clientstreetaddress,clientcity,clientstate,country,status,notes,percentcompletion,nextappt,datedue,projectid,customerid,type) {	
    //var existingedithref = Titanium.App.Properties.getString('edithref');
    if(type=="project"){ var existingedithref = e.source.projectedithref; };
    if(type=="client"){ var existingedithref = e.source.clientedithref; };
    var edithref = e.source.projectedithref;
    var idtag = Titanium.App.Properties.getString('idtag');
    var selfhref = Titanium.App.Properties.getString('selfhref');
 
 	var now = Date.now();

	var xhr =  Titanium.Network.createHTTPClient({
    onload: function() {
    	try {
    		Ti.API.info(this.responseText); 
			var xml = Titanium.XML.parseString(this.responseText);
    		var entry = xml.documentElement.getElementsByTagName("entry");
    		var link = xml.documentElement.getElementsByTagName("link");
    		var idtag = xml.documentElement.getElementsByTagName("id").item(0).text;
    		Alloy.Globals.Log("enterclient.js::submit: number of link found: " +link+ " length: "+link.length);
    		for (i=0;i<link.length;i++){			
    			var listitem = link.item(i);
    			if (listitem.getAttribute("rel") == "edit"){ var edithref = listitem.getAttribute("href");}
    			if (listitem.getAttribute("rel") == "self"){ var selfhref = listitem.getAttribute("href");}
    		}
    		Titanium.App.Properties.setString('edithref',edithref);
    		Titanium.App.Properties.setString('idtag',idtag);
    		Titanium.App.Properties.setString('selfhref',selfhref);
    		if (type=="project"){
    			projectedithref=edithref;$.save_button.projectedithref = projectedithref;
    			projectidtag=idtag;$.save_button.projectidtag = projectidtag;
    			projectselfhref=selfhref;$.save_button.projectselfhref = projectselfhref;
    		} else if (type="client"){
	   			clientedithref=edithref;$.save_button.clientedithref = clientedithref;
    			clientidtag=idtag;$.save_button.clientidtag = clientidtag;
    			clientselfhref=selfhref;$.save_button.clientselfhref = clientselfhref;
    		}
    		Ti.API.info("enterproject.js::submit: self href is : "+selfhref+" edit href is: "+edithref);
    		Ti.API.info("enterproject.js::submit: idtag is : "+idtag);
    		// Once success, feed data to DB
    	} catch(e){
    		Ti.API.info("cathing e: "+JSON.stringify(e));
    	}     
    },
    onerror: function(e) {
    	Ti.API.info("error e: "+JSON.stringify(e));
        alert("Unable to communicate to the cloud. Please try again."); 
    }
});

	var clients = Alloy.Collections.instance('client');
	var projects = Alloy.Collections.instance('project');
	if (existingedithref) {
				if(type=="project"){
					Alloy.Globals.Log("enterclient.js::submit::PUT on existing edit href is: "+existingedithref);
					xhr.open("PUT", existingedithref);
					var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
						+'<id>'+idtag+'</id>'
						+'<updated>2015-05-16T08:01:19.680Z</updated>'
						+'<category scheme=\'http://schemas.google.com/spreadsheets/2006\' term=\'http://schemas.google.com/spreadsheets/2006#list\'/>'
						+'<title type=\'text\'>'+clientproject+'</title>'
						+'<content type=\'text\'>col2: '+clientfirstname+', col3: '+clientlastname+', col4: '+clientcompany+', col5: '+clientphone+', col6: '+clientemail+', col7: '+clientstreetaddress
						+', col8: '+clientcity+', col9: '+clientstate+', col10: '+country+', col11: '+status+', col12: '+notes+', col13: '+customerid+' , col14: '+nextappt+', col15: '+datedue+', col16: '+projectid+'</content>'
						+'<link rel=\'self\' type=\'application/atom+xml\' href=\''+selfhref+'\'/>'
						+'<link rel=\'edit\' type=\'application/atom+xml\' href=\''+edithref+'\'/>'
						+'<gsx:col1>'+clientproject+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
						+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
						+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8><gsx:col9>'+clientstate
						+'</gsx:col9><gsx:col10>'+country+'</gsx:col10><gsx:col11>'+status+'</gsx:col11><gsx:col12>'+notes+'</gsx:col12><gsx:col13>'+customerid+'</gsx:col13><gsx:col14>'+nextappt+'</gsx:col14><gsx:col15>'+datedue
						+'</gsx:col15><gsx:col16>'+projectid+'</gsx:col16></entry>';
					Ti.API.info('xmldatastring existing to PUT: '+xmldatastring);
					alert('Project Modified & Saved Successfully!');
					Titanium.App.Properties.setString('dbNeedSync',"project");
				} else if(type=="client"){
					Alloy.Globals.Log("enterclient.js::submit::PUT on existing edit href is: "+existingedithref);
					xhr.open("PUT", existingedithref);
					var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
						+'<id>'+idtag+'</id>'
						+'<updated>2015-05-16T08:01:19.680Z</updated>'
						+'<category scheme=\'http://schemas.google.com/spreadsheets/2006\' term=\'http://schemas.google.com/spreadsheets/2006#list\'/>'
						+'<title type=\'text\'>'+clientproject+'</title>'
						+'<content type=\'text\'>col2: '+clientfirstname+', col3: '+clientlastname+', col4: '+clientcompany+', col5: '+clientphone+', col6: '+clientemail+', col7: '+clientstreetaddress
						+', col8: '+clientcity+', col9: '+clientstate+', col10: '+country+', col11: '+status+', col12: '+notes+', col13: '+customerid+' , col14: '+nextappt+', col15: '+datedue+', col16: '+projectid+'</content>'
						+'<link rel=\'self\' type=\'application/atom+xml\' href=\''+selfhref+'\'/>'
						+'<link rel=\'edit\' type=\'application/atom+xml\' href=\''+edithref+'\'/>'
						+'<gsx:col1>'+customerid+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
						+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
						+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8><gsx:col9>'+clientstate
						+'</gsx:col9><gsx:col10>'+country+'</gsx:col10><gsx:col11>NA</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>'+customerid+'</gsx:col14><gsx:col15>NA'
						+'</gsx:col15><gsx:col16>'+customerid+'</gsx:col16></entry>';
					Ti.API.info('xmldatastring existing to PUT: '+xmldatastring);
					alert('Client Modified & Saved Successfully!');
				}

			} else {
				$.save_button.titleid = projectid;
				$.save_button.customerid = customerid;
				//project
				if (type=="project"){
					var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
					+'<gsx:col1>'+clientproject+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
					+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
					+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8><gsx:col9>'+clientstate
					+'</gsx:col9><gsx:col10>'+country+'</gsx:col10><gsx:col11>'+status+'</gsx:col11><gsx:col12>'+notes+'</gsx:col12><gsx:col13>'+customerid+'</gsx:col13><gsx:col14>'+nextappt+'</gsx:col14><gsx:col15>'+datedue
					+'</gsx:col15><gsx:col16>'+projectid+'</gsx:col16></entry>';
					Ti.API.info('xmldatastring to POST: '+xmldatastring);
				    //var spreadsheet_id = '1-Wz7Apn4AvVpfqcNyMgfqyKA8OAoLNy5Bl0d_jQ9IZk';
				    var spreadsheet_id = Titanium.App.Properties.getString('project');
					xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+spreadsheet_id+'/od6/private/full');
				} else if (type=="client"){
					//client
					var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
					+'<gsx:col1>'+customerid+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
					+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
					+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8><gsx:col9>'+clientstate
					+'</gsx:col9><gsx:col10>'+country+'</gsx:col10><gsx:col11>NA</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>'+customerid+'</gsx:col14><gsx:col15>NA'
					+'</gsx:col15><gsx:col16>'+customerid+'</gsx:col16></entry>';
					Ti.API.info('xmldatastring to POST: '+xmldatastring);
					var spreadsheet_id = Titanium.App.Properties.getString('client');
					xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+spreadsheet_id+'/od6/private/full');
				}
				alert('Saved Successfully!');
			}
	
		xhr.setRequestHeader("Content-type", "application/atom+xml");
		xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuth.getAccessToken());
		xhr.send(xmldatastring);
		Ti.API.info('done POSTed');
		//update the DB
		if(type=="project"){var item = "project"; var sid = Titanium.App.Properties.getString(item,"none"); Alloy.Globals.getPrivateData(sid,item);};
		if(type=="client"){var item = "client"; var sid = Titanium.App.Properties.getString(item,"none"); Alloy.Globals.getPrivateData(sid,item);};

 }
 
 $.enterproject_window.addEventListener('click',function(e){
	 	$.lineitem_tf.blur();
	 	$.lineitemqty_tf.blur();
	 	$.lineitemprice_tf.blur();
	 });
	 
 $.clientdetail_row.addEventListener('click',function(e){
	 	allTFBlur();
	 });
 
  function allTFBlur(){
 		$.lineitem_tf.blur();
	 	$.lineitemqty_tf.blur();
	 	$.lineitemprice_tf.blur();
 };
 
 var addnewclientrow = [ $.existing, $.clientdetail_row, $.itemline_row, $.itemdetail_row, $.addrow_row, $.itemlineend_row ];
 //var selectclientrow = [ $.existing, $.clientselect_row, $.itemline_row, $.itemdetail_row, $.addrow_row, $.itemlineend_row ];
 var selectclientrow = [ $.existing, $.clientdetail_row , $.itemline_row, $.itemdetail_row, $.addrow_row, $.itemlineend_row ];

if (args.title) {
	selectClient(args);
	$.enterproject_table.setData(selectclientrow)	;
	$.selectclient_button.hide();
} else {
	$.enterproject_table.setData(addnewclientrow)	;
	Titanium.App.Properties.setString('selectclient',"false");
}

function setClientExisting(args) {

}

function selectClient(args) {
	var someDummy = Alloy.Models.dummy;
	Alloy.Globals.Log("stringify dummy after selectClient:JSON.stringify(args): "+JSON.stringify(args));
	Alloy.Globals.Log("stringify dummy after selectClient:JSON.stringify(someDummy): "+JSON.stringify(someDummy));
	someDummy.set('id', '1234');
	someDummy.fetch();
	
	var data = args.title.split(':');
	var customerid = data[0];
	var firstname = data[1];
	var lastname = data[2];
	var fullname = firstname+" "+lastname;
	var company = data[3];
	var phone = data[4];
	var email = data[5];
	var address = data[6];
	var city = data[7];
	var state = data[8];
	var country = data[9];
	var fulladdress = address+", "+city+". "+state+", "+country;
	var invoice = data[10];
	var project = data[11];
	var proposal = data[12];
	
	(firstname)?$.projectclientfirstname_tf.value=firstname:$.projectclientfirstname_tf.value=" ";
	(lastname)?$.projectclientlastname_tf.value=lastname:$.projectclientlastname_tf.value=" ";
	(company)?$.projectclientcompany_tf.value=company:$.projectclientcompany_tf.value=" ";
	(phone)?$.projectclientphone_tf.value=phone:$.projectclientphone_tf.value=" ";
	(email)?$.projectclientemail_tf.value=email:$.projectclientemail_tf.value=" ";
	(address)?$.projectclientstreetaddress_tf.value=address:$.projectclientstreetaddress_tf.value=" ";
	(city)?$.projectclientcity_tf.value=city:$.projectclientcity_tf.value=" ";
	(state)?$.projectclientstate_tf.value=state:$.projectclientstate_tf.value=" ";
	(customerid)?$.save_button.customerid=customerid.trim():"none";
	
	Alloy.Globals.Log("dummy output is: "+fullname);
	
	someDummy.set('fullname', fullname);
	someDummy.set('firstname', firstname);
	someDummy.set('lastname', lastname);
	someDummy.set('company', company);
	someDummy.set('phone', phone);
	someDummy.set('email', email);
	someDummy.set('address', address);
	someDummy.set('fulladdress', fulladdress);
	someDummy.set('city', city);
	someDummy.set('state', state);
	someDummy.set('country', country);
	someDummy.set('firstname', firstname);
	someDummy.set('lastname', lastname);
	someDummy.set('invoice', invoice);
	someDummy.set('project', project);
	someDummy.set('proposal', proposal);
	$.save_button.selectclient = 'yes';
}

$.check_client.addEventListener('click', function(e){
	var clientController = Alloy.createController('client',{
			sourcecall: 'enterproject'
		});
	clientController.openMainWindow($.enterproject_tab);
	clientController.logfromSource(e);

});

function matchClient(e){
	var clientController = Alloy.createController('client',{
		sourcecall: 'enterproject'
	});
	clientController.openMainWindow($.enterproject_tab);
	clientController.logfromSource(e);
}

var scope = ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly','https://www.googleapis.com/auth/drive'];
scope.push ("https://www.googleapis.com/auth/drive.appdata");
scope.push ("https://www.googleapis.com/auth/drive.apps.readonly");
scope.push ("https://www.googleapis.com/auth/drive.file");
var GoogleAuth = require('googleAuth');
var googleAuth = new GoogleAuth({
	clientId : Alloy.Globals.clientId,
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	scope : scope,
	quiet: false
	//scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds'],
});



/*$.enterproject_table.addEventListener('click', function(e){
	Alloy.Globals.Log("JSON stringify after table row is clicked : " +JSON.stringify(e));
		 	$.lineitem_tf.blur();
	 	$.lineitemqty_tf.blur();
	 	$.lineitemprice_tf.blur();
});*/
 
 /*
function goBack(e) {
	Alloy.Globals.Log("enterproject.js::goBack:: JSON.stringify(e) " +JSON.stringify(e));
	if(e.source.titleid == "dbNeedSync") {
		var item = "project";
		var sid = Titanium.App.Properties.getString(item,"none");
		Alloy.Globals.getPrivateData(sid,item);
	}
	$.enterproject_window.close({transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
}
*/
if (args.notesraw) {
	savedata.col12 = args.notesraw; $.save_button.savedata = savedata;
	var notesraw = args.notesraw.toString();
	var notes = notesraw.replace(/cOlOn/g,":");
	var notesJSON = JSON.parse(notes);
	var itemdescrvalue = notesJSON[0].descr;
	for (c=1;c<notesJSON.length;c++){
		eval("var lineitemvalue"+c+" = notesJSON["+c+"].lineitem");
		eval("var lineitemqtyvalue"+c+" = notesJSON["+c+"].qty");
		eval("var lineitempricevalue"+c+" = notesJSON["+c+"].price");
		//Alloy.Globals.Log("enterproject.js::lineitemvalue1: "+lineitemvalue1+" "+lineitemqtyvalue1+" "+lineitempricevalue1);
		eval('Alloy.Globals.Log("enterproject.js::lineitemvalue'+c+': "+lineitemvalue'+c+'+" "+lineitemqtyvalue'+c+'+" "+lineitempricevalue'+c+');');
		//var itemvalues = notesJSON[1];
		eval('var itemvalues = notesJSON['+c+'];');	
		if (c==1){
			$.lineitem_tf.value =itemvalues.lineitem; 
			$.lineitemqty_tf.value = isNaN(itemvalues.qty)?itemvalues.qty=0:itemvalues.qty;
			$.lineitemprice_tf.value =isNaN(itemvalues.price)?itemvalues.price=0:itemvalues.price; 			
		}	else {
			var e = "modify";
			addItem(e,itemvalues);
		}

	}
}

function projectDetailsAutoHeight(projectdescr_tf_height){
	var new_projectdescr_tf_height = 14 + parseFloat(projectdescr_tf_height);
	$.projectdescr_tf.height = new_projectdescr_tf_height;
	$.tflabellineitem.top = 32 + new_projectdescr_tf_height + 10;
	$.lineitem_tf.top = 32 + new_projectdescr_tf_height + 10 + 2;
	$.tflineitemqty.top = 32 + new_projectdescr_tf_height + 10 + 20;
	$.lineitemqty_tf.top = 32 + new_projectdescr_tf_height + 10 + 20 + 2;
	$.tflineitemprice.top = 32 + new_projectdescr_tf_height + 10 + 20;
	$.lineitemprice_tf.top = 32 + new_projectdescr_tf_height + 10 + 20 + 2;
	$.itemdetail_view.height = 	32 + new_projectdescr_tf_height + 10 + 20 + 2 + 30;
}

$.projectdescr_tf.addEventListener('blur',function(e){Alloy.Globals.Log("enterproject.js::$.projectdescr_tf.addEventListener:BLUR:JSON.stringify(e): "+JSON.stringify(e));});

$.projectdescr_tf.addEventListener('return',function(e){
	Alloy.Globals.Log("enterproject.js::$.projectdescr_tf.addEventListener:RETURN:JSON.stringify(e): "+JSON.stringify(e));
	projectDetailsAutoHeight($.projectdescr_tf.height);
	}); //prevent return key from done
function done(){$.projectdescr_tf.blur();} //actual done

if (itemdescrvalue) {
	$.projectdescr_tf.value=itemdescrvalue;
	//fontSize is 14. Width = Ti.UI.Size.
	var projectdescr_tf_height = ((Math.round(itemdescrvalue.split('').length/70)+(itemdescrvalue.split(/\r?\n|\r/).length))*14)+14;
	var new_projectdescr_tf_height = 2 + projectdescr_tf_height;
	$.projectdescr_tf.height = new_projectdescr_tf_height;
	$.tflabellineitem.top = 32 + new_projectdescr_tf_height + 10;
	$.lineitem_tf.top = 32 + new_projectdescr_tf_height + 10 + 2;
	$.tflineitemqty.top = 32 + new_projectdescr_tf_height + 10 + 20;
	$.lineitemqty_tf.top = 32 + new_projectdescr_tf_height + 10 + 20 + 2;
	$.tflineitemprice.top = 32 + new_projectdescr_tf_height + 10 + 20;
	$.lineitemprice_tf.top = 32 + new_projectdescr_tf_height + 10 + 20 + 2;	
} else {
	$.projectdescr_tf.value=" ";
}
 
var refresh = Ti.UI.createRefreshControl({
    tintColor:'orange'
});

$.enterproject_table.refreshControl=refresh;

refresh.addEventListener('refreshstart',function(e){
	setTimeout(function(){
		/*
        Alloy.Globals.Log('credit::refresh:: JSON.stringify(e): '+JSON.stringify(e));
        var content=Alloy.Globals.fetchingData('creditmodel');
		Alloy.Globals.Log("credit.js::JSON stringify content: "+JSON.stringify(content));*/
        refresh.endRefreshing();
    }, 2000);
}); 



 
