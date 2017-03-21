/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var colors = require('colors');

var DEFAULT_DEBUG = true;
var DEFAULT_ERROR = true;
var DEFAULT_WARN = true;
var DEFAULT_TRACE = true;
var DEFAULT_INFO = true;
var DEFAULT_VERBOSE = true;
var DEFAULT_PRINT_OBJECT = true;
var DEFAULT_CURRENT_API = true;
var DEFAULT_LOG_API = true;

function Logger() {
    this.printDebug = null;
    this.printError = null;
    this.printWarn = null;
    this.printTrace = null;
    this.printInfo = null;
    this.printVerbose = null;
    this.printObject = null;
    this.printCurrentAPI = null;
    this.printLogAPI = null;
    this.init();

}

Logger.prototype.init = function() {
    log("initialising logger...");
    var self = this;
    self.printDebug = DEFAULT_DEBUG;
    self.printError = DEFAULT_ERROR;
    self.printWarn = DEFAULT_WARN;
    self.printTrace = DEFAULT_TRACE;
    self.printInfo = DEFAULT_INFO;
    self.printVerbose = DEFAULT_INFO;
    self.printObject = DEFAULT_PRINT_OBJECT;
    self.printCurrentAPI = DEFAULT_CURRENT_API;
    self.printLogAPI = DEFAULT_LOG_API;

};

// Enable or Diabled Logs

Logger.prototype.printDebugLog = function(flag) {
    this.printDebug = flag;
};
Logger.prototype.printErrorLog = function(flag) {
    this.printError = flag;
};
Logger.prototype.printWarnLog = function(flag) {
    this.printWarn = flag;
};
Logger.prototype.printTraceLog = function(flag) {
    this.printTrace = flag;
};
Logger.prototype.printInfoLog = function(flag) {
    this.printInfo = flag;
};
Logger.prototype.printVerboseLog = function(flag) {
    this.printVerbose = flag;
};
Logger.prototype.printObjectLog = function(flag) {
    this.printObject = flag;
};
Logger.prototype.printCurrentAPILog = function(flag) {
    this.printObject = flag;
};

// Log printing Functions

Logger.prototype.debug = function(message) {
    try {
        if (this.printDebug === true) {
            log('DEBUG : '.bgMagenta.white);
            log(message.yellow);
        }

    } catch (err) {

    }
};
Logger.prototype.error = function(message) {
    try {
        if (this.printError === true) {
            log('ERROR : '.bgMagenta.white);
            log(message.red);
        }
    } catch (err) {

    }

};
Logger.prototype.warn = function(message) {
    try {
        if (this.printWarn === true) {
            log('WARNING : '.bgMagenta.white);
            log(message.red);
        }
    } catch (err) {

    }
};
Logger.prototype.trace = function(message) {
    try {
        if (this.printTrace === true) {
            log('TRACE : '.bgMagenta.white);
            log(message.red);
        }
    } catch (err) {

    }
};
Logger.prototype.verbose = function(message) {
    try {
        if (this.printVerbose === true) {
            log('VERBOSE : '.bgMagenta.white);
            log(message.green);
        }
    } catch (err) {

    }
};
Logger.prototype.info = function(message) {
    try {
        if (this.printInfo === true) {
            log('INFORMATION : '.bgMagenta.white);
            log(message.green);
        }
    } catch (err) {

    }
};
Logger.prototype.object = function(message) {
    try {
        if (this.printObject === true) {
            log("OBJECT :".bgMagenta.white);
            try {
                log(JSON.stringify(message).yellow);
            } catch (err) {
                this.error(err);
            }
        }
    } catch (err) {

    }
};
Logger.prototype.currentAPI = function(request, response, next) {
    try {
        if (this.printCurrentAPI === true && request) {
            try {
                this.info("API : " + request.path);
            } catch (err) {
                this.error(err);
            }
        }
    } catch (err) {

    }
    if (next) {
        next();
    }
};
Logger.prototype.logAPI = function(request, response, options) {
    try {
        if (!this.printLogAPI) {
            return;
        }
        var apiLogs = [];
        apiLogs.push("API :" + request.path + "\n");
        if (options.queries) {
            var query = JSON.stringify(request.query) || "No Query Parameter";
            apiLogs.push('queries : ' + query + "\n");
        }
        if (response) {
            if (options.status) {
                apiLogs.push('Status : ' + response.status + "\n");
            }
            if (options.message) {
                apiLogs.push('Message : ' + response.message + "\n");
            }
            if (options.errors) {
                if (response.errors)
                    apiLogs.push('Errors : ' + response.errors);
            }
        }
        this.info(apiLogs.join(""));
    } catch (err) {
        console.log(err.stack);
    }
};

function log(message) {
    try {
        console.log(message);
    } catch (err) {
        console.log("Error Printing Logs : ");
    }
}

module.exports = new Logger();


var logger = new Logger();

//logger.info("** INFORMATION **");
//logger.debug("** DEBUG **");
//logger.verbose("** VERBOSE **");
//logger.warn("** WARNING **");
//logger.error("** ERROR **");
//logger.object("** OBJECT **");
//logger.trace("** TRACE **");
