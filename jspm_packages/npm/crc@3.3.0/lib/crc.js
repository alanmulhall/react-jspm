/* */ 
(function(Buffer) {
  var CRC,
      hex;
  hex = require("./hex");
  module.exports = CRC = (function() {
    CRC.prototype.INIT_CRC = 0x00;
    CRC.prototype.XOR_MASK = 0x00;
    CRC.prototype.WIDTH = 0;
    CRC.prototype.pack = function(crc) {
      return '';
    };
    CRC.prototype.each_byte = function(buf, cb) {
      var i,
          _i,
          _ref,
          _results;
      if (!Buffer.isBuffer(buf)) {
        buf = Buffer(buf);
      }
      _results = [];
      for (i = _i = 0, _ref = buf.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push(cb(buf[i]));
      }
      return _results;
    };
    function CRC() {
      this.crc = this.INIT_CRC;
    }
    CRC.prototype.digest_length = function() {
      return Math.ceil(this.WIDTH / 8.0);
    };
    CRC.prototype.update = function(data) {};
    CRC.prototype.reset = function() {
      return this.crc = this.INIT_CRC;
    };
    CRC.prototype.checksum = function(signed) {
      var sum;
      if (signed == null) {
        signed = true;
      }
      sum = this.crc ^ this.XOR_MASK;
      if (signed) {
        sum = sum >>> 0;
      }
      return sum;
    };
    CRC.prototype.finish = function() {
      return this.pack(this.checksum());
    };
    CRC.prototype.hexdigest = function(value) {
      var result;
      if (value != null) {
        this.update(value);
      }
      result = this.finish();
      this.reset();
      return result;
    };
    return CRC;
  })();
})(require("buffer").Buffer);
