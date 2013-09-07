var cfg = require('../dummyserver-config');
var httpinvoke = require('../httpinvoke-node');

describe('"headers" option', function() {
    this.timeout(10000);
    cfg.eachBase(function(postfix, url, crossDomain) {
        it('has Content-Type respected' + postfix, function(done) {
            var contentType = 'text/x-c; charset=UTF-8';
            httpinvoke(url + 'headers/contentType', 'POST', {
                headers: {
                    'Content-Type': contentType
                },
                input: 'int main() {\n  return 0;\n}\n',
                outputType: 'text',
                finished: function(err, output) {
                    if(err) {
                        return done(err);
                    }
                    if(output !== contentType) {
                        return done(new Error('expected ' + contentType + ', but had ' + output));
                    }
                    done();
                }
            });

        });
    });
});
