/* */ 
(function(process) {
  var fs = require("fs"),
      path = require("path"),
      root = path.join(path.dirname(fs.realpathSync(__filename)), '..'),
      esprima = require("esprima"),
      escodegen = require("escodegen"),
      estraverse = require("estraverse"),
      optimist = require("optimist"),
      esmangle,
      common,
      argv,
      post,
      passes,
      multipleFilesSpecified;
  Error.stackTraceLimit = Infinity;
  esmangle = require(root);
  common = require(path.join(root, 'lib', 'common'));
  argv = optimist.usage("Usage: $0 file").describe('help', 'show help').boolean('source-map').describe('source-map', 'dump source-map').boolean('preserve-completion-value').describe('preserve-completion-value', 'preserve completion values if needed').boolean('preserve-license-comment').describe('preserve-license-comment', 'preserve comments with @license, @preserve. But these comment may be lost if attached node is transformed or a comment isn\'t attached to any statement.').boolean('propagate-license-comment-to-header').describe('propagate-license-comment-to-header', 'preserve comments with @license, @preserve. But these comment may be propagated to the script header.').string('o').alias('o', 'output').describe('o', 'output file').wrap(80).argv;
  multipleFilesSpecified = (argv.output && Array.isArray(argv.output) && argv.output.length > 1);
  if (argv.help || multipleFilesSpecified) {
    optimist.showHelp();
    if (multipleFilesSpecified) {
      console.error('multiple output files are specified');
    }
    if (argv.help) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  }
  if (argv['preserve-license-comment'] && argv['propagate-license-comment-to-header']) {
    console.error('cannot specify --preserve-license-comment and --propagate-license-comment-to-header both');
    process.exit(1);
  }
  function output(code) {
    if (argv.output) {
      fs.writeFileSync(argv.output, code);
    } else {
      console.log(code);
    }
  }
  function compile(content, filename) {
    var tree,
        licenses,
        generated,
        header,
        preserveLicenseComment,
        propagateLicenseComment;
    preserveLicenseComment = argv['preserve-license-comment'];
    propagateLicenseComment = argv['propagate-license-comment-to-header'];
    tree = esprima.parse(content, {
      loc: true,
      range: true,
      raw: true,
      tokens: true,
      comment: preserveLicenseComment || propagateLicenseComment
    });
    if (preserveLicenseComment || propagateLicenseComment) {
      licenses = tree.comments.filter(function(comment) {
        return /@(?:license|preserve)/i.test(comment.value);
      });
    }
    if (preserveLicenseComment) {
      estraverse.attachComments(tree, licenses, tree.tokens);
    }
    tree = esmangle.optimize(tree, null, {
      destructive: true,
      directive: true,
      preserveCompletionValue: argv['preserve-completion-value']
    });
    tree = esmangle.mangle(tree, {destructive: true});
    if (propagateLicenseComment) {
      tree.leadingComments = licenses;
    }
    formatOption = common.deepCopy(escodegen.FORMAT_MINIFY);
    formatOption.indent.adjustMultilineComment = true;
    return escodegen.generate(tree, {
      format: formatOption,
      sourceMap: argv['source-map'] && filename,
      directive: true,
      comment: preserveLicenseComment || propagateLicenseComment
    });
  }
  if (argv._.length === 0) {
    (function() {
      var code = '';
      process.stdin.on('data', function(data) {
        code += data;
      });
      process.stdin.on('end', function(err) {
        output(compile(code, 'stdin'));
      });
      process.stdin.resume();
    }());
  } else {
    argv._.forEach(function(filename) {
      var content,
          result;
      content = fs.readFileSync(filename, 'utf-8');
      result = compile(content, filename);
      output(result);
    });
  }
})(require("process"));
