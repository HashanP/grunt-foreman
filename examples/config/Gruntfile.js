module.exports = function(grunt) {
    grunt.loadTasks("../../tasks");

    grunt.initConfig({
        foreman: {
            dev: {
                env: [ "development.env", "application.env" ],
                procfile: "Procfile.dev",
                port: 7000
                
            }
        }
    });

    grunt.registerTask("default", "foreman");
};
