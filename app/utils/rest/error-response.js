/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';
var RestError = require('./rest-information');
var DEFAULT_RESOURCE = 'Resource';

function ErrorResponse(resource) {
    Error.call(this);
    Error.captureStackTrace(this,  ErrorResponse);
    this.status = null;
    this.name = null;
    this.errors = [];
    this.message = null;
    this.code = null;
    this.resourceName = resource || DEFAULT_RESOURCE;
    this.moreInformation = null;
}
;

ErrorResponse.prototype = new Error();

ErrorResponse.prototype.constructor = ErrorResponse;

ErrorResponse.prototype.withStatus = function(status) {
    var self = this;
    self.status = status;
    return self;
};
ErrorResponse.prototype.withName = function(name) {
    var self = this;
    self.name = name;
    return self;
};
ErrorResponse.prototype.withResourceName = function(resourceName) {
    var self = this;
    self.resourceName = resourceName;
    return self;
};
ErrorResponse.prototype.withMessage = function(message) {
    var self = this;
    self.message = message;
    return self;
};
ErrorResponse.prototype.withCode = function(code) {
    var self = this;
    self.code = code;
    return self;
};
ErrorResponse.prototype.withMoreInformation = function(moreInformation) {
    var self = this;
    self.moreInformation = moreInformation;
    return self;
};
ErrorResponse.prototype.withErrors = function(errors) {
    var self = this;
    self.errors = errors;
    return self;
};
ErrorResponse.prototype.build = function() {
    var self = this;
    if (arguments.length === 1 && arguments[0] === true) {
        return autoGenerateErrorResponse(self);
    } else {
        return self;
    }
};

function autoGenerateErrorResponse(error) {
    if (error && error.status) {
        var restError = RestError.getErrors();
        for (var i = 0; i < restError.length; i++) {
            var restErrorObject = restError[i];
            if (restErrorObject.status === error.status) {
                error.name = error.name || restErrorObject.name;
                error.message = error.message ? error.message + "," + restErrorObject.message : restErrorObject.message;
                if (error.resourceName !== undefined &&
                        error.resourceName !== DEFAULT_RESOURCE) {
                    error.message = 'For Resource {' + error.resourceName + '} ,' + error.message;
                }
                break;
            }
        }
    }
    return error;
}

//require('util').inherits(module.exports, ErrorResponse);

module.exports = ErrorResponse;


