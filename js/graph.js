var io = io.connect();

io.on('data', function (incomingData) {
    if(document.getElementById(incomingData.deviceid) !== null) {   
        var commandFunction = new Function( "" + incomingData.deviceid + "." + incomingData.command + "");
        commandFunction();
        }
    else {
        $('<div/>', {
            id: incomingData.deviceid,
            class: 'turtle',
            text: incomingData.deviceid
        }).appendTo('body');
        window[incomingData.deviceid] = new Turtle(canvas);
        window[incomingData.deviceid].on('move', function(args){
	        $('#'+incomingData.deviceid+'').css({
		        left:args.x+'px',
		        top:args.y+'px'
	        });
        });
        window[incomingData.deviceid].init();
    }
});

// io.emit('ready');
