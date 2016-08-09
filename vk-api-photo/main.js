
    
$("document").ready(function(){

    var objParam = {
        "lat"  : 44.642287,
        "long" : 33.782619
    };
            
    var sUrl = [
        "http://api.vk.com/method/photos.search?",
        "lat=" + objParam["lat"]  + "&",
        "long="+ objParam["long"] + "&",
        "count=1000&",
        "radius=100&",
        "start_time=", String(new Date(2015, 5, 14).getTime()).substring(0, 10),
        "&",
//        "end_time=", String(new Date(2015, 6, 14).getTime()).substring(0, 10),
        "end_time=", String(new Date().getTime()).substring(0, 10),
    ].join("");
    
    console.log(sUrl);
    
    var arrUrl = [
        "http://query.yahooapis.com/v1/public/yql?",
        "q=",
        encodeURIComponent("select * from html where url='" + sUrl + "'"),
        "&format=json",
    ];
    
    $.getJSON(arrUrl.join(""), function(data){
        
//        console.log(data);
        
        var sJson   = data["query"]["results"]["body"]["content"] || data["query"]["results"]["body"];
        var result  = $.parseJSON(sJson);
        
        console.log(sJson);
        
        result["response"].forEach(function(entity, indx, arr){
            
            
            if ("object" !== typeof entity) {
                return;
            }

            var sImgSrc = entity["src_xxbig"];

            if ("undefined" === typeof sImgSrc) {
                sImgSrc = entity["src_xbig"];
            }

            var $img = $('<img>', {
                src: sImgSrc,
                alt: 'MyAlt'
            });
            
            $img.appendTo('#images');
            $("<br/>").appendTo("#images");
            
            if (parseInt(entity["owner_id"]) > 0) {
                $('<a href="https://vk.com/id' + entity["owner_id"] + '" target="_blank">owner</a>').appendTo("#images");
                $("<br/>").appendTo("#images");
            } else if (parseInt(entity["user_id"]) > 0) {
                $('<a href="https://vk.com/id' + entity["user_id"] + '" target="_blank">user</a>').appendTo("#images");
                $("<br/>").appendTo("#images");
            }
            
        });

        console.log(result);

    });

});


window.onload  = function(){
    
    
    
    
    return;
    
    var ifrm = document.createElement("iframe");
    
    ifrm.src = "http://api.vk.com/method/photos.search?lat=44.975062&long=34.131365&count=100&radius=100&start_time=1430438400&end_time=1433030400";
    
//    ifrm.style.display = "none";
//    ifrm.contentDocument.open();
//    ifrm.contentDocument.contentType("application/json");
//    document.domain = "vk.com";
    document.body.appendChild(ifrm);
    
//    console.log(ifrm);
//    ifrm.document.domain = "vk.com";
    ifrm.onload = function(){
        
        
        console.log(ifrm.getElementsByTagName("html"));        
        
//        for ( var i in ifrm) {
//            try{
//                console.log(i + ":");
//                console.log(ifrm[i]);
//            } catch (e){}
//        }
        
        return;
        
        var doc = ifrm.contentWindow.document;
        
        console.log(doc);
        
    };
    
    return;
    
    var frames  = [];
    
//    var video   = document.querySelector("#my-cam-screen");
    video   = document.createElement("video");
//    video.setAttribute("autoplay", true);
    
    var canvas  = document.getElementById("canv");

    var ctx     = canvas.getContext('2d');
    var localMediaStream = null;

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    
//    navigator.getUserMedia({video: true}, function(stream) {
    navigator.getUserMedia({
        audio: false,
        video: {
            
            mandatory: {
//                chromeMediaSource: 'desktop',
                chromeMediaSource: 'screen',
                maxWidth: screen.width, 
                maxHeight: screen.height, 
//                minFrameRate: 1, 
//                maxFrameRate: 5 
            },
            optional: [
                { // non-official Google-only optional constraints
                    googTemporalLayeredScreencast: true
                }, 
                {
                    googLeakyBucket: true
                }
            ]
        }
    }, function(stream) {
//    navigator.getUserMedia({video: {mandatory: {chromeMediaSource: 'desktop'}}}, function(stream) {
//        return;
//        console.log( canvas.stream.record()  );
        
//        var Recorder = window.WhammyRecorder;
        
//        var mediaRecorder = new Recorder(stream);
        
//        mediaRecorder.record();
        
        setTimeout(function(){
        
//            mediaRecorder.stop();

//            console.log(mediaRecorder.blob);

        }, 10000);
         
        video.src = window.URL.createObjectURL(stream);
        
        video.play();
        
        localMediaStream = stream;
        
//        stream.getVideoTracks()[0].addEventListener("ended", function(e){
//            console.log(e);
//        }, true);
        
//        console.log(stream.getVideoTracks()[0]);
        
//        stream.getVideoTracks()[0].addEventListener("started", function(e){
//            console.log(e);
//        }, true);
        
//        stream.stop();
        
    }, function (e) {
        console.log('Camera did not work.');
        console.log(e);
    });
   
    
    setInterval(function(){
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
//        frames.push(canvas.toDataURL('image/webp', 1));
        
        
        
//        console.log(frames);
        
    }, 1);
    
    
//    video.setCapture()
    
    
};