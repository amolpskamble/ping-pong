/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

var Rest = require('./rest-information');


var APIOperation = {
    FETCH: "FETCH",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    CREATED: "CREATED"

};

function APIResponseBuilder(resourceName) {
    this.status = null;
    this.message = {};
    this.data = {};
    this.records;
    this.resourceName = resourceName || 'Resource';
    this.operation;
}
;

APIResponseBuilder.prototype = {
    constructor: APIResponseBuilder
};

APIResponseBuilder.prototype.withStatus = function(status) {
    var self = this;
    self.status = status;
    return self;
};

APIResponseBuilder.prototype.withMessage = function(message) {
    var self = this;
    self.message = message;
    return self;
};

APIResponseBuilder.prototype.withData = function(data) {
    var self = this;
    self.data = data;
    return self;
};

APIResponseBuilder.prototype.withRecords = function(records) {
    var self = this;
    self.records = records;
    return self;
};

APIResponseBuilder.prototype.withResourceName = function(resourceName) {
    var self = this;
    self.resourceName = resourceName;
    return self;
};

APIResponseBuilder.prototype.withOperation = function(operation) {
    var self = this;
    self.operation = operation;
    return self;
};

APIResponseBuilder.prototype.build = function() {
    var self = this;
    if (arguments.length === 1 && arguments[0] === true) {
        self = autoGenerateAPIResponse(self);
    }
    self.resourceName = undefined;
    self.operation = undefined;
    return self;
};

function autoGenerateAPIResponse(response) {
    if (response && response.status) {
        var rest = Rest.getSuccess();
        for (var i = 0; i < rest.length; i++) {
            var restObject = rest[i];
            if (restObject.status === response.status) {
                response.message = restObject.message;
                if (response.resourceName !== undefined || response.resourceName !== null) {
                    if (response.operation !== undefined && response.operation !== null) {
                        var operationMessage = "";
                        switch (response.operation) {
                            case APIOperation.FETCH:
                                operationMessage = '. Record Found For {' + response.resourceName + '}';
                                break;
                            case APIOperation.DELETE:
                                operationMessage = '. Record Deleted For {' + response.resourceName + '}';
                                break;
                            case APIOperation.UPDATE:
                                operationMessage = '. Record Updated For {' + response.resourceName + '}';
                                break;
                            case APIOperation.CREATED:
                                operationMessage = '. New Record Created For {' + response.resourceName + '}';
                                break;
                        }
                        response.message = response.message + operationMessage;
                    }
                }
                break;
            }
        }
    }
    return response;
}


module.exports.APIResponseBuilder = APIResponseBuilder;
module.exports.APIOperation = APIOperation;

//var testResponse = new APIResponseBuilder()
//        .withStatus(201)
//        .withResourceName('Customer')
//        .withOperation(APIOpeartion.UPDATE)
//        .build(true);
//console.log(testResponse);
//                    