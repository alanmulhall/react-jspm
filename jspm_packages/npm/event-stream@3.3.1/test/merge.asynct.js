/* */ 
var es = require("../index"),
    it = require("it-is").style('colour'),
    d = require("ubelt");
exports.merge = function(t) {
  var odd = d.map(1, 3, 100, d.id);
  var even = d.map(2, 4, 100, d.id);
  var r1 = es.readArray(even);
  var r2 = es.readArray(odd);
  var endCount = 0;
  var writer = es.writeArray(function(err, array) {
    if (err)
      throw err;
    it(array.sort()).deepEqual(even.concat(odd).sort());
    if (++endCount === 2)
      t.done();
  });
  var writer2 = es.writeArray(function(err, array) {
    if (err)
      throw err;
    it(array.sort()).deepEqual(even.concat(odd).sort());
    if (++endCount === 2)
      t.done();
  });
  es.merge(r1, r2).pipe(writer);
  es.merge([r1, r2]).pipe(writer2);
};
require("./helper/index")(module);
