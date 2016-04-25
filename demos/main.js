'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
app.commandLine.appendSwitch ('ignore-certificate-errors', 'true');
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

global.sharedObj = {serverIp: '', speed: 0, coordConnectionName: ''};

// Bandwidth test
// -------------
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function checkUploadSpeed( iterations, update) {
    var average = 0,
        index = 0,
        timer = check()

    function check() {
        var xhr = new XMLHttpRequest(),
            url = "http://"+global.sharedObj.serverIp+":2222/index.php", //prevent url cache
            startTime,
            speed = 0;
        xhr.onreadystatechange = function ( event ) {
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log(this.responseText);
                speed = Math.round( 1024 / ( ( new Date() - startTime ) / 1000 ) );
                average == 0
                    ? average = speed
                    : average = Math.round( ( average + speed ) / 2 );
                update( speed, average );
                index++;
                if( index == iterations ) {
                    window.clearInterval( timer );
                };

                mainWindow = new BrowserWindow({width: 800, height: 600, title: "Demio Player"});
                // and load the index.html of the app.
                mainWindow.loadURL('file://' + __dirname + '/indexplayer.html');

                // Open the DevTools.
                // mainWindow.webContents.openDevTools();

                // Emitted when the window is closed.
                mainWindow.on('closed', function() {
                  // Dereference the window object, usually you would store windows
                  // in an array if your app supports multi windows, this is the time
                  // when you should delete the corresponding element.
                  mainWindow = null;
                });
            };
        };
        xhr.open( 'POST', url, true );
        startTime = new Date();
        var datatest = "data="+getRandomString(1);//+getRandomString( 1 );
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send( datatest );
    };

    function getRandomString( sizeInMb ) {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+`-=[]\{}|;':,./<>?", //random data prevents gzip effect
            iterations = sizeInMb * 1024 * 1024, //get byte count
            result = '';
        for( var index = 0; index < iterations; index++ ) {
            result += chars.charAt( Math.floor( Math.random() * chars.length ) );
        };
        return result;
    };
};

function isCoordinator() {
  var appPath = app.getPath('home');
  console.log(appPath);
  var path = require('path');
  var p = path.join(appPath+'/.demio');
  var fs = require('fs');
  var appPathCoord = app.getPath('home');
  console.log(appPath);
  var pathCoord = require('path');
  var pCoord = path.join(appPath+'/.demio');
  var fsCoord = require('fs');
  pCoord = pathCoord.join(appPathCoord+'/.coordinator');
  fsCoord.exists(pCoord, function(exists) {
    if (exists) {
      fsCoord.readFile(pCoord, 'utf8', function (err, data) {
        if (err) return;
        global.sharedObj.coordConnectionName = data;
        global.sharedObj.coordConnectionName = global.sharedObj.coordConnectionName.replace(/(\r\n|\n|\r)/gm,"");
      });
    }
  });
}

// Bandwidth test END
function createWindow () {
  // Create the browser window.

    //Is coordinator?
    isCoordinator();

    var appPath = app.getPath('home');
    console.log(appPath);
    var path = require('path');
    var p = path.join(appPath+'/.demio');
    var fs = require('fs');
    fs.exists(p, function(exists) {
      if (exists) {
        fs.readFile(p, 'utf8', function (err, data) {
          if (err) return console.log(err);
          global.sharedObj.serverIp = data;
          console.log('Server IP:'+global.sharedObj.serverIp);
          global.sharedObj.serverIp = global.sharedObj.serverIp.replace(/(\r\n|\n|\r)/gm,"");
          checkUploadSpeed( 30, function ( speed, average ) {
            global.sharedObj.speed = speed;
          });

        });
      }
      else {
        console.log('Its production mode');
        global.sharedObj.serverIp = "163.172.27.226";
        checkUploadSpeed( 30, function ( speed, average ) {
          global.sharedObj.speed = speed;
        });
      }
    });


    // mainWindow = new BrowserWindow({width: 800, height: 600, title: "Demio Broadcast"});
    // // and load the index.html of the app.
    // mainWindow.loadURL('file://' + __dirname + '/indexbroadcast.html');

    // // Open the DevTools.
    // // mainWindow.webContents.openDevTools();

    // // Emitted when the window is closed.
    // mainWindow.on('closed', function() {
    //   // Dereference the window object, usually you would store windows
    //   // in an array if your app supports multi windows, this is the time
    //   // when you should delete the corresponding element.
    //   mainWindow = null;
    // });

  }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
