/* */ 
module.exports = function(grunt) {
  'use strict';
  var path = require("path"),
      child_process = require("child_process"),
      async = require("async");
  grunt.extendConfig = function(update) {
    function extend(target, update) {
      return Object.getOwnPropertyNames(update).reduce(function(result, key) {
        if (key in result) {
          result[key] = extend(result[key], update[key]);
        } else {
          result[key] = update[key];
        }
        return result;
      }, target);
    }
    grunt.initConfig(extend(grunt.config(), update));
  };
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', '*.js', 'test/regression/*.js'],
      options: {
        jshintrc: '.jshintrc',
        force: false
      }
    },
    mochaTest: {
      options: {reporter: 'spec'},
      test: {src: ['test/*.js']}
    },
    shell: {
      browserify: {
        command: 'node_modules/.bin/browserify tools/entry.js -o build/esmangle.js',
        stdout: true,
        stderr: true
      },
      esmangle: {
        command: 'bin/esmangle.js build/esmangle.js -o build/esmangle.min.js',
        stdout: true,
        stderr: true
      }
    }
  });
  grunt.loadTasks(path.join('test', 'regression'));
  grunt.registerMultiTask('git_reset_hard', function() {
    var done = this.async(),
        cwd = this.data.cwd;
    if (!grunt.file.exists(cwd)) {
      done();
      return;
    }
    grunt.verbose.writeln('Resetting ' + cwd + ' ...');
    grunt.util.spawn({
      cmd: 'git',
      args: ['reset', '--hard'],
      opts: {cwd: cwd}
    }, function(error) {
      if (error) {
        grunt.verbose.error(error);
        done(error);
        return;
      }
      done();
    });
  });
  grunt.registerMultiTask('npm_install', function() {
    var name = '$npm_install$/' + this.target,
        cwd = this.data.cwd,
        cfg = {};
    grunt.verbose.writeln('shell:' + name);
    cfg[name] = {
      command: 'npm install --silent',
      options: {
        stdout: true,
        stderr: true,
        failOnError: true,
        execOptions: {cwd: cwd}
      }
    };
    grunt.extendConfig({shell: cfg});
    grunt.task.run('shell:' + name);
  });
  grunt.registerMultiTask('esmangle_apply', function() {
    var done = this.async(),
        log;
    log = grunt.log.write('minifying ' + this.filesSrc.length + ' files...');
    async.eachLimit(this.filesSrc, 10, function(item, callback) {
      var escaped = JSON.stringify(item);
      child_process.exec('node bin/esmangle.js ' + escaped + ' -o ' + escaped, function(err) {
        callback(err);
      });
    }, function(err) {
      if (err) {
        log.error();
        done(false);
      } else {
        log.ok();
        done(true);
      }
    });
  });
  grunt.registerTask('directory:build', 'create build directory', function() {
    grunt.file.mkdir('build');
  });
  grunt.registerTask('browserify', ['directory:build', 'shell:browserify']);
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-update-submodules');
  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('test:regression', ['test:regression:esmangle', 'test:regression:q', 'test:regression:coffee-script-redux']);
  grunt.registerTask('test', 'mochaTest');
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('build', ['browserify', 'shell:esmangle']);
  grunt.registerTask('travis', ['lint', 'test', 'test:regression']);
  grunt.registerTask('default', 'travis');
};
