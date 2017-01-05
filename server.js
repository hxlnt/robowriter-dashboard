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
    '#FFFF00', // Bright yellow
    '#00FF00', // Bright green
    '#00FFFF', // Bright cyan
    '#FF00FF', // Bright pink
    '#FF0000', // Bright red
    '#AA00FF', // Bright purple
    '#FFAA00', // Bright orange
    '#00FFAA', // Bright blue-green

    '#FFFF55', // Light yellow
    '#55FF55', // Light green
    '#55FFFF', // Light cyan
    '#FF55FF', // Light pink
    '#FF5555', // Light red
    '#AA55FF', // Light purple
    '#FFAA55', // Light orange
    '#55FFAA', // Light blue-green
    
    '#FFFF00', // Bright yellow
    '#00FF00', // Bright green
    '#00FFFF', // Bright cyan
    '#FF00FF', // Bright pink
    '#FF0000', // Bright red
    '#AA00FF', // Bright purple
    '#FFAA00', // Bright orange
    '#00FFAA', // Bright blue-green

    '#FFFF55', // Light yellow
    '#55FF55', // Light green
    '#55FFFF', // Light cyan
    '#FF55FF', // Light pink
    '#FF5555', // Light red
    '#AA55FF', // Light purple
    '#FFAA55', // Light orange
    '#55FFAA', // Light blue-green
    
    '#FFFF00', // Bright yellow
    '#00FF00', // Bright green
    '#00FFFF', // Bright cyan
    '#FF00FF', // Bright pink
    '#FF0000', // Bright red
    '#AA00FF', // Bright purple
    '#FFAA00', // Bright orange
    '#00FFAA', // Bright blue-green

    '#FFFF55', // Light yellow
    '#55FF55', // Light green
    '#55FFFF', // Light cyan
    '#FF55FF', // Light pink
    '#FF5555', // Light red
    '#AA55FF', // Light purple
    '#FFAA55', // Light orange
    '#55FFAA', // Light blue-green
    
    '#FFFF00', // Bright yellow
    '#00FF00', // Bright green
    '#00FFFF', // Bright cyan
    '#FF00FF', // Bright pink
    '#FF0000', // Bright red
    '#AA00FF', // Bright purple
    '#FFAA00', // Bright orange
    '#00FFAA', // Bright blue-green

    '#FFFF55', // Light yellow
    '#55FF55', // Light green
    '#55FFFF', // Light cyan
    '#FF55FF', // Light pink
    '#FF5555', // Light red
    '#AA55FF', // Light purple
    '#FFAA55', // Light orange
    '#55FFAA', // Light blue-green
      
    '#FFFF00', // Bright yellow
    '#00FF00', // Bright green
    '#00FFFF', // Bright cyan
    '#FF00FF', // Bright pink
    '#FF0000', // Bright red
    '#AA00FF', // Bright purple
    '#FFAA00', // Bright orange
    '#00FFAA', // Bright blue-green

    '#FFFF55', // Light yellow
    '#55FF55', // Light green
    '#55FFFF', // Light cyan
    '#FF55FF', // Light pink
    '#FF5555', // Light red
    '#AA55FF', // Light purple
    '#FFAA55', // Light orange
    '#55FFAA', // Light blue-green  
    
    '#FFFF00', // Bright yellow
    '#00FF00', // Bright green
    '#00FFFF', // Bright cyan
    '#FF00FF', // Bright pink
    '#FF0000', // Bright red
    '#AA00FF', // Bright purple
    '#FFAA00', // Bright orange
    '#00FFAA', // Bright blue-green

    '#FFFF55', // Light yellow
    '#55FF55', // Light green
    '#55FFFF', // Light cyan
    '#FF55FF', // Light pink
    '#FF5555', // Light red
    '#AA55FF', // Light purple
    '#FFAA55', // Light orange
    '#55FFAA', // Light blue-green
]
var symbols = [
    {   slogan: "speedDemon.js.",
        icon: "dashboard"
    },
    {   slogan: "Perpetually lost.",
        icon: "map-marker"
    },
    {   slogan: "Rebel without a cause.",
        icon: "rebel"
    },
    {   slogan: "Powered by ESP8266.",
        icon: "microchip"
    },
    {   slogan: "Was it supposed to do that?!",
        icon: "exclamation-triangle"
    },
    {   slogan: "Headed toward the finish line.",
        icon: "flag-checkered"
    },
    {   slogan: "Hang in there, baby.",
        icon: "heartbeat"
    },
    {   slogan: "Really, really, really fast.",
        icon: "fast-forward"
    },
    {   slogan: "Basically priceless.",
        icon: "diamond"
    },
    {   slogan: "Fast as lightning!",
        icon: "bolt"
    },
    {   slogan: "Eye on the prize.",
        icon: "eye"
    },
    {   slogan: "????????",
        icon: "question-circle"
    },
    {   slogan: "Pow-pow-power wheels!",
        icon: "power-off"
    },
    {   slogan: "Uniquely unique.",
        icon: "snowflake-o"
    },
    {   slogan: "Toot, toot! Ahh beep, beep!",
        icon: "bus"
    },
    {   slogan: "A bit of a fixer-upper.",
        icon: "wrench"
    },
    {   slogan: "IoT? Oh my!",
        icon: "wifi"
    },
    {   slogan: "It's not a bug, it's a feature.",
        icon: "bug"
    },
    {   slogan: "Um, no.",
        icon: "ban"
    },
    {   slogan: "It's aliiive!",
        icon: "cogs"
    },
    {   slogan: "Send help.",
        icon: "life-buoy"
    },
    {   slogan: "A bot powered by magic. (And Javascript.)",
        icon: "magic"
    },
    {   slogan: "LUV2CODE",
        icon: "heart"
    },
    {   slogan: "It's not broken. It's... experimental.",
        icon: "flask"
    },
    {   slogan: "Oh, dear.",
        icon: "frown-o"
    },
    {   slogan: "Going places.",
        icon: "line-chart"
    },
    {   slogan: "On fire! (Metaphorically, right?)",
        icon: "fire-extinguisher"
    },
        {   slogan: "speedDemon.js.",
        icon: "dashboard"
    },
    {   slogan: "Perpetually lost.",
        icon: "map-marker"
    },
    {   slogan: "Rebel without a cause.",
        icon: "rebel"
    },
    {   slogan: "Powered by ESP8266.",
        icon: "microchip"
    },
    {   slogan: "Was it supposed to do that?!",
        icon: "exclamation-triangle"
    },
    {   slogan: "Headed toward the finish line.",
        icon: "flag-checkered"
    },
    {   slogan: "Hang in there, baby.",
        icon: "heartbeat"
    },
    {   slogan: "Really, really, really fast.",
        icon: "fast-forward"
    },
    {   slogan: "Basically priceless.",
        icon: "diamond"
    },
    {   slogan: "Fast as lightning!",
        icon: "bolt"
    },
    {   slogan: "Eye on the prize.",
        icon: "eye"
    },
    {   slogan: "????????",
        icon: "question-circle"
    },
    {   slogan: "Pow-pow-power wheels!",
        icon: "power-off"
    },
    {   slogan: "Uniquely unique.",
        icon: "snowflake-o"
    },
    {   slogan: "Toot, toot! Ahh beep, beep!",
        icon: "bus"
    },
    {   slogan: "A bit of a fixer-upper.",
        icon: "wrench"
    },
    {   slogan: "IoT? Oh my!",
        icon: "wifi"
    },
    {   slogan: "It's not a bug, it's a feature.",
        icon: "bug"
    },
    {   slogan: "Um, no.",
        icon: "ban"
    },
    {   slogan: "It's aliiive!",
        icon: "cogs"
    },
    {   slogan: "Send help.",
        icon: "life-buoy"
    },
    {   slogan: "A bot powered by magic. (And Javascript.)",
        icon: "magic"
    },
    {   slogan: "LUV2CODE",
        icon: "heart"
    },
    {   slogan: "It's not broken. It's... experimental.",
        icon: "flask"
    },
    {   slogan: "Oh, dear.",
        icon: "frown-o"
    },
    {   slogan: "Going places.",
        icon: "line-chart"
    },
    {   slogan: "On fire! (Metaphorically, right?)",
        icon: "fire-extinguisher"
    },
        {   slogan: "speedDemon.js.",
        icon: "dashboard"
    },
    {   slogan: "Perpetually lost.",
        icon: "map-marker"
    },
    {   slogan: "Rebel without a cause.",
        icon: "rebel"
    },
    {   slogan: "Powered by ESP8266.",
        icon: "microchip"
    },
    {   slogan: "Was it supposed to do that?!",
        icon: "exclamation-triangle"
    },
    {   slogan: "Headed toward the finish line.",
        icon: "flag-checkered"
    },
    {   slogan: "Hang in there, baby.",
        icon: "heartbeat"
    },
    {   slogan: "Really, really, really fast.",
        icon: "fast-forward"
    },
    {   slogan: "Basically priceless.",
        icon: "diamond"
    },
    {   slogan: "Fast as lightning!",
        icon: "bolt"
    },
    {   slogan: "Eye on the prize.",
        icon: "eye"
    },
    {   slogan: "????????",
        icon: "question-circle"
    },
    {   slogan: "Pow-pow-power wheels!",
        icon: "power-off"
    },
    {   slogan: "Uniquely unique.",
        icon: "snowflake-o"
    },
    {   slogan: "Toot, toot! Ahh beep, beep!",
        icon: "bus"
    },
    {   slogan: "A bit of a fixer-upper.",
        icon: "wrench"
    },
    {   slogan: "IoT? Oh my!",
        icon: "wifi"
    },
    {   slogan: "It's not a bug, it's a feature.",
        icon: "bug"
    },
    {   slogan: "Um, no.",
        icon: "ban"
    },
    {   slogan: "It's aliiive!",
        icon: "cogs"
    },
    {   slogan: "Send help.",
        icon: "life-buoy"
    },
    {   slogan: "A bot powered by magic. (And Javascript.)",
        icon: "magic"
    },
    {   slogan: "LUV2CODE",
        icon: "heart"
    },
    {   slogan: "It's not broken. It's... experimental.",
        icon: "flask"
    },
    {   slogan: "Oh, dear.",
        icon: "frown-o"
    },
    {   slogan: "Going places.",
        icon: "line-chart"
    },
    {   slogan: "On fire! (Metaphorically, right?)",
        icon: "fire-extinguisher"
    },
        {   slogan: "speedDemon.js.",
        icon: "dashboard"
    },
    {   slogan: "Perpetually lost.",
        icon: "map-marker"
    },
    {   slogan: "Rebel without a cause.",
        icon: "rebel"
    },
    {   slogan: "Powered by ESP8266.",
        icon: "microchip"
    },
    {   slogan: "Was it supposed to do that?!",
        icon: "exclamation-triangle"
    },
    {   slogan: "Headed toward the finish line.",
        icon: "flag-checkered"
    },
    {   slogan: "Hang in there, baby.",
        icon: "heartbeat"
    },
    {   slogan: "Really, really, really fast.",
        icon: "fast-forward"
    },
    {   slogan: "Basically priceless.",
        icon: "diamond"
    },
    {   slogan: "Fast as lightning!",
        icon: "bolt"
    },
    {   slogan: "Eye on the prize.",
        icon: "eye"
    },
    {   slogan: "????????",
        icon: "question-circle"
    },
    {   slogan: "Pow-pow-power wheels!",
        icon: "power-off"
    },
    {   slogan: "Uniquely unique.",
        icon: "snowflake-o"
    },
    {   slogan: "Toot, toot! Ahh beep, beep!",
        icon: "bus"
    },
    {   slogan: "A bit of a fixer-upper.",
        icon: "wrench"
    },
    {   slogan: "IoT? Oh my!",
        icon: "wifi"
    },
    {   slogan: "It's not a bug, it's a feature.",
        icon: "bug"
    },
    {   slogan: "Um, no.",
        icon: "ban"
    },
    {   slogan: "It's aliiive!",
        icon: "cogs"
    },
    {   slogan: "Send help.",
        icon: "life-buoy"
    },
    {   slogan: "A bot powered by magic. (And Javascript.)",
        icon: "magic"
    },
    {   slogan: "LUV2CODE",
        icon: "heart"
    },
    {   slogan: "It's not broken. It's... experimental.",
        icon: "flask"
    },
    {   slogan: "Oh, dear.",
        icon: "frown-o"
    },
    {   slogan: "Going places.",
        icon: "line-chart"
    },
    {   slogan: "On fire! (Metaphorically, right?)",
        icon: "fire-extinguisher"
    }
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
        var color = [
    '#FFFF00', // Bright yellow
    '#00FF00', // Bright green
    '#00FFFF', // Bright cyan
    '#FF00FF', // Bright pink
    '#FF0000', // Bright red
    '#AA00FF', // Bright purple
    '#FFAA00', // Bright orange
    '#00FFAA', // Bright blue-green

    '#FFFF55', // Light yellow
    '#55FF55', // Light green
    '#55FFFF', // Light cyan
    '#FF55FF', // Light pink
    '#FF5555', // Light red
    '#AA55FF', // Light purple
    '#FFAA55', // Light orange
    '#55FFAA', // Light blue-green
    ]
    var symbols = [
    {   slogan: "speedDemon.js.",
        icon: "dashboard"
    },
    {   slogan: "Perpetually lost.",
        icon: "map-marker"
    },
    {   slogan: "Rebel without a cause.",
        icon: "rebel"
    },
    {   slogan: "Powered by ESP8266.",
        icon: "microchip"
    },
    {   slogan: "Was it supposed to do that?!",
        icon: "exclamation-triangle"
    },
    {   slogan: "Headed toward the finish line.",
        icon: "flag-checkered"
    },
    {   slogan: "Hang in there, baby.",
        icon: "heartbeat"
    },
    {   slogan: "Really, really, really fast.",
        icon: "fast-forward"
    },
    {   slogan: "Basically priceless.",
        icon: "diamond"
    },
    {   slogan: "Fast as lightning!",
        icon: "bolt"
    },
    {   slogan: "Eye on the prize.",
        icon: "eye"
    },
    {   slogan: "????????",
        icon: "question-circle"
    },
    {   slogan: "Pow-pow-power wheels!",
        icon: "power-off"
    },
    {   slogan: "Uniquely unique.",
        icon: "snowflake-o"
    },
    {   slogan: "Toot, toot! Ahh beep, beep!",
        icon: "bus"
    },
    {   slogan: "A bit of a fixer-upper.",
        icon: "wrench"
    },
    {   slogan: "IoT? Oh my!",
        icon: "wifi"
    },
    {   slogan: "It's not a bug, it's a feature.",
        icon: "bug"
    },
    {   slogan: "Um, no.",
        icon: "ban"
    },
    {   slogan: "It's aliiive!",
        icon: "cogs"
    },
    {   slogan: "Send help.",
        icon: "life-buoy"
    },
    {   slogan: "A bot powered by magic. (And Javascript.)",
        icon: "magic"
    },
    {   slogan: "LUV2CODE",
        icon: "heart"
    },
    {   slogan: "It's not broken. It's... experimental.",
        icon: "flask"
    },
    {   slogan: "Oh, dear.",
        icon: "frown-o"
    },
    {   slogan: "Going places.",
        icon: "line-chart"
    },
    {   slogan: "On fire! (Metaphorically, right?)",
        icon: "fire-extinguisher"
    }
]
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
                                botColor: color[0],
                                slogan: symbols[0].slogan,
                                symbol: symbols[0].icon
                            }
                        );
                        color.push(color.shift());
                        symbols.push(symbols.shift());
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
                            botDirectory[botIndex].totalDistance = parseInt(botDirectory[botIndex].totalDistance) + parseInt(result.entries[i].distance._);
                        }
                        else {
                            botDirectory.push(
                                {
                                    botName: result.entries[i].RowKey._,
                                    botID: "bot" + result.entries[i].PartitionKey._,
                                    currentCommand: result.entries[i].command._,
                                    totalDistance: parseInt(result.entries[i].distance._),
                                    botColor: color[0],
                                    slogan: symbols[0].slogan,
                                    symbol: symbols[0].icon
                                }
                            );
                            color.push(color.shift());
                            symbols.push(symbols.shift());
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
