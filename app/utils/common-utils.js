/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var validator = require("validator");


var hasOwnProperty = Object.prototype.hasOwnProperty;

var CommonUtils = {
    /**
     * Check if field is Undefined
     * first agument stand for field to be check
     * if only one argument is then function will return true/false
     * if second argument is present then function will throw error with given message
     * @returns {Boolean}
     */
    isUndefined: function() {
        var result;
        if (arguments.length > 0) {
            result = (arguments[0] === undefined);
            if (result === true && arguments.length > 1) {
                console.log("throwing error");
                throw [arguments[1]];
            }
            return result;
        }
        throw ['Server Internal Error : Invalid Argument supplied While performing isUndefined validation'];
    },
    /**
     * Check if object is  Empty
     * object can be array,string,object
     * @returns {undefined}
     */
    isEmpty: function() {
        var result = false;
        if (arguments.length > 0) {
            obj = arguments[0];
            // null and undefined are "empty"
            if (obj == null)
                result = true;

            // Assume if it has a length property with a non-zero value
            // that that property is correct.
            if (obj.length > 0)
                result = false;
            if (obj.length === 0)
                result = true;

            // Otherwise, does it have any properties of its own?
            // Note that this doesn't handle
            // toString and valueOf enumeration bugs in IE < 9
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key))
                    result = false;
            }
            if (result === true && arguments.length > 1) {
                console.log("throwing error");
                throw [arguments[1]];
            }
            return result;
        }
        throw ['Server Internal Error : Invalid Argument supplied While performing isUndefined validation'];
    },
    isEqual: function(compare, compareTo) {
        var result = false;
        if (arguments.length >= 2) {
            if (compare == compareTo) {
                result = true;
            }
            if (result === false && arguments.length > 2) {
                console.log("throwing error");
                throw [arguments[2]];
            }
            return result;
        }
        throw ['Server Internal Error : Invalid Argument supplied While performing isEqal validation'];
    },
    isEqualIgnoreCase: function(compare, compareTo) {
        var result = false;
        if (arguments.length >= 2) {
            compare = compare.toString().toUpperCase();
            compareTo = compareTo.toString().toUpperCase();
            if (compare == compareTo) {
                result = true;
            }
            if (result === false && arguments.length > 2) {
                console.log("throwing error");
                throw [arguments[2]];
            }
            return result;
        }
        throw ['Server Internal Error : Invalid Argument supplied While performing isEqal validation'];
    },
    isNotEqual: function(compare, compareTo) {
        var result = false;
        if (arguments.length >= 2) {
            if (compare != compareTo) {
                result = true;
            }
            if (result === false && arguments.length > 2) {
                console.log("throwing error");
                throw [arguments[2]];
            }
            return result;
        }
        throw ['Server Internal Error : Invalid Argument supplied While performing isEqal validation'];
    },
    isNotEqualIgnoreCase: function(compare, compareTo) {
        var result = false;
        if (arguments.length >= 2) {
            compare = compare.toString().toUpperCase();
            compareTo = compareTo.toString().toUpperCase();
            if (compare != compareTo) {
                result = true;
            }
            if (result === false && arguments.length > 2) {
                console.log("throwing error");
                throw [arguments[2]];
            }
            return result;
        }
        throw ['Server Internal Error : Invalid Argument supplied While performing isEqal validation'];
    },
    isLengthEqual: function(array, length) {
        var result = true;
        if (arguments.length >= 2) {
            this.isUndefined(array, 'Array to be check is required parameter');
            this.isUndefined(length, 'Length to compare is reqiured parameter');
            if (array instanceof Array && array.length !== length) {
                result = false;
            }
            if (result === false && arguments.length > 2) {
                console.log("throwing error");
                throw [arguments[2]];
            }
            return result;
        }
        throw ['Server Internal Error : Invalid Argument supplied While performing isLengthEqual validation'];
    },
    /**
     * Is email address valid
     * @returns {undefined}
     */
    isEmail: function() {
        var result;
        if (arguments.length > 0) {
            result = (validator.isEmail(arguments[0]));
            if (result === false && arguments.length > 1) {
                console.log("throwing error");
                throw [arguments[1]];
            }
            return result;
        }
        throw ['Server Internal Error : Invalid Argument supplied While performing isUndefined validation'];
    },
    /**
     * Generate Random String
     * 
     * @param {type} length lenght of the string. 12 is default and max.
     * @returns {String}
     */
    generateRandomString: function(length) {
        var self = this;
        if (self.isUndefined(length)) {
            length = 12;
        }
        var randomString = Math.random().toString(36).slice(-length);
        return randomString;
    },
    /**
     * Generate Random String
     * 
     * @param {type} length lenght of the string. 12 is default and max.
     * @returns {String}
     */
    generateRandomNumber: function(length) {
        var self = this;
        if (self.isUndefined(length)) {
            length = 12;
        }
        var randomNumber = Math.random().toString().slice(-length);
        return randomNumber;
    },
    /**
     * Check if element exist in the array
     * @param {type} element element to be check
     * @param {type} array array
     * @param {type} errorMessge error message to be throw
     * @returns {Boolean}
     */
    existInArray: function(element, array) {
        var result = true;
        if (arguments.length >= 2) {
            this.isUndefined(element, 'Element to be check can not be empty');
            this.isUndefined(array, 'Array to be check can not be empty');
            if (array instanceof Array && array.indexOf(element) === -1) {
                result = false;
            }
            if (!(array instanceof Array) && array instanceof Object && typeof array[element] === 'undefined') {
//                console.log(array);
//                console.log(element);
//                console.log(array.hasOwnProperty(element));
//                console.log(typeof array[element]);
//                console.log("Yes it fail here existInArray");
                result = false;
            }
            if (result === false && arguments.length > 2) {
                console.log("throwing error");
                throw [arguments[2]];
            }
            return result;
        }
        throw ['Server Internal Error : Invalid Argument supplied While performing isUndefined validation'];
    },
    isMobilePhone: function(number, locale) {
        locale = locale || 'en-IN';
        var result = true;
        if (arguments.length > 1) {
            this.isUndefined(number, 'Number to be check can not be empty');
            result = validator.isMobilePhone(number, locale);
            if (result === false && arguments.length > 2) {
                console.log("throwing error");
                throw [arguments[2]];
            }
            return result;
        }
        throw ['Server Internal Error : Invalid Argument supplied While performing isUndefined validation'];
    },
    /**
     * Caculate Age from birth date
     * @param {type} date
     * @returns {undefined}
     */
    caculateAge: function(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
};
/**
 ********************************************************** 
 *
 *              EXPORTED MODULES
 *
 **********************************************************
 */
module.exports = CommonUtils;
