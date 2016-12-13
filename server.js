// Initialize modules
var azure = require('azure-storage');
var port = process.env.PORT || 3000;
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var tableService = azure.createTableService();
var entGen = azure.TableUtilities.entityGenerator;

// Initialize web app
server.listen(port);
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log("App started.");
});

// Populate webpage with all existing table data
io.on('connection', function (socket) {
    initTable();
    
    // Every 10 seconds, refresh page with new table data only
    var update = setInterval(updateTable, 10000);
    var lastUpdate;

    // Upon disconnection, stop refreshing the table
    socket.on('disconnect', function () {
        clearInterval(update);
    });

    // Function: Fetch table data on page load
    function initTable() {
        var initQuery = new azure.TableQuery().select(['PartitionKey', 'RowKey', 'command']);
        tableService.queryEntities('outTable', initQuery, null, function (error, result, response) {
            if (!error) {
                lastUpdate = result.entries[result.entries.length - 1].PartitionKey._
                socket.emit('initData', result.entries);
                console.log('Updates with entries sent up to ' + lastUpdate);
            }
        });
    }

    // Function: Fetch new table data every 10 seconds
    function updateTable() {
        var updateQuery = new azure.TableQuery()
            .select(['PartitionKey', 'RowKey', 'command'])
            .where('PartitionKey gt ?', lastUpdate);
        tableService.queryEntities('outTable', initQuery, null, function (error, result, response) {
            if (!error) {
                lastUpdate = result.entries[result.entries.length - 1].PartitionKey._
                socket.emit('updateData', result.entries);
                console.log('Updates with entries sent up to ' + lastUpdate);
            }
        });
    }
});
