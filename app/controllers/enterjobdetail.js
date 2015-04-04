var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.enterjobdetail_window);
  Ti.API.info("This is child widow checking _tab on : " +JSON.stringify(_tab));
  Ti.API.info(" input details : "+JSON.stringify(args));
  // $.labor_table.search = $.search_history;
        
};

Alloy.Collections.joblog.fetch();

function transformFunction(model) {
        var currentaddr;

        var transform = model.toJSON();
        console.log("transform is ::" +JSON.stringify(transform));
        transform.title = transform.col1+":"+transform.col2+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"
                                                +transform.col8+":"+transform.col9+":"+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13
                                                +":"+transform.col14+":"+transform.col15+":"+transform.col16;
        transform.date = "Date: "+transform.col1;
        transform.notes = "Notes: "+transform.col2;
        transform.img = (transform.col4)?transform.col4:"none";
        
        lat1=transform.col8;
        lon1=transform.col9;
        transform.address = "Lat: "+transform.col8+" , Lon:"+transform.col9;
        var newRow = Ti.UI.createTableViewRow({});
        var newImageView = Ti.UI.createImageView({
                image : transform.img,
                height: 100,
                width: 100
        });     
        var imageRow = newRow.add(newImageView);
        //$.labor_table.setData($.joblog_row);
        return transform;
}

var joblog  = Alloy.Collections.instance('joblog');
var content = joblog.toJSON();
console.log("JSON stringify joblog: "+JSON.stringify(content));

function jobDetailAddRow (date,notesbody,imageurl) {
        var datelabel = Ti.UI.createLabel ({
                color : "orange",
                left  : "20",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
                top : "10",
                text : date
        });
        var noteslabel = Ti.UI.createLabel ({
                color : "#888",
                left  : "20",
                textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
                font: {
                        fontSize: "12"
                        },
                text : notesbody
        });
        var imagelabel = Ti.UI.createImageView ({
                image : imageurl,
                height : "100",
                width : "100"
        });
        var innerview = Ti.UI.createView({
                width:"90%",
                height:"80%",
                backgroundColor:"white",
                borderRadius:"10",
                borderWidth:"0.1",
                borderColor:"white"
        });
        innerview.add(datelabel);
        if ( notesbody != "none" ) {
                innerview.add(noteslabel);
                noteslabel.top = 50;
        } else {
                imagelabel.height = 200;
                imagelabel.width = 200;
        };
        if (imageurl != "none") {innerview.add(imagelabel);};
        if ( notesbody != "none" && imageurl != "none") {
                imagelabel.top = 50;
                noteslabel.top = 220;
        };
        var jobrow = Ti.UI.createTableViewRow ({
                backgroundColor: "#ECE6E6",
                opacity:"0",
                color:"transparent",
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE
                //title:"{title}"
        });
        jobrow.add(innerview);
        
        var jobtable = Ti.UI.createTableView({
                backgroundColor: "white",
                separatorStyle :"Titanium.UI.iPhone.TableViewSeparatorStyle.NONE"
        });
        jobtable.add(jobrow);
        
        $.labor_table.appendRow(jobrow);

};

for (i=0;i<content.length;i++){
        var notesbody = content[i].col2;
        var imageurl = content[i].col4;
        var date = content[i].col1;
        jobDetailAddRow (date,notesbody,imageurl);      
}


function closeWin(e) {
        console.log("e is: "+JSON.stringify(e));
}

function UploadPhotoToServer(e){
        console.log("Upload photo to the server.");
}

function uploadFile(e){
        console.log("JSON stringify e uploadFile : " +JSON.stringify(e));
       Titanium.Media.openPhotoGallery({
           success:function(event)
           {             
               Ti.API.debug('Our type was: '+event.mediaType);
               if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
               {
                   UploadPhotoToServer(event.media);
               }
           },
           cancel:function()
           {   
           },
           error:function(err)
           {
               Ti.API.error(err);
           },
           mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
       });
   }
   
   var win = Titanium.UI.createWindow({
                                        title:"Media",
                                        backgroundColor: "black"
                                });

