var spawn = require("child_process").spawn;

module.exports = function(grunt) {
  var command = "foreman";
  if(process.platform === "win32") {
    command = "foreman.bat";
  }

  if(grunt.config.data["foreman"]) {
    grunt.registerMultiTask("foreman", function() {
      var done = this.async();
      var foreman = spawn(command, buildArgs(this.target, grunt.config.get("foreman")));

      foreman.stdout.pipe(process.stdout);
      foreman.stderr.pipe(process.stderr);
      process.stdin.pipe(foreman.stdin);

	    foreman.on("exit", function(code, sig) {
        if(code > 0) {
          grunt.fail.fatal("Foreman error", 3);
        }
        return done(code, sig);
      });
    });
  } else {
    grunt.registerTask("foreman", function() {
      var done = this.async();

      var foreman = spawn(command, buildArgs(this.target, grunt.config.get("foreman")));
      foreman.stdout.pipe(process.stdout);
      foreman.stderr.pipe(process.stderr);
      process.stdin.pipe(foreman.stdin);

  	  foreman.on("exit", function(code, sig) {
        if(code > 0) {
          grunt.fail.fatal("Foreman error", 3);
        }
        return done(code, sig);
      });
    });
  }
};

function buildArgs(target, config) {
  target = target || "dev";
  config = config || {};

  var options = config[target] || {};
  var args = ["start"];

  if(options.env) {
    args = args.concat("--env", options.env.join(","));
  }
  if(options.port) {
    args = args.concat("--port", +options.port);
  }
  if(options.procfile) {
    args = args.concat("--procfile", options.procfile);
  }

  return args;
}
