
var io = io.connect();


io.on('initData', function (data) {

    for (i = 0; i < data.length; i++) {
        if (!document.getElementById(data[i].botID)) {
            var botID = data[i].botID;
            $('body').prepend('<div id="' + botID + '" class="turtle">' + data[i].botName + '</div>');
        }
        var commandFunction = new Function("t.thickness(3).color('" + data[i].botColor + "')." + data[i].currentCommand);
        commandFunction();
        var x = t.get.x() + canvas.width/2;
        var y = t.get.y() + canvas.height/2;
        $('div#' + botID + '').css({
            left: x + 'px',
            top: y + 'px'
        })
        console.log(commandFunction)
        t.pu().home().pd();
    }
    io.emit('initialized');
});

io.on('updateData', function (data) {
    for (i = 0; i < data.length; i++) {
        if (!document.getElementById(data[i].botID)) {
            $('body').prepend('<div id="' + data[i].botID + '">' + data[i].botName + '</div>');
        }
        var botID = data[i].botID;
        var commandFunction = new Function("t.thickness(3).color('" + data[i].botColor + "')." + data[i].currentCommand);
        commandFunction();
var x = t.get.x() + canvas.width/2;
        var y = t.get.y() + canvas.height/2;
        $('div#' + botID + '').css({
            left: x + 'px',
            top: y + 'px'
        })
        console.log(commandFunction)
        t.pu().home().pd();
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

