/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use-strict";
var httpStatus = {};

/**
 * Success Code
 * 
 */
httpStatus.ok = 200;
httpStatus.created = 201;
httpStatus.accepted = 202;
httpStatus.noContent = 204;

/**
 *  Bad Request
 */
httpStatus.badRequest = 400;

/**
 * Unauthorized User 
 */
httpStatus.unAuthorised = 401;

/**
 * 
 * Resource Not Found
 */
httpStatus.resourceNotFound = 404;

/**
 * 
 * Resource Already Exists
 * 
 */
httpStatus.resourceAlreadyExist = 409;


module.exports = httpStatus;