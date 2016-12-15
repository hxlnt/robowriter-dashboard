var canvas = document.getElementById('c');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var color = [
'#000055','#005500','#550000','#0000aa','#00aa00','#aa0000','#0000ff','#00ff00','#ff0000',
'#555555','#555500','#550055','#005555',
'#aaffaa','#aaff00','#aaaa00',
'#ffff55','#ffffaa']
var incomingData;
var io = io.connect();

io.on('updateData', function (data) {
    incomingData = data;
    draw(data);
});
io.on('initData', function (data) { 
    incomingData = data;
    draw(data);
});

function draw (data) {    
    for (i = 0; i < data.length; i++) {
        var regex = /[^A-Z|a-z|0-9|$|_]/g
        deviceid = "T" + (data[i].RowKey._).replace(regex, 'badchar') + "";
        deviceobj = "obj_" + deviceid + "";
        if (document.getElementById(deviceid) == null) {   
            window[deviceobj] = {
                distance: parseInt(data[i].distance._),
                color: color[0]
            }
            $('<div/>', {
                id: deviceid,
                class: 'turtle',
                text: data[i].RowKey._
            }).appendTo('body');
            window[deviceid] = new Turtle(canvas);
            //window[deviceid].init();
            window[deviceid].color(color[0]);
            window[deviceid].thickness(3);
            var commandFunction = new Function( "" + deviceid + "." + data[i].command._ + "");
            commandFunction();
            window[deviceid].on('move', function(args){
                $('div', {id: window[deviceid]}).css({
                    left:args.x+'px',
                    top:args.y+'px'
                });
            });
            color.push(color.shift());
            $("table").find('tbody').append($('<tr>').append($('<td>').text('' + data[i].RowKey._ + ": " + window[deviceobj].distance)));
        }
        else {
            ;
            window[deviceid].thickness(3);
            window[deviceobj].distance = window[deviceobj].distance + parseInt(data[i].distance._);
           // $('td#', {id: window[deviceid]}).text(window[deviceobj].distance);
            var commandFunction = new Function( "" + deviceid + "." + data[i].command._ + "");
            commandFunction();
            window[deviceid].on('move', function(args){
                $('div', {id: deviceid}).css({
                    left:args.x+'px',
                    top:args.y+'px'
                });
            });
        }

        }
        
}     
    io.emit('initialized');
//});

