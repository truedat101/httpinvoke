var http = require('http');
var url = require('url');

var noop = function() {};
module.exports = function(url, method, options) {
    if(typeof method === 'undefined') {
        method = 'GET';
        options = {};
    } else if(typeof options === 'undefined') {
        if(typeof method === 'string') {
            options = {};
        } else {
            options = method;
            method = 'GET';
        }
    }
    options = options || {};
    var uploadProgressCb = options.uploading || noop;
    var downloadProgressCb = options.downloading || noop;
    var statusCb = options.gotStatus || noop;
    var cb = options.finished || noop;
    var deleteCallbacks = function() {
        uploadProgressCb = null;
        downloadProgressCb = null;
        statusCb = null;
        cb = null;
    };
    var input = options.input || null, inputLength = input === null ? 0 : input.length, inputHeaders = options.headers || [];
    var output, outputLength, outputHeaders = {};

    url = url.parse(url);
    var req = http.request({
        hostname: url.hostname,
        port: Number(url.port),
        path: url.path,
        method: method
    }, function(res) {
        if(cb) {
            var output = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                output += chunk;
            });
            res.on('end', function() {
                if(cb) {
                    cb(null, output);
                }
            });
        }
    });

    if(input !== null) {
        req.write(input);
    }
    req.on('error', function(e) {
        cb(e);
        deleteCallbacks();
    });
    req.end();
};