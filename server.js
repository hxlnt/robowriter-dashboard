// Initialize modules
var azure = require('azure-storage');
var port = process.env.PORT || 3000;
var express = require('express'); 
var app = express(); 
var server = require('http').createServer(app); 
var io = require('socket.io')(server);
var tableService = azure.createTableService();
var entGen = azure.TableUtilities.entityGenerator;

// Initialize web app
server.listen(port);
app.use(express.static(__dirname));
console.log("App started.");

// Populate webpage with all existing table data
io.on('connection', function (socket) {
    initTable();
    
    // Every 10 seconds, refresh page with new table data only
    var lastUpdate;

    socket.on('initialized', function() {
        setInterval(updateTable, 10000);
    });
    // Upon disconnection, stop refreshing the table
    socket.on('disconnect', function () {
        clearInterval(setInterval(updateTable, 10000));
    });

    // Function: Fetch table data on page load
    function initTable() {
        var initQuery = new azure.TableQuery().select(['PartitionKey', 'RowKey', 'command', 'distance']);
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
        tableService.queryEntities('outTable', updateQuery, null, function (error, result, response) {
            if (!error) {
                if (result.entries.length > 0){
                lastUpdate = result.entries[result.entries.length - 1].PartitionKey._
                socket.emit('updateData', result.entries);
                console.log('Updates with entries sent up to ' + lastUpdate);
                }
            else {
                console.log('No updates at this time.');
            }
            }
        });
    }
});
