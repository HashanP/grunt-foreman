var spawn = require("child_process").spawn;

module.exports = function(grunt) {
    grunt.registerMultiTask("foreman", function() {
        var done = this.async();

        var config = grunt.config.get("foreman");

	    var foreman = spawn("foreman", buildArgs(this.target, config));

	    foreman.stdout.pipe(process.stdout);
        foreman.stderr.pipe(process.stderr);
	    process.stdin.pipe(foreman.stdin);

	    foreman.on("exit", function(code, sig) {
            if (code > 0) grunt.fail.fatal("Foreman error", 3);
            return done(code, sig);
        });
    });
};

function buildArgs(target, config) {
    target = target || "dev";
    config = config || {};

    var options = config[target] || {};

    var args = ["start"];

//    if (options.concurrency) {
//        options.concurrency = options.concurrency || {};
//
//        var concurrency = [];
//        Object.keys(options.concurrency).forEach(function(key) {
//            var value = +options.concurrency[key];
//            concurrency.push(key + "=" + value);
//        });

//        args = args.concat("--concurrency", concurrency.join(","));
//    }

    if (options.env) args = args.concat("--env", options.env.join(","));
    if (options.port) args = args.concat("--port", +options.port);
    if (options.procfile) args = args.concat("--procfile", options.procfile);

    return args;
}
