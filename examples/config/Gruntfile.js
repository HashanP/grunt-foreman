module.exports = function(grunt) {

    grunt.initConfig({
        foreman: {
            dev: {
                env: [ "development.env", "application.env" ],
                procfile: "Procfile.dev",
                port: 7000

            }
        }
    });

    grunt.loadTasks("../../tasks");
    grunt.registerTask("default", "foreman");
};
