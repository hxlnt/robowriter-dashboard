// Initialize modules
var azure = require('azure-storage');
var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var tableService = azure.createTableService();
var entGen = azure.TableUtilities.entityGenerator;
var botDirectory = [
];
var lastUpdate = 0;
var color = [
    '#FF5555','#FFFF55','#FFAA00','#55FF00',
    '#FFAAAA','#FFFFAA','#AAAAFF',
    '#550000','#550000','#5500FF','0055FF','#55FF00'
    ]

// Initialize web app
server.listen(port);
app.use(express.static(__dirname));
console.log("App started.");

// Populate webpage with all existing table data
io.on('connection', function (socket) {
    initTable();

    // Every 10 seconds, refresh page with new table data only
    socket.on('initialized', function () {
        setInterval(updateTable, 10000);
    });

    // Upon disconnection, stop refreshing the table
    socket.on('disconnect', function () {
        clearInterval(setInterval(updateTable, 10000));
    });

    // Function: Fetch table data on page load
    function initTable() {
        botDirectory = [];
        var initQuery = new azure.TableQuery().select(['PartitionKey', 'RowKey', 'command', 'distance'])
        //.where('PartitionKey gt ?', lastUpdate);
        tableService.queryEntities('outTable', initQuery, null, function (error, result, response) {
            if (!error) {

                // For each row of table, check to see if bot is listed in bot directory
                for (i = 0; i < result.entries.length; i++) {

                    function checkExist(botname) { return botname.botName == result.entries[i].RowKey._; }

                    var botIndex = botDirectory.findIndex(checkExist);

                    // If bot is already in bot directory, update content
                    if (botIndex >= 0) {
                        botDirectory[botIndex].currentCommand = "" + botDirectory[botIndex].currentCommand + "." + result.entries[i].command._ + "";
                        botDirectory[botIndex].totalDistance = botDirectory[botIndex].totalDistance + parseInt(result.entries[i].distance._);
                    }

                    // If bot is not in bot directory, add an entry for it
                    else {
                        botDirectory.push(
                            {
                                botName: result.entries[i].RowKey._,
                                botID: "bot" + result.entries[i].PartitionKey._,
                                currentCommand: result.entries[i].command._,
                                totalDistance: parseInt(result.entries[i].distance._),
                                botColor: color[0]
                            }
                        );
                        color.push(color.shift());
                    }
                }
                lastUpdate = result.entries[result.entries.length - 1].PartitionKey._;
                socket.emit('initData', botDirectory);
                console.log('Initial entries sent up to ' + lastUpdate);
                console.log(botDirectory);
            }
        });
    }

    // Function: Fetch table data every 10 seconds
    function updateTable() {
        var updateQuery = new azure.TableQuery().select(['PartitionKey', 'RowKey', 'command', 'distance'])
            .where('PartitionKey gt ?', lastUpdate);
        tableService.queryEntities('outTable', updateQuery, null, function (error, result, response) {
            if (!error) {
                if (result.entries.length > 0) {

                    // For each row of table, check to see if bot is listed in bot directory
                    for (i = 0; i < result.entries.length; i++) {

                        function checkExist(botname) { return botname.botName == result.entries[i].RowKey._; }

                        var botIndex = botDirectory.findIndex(checkExist);

                        // If bot is already in bot directory, update content
                        if (botIndex >= 0) {
                            botDirectory[botIndex].currentCommand = "" + botDirectory[botIndex].currentCommand + "." + result.entries[i].command._ + "";
                            botDirectory[botIndex].totalDistance = botDirectory[botIndex].totalDistance + parseInt(result.entries[i].distance._);
                        }
                        else {
                            botDirectory.push(
                                {
                                    botName: result.entries[i].RowKey._,
                                    botID: "bot" + result.entries[i].PartitionKey._,
                                    currentCommand: result.entries[i].command._,
                                    totalDistance: parseInt(result.entries[i].distance._),
                                    botColor: color[0]
                                }
                            );
                            color.push(color.shift());
                        }
                    }
                    lastUpdate = result.entries[result.entries.length - 1].PartitionKey._;
                    socket.emit('updateData', botDirectory);
                    console.log('Updates with entries sent up to ' + lastUpdate);
                    console.log(botDirectory);
                }
            }
            console.log("No updates.");
        });
    }
});
