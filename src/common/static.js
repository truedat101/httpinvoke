var isArrayBufferView = function(input) {
    return typeof input === 'object' && input !== null && (
        (typeof global.ArrayBufferView !== 'undefined' && input instanceof global.ArrayBufferView) ||
        (typeof global.Int8Array !== 'undefined' && input instanceof global.Int8Array) ||
        (typeof global.Uint8Array !== 'undefined' && input instanceof global.Uint8Array) ||
        (typeof global.Uint8ClampedArray !== 'undefined' && input instanceof global.Uint8ClampedArray) ||
        (typeof global.Int16Array !== 'undefined' && input instanceof global.Int16Array) ||
        (typeof global.Uint16Array !== 'undefined' && input instanceof global.Uint16Array) ||
        (typeof global.Int32Array !== 'undefined' && input instanceof global.Int32Array) ||
        (typeof global.Uint32Array !== 'undefined' && input instanceof global.Uint32Array) ||
        (typeof global.Float32Array !== 'undefined' && input instanceof global.Float32Array) ||
        (typeof global.Float64Array !== 'undefined' && input instanceof global.Float64Array)
    );
};
var isByteArray = function(input) {
    return typeof input === 'object' && input !== null && (
        (typeof global.Buffer !== 'undefined' && input instanceof global.Buffer) ||
        (typeof global.Blob !== 'undefined' && input instanceof global.Blob) ||
        (typeof global.File !== 'undefined' && input instanceof global.File) ||
        (typeof global.ArrayBuffer !== 'undefined' && input instanceof global.ArrayBuffer) ||
        isArrayBufferView(input) ||
        Object.prototype.toString.call(input) === '[object Array]'
    );
};
var bytearrayMessage = 'an instance of Buffer, nor Blob, nor File, nor ArrayBuffer, nor ArrayBufferView, nor Int8Array, nor Uint8Array, nor Uint8ClampedArray, nor Int16Array, nor Uint16Array, nor Int32Array, nor Uint32Array, nor Float32Array, nor Float64Array, nor Array';

var supportedMethods = ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'];
var indexOf = typeof [].indexOf === 'undefined' ? function(array, item) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i] === item) {
            return i;
        }
    }
    return -1;
} : function(array, item) {
    return array.indexOf(item);
};

var noop = function() {};
var pass = function(value) {
    return value;
};
var nextTick = global.setImmediate || global.setTimeout;
var failWithoutRequest = function(cb, err) {
    nextTick(function() {
        if(cb === null) {
            return;
        }
        cb(err);
    });
    return noop;
};