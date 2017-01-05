
var io = io.connect();


io.on('initData', function (data) {

    for (i = 0; i < data.length; i++) {
        if (!document.getElementById(data[i].botID)) {
            var botID = data[i].botID;
            $('body').prepend('<div id="' + botID + '" class="turtle"><span class="fa-stack fa-lg"><i class="fa fa-circle fa-stack-2x" style="color:#0000ff; opacity:.7"></i><i class="fa fa-' + data[i].symbol + ' fa-stack-1x" style="color:' + data[i].botColor + '"></i></span></div>');
            $("#sidebar").append($('<p><i class="fa fa-' + data[i].symbol + ' fa-2x fa-pull-left fa-fw" style="color:' + data[i].botColor + '"></i>' + data[i].botName + ": " + Math.round(data[i].totalDistance*.005) + 'ft.<BR><em>' + data[i].slogan + '</em></p>'));
        }
        var commandFunction = new Function("t.thickness(2).color('" + data[i].botColor + "')." + data[i].currentCommand);
        commandFunction();
        var x = canvas.width/2 - 255 - t.get.x();
        var y = -1*t.get.y() + canvas.height/2;
        $('div#' + botID + '').css({
            right: x + 'px',
            top: y + 'px'
        })
        console.log(commandFunction)
        t.pu().home().pd();
        // var ckdistance = data.sort(function(a, b) {        //     return parseFloat(a.distance) - parseFloat(b.distance);
        // });
        // if (ckdistance > canvas.height) { canvas.scale(.85,.85) }
        
        
    }
    io.emit('initialized');
});

io.on('updateData', function (data) {
    for (i = 0; i < data.length; i++) {
        if (!document.getElementById(data[i].botID)) {
            $('body').prepend('<div id="' + data[i].botID + '">' + data[i].botName + '</div>');
            $("#sidebar").append($('<p><i class="fa fa-' + data[i].symbol + ' fa-2x fa-pull-left fa-fw" style="color:' + data[i].botColor + '"></i>' + data[i].botName + ": " + Math.round(data[i].totalDistance*.005) + 'ft.<BR><em>' + data[i].slogan + '</em></p>'));
        }
        var botID = data[i].botID;
        var commandFunction = new Function("t.thickness(2).color('" + data[i].botColor + "')." + data[i].currentCommand);
        commandFunction();
        var x = canvas.width/2 - t.get.x();
        var y = -1*t.get.y() + canvas.height/2;
        $('div#' + botID + '').css({
            right: x + 'px',
            top: y + 'px'
        })
        console.log(commandFunction)
        t.pu().home().pd();
//         var distance = data.sort(function(a, b) {
//             return parseFloat(a.distance) - parseFloat(b.distance);
//         });
//         if (data[data.length].distance > canvas.height) { canvas.scale(.85,.85) }
     }


    //         color.push(color.shift());
    //         $("table").find('tbody').append($('<tr>').append($('<td>').text('' + data[i].RowKey._ + ": " + window[deviceobj].distance)));


});

var clearit;

$(window).resize(function () {
    $( 'body' ).hide(); 
    clearTimeout(clearit);
    clearit = setTimeout(resizewait, 500);
});

function resizewait(){
    location.reload();
    $( 'body' ).show();
}

