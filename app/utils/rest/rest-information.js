/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use-strict";

var restErrors = [];

var restSuccess = [];

var httpStatusCode = require('./http-code');


var BadRequest = {
    status: httpStatusCode.badRequest,
    name: 'BadRequest',
    message: 'The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.'
};

var Unauthorized = {
    status: httpStatusCode.unAuthorised,
    name: 'Unauthorized',
    message: 'Authorization has been refused for those credentials.'
};

var ResourceNotFound = {
    status: httpStatusCode.resourceNotFound,
    name: 'ResourceNotFound',
    message: 'The requested resource could not be found but may be available again in the future. Subsequent requests by the client are permissible.'
};

var ResourceAlreadyExist = {
    status: httpStatusCode.resourceAlreadyExist,
    name: 'ResourceAlreadyExist',
    message: 'The request could not be completed due to a conflict with the current state of the resource.'
};

var Ok = {
    status: httpStatusCode.ok,
    message: 'The request is Successful'
};

var Created = {
    status: httpStatusCode.created,
    message: 'The request has been fulfilled, and a new resource is created'
};

var Accepted={
    status: httpStatusCode.accepted,
    message: 'The request has been accepted for processing, but the processing has not been completed'
};


restErrors.push(BadRequest);
restErrors.push(Unauthorized);
restErrors.push(ResourceNotFound);
restErrors.push(ResourceAlreadyExist);

restSuccess.push(Ok);
restSuccess.push(Created);
restSuccess.push(Accepted);

var Rest = {
    getErrors: function() {
        return restErrors;
    },
    getSuccess: function() {
        return restSuccess;
    }
};

module.exports = Rest;