function takePic(e){ 
        console.log("JSON stringify e takePic:" +JSON.stringify(e));
        Titanium.Media.showCamera({
                success:function(e){
                        if(e.mediaType === Titanium.Media.MEDIA_TYPE_PHOTO){
                                var ImageView = Titanium.UI.createImageView({
                                        image:e.media,
                                        width:288,
                                        height:215,
                                        top:12,
                                        zIndex:1
                                });
                                win.add(ImageView);
                        } else if (e.mediaType === Titanium.Media.MEDIA_TYPE_VIDEO){
                                var w = Titanium.UI.createWindow({
                                        title:"Job Video",
                                        backgroundColor: "black"
                                });
                                
                                var videoPlayer = Titanium.Media.createVideoPlayer({
                                        media: e.media                          
                                });
                                w.add(videoPlayer);
                                videoPlayer.addEventListener("complete",function(e){
                                        w.remove(videoPlayer);
                                        videoPlayer = null ;
                                        w.close();
                                });             
                                
                        }
                        
                }, error:function(e){
                        alert("unable to load the camera");
                }, cancel:function(e){
                        alert("unable to load the camera");
                },
                allowEditing:true,
                saveToPhotoGallery:true,
                mediaTypes:[Titanium.Media.MEDIA_TYPE_PHOTO,Titanium.Media.MEDIA_TYPE_VIDEO],
                videoQuality:Titanium.Media.QUALITY_HIGH
        });
        }
        
        
        var win = Ti.UI.createWindow({
         backgroundColor: 'white'
        });

                
        var send = Titanium.UI.createButton({
            title : 'Send',
            style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
        });
        
        var camera = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.CAMERA,
        });
        
        var cancel = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.CANCEL
        });
        
        var flexSpace = Titanium.UI.createButton({
            systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
        });
        
        var textfield = Titanium.UI.createTextField({
            borderStyle : Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
            hintText : 'Focus to see keyboard with toolbar',
            keyboardToolbar : [cancel, flexSpace, camera, flexSpace, send],
            keyboardToolbarColor : '#999',
            backgroundColor : "white",
            keyboardToolbarHeight : 40,
            top : 10,
            width : Ti.UI.SIZE, height : Ti.UI.SIZE
        });
        
$.notes_textarea.addEventListener("blur",function(e){
        console.log("JSON.stringify(e)  :" +JSON.stringify(e));
        e.source.keyboardToolbar.items = null;
        enterNotes(e);
        e.source.value = "";
        //$.ktb_textarea.hide();
});
        
function enterNotes(e) {
        console.log("JSON.stringify(e) enterNotes  :" +JSON.stringify(e));
        //$.enterjobdetail_window.show($.notes_textarea);
        //$.enterjobdetail_window.add(textfield);
        var date = new Date();
        var notesbody = e.value;
        var imageurl = "none";
        var dataModel = Alloy.createModel("joblog",{
                                        col1 :  date || "none",
                                        col2 : notesbody || "none",
                                        col3 : imageurl,        
                                        col4 : "none"   
                                });     
        dataModel.save();
        Alloy.Collections.joblog.fetch();
        var joblog  = Alloy.Collections.instance('joblog');
        var content = joblog.toJSON();
        console.log("JSON stringify joblog after write: "+JSON.stringify(content));
        var thedate = date.toString().replace(".","").split(' ',4).toString().replace(/,/g,' ')+' '+Alloy.Globals.formatAMPM(date);
        //console.log("thedate is: " +thedate);
        jobDetailAddRow (thedate,notesbody,imageurl);
        submit(thedate,notesbody,imageurl);
        
};

 function submit(thedate,notesbody,imageurl) {  
        var thenone = "none";   
        var xmldatastring = ['<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
        +'<gsx:col1>'+thedate+'</gsx:col1><gsx:col2>'+notesbody+'</gsx:col2><gsx:col3>'
        +imageurl+'</gsx:col3><gsx:col4>'+thenone+'</gsx:col4><gsx:col5>'
        +thenone+'</gsx:col5><gsx:col6>'+thenone+'</gsx:col6><gsx:col7>'+thenone+'</gsx:col7><gsx:col8>'+thenone+'</gsx:col8><gsx:col9>'+thenone
        +'</gsx:col9><gsx:col10>'+thenone+'</gsx:col10><gsx:col11>'+thenone+'</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>NA</gsx:col14><gsx:col15>NA</gsx:col15><gsx:col16>NA</gsx:col16></entry>'].join('');
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
        alert("Danger, Will Robinson!"); 
    }
});
        var sid = Titanium.App.Properties.getString('joblog');
        xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+sid+'/od6/private/full');
        xhr.setRequestHeader("Content-type", "application/atom+xml");
        xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
        xhr.send(xmldatastring);
        Ti.API.info('done POSTed');
 }

var scope = ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly','https://www.googleapis.com/auth/drive'];
scope.push ("https://www.googleapis.com/auth/drive.appdata");
scope.push ("https://www.googleapis.com/auth/drive.apps.readonly");
scope.push ("https://www.googleapis.com/auth/drive.file");
//scope.push ("https://www.googleapis.com/auth/plus.login");

var GoogleAuth = require('googleAuth');
var googleAuthSheet = new GoogleAuth({
        clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
        clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
        propertyName : 'googleToken',
        scope : scope,
        quiet: false
});

function createFolder(){
	
};
/*
$.jobdetailtf.addEventListener("focus", function(e){
                console.log("JSON.stringify(e)  :" +JSON.stringify(e));
                
    });*/
/*
function largeTF(e){
        console.log("JSON.stringify(e) largeTF  :" +JSON.stringify(e));
        //$.itemjobdetail.add(textfield);
}
*/