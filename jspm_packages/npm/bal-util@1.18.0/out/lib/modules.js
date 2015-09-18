/* */ 
(function(process) {
  var TaskGroup,
      balUtilFlow,
      balUtilModules,
      isWindows,
      safefs,
      typeChecker,
      _ref,
      _ref1,
      _ref2,
      _ref3,
      _ref4,
      __slice = [].slice;
  balUtilModules = null;
  TaskGroup = require("taskgroup");
  typeChecker = require("typechecker");
  safefs = require("safefs");
  balUtilFlow = require("./flow");
  isWindows = (typeof process !== "undefined" && process !== null ? (_ref = process.platform) != null ? _ref.indexOf('win') : void 0 : void 0) === 0;
  if ((_ref1 = global.numberOfOpenProcesses) == null) {
    global.numberOfOpenProcesses = 0;
  }
  if ((_ref2 = global.maxNumberOfOpenProcesses) == null) {
    global.maxNumberOfOpenProcesses = (_ref3 = process.env.NODE_MAX_OPEN_PROCESSES) != null ? _ref3 : 30;
  }
  if ((_ref4 = global.waitingToOpenProcessDelay) == null) {
    global.waitingToOpenProcessDelay = 100;
  }
  balUtilModules = {
    requireFresh: function(path) {
      var result;
      path = require("path").resolve(path);
      delete require.cache[path];
      result = require(path);
      delete require.cache[path];
      return result;
    },
    isWindows: function() {
      return isWindows;
    },
    getLocaleCode: function(lang) {
      var localeCode;
      if (lang == null) {
        lang = null;
      }
      if (lang == null) {
        lang = process.env.LANG || '';
      }
      localeCode = lang.replace(/\..+/, '').replace('-', '_').toLowerCase() || null;
      return localeCode;
    },
    getLanguageCode: function(localeCode) {
      var languageCode;
      if (localeCode == null) {
        localeCode = null;
      }
      localeCode = balUtilModules.getLocaleCode(localeCode) || '';
      languageCode = localeCode.replace(/^([a-z]+)[_-]([a-z]+)$/i, '$1').toLowerCase() || null;
      return languageCode;
    },
    getCountryCode: function(localeCode) {
      var countryCode;
      if (localeCode == null) {
        localeCode = null;
      }
      localeCode = balUtilModules.getLocaleCode(localeCode) || '';
      countryCode = localeCode.replace(/^([a-z]+)[_-]([a-z]+)$/i, '$2').toLowerCase() || null;
      return countryCode;
    },
    openProcess: function(next) {
      if (global.numberOfOpenProcesses < 0) {
        throw new Error("balUtilModules.openProcess: the numberOfOpenProcesses is [" + global.numberOfOpenProcesses + "] which should be impossible...");
      }
      if (global.numberOfOpenProcesses >= global.maxNumberOfOpenProcesses) {
        setTimeout(function() {
          return balUtilModules.openProcess(next);
        }, global.waitingToOpenProcessDelay);
      } else {
        ++global.numberOfOpenProcesses;
        next();
      }
      return this;
    },
    closeProcess: function(next) {
      --global.numberOfOpenProcesses;
      if (typeof next === "function") {
        next();
      }
      return this;
    },
    spawn: function(command, opts, next) {
      balUtilModules.openProcess(function() {
        var err,
            pid,
            spawn,
            stderr,
            stdout,
            _ref5;
        spawn = require("child_process").spawn;
        _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
        pid = null;
        err = null;
        stdout = '';
        stderr = '';
        if (typeChecker.isString(command)) {
          command = command.split(' ');
        }
        if (typeChecker.isArray(command)) {
          pid = spawn(command[0], command.slice(1), opts);
        } else {
          pid = spawn(command.command, command.args || [], command.options || opts);
        }
        pid.stdout.on('data', function(data) {
          if (opts.output) {
            process.stdout.write(data);
          }
          return stdout += data.toString();
        });
        pid.stderr.on('data', function(data) {
          if (opts.output) {
            process.stderr.write(data);
          }
          return stderr += data.toString();
        });
        pid.on('exit', function(code, signal) {
          err = null;
          if (code !== 0) {
            err = new Error(stderr || 'exited with a non-zero status code');
          }
          balUtilModules.closeProcess();
          return next(err, stdout, stderr, code, signal);
        });
        if (opts.stdin) {
          pid.stdin.write(opts.stdin);
          return pid.stdin.end();
        }
      });
      return this;
    },
    spawnMultiple: function(commands, opts, next) {
      var command,
          results,
          tasks,
          _i,
          _len,
          _ref5;
      _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
      opts.tasksMode || (opts.tasksMode = 'serial');
      results = [];
      tasks = new TaskGroup(opts.tasksMode, function(err) {
        return next(err, results);
      });
      if (!typeChecker.isArray(commands)) {
        commands = [commands];
      }
      for (_i = 0, _len = commands.length; _i < _len; _i++) {
        command = commands[_i];
        tasks.push({command: command}, function(complete) {
          return balUtilModules.spawn(this.command, opts, function() {
            var args,
                err;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            err = args[0] || null;
            results.push(args);
            return complete(err);
          });
        });
      }
      tasks.run();
      return this;
    },
    exec: function(command, opts, next) {
      balUtilModules.openProcess(function() {
        var exec,
            _ref5;
        exec = require("child_process").exec;
        _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
        if (opts.output) {
          opts.stdio = 'inherit';
          delete opts.output;
        }
        return exec(command, opts, function(err, stdout, stderr) {
          balUtilModules.closeProcess();
          return next(err, stdout, stderr);
        });
      });
      return this;
    },
    execMultiple: function(commands, opts, next) {
      var command,
          results,
          tasks,
          _i,
          _len,
          _ref5;
      _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
      opts.tasksMode || (opts.tasksMode = 'serial');
      results = [];
      tasks = new TaskGroup(opts.tasksMode, function(err) {
        return next(err, results);
      });
      if (!typeChecker.isArray(commands)) {
        commands = [commands];
      }
      for (_i = 0, _len = commands.length; _i < _len; _i++) {
        command = commands[_i];
        tasks.push({command: command}, function(complete) {
          return balUtilModules.exec(this.command, opts, function() {
            var args,
                err;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            err = args[0] || null;
            results.push(args);
            return complete(err);
          });
        });
      }
      tasks.sync();
      return this;
    },
    determineExecPath: function(possibleExecPaths, next) {
      var execPath,
          pathUtil,
          possibleExecPath,
          tasks,
          _i,
          _len;
      pathUtil = require("path");
      execPath = null;
      tasks = new TaskGroup(function(err) {
        return next(err, execPath);
      });
      for (_i = 0, _len = possibleExecPaths.length; _i < _len; _i++) {
        possibleExecPath = possibleExecPaths[_i];
        if (!possibleExecPath) {
          continue;
        }
        tasks.push({possibleExecPath: possibleExecPath}, function(complete) {
          possibleExecPath = this.possibleExecPath;
          possibleExecPath = pathUtil.resolve(possibleExecPath);
          return safefs.exists(possibleExecPath, function(exists) {
            if (!exists) {
              return complete();
            }
            return balUtilModules.spawn([possibleExecPath, '--version'], {env: process.env}, function(err, stdout, stderr, code, signal) {
              if (err) {
                return complete();
              } else {
                execPath = possibleExecPath;
                return tasks.exit();
              }
            });
          });
        });
      }
      tasks.sync();
      return this;
    },
    getEnvironmentPaths: function() {
      var environmentPaths;
      if (balUtilModules.isWindows()) {
        environmentPaths = process.env.PATH.split(/;/g);
      } else {
        environmentPaths = process.env.PATH.split(/:/g);
      }
      return environmentPaths;
    },
    getStandardExecPaths: function(execName) {
      var index,
          possibleExecPaths,
          value,
          _i,
          _len;
      possibleExecPaths = [process.cwd()].concat(balUtilModules.getEnvironmentPaths());
      for (index = _i = 0, _len = possibleExecPaths.length; _i < _len; index = ++_i) {
        value = possibleExecPaths[index];
        possibleExecPaths[index] = value.replace(/\/$/, '');
      }
      if (execName) {
        possibleExecPaths = balUtilFlow.suffixArray("/" + execName, possibleExecPaths);
      }
      return possibleExecPaths;
    },
    getExecPath: function(execName, next) {
      var possibleExecPaths;
      if (isWindows && execName.indexOf('.') === -1) {
        possibleExecPaths = balUtilModules.getStandardExecPaths(execName + '.exe').concat(balUtilModules.getStandardExecPaths(execName));
      } else {
        possibleExecPaths = balUtilModules.getStandardExecPaths(execName);
      }
      balUtilModules.determineExecPath(possibleExecPaths, next);
      return this;
    },
    getHomePath: function(next) {
      var homePath;
      if (balUtilModules.cachedHomePath != null) {
        next(null, balUtilModules.cachedHomePath);
        return this;
      }
      homePath = process.env.USERPROFILE || process.env.HOME;
      homePath || (homePath = null);
      balUtilModules.cachedHomePath = homePath;
      next(null, homePath);
      return this;
    },
    getTmpPath: function(next) {
      var pathUtil,
          tmpDirName,
          tmpPath;
      if (balUtilModules.cachedTmpPath != null) {
        next(null, balUtilModules.cachedTmpPath);
        return this;
      }
      pathUtil = require("path");
      tmpDirName = isWindows ? 'temp' : 'tmp';
      tmpPath = process.env.TMPDIR || process.env.TMP || process.env.TEMP;
      if (!tmpPath) {
        balUtilModules.getHomePath(function(err, homePath) {
          if (err) {
            return next(err);
          }
          tmpPath = pathUtil.resolve(homePath, tmpDirName);
          if (!tmpPath) {
            return tmpPath = isWindows ? pathUtil.resolve(process.env.windir || 'C:\\Windows', tmpDirName) : '/tmp';
          }
        });
      }
      tmpPath || (tmpPath = null);
      balUtilModules.cachedTmpPath = tmpPath;
      next(null, tmpPath);
      return this;
    },
    getGitPath: function(next) {
      var execName,
          possibleExecPaths;
      if (balUtilModules.cachedGitPath != null) {
        next(null, balUtilModules.cachedGitPath);
        return this;
      }
      execName = isWindows ? 'git.exe' : 'git';
      possibleExecPaths = [process.env.GIT_PATH, process.env.GITPATH].concat(balUtilModules.getStandardExecPaths(execName)).concat(isWindows ? ["/Program Files (x64)/Git/bin/" + execName, "/Program Files (x86)/Git/bin/" + execName, "/Program Files/Git/bin/" + execName] : ["/usr/local/bin/" + execName, "/usr/bin/" + execName, "~/bin/" + execName]);
      balUtilModules.determineExecPath(possibleExecPaths, function(err, execPath) {
        balUtilModules.cachedGitPath = execPath;
        if (err) {
          return next(err);
        }
        if (!execPath) {
          return next(new Error('Could not locate git binary'));
        }
        return next(null, execPath);
      });
      return this;
    },
    getNodePath: function(next) {
      var execName,
          possibleExecPaths;
      if (balUtilModules.cachedNodePath != null) {
        next(null, balUtilModules.cachedNodePath);
        return this;
      }
      execName = isWindows ? 'node.exe' : 'node';
      possibleExecPaths = [process.env.NODE_PATH, process.env.NODEPATH, (/node(.exe)?$/.test(process.execPath) ? process.execPath : '')].concat(balUtilModules.getStandardExecPaths(execName)).concat(isWindows ? ["/Program Files (x64)/nodejs/" + execName, "/Program Files (x86)/nodejs/" + execName, "/Program Files/nodejs/" + execName] : ["/usr/local/bin/" + execName, "/usr/bin/" + execName, "~/bin/" + execName]);
      balUtilModules.determineExecPath(possibleExecPaths, function(err, execPath) {
        balUtilModules.cachedNodePath = execPath;
        if (err) {
          return next(err);
        }
        if (!execPath) {
          return next(new Error('Could not locate node binary'));
        }
        return next(null, execPath);
      });
      return this;
    },
    getNpmPath: function(next) {
      var execName,
          possibleExecPaths;
      if (balUtilModules.cachedNpmPath != null) {
        next(null, balUtilModules.cachedNpmPath);
        return this;
      }
      execName = isWindows ? 'npm.cmd' : 'npm';
      possibleExecPaths = [process.env.NPM_PATH, process.env.NPMPATH, (/node(.exe)?$/.test(process.execPath) ? process.execPath.replace(/node(.exe)?$/, execName) : '')].concat(balUtilModules.getStandardExecPaths(execName)).concat(isWindows ? ["/Program Files (x64)/nodejs/" + execName, "/Program Files (x86)/nodejs/" + execName, "/Program Files/nodejs/" + execName] : ["/usr/local/bin/" + execName, "/usr/bin/" + execName, "~/node_modules/.bin/" + execName]);
      balUtilModules.determineExecPath(possibleExecPaths, function(err, execPath) {
        balUtilModules.cachedNpmPath = execPath;
        if (err) {
          return next(err);
        }
        if (!execPath) {
          return next(new Error('Could not locate npm binary'));
        }
        return next(null, execPath);
      });
      return this;
    },
    gitCommand: function(command, opts, next) {
      var performSpawn,
          _ref5;
      _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
      if (typeChecker.isString(command)) {
        command = command.split(' ');
      } else if (!typeChecker.isArray(command)) {
        return next(new Error('unknown command type'));
      }
      performSpawn = function() {
        command.unshift(opts.gitPath);
        return balUtilModules.spawn(command, opts, next);
      };
      if (opts.gitPath) {
        performSpawn();
      } else {
        balUtilModules.getGitPath(function(err, gitPath) {
          if (err) {
            return next(err);
          }
          opts.gitPath = gitPath;
          return performSpawn();
        });
      }
      return this;
    },
    gitCommands: function(commands, opts, next) {
      var command,
          results,
          tasks,
          _i,
          _len,
          _ref5;
      _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
      results = [];
      tasks = new TaskGroup(function(err) {
        return next(err, results);
      });
      if (!typeChecker.isArray(commands)) {
        commands = [commands];
      }
      for (_i = 0, _len = commands.length; _i < _len; _i++) {
        command = commands[_i];
        tasks.push({command: command}, function(complete) {
          return balUtilModules.gitCommand(this.command, opts, function() {
            var args,
                err;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            err = args[0] || null;
            results.push(args);
            return complete(err);
          });
        });
      }
      tasks.sync();
      return this;
    },
    nodeCommand: function(command, opts, next) {
      var performSpawn,
          _ref5;
      _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
      if (typeChecker.isString(command)) {
        command = command.split(' ');
      } else if (!typeChecker.isArray(command)) {
        return next(new Error('unknown command type'));
      }
      performSpawn = function() {
        command.unshift(opts.nodePath);
        return balUtilModules.spawn(command, opts, next);
      };
      if (opts.nodePath) {
        performSpawn();
      } else {
        balUtilModules.getNodePath(function(err, nodePath) {
          if (err) {
            return next(err);
          }
          opts.nodePath = nodePath;
          return performSpawn();
        });
      }
      return this;
    },
    nodeCommands: function(commands, opts, next) {
      var command,
          results,
          tasks,
          _i,
          _len,
          _ref5;
      _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
      results = [];
      tasks = new TaskGroup(function(err) {
        return next(err, results);
      });
      if (!typeChecker.isArray(commands)) {
        commands = [commands];
      }
      for (_i = 0, _len = commands.length; _i < _len; _i++) {
        command = commands[_i];
        tasks.push({command: command}, function(complete) {
          return balUtilModules.nodeCommand(this.command, opts, function() {
            var args,
                err;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            err = args[0] || null;
            results.push(args);
            return complete(err);
          });
        });
      }
      tasks.sync();
      return this;
    },
    npmCommand: function(command, opts, next) {
      var performSpawn,
          _ref5;
      _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
      if (typeChecker.isString(command)) {
        command = command.split(' ');
      } else if (!typeChecker.isArray(command)) {
        return next(new Error('unknown command type'));
      }
      performSpawn = function() {
        command.unshift(opts.npmPath);
        return balUtilModules.spawn(command, opts, next);
      };
      if (opts.npmPath) {
        performSpawn();
      } else {
        balUtilModules.getNpmPath(function(err, npmPath) {
          if (err) {
            return next(err);
          }
          opts.npmPath = npmPath;
          return performSpawn();
        });
      }
      return this;
    },
    npmCommands: function(commands, opts, next) {
      var command,
          results,
          tasks,
          _i,
          _len,
          _ref5;
      _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
      results = [];
      tasks = new TaskGroup(function(err) {
        return next(err, results);
      });
      if (!typeChecker.isArray(commands)) {
        commands = [commands];
      }
      for (_i = 0, _len = commands.length; _i < _len; _i++) {
        command = commands[_i];
        tasks.push({command: command}, function(complete) {
          return balUtilModules.npmCommand(this.command, opts, function() {
            var args,
                err;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            err = args[0] || null;
            results.push(args);
            return complete(err);
          });
        });
      }
      tasks.sync();
      return this;
    },
    initGitRepo: function(opts, next) {
      var branch,
          commands,
          gitPath,
          logger,
          output,
          path,
          remote,
          url,
          _ref5;
      _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
      path = opts.path, remote = opts.remote, url = opts.url, branch = opts.branch, logger = opts.logger, output = opts.output, gitPath = opts.gitPath;
      remote || (remote = 'origin');
      branch || (branch = 'master');
      commands = [['init'], ['remote', 'add', remote, url], ['fetch', remote], ['pull', remote, branch], ['submodule', 'init'], ['submodule', 'update', '--recursive']];
      if (logger) {
        logger.log('debug', "Initializing git repo with url [" + url + "] on directory [" + path + "]");
      }
      balUtilModules.gitCommands(commands, {
        gitPath: gitPath,
        cwd: path,
        output: output
      }, function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (args[0] != null) {
          return next.apply(null, args);
        }
        if (logger) {
          logger.log('debug', "Initialized git repo with url [" + url + "] on directory [" + path + "]");
        }
        return next.apply(null, args);
      });
      return this;
    },
    initOrPullGitRepo: function(opts, next) {
      var branch,
          path,
          remote,
          _ref5,
          _this = this;
      _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
      path = opts.path, remote = opts.remote, branch = opts.branch;
      remote || (remote = 'origin');
      branch || (branch = 'master');
      safefs.ensurePath(path, function(err, exists) {
        if (err) {
          return complete(err);
        }
        if (exists) {
          opts.cwd = path;
          return balUtilModules.gitCommand(['pull', remote, branch], opts, next);
        } else {
          return balUtilModules.initGitRepo(opts, next);
        }
      });
      return this;
    },
    initNodeModules: function(opts, next) {
      var force,
          logger,
          nodeModulesPath,
          packageJsonPath,
          partTwo,
          path,
          pathUtil,
          _ref5;
      pathUtil = require("path");
      _ref5 = balUtilFlow.extractOptsAndCallback(opts, next), opts = _ref5[0], next = _ref5[1];
      path = opts.path, logger = opts.logger, force = opts.force;
      opts.cwd = path;
      packageJsonPath = pathUtil.join(path, 'package.json');
      nodeModulesPath = pathUtil.join(path, 'node_modules');
      partTwo = function() {
        return safefs.exists(packageJsonPath, function(exists) {
          var command;
          if (!exists) {
            return next();
          }
          command = ['install'];
          if (force) {
            command.push('--force');
          }
          if (logger) {
            logger.log('debug', "Initializing node modules\non:   " + dirPath + "\nwith:", command);
          }
          return balUtilModules.npmCommand(command, opts, function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            if (args[0] != null) {
              return next.apply(null, args);
            }
            if (logger) {
              logger.log('debug', "Initialized node modules\non:   " + dirPath + "\nwith:", command);
            }
            return next.apply(null, args);
          });
        });
      };
      if (force === false) {
        safefs.exists(nodeModulesPath, function(exists) {
          if (exists) {
            return next();
          }
          return partTwo();
        });
      } else {
        partTwo();
      }
      return this;
    }
  };
  module.exports = balUtilModules;
})(require("process"));
