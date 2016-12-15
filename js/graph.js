var io = io.connect();
var canvas = document.getElementById('c');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

io.on('initData', function (incomingData) {
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

io.emit('ready');
