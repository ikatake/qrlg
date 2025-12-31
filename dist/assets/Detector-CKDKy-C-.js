function fixProto(target, prototype) {
  var setPrototypeOf = Object.setPrototypeOf;
  setPrototypeOf ? setPrototypeOf(target, prototype) : target.__proto__ = prototype;
}
function fixStack(target, fn) {
  if (fn === void 0) {
    fn = target.constructor;
  }
  var captureStackTrace = Error.captureStackTrace;
  captureStackTrace && captureStackTrace(target, fn);
}
var __extends$b = /* @__PURE__ */ (function() {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) {
        if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var CustomError = (function(_super) {
  __extends$b(CustomError2, _super);
  function CustomError2(message, options) {
    var _newTarget = this.constructor;
    var _this = _super.call(this, message, options) || this;
    Object.defineProperty(_this, "name", {
      value: _newTarget.name,
      enumerable: false,
      configurable: true
    });
    fixProto(_this, _newTarget.prototype);
    fixStack(_this);
    return _this;
  }
  return CustomError2;
})(Error);
var __extends$a = /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var Exception = (
  /** @class */
  (function(_super) {
    __extends$a(Exception2, _super);
    function Exception2(message) {
      if (message === void 0) {
        message = void 0;
      }
      var _this = _super.call(this, message) || this;
      _this.message = message;
      return _this;
    }
    Exception2.prototype.getKind = function() {
      var ex = this.constructor;
      return ex.kind;
    };
    Exception2.kind = "Exception";
    return Exception2;
  })(CustomError)
);
var __extends$9 = /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var ArgumentException = (
  /** @class */
  (function(_super) {
    __extends$9(ArgumentException2, _super);
    function ArgumentException2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    ArgumentException2.kind = "ArgumentException";
    return ArgumentException2;
  })(Exception)
);
var __extends$8 = /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var IllegalArgumentException = (
  /** @class */
  (function(_super) {
    __extends$8(IllegalArgumentException2, _super);
    function IllegalArgumentException2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    IllegalArgumentException2.kind = "IllegalArgumentException";
    return IllegalArgumentException2;
  })(Exception)
);
var System = (
  /** @class */
  (function() {
    function System2() {
    }
    System2.arraycopy = function(src, srcPos, dest, destPos, length) {
      while (length--) {
        dest[destPos++] = src[srcPos++];
      }
    };
    System2.currentTimeMillis = function() {
      return Date.now();
    };
    return System2;
  })()
);
var __extends$7 = /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var IndexOutOfBoundsException = (
  /** @class */
  (function(_super) {
    __extends$7(IndexOutOfBoundsException2, _super);
    function IndexOutOfBoundsException2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexOutOfBoundsException2.kind = "IndexOutOfBoundsException";
    return IndexOutOfBoundsException2;
  })(Exception)
);
var __extends$6 = /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var ArrayIndexOutOfBoundsException = (
  /** @class */
  (function(_super) {
    __extends$6(ArrayIndexOutOfBoundsException2, _super);
    function ArrayIndexOutOfBoundsException2(index, message) {
      if (index === void 0) {
        index = void 0;
      }
      if (message === void 0) {
        message = void 0;
      }
      var _this = _super.call(this, message) || this;
      _this.index = index;
      _this.message = message;
      return _this;
    }
    ArrayIndexOutOfBoundsException2.kind = "ArrayIndexOutOfBoundsException";
    return ArrayIndexOutOfBoundsException2;
  })(IndexOutOfBoundsException)
);
var __values$6 = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Arrays = (
  /** @class */
  (function() {
    function Arrays2() {
    }
    Arrays2.fill = function(a, val) {
      for (var i = 0, len = a.length; i < len; i++)
        a[i] = val;
    };
    Arrays2.fillWithin = function(a, fromIndex, toIndex, val) {
      Arrays2.rangeCheck(a.length, fromIndex, toIndex);
      for (var i = fromIndex; i < toIndex; i++)
        a[i] = val;
    };
    Arrays2.rangeCheck = function(arrayLength, fromIndex, toIndex) {
      if (fromIndex > toIndex) {
        throw new IllegalArgumentException("fromIndex(" + fromIndex + ") > toIndex(" + toIndex + ")");
      }
      if (fromIndex < 0) {
        throw new ArrayIndexOutOfBoundsException(fromIndex);
      }
      if (toIndex > arrayLength) {
        throw new ArrayIndexOutOfBoundsException(toIndex);
      }
    };
    Arrays2.asList = function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return args;
    };
    Arrays2.create = function(rows, cols, value) {
      var arr = Array.from({ length: rows });
      return arr.map(function(x) {
        return Array.from({ length: cols }).fill(value);
      });
    };
    Arrays2.createInt32Array = function(rows, cols, value) {
      var arr = Array.from({ length: rows });
      return arr.map(function(x) {
        return Int32Array.from({ length: cols }).fill(value);
      });
    };
    Arrays2.equals = function(first, second) {
      if (!first) {
        return false;
      }
      if (!second) {
        return false;
      }
      if (!first.length) {
        return false;
      }
      if (!second.length) {
        return false;
      }
      if (first.length !== second.length) {
        return false;
      }
      for (var i = 0, length_1 = first.length; i < length_1; i++) {
        if (first[i] !== second[i]) {
          return false;
        }
      }
      return true;
    };
    Arrays2.hashCode = function(a) {
      var e_1, _a;
      if (a === null) {
        return 0;
      }
      var result = 1;
      try {
        for (var a_1 = __values$6(a), a_1_1 = a_1.next(); !a_1_1.done; a_1_1 = a_1.next()) {
          var element = a_1_1.value;
          result = 31 * result + element;
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (a_1_1 && !a_1_1.done && (_a = a_1.return)) _a.call(a_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return result;
    };
    Arrays2.fillUint8Array = function(a, value) {
      for (var i = 0; i !== a.length; i++) {
        a[i] = value;
      }
    };
    Arrays2.copyOf = function(original, newLength) {
      return original.slice(0, newLength);
    };
    Arrays2.copyOfUint8Array = function(original, newLength) {
      if (original.length <= newLength) {
        var newArray = new Uint8Array(newLength);
        newArray.set(original);
        return newArray;
      }
      return original.slice(0, newLength);
    };
    Arrays2.copyOfRange = function(original, from, to) {
      var newLength = to - from;
      var copy = new Int32Array(newLength);
      System.arraycopy(original, from, copy, 0, newLength);
      return copy;
    };
    Arrays2.binarySearch = function(ar, el, comparator) {
      if (void 0 === comparator) {
        comparator = Arrays2.numberComparator;
      }
      var m = 0;
      var n = ar.length - 1;
      while (m <= n) {
        var k = n + m >> 1;
        var cmp = comparator(el, ar[k]);
        if (cmp > 0) {
          m = k + 1;
        } else if (cmp < 0) {
          n = k - 1;
        } else {
          return k;
        }
      }
      return -m - 1;
    };
    Arrays2.numberComparator = function(a, b) {
      return a - b;
    };
    return Arrays2;
  })()
);
var Integer = (
  /** @class */
  (function() {
    function Integer2() {
    }
    Integer2.numberOfTrailingZeros = function(i) {
      var y;
      if (i === 0)
        return 32;
      var n = 31;
      y = i << 16;
      if (y !== 0) {
        n -= 16;
        i = y;
      }
      y = i << 8;
      if (y !== 0) {
        n -= 8;
        i = y;
      }
      y = i << 4;
      if (y !== 0) {
        n -= 4;
        i = y;
      }
      y = i << 2;
      if (y !== 0) {
        n -= 2;
        i = y;
      }
      return n - (i << 1 >>> 31);
    };
    Integer2.numberOfLeadingZeros = function(i) {
      if (i === 0) {
        return 32;
      }
      var n = 1;
      if (i >>> 16 === 0) {
        n += 16;
        i <<= 16;
      }
      if (i >>> 24 === 0) {
        n += 8;
        i <<= 8;
      }
      if (i >>> 28 === 0) {
        n += 4;
        i <<= 4;
      }
      if (i >>> 30 === 0) {
        n += 2;
        i <<= 2;
      }
      n -= i >>> 31;
      return n;
    };
    Integer2.toHexString = function(i) {
      return i.toString(16);
    };
    Integer2.toBinaryString = function(intNumber) {
      return String(parseInt(String(intNumber), 2));
    };
    Integer2.bitCount = function(i) {
      i = i - (i >>> 1 & 1431655765);
      i = (i & 858993459) + (i >>> 2 & 858993459);
      i = i + (i >>> 4) & 252645135;
      i = i + (i >>> 8);
      i = i + (i >>> 16);
      return i & 63;
    };
    Integer2.truncDivision = function(dividend, divisor) {
      return Math.trunc(dividend / divisor);
    };
    Integer2.parseInt = function(num, radix) {
      if (radix === void 0) {
        radix = void 0;
      }
      return parseInt(num, radix);
    };
    Integer2.MIN_VALUE_32_BITS = -2147483648;
    Integer2.MAX_VALUE = Number.MAX_SAFE_INTEGER;
    return Integer2;
  })()
);
var BitArray = (
  /** @class */
  (function() {
    function BitArray2(size, bits) {
      if (void 0 === size) {
        this.size = 0;
        this.bits = new Int32Array(1);
      } else {
        this.size = size;
        if (void 0 === bits || null === bits) {
          this.bits = BitArray2.makeArray(size);
        } else {
          this.bits = bits;
        }
      }
    }
    BitArray2.prototype.getSize = function() {
      return this.size;
    };
    BitArray2.prototype.getSizeInBytes = function() {
      return Math.floor((this.size + 7) / 8);
    };
    BitArray2.prototype.ensureCapacity = function(size) {
      if (size > this.bits.length * 32) {
        var newBits = BitArray2.makeArray(size);
        System.arraycopy(this.bits, 0, newBits, 0, this.bits.length);
        this.bits = newBits;
      }
    };
    BitArray2.prototype.get = function(i) {
      return (this.bits[Math.floor(i / 32)] & 1 << (i & 31)) !== 0;
    };
    BitArray2.prototype.set = function(i) {
      this.bits[Math.floor(i / 32)] |= 1 << (i & 31);
    };
    BitArray2.prototype.flip = function(i) {
      this.bits[Math.floor(i / 32)] ^= 1 << (i & 31);
    };
    BitArray2.prototype.getNextSet = function(from) {
      var size = this.size;
      if (from >= size) {
        return size;
      }
      var bits = this.bits;
      var bitsOffset = Math.floor(from / 32);
      var currentBits = bits[bitsOffset];
      currentBits &= ~((1 << (from & 31)) - 1);
      var length = bits.length;
      while (currentBits === 0) {
        if (++bitsOffset === length) {
          return size;
        }
        currentBits = bits[bitsOffset];
      }
      var result = bitsOffset * 32 + Integer.numberOfTrailingZeros(currentBits);
      return result > size ? size : result;
    };
    BitArray2.prototype.getNextUnset = function(from) {
      var size = this.size;
      if (from >= size) {
        return size;
      }
      var bits = this.bits;
      var bitsOffset = Math.floor(from / 32);
      var currentBits = ~bits[bitsOffset];
      currentBits &= ~((1 << (from & 31)) - 1);
      var length = bits.length;
      while (currentBits === 0) {
        if (++bitsOffset === length) {
          return size;
        }
        currentBits = ~bits[bitsOffset];
      }
      var result = bitsOffset * 32 + Integer.numberOfTrailingZeros(currentBits);
      return result > size ? size : result;
    };
    BitArray2.prototype.setBulk = function(i, newBits) {
      this.bits[Math.floor(i / 32)] = newBits;
    };
    BitArray2.prototype.setRange = function(start, end) {
      if (end < start || start < 0 || end > this.size) {
        throw new IllegalArgumentException();
      }
      if (end === start) {
        return;
      }
      end--;
      var firstInt = Math.floor(start / 32);
      var lastInt = Math.floor(end / 32);
      var bits = this.bits;
      for (var i = firstInt; i <= lastInt; i++) {
        var firstBit = i > firstInt ? 0 : start & 31;
        var lastBit = i < lastInt ? 31 : end & 31;
        var mask = (2 << lastBit) - (1 << firstBit);
        bits[i] |= mask;
      }
    };
    BitArray2.prototype.clear = function() {
      var max = this.bits.length;
      var bits = this.bits;
      for (var i = 0; i < max; i++) {
        bits[i] = 0;
      }
    };
    BitArray2.prototype.isRange = function(start, end, value) {
      if (end < start || start < 0 || end > this.size) {
        throw new IllegalArgumentException();
      }
      if (end === start) {
        return true;
      }
      end--;
      var firstInt = Math.floor(start / 32);
      var lastInt = Math.floor(end / 32);
      var bits = this.bits;
      for (var i = firstInt; i <= lastInt; i++) {
        var firstBit = i > firstInt ? 0 : start & 31;
        var lastBit = i < lastInt ? 31 : end & 31;
        var mask = (2 << lastBit) - (1 << firstBit) & 4294967295;
        if ((bits[i] & mask) !== (value ? mask : 0)) {
          return false;
        }
      }
      return true;
    };
    BitArray2.prototype.appendBit = function(bit) {
      this.ensureCapacity(this.size + 1);
      if (bit) {
        this.bits[Math.floor(this.size / 32)] |= 1 << (this.size & 31);
      }
      this.size++;
    };
    BitArray2.prototype.appendBits = function(value, numBits) {
      if (numBits < 0 || numBits > 32) {
        throw new IllegalArgumentException("Num bits must be between 0 and 32");
      }
      this.ensureCapacity(this.size + numBits);
      for (var numBitsLeft = numBits; numBitsLeft > 0; numBitsLeft--) {
        this.appendBit((value >> numBitsLeft - 1 & 1) === 1);
      }
    };
    BitArray2.prototype.appendBitArray = function(other) {
      var otherSize = other.size;
      this.ensureCapacity(this.size + otherSize);
      for (var i = 0; i < otherSize; i++) {
        this.appendBit(other.get(i));
      }
    };
    BitArray2.prototype.xor = function(other) {
      if (this.size !== other.size) {
        throw new IllegalArgumentException("Sizes don't match");
      }
      var bits = this.bits;
      for (var i = 0, length_1 = bits.length; i < length_1; i++) {
        bits[i] ^= other.bits[i];
      }
    };
    BitArray2.prototype.toBytes = function(bitOffset, array, offset, numBytes) {
      for (var i = 0; i < numBytes; i++) {
        var theByte = 0;
        for (var j = 0; j < 8; j++) {
          if (this.get(bitOffset)) {
            theByte |= 1 << 7 - j;
          }
          bitOffset++;
        }
        array[offset + i] = /*(byte)*/
        theByte;
      }
    };
    BitArray2.prototype.getBitArray = function() {
      return this.bits;
    };
    BitArray2.prototype.reverse = function() {
      var newBits = new Int32Array(this.bits.length);
      var len = Math.floor((this.size - 1) / 32);
      var oldBitsLen = len + 1;
      var bits = this.bits;
      for (var i = 0; i < oldBitsLen; i++) {
        var x = bits[i];
        x = x >> 1 & 1431655765 | (x & 1431655765) << 1;
        x = x >> 2 & 858993459 | (x & 858993459) << 2;
        x = x >> 4 & 252645135 | (x & 252645135) << 4;
        x = x >> 8 & 16711935 | (x & 16711935) << 8;
        x = x >> 16 & 65535 | (x & 65535) << 16;
        newBits[len - i] = /*(int)*/
        x;
      }
      if (this.size !== oldBitsLen * 32) {
        var leftOffset = oldBitsLen * 32 - this.size;
        var currentInt = newBits[0] >>> leftOffset;
        for (var i = 1; i < oldBitsLen; i++) {
          var nextInt = newBits[i];
          currentInt |= nextInt << 32 - leftOffset;
          newBits[i - 1] = currentInt;
          currentInt = nextInt >>> leftOffset;
        }
        newBits[oldBitsLen - 1] = currentInt;
      }
      this.bits = newBits;
    };
    BitArray2.makeArray = function(size) {
      return new Int32Array(Math.floor((size + 31) / 32));
    };
    BitArray2.prototype.equals = function(o) {
      if (!(o instanceof BitArray2)) {
        return false;
      }
      var other = o;
      return this.size === other.size && Arrays.equals(this.bits, other.bits);
    };
    BitArray2.prototype.hashCode = function() {
      return 31 * this.size + Arrays.hashCode(this.bits);
    };
    BitArray2.prototype.toString = function() {
      var result = "";
      for (var i = 0, size = this.size; i < size; i++) {
        if ((i & 7) === 0) {
          result += " ";
        }
        result += this.get(i) ? "X" : ".";
      }
      return result;
    };
    BitArray2.prototype.clone = function() {
      return new BitArray2(this.size, this.bits.slice());
    };
    BitArray2.prototype.toArray = function() {
      var result = [];
      for (var i = 0, size = this.size; i < size; i++) {
        result.push(this.get(i));
      }
      return result;
    };
    return BitArray2;
  })()
);
var DecodeHintType;
(function(DecodeHintType2) {
  DecodeHintType2[DecodeHintType2["OTHER"] = 0] = "OTHER";
  DecodeHintType2[DecodeHintType2["PURE_BARCODE"] = 1] = "PURE_BARCODE";
  DecodeHintType2[DecodeHintType2["POSSIBLE_FORMATS"] = 2] = "POSSIBLE_FORMATS";
  DecodeHintType2[DecodeHintType2["TRY_HARDER"] = 3] = "TRY_HARDER";
  DecodeHintType2[DecodeHintType2["CHARACTER_SET"] = 4] = "CHARACTER_SET";
  DecodeHintType2[DecodeHintType2["ALLOWED_LENGTHS"] = 5] = "ALLOWED_LENGTHS";
  DecodeHintType2[DecodeHintType2["ASSUME_CODE_39_CHECK_DIGIT"] = 6] = "ASSUME_CODE_39_CHECK_DIGIT";
  DecodeHintType2[DecodeHintType2["ENABLE_CODE_39_EXTENDED_MODE"] = 7] = "ENABLE_CODE_39_EXTENDED_MODE";
  DecodeHintType2[DecodeHintType2["ASSUME_GS1"] = 8] = "ASSUME_GS1";
  DecodeHintType2[DecodeHintType2["RETURN_CODABAR_START_END"] = 9] = "RETURN_CODABAR_START_END";
  DecodeHintType2[DecodeHintType2["NEED_RESULT_POINT_CALLBACK"] = 10] = "NEED_RESULT_POINT_CALLBACK";
  DecodeHintType2[DecodeHintType2["ALLOWED_EAN_EXTENSIONS"] = 11] = "ALLOWED_EAN_EXTENSIONS";
})(DecodeHintType || (DecodeHintType = {}));
const DecodeHintType$1 = DecodeHintType;
var __extends$5 = /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var FormatException = (
  /** @class */
  (function(_super) {
    __extends$5(FormatException2, _super);
    function FormatException2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    FormatException2.getFormatInstance = function() {
      return new FormatException2();
    };
    FormatException2.kind = "FormatException";
    return FormatException2;
  })(Exception)
);
var __values$5 = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var CharacterSetValueIdentifiers;
(function(CharacterSetValueIdentifiers2) {
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["Cp437"] = 0] = "Cp437";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_1"] = 1] = "ISO8859_1";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_2"] = 2] = "ISO8859_2";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_3"] = 3] = "ISO8859_3";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_4"] = 4] = "ISO8859_4";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_5"] = 5] = "ISO8859_5";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_6"] = 6] = "ISO8859_6";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_7"] = 7] = "ISO8859_7";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_8"] = 8] = "ISO8859_8";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_9"] = 9] = "ISO8859_9";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_10"] = 10] = "ISO8859_10";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_11"] = 11] = "ISO8859_11";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_13"] = 12] = "ISO8859_13";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_14"] = 13] = "ISO8859_14";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_15"] = 14] = "ISO8859_15";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ISO8859_16"] = 15] = "ISO8859_16";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["SJIS"] = 16] = "SJIS";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["Cp1250"] = 17] = "Cp1250";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["Cp1251"] = 18] = "Cp1251";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["Cp1252"] = 19] = "Cp1252";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["Cp1256"] = 20] = "Cp1256";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["UnicodeBigUnmarked"] = 21] = "UnicodeBigUnmarked";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["UTF8"] = 22] = "UTF8";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["ASCII"] = 23] = "ASCII";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["Big5"] = 24] = "Big5";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["GB18030"] = 25] = "GB18030";
  CharacterSetValueIdentifiers2[CharacterSetValueIdentifiers2["EUC_KR"] = 26] = "EUC_KR";
})(CharacterSetValueIdentifiers || (CharacterSetValueIdentifiers = {}));
var CharacterSetECI = (
  /** @class */
  (function() {
    function CharacterSetECI2(valueIdentifier, valuesParam, name) {
      var e_1, _a;
      var otherEncodingNames = [];
      for (var _i = 3; _i < arguments.length; _i++) {
        otherEncodingNames[_i - 3] = arguments[_i];
      }
      this.valueIdentifier = valueIdentifier;
      this.name = name;
      if (typeof valuesParam === "number") {
        this.values = Int32Array.from([valuesParam]);
      } else {
        this.values = valuesParam;
      }
      this.otherEncodingNames = otherEncodingNames;
      CharacterSetECI2.VALUE_IDENTIFIER_TO_ECI.set(valueIdentifier, this);
      CharacterSetECI2.NAME_TO_ECI.set(name, this);
      var values = this.values;
      for (var i = 0, length_1 = values.length; i !== length_1; i++) {
        var v = values[i];
        CharacterSetECI2.VALUES_TO_ECI.set(v, this);
      }
      try {
        for (var otherEncodingNames_1 = __values$5(otherEncodingNames), otherEncodingNames_1_1 = otherEncodingNames_1.next(); !otherEncodingNames_1_1.done; otherEncodingNames_1_1 = otherEncodingNames_1.next()) {
          var otherName = otherEncodingNames_1_1.value;
          CharacterSetECI2.NAME_TO_ECI.set(otherName, this);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (otherEncodingNames_1_1 && !otherEncodingNames_1_1.done && (_a = otherEncodingNames_1.return)) _a.call(otherEncodingNames_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }
    CharacterSetECI2.prototype.getValueIdentifier = function() {
      return this.valueIdentifier;
    };
    CharacterSetECI2.prototype.getName = function() {
      return this.name;
    };
    CharacterSetECI2.prototype.getValue = function() {
      return this.values[0];
    };
    CharacterSetECI2.getCharacterSetECIByValue = function(value) {
      if (value < 0 || value >= 900) {
        throw new FormatException("incorect value");
      }
      var characterSet = CharacterSetECI2.VALUES_TO_ECI.get(value);
      if (void 0 === characterSet) {
        throw new FormatException("incorect value");
      }
      return characterSet;
    };
    CharacterSetECI2.getCharacterSetECIByName = function(name) {
      var characterSet = CharacterSetECI2.NAME_TO_ECI.get(name);
      if (void 0 === characterSet) {
        throw new FormatException("incorect value");
      }
      return characterSet;
    };
    CharacterSetECI2.prototype.equals = function(o) {
      if (!(o instanceof CharacterSetECI2)) {
        return false;
      }
      var other = o;
      return this.getName() === other.getName();
    };
    CharacterSetECI2.VALUE_IDENTIFIER_TO_ECI = /* @__PURE__ */ new Map();
    CharacterSetECI2.VALUES_TO_ECI = /* @__PURE__ */ new Map();
    CharacterSetECI2.NAME_TO_ECI = /* @__PURE__ */ new Map();
    CharacterSetECI2.Cp437 = new CharacterSetECI2(CharacterSetValueIdentifiers.Cp437, Int32Array.from([0, 2]), "Cp437");
    CharacterSetECI2.ISO8859_1 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_1, Int32Array.from([1, 3]), "ISO-8859-1", "ISO88591", "ISO8859_1");
    CharacterSetECI2.ISO8859_2 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_2, 4, "ISO-8859-2", "ISO88592", "ISO8859_2");
    CharacterSetECI2.ISO8859_3 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_3, 5, "ISO-8859-3", "ISO88593", "ISO8859_3");
    CharacterSetECI2.ISO8859_4 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_4, 6, "ISO-8859-4", "ISO88594", "ISO8859_4");
    CharacterSetECI2.ISO8859_5 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_5, 7, "ISO-8859-5", "ISO88595", "ISO8859_5");
    CharacterSetECI2.ISO8859_6 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_6, 8, "ISO-8859-6", "ISO88596", "ISO8859_6");
    CharacterSetECI2.ISO8859_7 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_7, 9, "ISO-8859-7", "ISO88597", "ISO8859_7");
    CharacterSetECI2.ISO8859_8 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_8, 10, "ISO-8859-8", "ISO88598", "ISO8859_8");
    CharacterSetECI2.ISO8859_9 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_9, 11, "ISO-8859-9", "ISO88599", "ISO8859_9");
    CharacterSetECI2.ISO8859_10 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_10, 12, "ISO-8859-10", "ISO885910", "ISO8859_10");
    CharacterSetECI2.ISO8859_11 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_11, 13, "ISO-8859-11", "ISO885911", "ISO8859_11");
    CharacterSetECI2.ISO8859_13 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_13, 15, "ISO-8859-13", "ISO885913", "ISO8859_13");
    CharacterSetECI2.ISO8859_14 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_14, 16, "ISO-8859-14", "ISO885914", "ISO8859_14");
    CharacterSetECI2.ISO8859_15 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_15, 17, "ISO-8859-15", "ISO885915", "ISO8859_15");
    CharacterSetECI2.ISO8859_16 = new CharacterSetECI2(CharacterSetValueIdentifiers.ISO8859_16, 18, "ISO-8859-16", "ISO885916", "ISO8859_16");
    CharacterSetECI2.SJIS = new CharacterSetECI2(CharacterSetValueIdentifiers.SJIS, 20, "SJIS", "Shift_JIS");
    CharacterSetECI2.Cp1250 = new CharacterSetECI2(CharacterSetValueIdentifiers.Cp1250, 21, "Cp1250", "windows-1250");
    CharacterSetECI2.Cp1251 = new CharacterSetECI2(CharacterSetValueIdentifiers.Cp1251, 22, "Cp1251", "windows-1251");
    CharacterSetECI2.Cp1252 = new CharacterSetECI2(CharacterSetValueIdentifiers.Cp1252, 23, "Cp1252", "windows-1252");
    CharacterSetECI2.Cp1256 = new CharacterSetECI2(CharacterSetValueIdentifiers.Cp1256, 24, "Cp1256", "windows-1256");
    CharacterSetECI2.UnicodeBigUnmarked = new CharacterSetECI2(CharacterSetValueIdentifiers.UnicodeBigUnmarked, 25, "UnicodeBigUnmarked", "UTF-16BE", "UnicodeBig");
    CharacterSetECI2.UTF8 = new CharacterSetECI2(CharacterSetValueIdentifiers.UTF8, 26, "UTF8", "UTF-8");
    CharacterSetECI2.ASCII = new CharacterSetECI2(CharacterSetValueIdentifiers.ASCII, Int32Array.from([27, 170]), "ASCII", "US-ASCII");
    CharacterSetECI2.Big5 = new CharacterSetECI2(CharacterSetValueIdentifiers.Big5, 28, "Big5");
    CharacterSetECI2.GB18030 = new CharacterSetECI2(CharacterSetValueIdentifiers.GB18030, 29, "GB18030", "GB2312", "EUC_CN", "GBK");
    CharacterSetECI2.EUC_KR = new CharacterSetECI2(CharacterSetValueIdentifiers.EUC_KR, 30, "EUC_KR", "EUC-KR");
    return CharacterSetECI2;
  })()
);
var __extends$4 = /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var UnsupportedOperationException = (
  /** @class */
  (function(_super) {
    __extends$4(UnsupportedOperationException2, _super);
    function UnsupportedOperationException2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    UnsupportedOperationException2.kind = "UnsupportedOperationException";
    return UnsupportedOperationException2;
  })(Exception)
);
var StringEncoding = (
  /** @class */
  (function() {
    function StringEncoding2() {
    }
    StringEncoding2.decode = function(bytes, encoding) {
      var encodingName = this.encodingName(encoding);
      if (this.customDecoder) {
        return this.customDecoder(bytes, encodingName);
      }
      if (typeof TextDecoder === "undefined" || this.shouldDecodeOnFallback(encodingName)) {
        return this.decodeFallback(bytes, encodingName);
      }
      return new TextDecoder(encodingName).decode(bytes);
    };
    StringEncoding2.shouldDecodeOnFallback = function(encodingName) {
      return !StringEncoding2.isBrowser() && encodingName === "ISO-8859-1";
    };
    StringEncoding2.encode = function(s, encoding) {
      var encodingName = this.encodingName(encoding);
      if (this.customEncoder) {
        return this.customEncoder(s, encodingName);
      }
      if (typeof TextEncoder === "undefined") {
        return this.encodeFallback(s);
      }
      return new TextEncoder().encode(s);
    };
    StringEncoding2.isBrowser = function() {
      return typeof window !== "undefined" && {}.toString.call(window) === "[object Window]";
    };
    StringEncoding2.encodingName = function(encoding) {
      return typeof encoding === "string" ? encoding : encoding.getName();
    };
    StringEncoding2.encodingCharacterSet = function(encoding) {
      if (encoding instanceof CharacterSetECI) {
        return encoding;
      }
      return CharacterSetECI.getCharacterSetECIByName(encoding);
    };
    StringEncoding2.decodeFallback = function(bytes, encoding) {
      var characterSet = this.encodingCharacterSet(encoding);
      if (StringEncoding2.isDecodeFallbackSupported(characterSet)) {
        var s = "";
        for (var i = 0, length_1 = bytes.length; i < length_1; i++) {
          var h = bytes[i].toString(16);
          if (h.length < 2) {
            h = "0" + h;
          }
          s += "%" + h;
        }
        return decodeURIComponent(s);
      }
      if (characterSet.equals(CharacterSetECI.UnicodeBigUnmarked)) {
        return String.fromCharCode.apply(null, new Uint16Array(bytes.buffer));
      }
      throw new UnsupportedOperationException("Encoding " + this.encodingName(encoding) + " not supported by fallback.");
    };
    StringEncoding2.isDecodeFallbackSupported = function(characterSet) {
      return characterSet.equals(CharacterSetECI.UTF8) || characterSet.equals(CharacterSetECI.ISO8859_1) || characterSet.equals(CharacterSetECI.ASCII);
    };
    StringEncoding2.encodeFallback = function(s) {
      var encodedURIstring = btoa(unescape(encodeURIComponent(s)));
      var charList = encodedURIstring.split("");
      var uintArray = [];
      for (var i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
      }
      return new Uint8Array(uintArray);
    };
    return StringEncoding2;
  })()
);
var StringUtils = (
  /** @class */
  (function() {
    function StringUtils2() {
    }
    StringUtils2.castAsNonUtf8Char = function(code, encoding) {
      if (encoding === void 0) {
        encoding = null;
      }
      var e = encoding ? encoding.getName() : this.ISO88591;
      return StringEncoding.decode(new Uint8Array([code]), e);
    };
    StringUtils2.guessEncoding = function(bytes, hints) {
      if (hints !== null && hints !== void 0 && void 0 !== hints.get(DecodeHintType$1.CHARACTER_SET)) {
        return hints.get(DecodeHintType$1.CHARACTER_SET).toString();
      }
      var length = bytes.length;
      var canBeISO88591 = true;
      var canBeShiftJIS = true;
      var canBeUTF8 = true;
      var utf8BytesLeft = 0;
      var utf2BytesChars = 0;
      var utf3BytesChars = 0;
      var utf4BytesChars = 0;
      var sjisBytesLeft = 0;
      var sjisKatakanaChars = 0;
      var sjisCurKatakanaWordLength = 0;
      var sjisCurDoubleBytesWordLength = 0;
      var sjisMaxKatakanaWordLength = 0;
      var sjisMaxDoubleBytesWordLength = 0;
      var isoHighOther = 0;
      var utf8bom = bytes.length > 3 && bytes[0] === /*(byte) */
      239 && bytes[1] === /*(byte) */
      187 && bytes[2] === /*(byte) */
      191;
      for (var i = 0; i < length && (canBeISO88591 || canBeShiftJIS || canBeUTF8); i++) {
        var value = bytes[i] & 255;
        if (canBeUTF8) {
          if (utf8BytesLeft > 0) {
            if ((value & 128) === 0) {
              canBeUTF8 = false;
            } else {
              utf8BytesLeft--;
            }
          } else if ((value & 128) !== 0) {
            if ((value & 64) === 0) {
              canBeUTF8 = false;
            } else {
              utf8BytesLeft++;
              if ((value & 32) === 0) {
                utf2BytesChars++;
              } else {
                utf8BytesLeft++;
                if ((value & 16) === 0) {
                  utf3BytesChars++;
                } else {
                  utf8BytesLeft++;
                  if ((value & 8) === 0) {
                    utf4BytesChars++;
                  } else {
                    canBeUTF8 = false;
                  }
                }
              }
            }
          }
        }
        if (canBeISO88591) {
          if (value > 127 && value < 160) {
            canBeISO88591 = false;
          } else if (value > 159) {
            if (value < 192 || value === 215 || value === 247) {
              isoHighOther++;
            }
          }
        }
        if (canBeShiftJIS) {
          if (sjisBytesLeft > 0) {
            if (value < 64 || value === 127 || value > 252) {
              canBeShiftJIS = false;
            } else {
              sjisBytesLeft--;
            }
          } else if (value === 128 || value === 160 || value > 239) {
            canBeShiftJIS = false;
          } else if (value > 160 && value < 224) {
            sjisKatakanaChars++;
            sjisCurDoubleBytesWordLength = 0;
            sjisCurKatakanaWordLength++;
            if (sjisCurKatakanaWordLength > sjisMaxKatakanaWordLength) {
              sjisMaxKatakanaWordLength = sjisCurKatakanaWordLength;
            }
          } else if (value > 127) {
            sjisBytesLeft++;
            sjisCurKatakanaWordLength = 0;
            sjisCurDoubleBytesWordLength++;
            if (sjisCurDoubleBytesWordLength > sjisMaxDoubleBytesWordLength) {
              sjisMaxDoubleBytesWordLength = sjisCurDoubleBytesWordLength;
            }
          } else {
            sjisCurKatakanaWordLength = 0;
            sjisCurDoubleBytesWordLength = 0;
          }
        }
      }
      if (canBeUTF8 && utf8BytesLeft > 0) {
        canBeUTF8 = false;
      }
      if (canBeShiftJIS && sjisBytesLeft > 0) {
        canBeShiftJIS = false;
      }
      if (canBeUTF8 && (utf8bom || utf2BytesChars + utf3BytesChars + utf4BytesChars > 0)) {
        return StringUtils2.UTF8;
      }
      if (canBeShiftJIS && (StringUtils2.ASSUME_SHIFT_JIS || sjisMaxKatakanaWordLength >= 3 || sjisMaxDoubleBytesWordLength >= 3)) {
        return StringUtils2.SHIFT_JIS;
      }
      if (canBeISO88591 && canBeShiftJIS) {
        return sjisMaxKatakanaWordLength === 2 && sjisKatakanaChars === 2 || isoHighOther * 10 >= length ? StringUtils2.SHIFT_JIS : StringUtils2.ISO88591;
      }
      if (canBeISO88591) {
        return StringUtils2.ISO88591;
      }
      if (canBeShiftJIS) {
        return StringUtils2.SHIFT_JIS;
      }
      if (canBeUTF8) {
        return StringUtils2.UTF8;
      }
      return StringUtils2.PLATFORM_DEFAULT_ENCODING;
    };
    StringUtils2.format = function(append) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      var i = -1;
      function callback(exp, p0, p1, p2, p3, p4) {
        if (exp === "%%")
          return "%";
        if (args[++i] === void 0)
          return void 0;
        exp = p2 ? parseInt(p2.substr(1)) : void 0;
        var base = p3 ? parseInt(p3.substr(1)) : void 0;
        var val;
        switch (p4) {
          case "s":
            val = args[i];
            break;
          case "c":
            val = args[i][0];
            break;
          case "f":
            val = parseFloat(args[i]).toFixed(exp);
            break;
          case "p":
            val = parseFloat(args[i]).toPrecision(exp);
            break;
          case "e":
            val = parseFloat(args[i]).toExponential(exp);
            break;
          case "x":
            val = parseInt(args[i]).toString(base ? base : 16);
            break;
          case "d":
            val = parseFloat(parseInt(args[i], base ? base : 10).toPrecision(exp)).toFixed(0);
            break;
        }
        val = typeof val === "object" ? JSON.stringify(val) : (+val).toString(base);
        var size = parseInt(p1);
        var ch = p1 && p1[0] + "" === "0" ? "0" : " ";
        while (val.length < size)
          val = p0 !== void 0 ? val + ch : ch + val;
        return val;
      }
      var regex = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd%])/g;
      return append.replace(regex, callback);
    };
    StringUtils2.getBytes = function(str, encoding) {
      return StringEncoding.encode(str, encoding);
    };
    StringUtils2.getCharCode = function(str, index) {
      if (index === void 0) {
        index = 0;
      }
      return str.charCodeAt(index);
    };
    StringUtils2.getCharAt = function(charCode) {
      return String.fromCharCode(charCode);
    };
    StringUtils2.SHIFT_JIS = CharacterSetECI.SJIS.getName();
    StringUtils2.GB2312 = "GB2312";
    StringUtils2.ISO88591 = CharacterSetECI.ISO8859_1.getName();
    StringUtils2.EUC_JP = "EUC_JP";
    StringUtils2.UTF8 = CharacterSetECI.UTF8.getName();
    StringUtils2.PLATFORM_DEFAULT_ENCODING = StringUtils2.UTF8;
    StringUtils2.ASSUME_SHIFT_JIS = false;
    return StringUtils2;
  })()
);
var StringBuilder = (
  /** @class */
  (function() {
    function StringBuilder2(value) {
      if (value === void 0) {
        value = "";
      }
      this.value = value;
    }
    StringBuilder2.prototype.enableDecoding = function(encoding) {
      this.encoding = encoding;
      return this;
    };
    StringBuilder2.prototype.append = function(s) {
      if (typeof s === "string") {
        this.value += s.toString();
      } else if (this.encoding) {
        this.value += StringUtils.castAsNonUtf8Char(s, this.encoding);
      } else {
        this.value += String.fromCharCode(s);
      }
      return this;
    };
    StringBuilder2.prototype.appendChars = function(str, offset, len) {
      for (var i = offset; offset < offset + len; i++) {
        this.append(str[i]);
      }
      return this;
    };
    StringBuilder2.prototype.length = function() {
      return this.value.length;
    };
    StringBuilder2.prototype.charAt = function(n) {
      return this.value.charAt(n);
    };
    StringBuilder2.prototype.deleteCharAt = function(n) {
      this.value = this.value.substr(0, n) + this.value.substring(n + 1);
    };
    StringBuilder2.prototype.setCharAt = function(n, c) {
      this.value = this.value.substr(0, n) + c + this.value.substr(n + 1);
    };
    StringBuilder2.prototype.substring = function(start, end) {
      return this.value.substring(start, end);
    };
    StringBuilder2.prototype.setLengthToZero = function() {
      this.value = "";
    };
    StringBuilder2.prototype.toString = function() {
      return this.value;
    };
    StringBuilder2.prototype.insert = function(n, c) {
      this.value = this.value.substring(0, n) + c + this.value.substring(n);
    };
    return StringBuilder2;
  })()
);
var BitMatrix = (
  /** @class */
  (function() {
    function BitMatrix2(width, height, rowSize, bits) {
      this.width = width;
      this.height = height;
      this.rowSize = rowSize;
      this.bits = bits;
      if (void 0 === height || null === height) {
        height = width;
      }
      this.height = height;
      if (width < 1 || height < 1) {
        throw new IllegalArgumentException("Both dimensions must be greater than 0");
      }
      if (void 0 === rowSize || null === rowSize) {
        rowSize = Math.floor((width + 31) / 32);
      }
      this.rowSize = rowSize;
      if (void 0 === bits || null === bits) {
        this.bits = new Int32Array(this.rowSize * this.height);
      }
    }
    BitMatrix2.parseFromBooleanArray = function(image) {
      var height = image.length;
      var width = image[0].length;
      var bits = new BitMatrix2(width, height);
      for (var i = 0; i < height; i++) {
        var imageI = image[i];
        for (var j = 0; j < width; j++) {
          if (imageI[j]) {
            bits.set(j, i);
          }
        }
      }
      return bits;
    };
    BitMatrix2.parseFromString = function(stringRepresentation, setString, unsetString) {
      if (stringRepresentation === null) {
        throw new IllegalArgumentException("stringRepresentation cannot be null");
      }
      var bits = new Array(stringRepresentation.length);
      var bitsPos = 0;
      var rowStartPos = 0;
      var rowLength = -1;
      var nRows = 0;
      var pos = 0;
      while (pos < stringRepresentation.length) {
        if (stringRepresentation.charAt(pos) === "\n" || stringRepresentation.charAt(pos) === "\r") {
          if (bitsPos > rowStartPos) {
            if (rowLength === -1) {
              rowLength = bitsPos - rowStartPos;
            } else if (bitsPos - rowStartPos !== rowLength) {
              throw new IllegalArgumentException("row lengths do not match");
            }
            rowStartPos = bitsPos;
            nRows++;
          }
          pos++;
        } else if (stringRepresentation.substring(pos, pos + setString.length) === setString) {
          pos += setString.length;
          bits[bitsPos] = true;
          bitsPos++;
        } else if (stringRepresentation.substring(pos, pos + unsetString.length) === unsetString) {
          pos += unsetString.length;
          bits[bitsPos] = false;
          bitsPos++;
        } else {
          throw new IllegalArgumentException("illegal character encountered: " + stringRepresentation.substring(pos));
        }
      }
      if (bitsPos > rowStartPos) {
        if (rowLength === -1) {
          rowLength = bitsPos - rowStartPos;
        } else if (bitsPos - rowStartPos !== rowLength) {
          throw new IllegalArgumentException("row lengths do not match");
        }
        nRows++;
      }
      var matrix = new BitMatrix2(rowLength, nRows);
      for (var i = 0; i < bitsPos; i++) {
        if (bits[i]) {
          matrix.set(Math.floor(i % rowLength), Math.floor(i / rowLength));
        }
      }
      return matrix;
    };
    BitMatrix2.prototype.get = function(x, y) {
      var offset = y * this.rowSize + Math.floor(x / 32);
      return (this.bits[offset] >>> (x & 31) & 1) !== 0;
    };
    BitMatrix2.prototype.set = function(x, y) {
      var offset = y * this.rowSize + Math.floor(x / 32);
      this.bits[offset] |= 1 << (x & 31) & 4294967295;
    };
    BitMatrix2.prototype.unset = function(x, y) {
      var offset = y * this.rowSize + Math.floor(x / 32);
      this.bits[offset] &= ~(1 << (x & 31) & 4294967295);
    };
    BitMatrix2.prototype.flip = function(x, y) {
      var offset = y * this.rowSize + Math.floor(x / 32);
      this.bits[offset] ^= 1 << (x & 31) & 4294967295;
    };
    BitMatrix2.prototype.xor = function(mask) {
      if (this.width !== mask.getWidth() || this.height !== mask.getHeight() || this.rowSize !== mask.getRowSize()) {
        throw new IllegalArgumentException("input matrix dimensions do not match");
      }
      var rowArray = new BitArray(Math.floor(this.width / 32) + 1);
      var rowSize = this.rowSize;
      var bits = this.bits;
      for (var y = 0, height = this.height; y < height; y++) {
        var offset = y * rowSize;
        var row = mask.getRow(y, rowArray).getBitArray();
        for (var x = 0; x < rowSize; x++) {
          bits[offset + x] ^= row[x];
        }
      }
    };
    BitMatrix2.prototype.clear = function() {
      var bits = this.bits;
      var max = bits.length;
      for (var i = 0; i < max; i++) {
        bits[i] = 0;
      }
    };
    BitMatrix2.prototype.setRegion = function(left, top, width, height) {
      if (top < 0 || left < 0) {
        throw new IllegalArgumentException("Left and top must be nonnegative");
      }
      if (height < 1 || width < 1) {
        throw new IllegalArgumentException("Height and width must be at least 1");
      }
      var right = left + width;
      var bottom = top + height;
      if (bottom > this.height || right > this.width) {
        throw new IllegalArgumentException("The region must fit inside the matrix");
      }
      var rowSize = this.rowSize;
      var bits = this.bits;
      for (var y = top; y < bottom; y++) {
        var offset = y * rowSize;
        for (var x = left; x < right; x++) {
          bits[offset + Math.floor(x / 32)] |= 1 << (x & 31) & 4294967295;
        }
      }
    };
    BitMatrix2.prototype.getRow = function(y, row) {
      if (row === null || row === void 0 || row.getSize() < this.width) {
        row = new BitArray(this.width);
      } else {
        row.clear();
      }
      var rowSize = this.rowSize;
      var bits = this.bits;
      var offset = y * rowSize;
      for (var x = 0; x < rowSize; x++) {
        row.setBulk(x * 32, bits[offset + x]);
      }
      return row;
    };
    BitMatrix2.prototype.setRow = function(y, row) {
      System.arraycopy(row.getBitArray(), 0, this.bits, y * this.rowSize, this.rowSize);
    };
    BitMatrix2.prototype.rotate180 = function() {
      var width = this.getWidth();
      var height = this.getHeight();
      var topRow = new BitArray(width);
      var bottomRow = new BitArray(width);
      for (var i = 0, length_1 = Math.floor((height + 1) / 2); i < length_1; i++) {
        topRow = this.getRow(i, topRow);
        bottomRow = this.getRow(height - 1 - i, bottomRow);
        topRow.reverse();
        bottomRow.reverse();
        this.setRow(i, bottomRow);
        this.setRow(height - 1 - i, topRow);
      }
    };
    BitMatrix2.prototype.getEnclosingRectangle = function() {
      var width = this.width;
      var height = this.height;
      var rowSize = this.rowSize;
      var bits = this.bits;
      var left = width;
      var top = height;
      var right = -1;
      var bottom = -1;
      for (var y = 0; y < height; y++) {
        for (var x32 = 0; x32 < rowSize; x32++) {
          var theBits = bits[y * rowSize + x32];
          if (theBits !== 0) {
            if (y < top) {
              top = y;
            }
            if (y > bottom) {
              bottom = y;
            }
            if (x32 * 32 < left) {
              var bit = 0;
              while ((theBits << 31 - bit & 4294967295) === 0) {
                bit++;
              }
              if (x32 * 32 + bit < left) {
                left = x32 * 32 + bit;
              }
            }
            if (x32 * 32 + 31 > right) {
              var bit = 31;
              while (theBits >>> bit === 0) {
                bit--;
              }
              if (x32 * 32 + bit > right) {
                right = x32 * 32 + bit;
              }
            }
          }
        }
      }
      if (right < left || bottom < top) {
        return null;
      }
      return Int32Array.from([left, top, right - left + 1, bottom - top + 1]);
    };
    BitMatrix2.prototype.getTopLeftOnBit = function() {
      var rowSize = this.rowSize;
      var bits = this.bits;
      var bitsOffset = 0;
      while (bitsOffset < bits.length && bits[bitsOffset] === 0) {
        bitsOffset++;
      }
      if (bitsOffset === bits.length) {
        return null;
      }
      var y = bitsOffset / rowSize;
      var x = bitsOffset % rowSize * 32;
      var theBits = bits[bitsOffset];
      var bit = 0;
      while ((theBits << 31 - bit & 4294967295) === 0) {
        bit++;
      }
      x += bit;
      return Int32Array.from([x, y]);
    };
    BitMatrix2.prototype.getBottomRightOnBit = function() {
      var rowSize = this.rowSize;
      var bits = this.bits;
      var bitsOffset = bits.length - 1;
      while (bitsOffset >= 0 && bits[bitsOffset] === 0) {
        bitsOffset--;
      }
      if (bitsOffset < 0) {
        return null;
      }
      var y = Math.floor(bitsOffset / rowSize);
      var x = Math.floor(bitsOffset % rowSize) * 32;
      var theBits = bits[bitsOffset];
      var bit = 31;
      while (theBits >>> bit === 0) {
        bit--;
      }
      x += bit;
      return Int32Array.from([x, y]);
    };
    BitMatrix2.prototype.getWidth = function() {
      return this.width;
    };
    BitMatrix2.prototype.getHeight = function() {
      return this.height;
    };
    BitMatrix2.prototype.getRowSize = function() {
      return this.rowSize;
    };
    BitMatrix2.prototype.equals = function(o) {
      if (!(o instanceof BitMatrix2)) {
        return false;
      }
      var other = o;
      return this.width === other.width && this.height === other.height && this.rowSize === other.rowSize && Arrays.equals(this.bits, other.bits);
    };
    BitMatrix2.prototype.hashCode = function() {
      var hash = this.width;
      hash = 31 * hash + this.width;
      hash = 31 * hash + this.height;
      hash = 31 * hash + this.rowSize;
      hash = 31 * hash + Arrays.hashCode(this.bits);
      return hash;
    };
    BitMatrix2.prototype.toString = function(setString, unsetString, lineSeparator) {
      if (setString === void 0) {
        setString = "X ";
      }
      if (unsetString === void 0) {
        unsetString = "  ";
      }
      if (lineSeparator === void 0) {
        lineSeparator = "\n";
      }
      return this.buildToString(setString, unsetString, lineSeparator);
    };
    BitMatrix2.prototype.buildToString = function(setString, unsetString, lineSeparator) {
      var result = new StringBuilder();
      for (var y = 0, height = this.height; y < height; y++) {
        for (var x = 0, width = this.width; x < width; x++) {
          result.append(this.get(x, y) ? setString : unsetString);
        }
        result.append(lineSeparator);
      }
      return result.toString();
    };
    BitMatrix2.prototype.clone = function() {
      return new BitMatrix2(this.width, this.height, this.rowSize, this.bits.slice());
    };
    return BitMatrix2;
  })()
);
var __extends$3 = /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var NotFoundException = (
  /** @class */
  (function(_super) {
    __extends$3(NotFoundException2, _super);
    function NotFoundException2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    NotFoundException2.getNotFoundInstance = function() {
      return new NotFoundException2();
    };
    NotFoundException2.kind = "NotFoundException";
    return NotFoundException2;
  })(Exception)
);
var MathUtils = (
  /** @class */
  (function() {
    function MathUtils2() {
    }
    MathUtils2.round = function(d) {
      if (isNaN(d))
        return 0;
      if (d <= Number.MIN_SAFE_INTEGER)
        return Number.MIN_SAFE_INTEGER;
      if (d >= Number.MAX_SAFE_INTEGER)
        return Number.MAX_SAFE_INTEGER;
      return (
        /*(int) */
        d + (d < 0 ? -0.5 : 0.5) | 0
      );
    };
    MathUtils2.distance = function(aX, aY, bX, bY) {
      var xDiff = aX - bX;
      var yDiff = aY - bY;
      return (
        /*(float) */
        Math.sqrt(xDiff * xDiff + yDiff * yDiff)
      );
    };
    MathUtils2.sum = function(array) {
      var count = 0;
      for (var i = 0, length_1 = array.length; i !== length_1; i++) {
        var a = array[i];
        count += a;
      }
      return count;
    };
    return MathUtils2;
  })()
);
var Float = (
  /** @class */
  (function() {
    function Float2() {
    }
    Float2.floatToIntBits = function(f) {
      return f;
    };
    Float2.MAX_VALUE = Number.MAX_SAFE_INTEGER;
    return Float2;
  })()
);
var ResultPoint = (
  /** @class */
  (function() {
    function ResultPoint2(x, y) {
      this.x = x;
      this.y = y;
    }
    ResultPoint2.prototype.getX = function() {
      return this.x;
    };
    ResultPoint2.prototype.getY = function() {
      return this.y;
    };
    ResultPoint2.prototype.equals = function(other) {
      if (other instanceof ResultPoint2) {
        var otherPoint = other;
        return this.x === otherPoint.x && this.y === otherPoint.y;
      }
      return false;
    };
    ResultPoint2.prototype.hashCode = function() {
      return 31 * Float.floatToIntBits(this.x) + Float.floatToIntBits(this.y);
    };
    ResultPoint2.prototype.toString = function() {
      return "(" + this.x + "," + this.y + ")";
    };
    ResultPoint2.orderBestPatterns = function(patterns) {
      var zeroOneDistance = this.distance(patterns[0], patterns[1]);
      var oneTwoDistance = this.distance(patterns[1], patterns[2]);
      var zeroTwoDistance = this.distance(patterns[0], patterns[2]);
      var pointA;
      var pointB;
      var pointC;
      if (oneTwoDistance >= zeroOneDistance && oneTwoDistance >= zeroTwoDistance) {
        pointB = patterns[0];
        pointA = patterns[1];
        pointC = patterns[2];
      } else if (zeroTwoDistance >= oneTwoDistance && zeroTwoDistance >= zeroOneDistance) {
        pointB = patterns[1];
        pointA = patterns[0];
        pointC = patterns[2];
      } else {
        pointB = patterns[2];
        pointA = patterns[0];
        pointC = patterns[1];
      }
      if (this.crossProductZ(pointA, pointB, pointC) < 0) {
        var temp = pointA;
        pointA = pointC;
        pointC = temp;
      }
      patterns[0] = pointA;
      patterns[1] = pointB;
      patterns[2] = pointC;
    };
    ResultPoint2.distance = function(pattern1, pattern2) {
      return MathUtils.distance(pattern1.x, pattern1.y, pattern2.x, pattern2.y);
    };
    ResultPoint2.crossProductZ = function(pointA, pointB, pointC) {
      var bX = pointB.x;
      var bY = pointB.y;
      return (pointC.x - bX) * (pointA.y - bY) - (pointC.y - bY) * (pointA.x - bX);
    };
    return ResultPoint2;
  })()
);
var DetectorResult = (
  /** @class */
  (function() {
    function DetectorResult2(bits, points) {
      this.bits = bits;
      this.points = points;
    }
    DetectorResult2.prototype.getBits = function() {
      return this.bits;
    };
    DetectorResult2.prototype.getPoints = function() {
      return this.points;
    };
    return DetectorResult2;
  })()
);
var GridSampler = (
  /** @class */
  (function() {
    function GridSampler2() {
    }
    GridSampler2.checkAndNudgePoints = function(image, points) {
      var width = image.getWidth();
      var height = image.getHeight();
      var nudged = true;
      for (var offset = 0; offset < points.length && nudged; offset += 2) {
        var x = Math.floor(points[offset]);
        var y = Math.floor(points[offset + 1]);
        if (x < -1 || x > width || y < -1 || y > height) {
          throw new NotFoundException();
        }
        nudged = false;
        if (x === -1) {
          points[offset] = 0;
          nudged = true;
        } else if (x === width) {
          points[offset] = width - 1;
          nudged = true;
        }
        if (y === -1) {
          points[offset + 1] = 0;
          nudged = true;
        } else if (y === height) {
          points[offset + 1] = height - 1;
          nudged = true;
        }
      }
      nudged = true;
      for (var offset = points.length - 2; offset >= 0 && nudged; offset -= 2) {
        var x = Math.floor(points[offset]);
        var y = Math.floor(points[offset + 1]);
        if (x < -1 || x > width || y < -1 || y > height) {
          throw new NotFoundException();
        }
        nudged = false;
        if (x === -1) {
          points[offset] = 0;
          nudged = true;
        } else if (x === width) {
          points[offset] = width - 1;
          nudged = true;
        }
        if (y === -1) {
          points[offset + 1] = 0;
          nudged = true;
        } else if (y === height) {
          points[offset + 1] = height - 1;
          nudged = true;
        }
      }
    };
    return GridSampler2;
  })()
);
var PerspectiveTransform = (
  /** @class */
  (function() {
    function PerspectiveTransform2(a11, a21, a31, a12, a22, a32, a13, a23, a33) {
      this.a11 = a11;
      this.a21 = a21;
      this.a31 = a31;
      this.a12 = a12;
      this.a22 = a22;
      this.a32 = a32;
      this.a13 = a13;
      this.a23 = a23;
      this.a33 = a33;
    }
    PerspectiveTransform2.quadrilateralToQuadrilateral = function(x0, y0, x1, y1, x2, y2, x3, y3, x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p) {
      var qToS = PerspectiveTransform2.quadrilateralToSquare(x0, y0, x1, y1, x2, y2, x3, y3);
      var sToQ = PerspectiveTransform2.squareToQuadrilateral(x0p, y0p, x1p, y1p, x2p, y2p, x3p, y3p);
      return sToQ.times(qToS);
    };
    PerspectiveTransform2.prototype.transformPoints = function(points) {
      var max = points.length;
      var a11 = this.a11;
      var a12 = this.a12;
      var a13 = this.a13;
      var a21 = this.a21;
      var a22 = this.a22;
      var a23 = this.a23;
      var a31 = this.a31;
      var a32 = this.a32;
      var a33 = this.a33;
      for (var i = 0; i < max; i += 2) {
        var x = points[i];
        var y = points[i + 1];
        var denominator = a13 * x + a23 * y + a33;
        points[i] = (a11 * x + a21 * y + a31) / denominator;
        points[i + 1] = (a12 * x + a22 * y + a32) / denominator;
      }
    };
    PerspectiveTransform2.prototype.transformPointsWithValues = function(xValues, yValues) {
      var a11 = this.a11;
      var a12 = this.a12;
      var a13 = this.a13;
      var a21 = this.a21;
      var a22 = this.a22;
      var a23 = this.a23;
      var a31 = this.a31;
      var a32 = this.a32;
      var a33 = this.a33;
      var n = xValues.length;
      for (var i = 0; i < n; i++) {
        var x = xValues[i];
        var y = yValues[i];
        var denominator = a13 * x + a23 * y + a33;
        xValues[i] = (a11 * x + a21 * y + a31) / denominator;
        yValues[i] = (a12 * x + a22 * y + a32) / denominator;
      }
    };
    PerspectiveTransform2.squareToQuadrilateral = function(x0, y0, x1, y1, x2, y2, x3, y3) {
      var dx3 = x0 - x1 + x2 - x3;
      var dy3 = y0 - y1 + y2 - y3;
      if (dx3 === 0 && dy3 === 0) {
        return new PerspectiveTransform2(x1 - x0, x2 - x1, x0, y1 - y0, y2 - y1, y0, 0, 0, 1);
      } else {
        var dx1 = x1 - x2;
        var dx2 = x3 - x2;
        var dy1 = y1 - y2;
        var dy2 = y3 - y2;
        var denominator = dx1 * dy2 - dx2 * dy1;
        var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
        var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
        return new PerspectiveTransform2(x1 - x0 + a13 * x1, x3 - x0 + a23 * x3, x0, y1 - y0 + a13 * y1, y3 - y0 + a23 * y3, y0, a13, a23, 1);
      }
    };
    PerspectiveTransform2.quadrilateralToSquare = function(x0, y0, x1, y1, x2, y2, x3, y3) {
      return PerspectiveTransform2.squareToQuadrilateral(x0, y0, x1, y1, x2, y2, x3, y3).buildAdjoint();
    };
    PerspectiveTransform2.prototype.buildAdjoint = function() {
      return new PerspectiveTransform2(this.a22 * this.a33 - this.a23 * this.a32, this.a23 * this.a31 - this.a21 * this.a33, this.a21 * this.a32 - this.a22 * this.a31, this.a13 * this.a32 - this.a12 * this.a33, this.a11 * this.a33 - this.a13 * this.a31, this.a12 * this.a31 - this.a11 * this.a32, this.a12 * this.a23 - this.a13 * this.a22, this.a13 * this.a21 - this.a11 * this.a23, this.a11 * this.a22 - this.a12 * this.a21);
    };
    PerspectiveTransform2.prototype.times = function(other) {
      return new PerspectiveTransform2(this.a11 * other.a11 + this.a21 * other.a12 + this.a31 * other.a13, this.a11 * other.a21 + this.a21 * other.a22 + this.a31 * other.a23, this.a11 * other.a31 + this.a21 * other.a32 + this.a31 * other.a33, this.a12 * other.a11 + this.a22 * other.a12 + this.a32 * other.a13, this.a12 * other.a21 + this.a22 * other.a22 + this.a32 * other.a23, this.a12 * other.a31 + this.a22 * other.a32 + this.a32 * other.a33, this.a13 * other.a11 + this.a23 * other.a12 + this.a33 * other.a13, this.a13 * other.a21 + this.a23 * other.a22 + this.a33 * other.a23, this.a13 * other.a31 + this.a23 * other.a32 + this.a33 * other.a33);
    };
    return PerspectiveTransform2;
  })()
);
var __extends$2 = /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var DefaultGridSampler = (
  /** @class */
  (function(_super) {
    __extends$2(DefaultGridSampler2, _super);
    function DefaultGridSampler2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultGridSampler2.prototype.sampleGrid = function(image, dimensionX, dimensionY, p1ToX, p1ToY, p2ToX, p2ToY, p3ToX, p3ToY, p4ToX, p4ToY, p1FromX, p1FromY, p2FromX, p2FromY, p3FromX, p3FromY, p4FromX, p4FromY) {
      var transform = PerspectiveTransform.quadrilateralToQuadrilateral(p1ToX, p1ToY, p2ToX, p2ToY, p3ToX, p3ToY, p4ToX, p4ToY, p1FromX, p1FromY, p2FromX, p2FromY, p3FromX, p3FromY, p4FromX, p4FromY);
      return this.sampleGridWithTransform(image, dimensionX, dimensionY, transform);
    };
    DefaultGridSampler2.prototype.sampleGridWithTransform = function(image, dimensionX, dimensionY, transform) {
      if (dimensionX <= 0 || dimensionY <= 0) {
        throw new NotFoundException();
      }
      var bits = new BitMatrix(dimensionX, dimensionY);
      var points = new Float32Array(2 * dimensionX);
      for (var y = 0; y < dimensionY; y++) {
        var max = points.length;
        var iValue = y + 0.5;
        for (var x = 0; x < max; x += 2) {
          points[x] = x / 2 + 0.5;
          points[x + 1] = iValue;
        }
        transform.transformPoints(points);
        GridSampler.checkAndNudgePoints(image, points);
        try {
          for (var x = 0; x < max; x += 2) {
            if (image.get(Math.floor(points[x]), Math.floor(points[x + 1]))) {
              bits.set(x / 2, y);
            }
          }
        } catch (aioobe) {
          throw new NotFoundException();
        }
      }
      return bits;
    };
    return DefaultGridSampler2;
  })(GridSampler)
);
var GridSamplerInstance = (
  /** @class */
  (function() {
    function GridSamplerInstance2() {
    }
    GridSamplerInstance2.setGridSampler = function(newGridSampler) {
      GridSamplerInstance2.gridSampler = newGridSampler;
    };
    GridSamplerInstance2.getInstance = function() {
      return GridSamplerInstance2.gridSampler;
    };
    GridSamplerInstance2.gridSampler = new DefaultGridSampler();
    return GridSamplerInstance2;
  })()
);
var ErrorCorrectionLevelValues;
(function(ErrorCorrectionLevelValues2) {
  ErrorCorrectionLevelValues2[ErrorCorrectionLevelValues2["L"] = 0] = "L";
  ErrorCorrectionLevelValues2[ErrorCorrectionLevelValues2["M"] = 1] = "M";
  ErrorCorrectionLevelValues2[ErrorCorrectionLevelValues2["Q"] = 2] = "Q";
  ErrorCorrectionLevelValues2[ErrorCorrectionLevelValues2["H"] = 3] = "H";
})(ErrorCorrectionLevelValues || (ErrorCorrectionLevelValues = {}));
var ErrorCorrectionLevel = (
  /** @class */
  (function() {
    function ErrorCorrectionLevel2(value, stringValue, bits) {
      this.value = value;
      this.stringValue = stringValue;
      this.bits = bits;
      ErrorCorrectionLevel2.FOR_BITS.set(bits, this);
      ErrorCorrectionLevel2.FOR_VALUE.set(value, this);
    }
    ErrorCorrectionLevel2.prototype.getValue = function() {
      return this.value;
    };
    ErrorCorrectionLevel2.prototype.getBits = function() {
      return this.bits;
    };
    ErrorCorrectionLevel2.fromString = function(s) {
      switch (s) {
        case "L":
          return ErrorCorrectionLevel2.L;
        case "M":
          return ErrorCorrectionLevel2.M;
        case "Q":
          return ErrorCorrectionLevel2.Q;
        case "H":
          return ErrorCorrectionLevel2.H;
        default:
          throw new ArgumentException(s + "not available");
      }
    };
    ErrorCorrectionLevel2.prototype.toString = function() {
      return this.stringValue;
    };
    ErrorCorrectionLevel2.prototype.equals = function(o) {
      if (!(o instanceof ErrorCorrectionLevel2)) {
        return false;
      }
      var other = o;
      return this.value === other.value;
    };
    ErrorCorrectionLevel2.forBits = function(bits) {
      if (bits < 0 || bits >= ErrorCorrectionLevel2.FOR_BITS.size) {
        throw new IllegalArgumentException();
      }
      return ErrorCorrectionLevel2.FOR_BITS.get(bits);
    };
    ErrorCorrectionLevel2.FOR_BITS = /* @__PURE__ */ new Map();
    ErrorCorrectionLevel2.FOR_VALUE = /* @__PURE__ */ new Map();
    ErrorCorrectionLevel2.L = new ErrorCorrectionLevel2(ErrorCorrectionLevelValues.L, "L", 1);
    ErrorCorrectionLevel2.M = new ErrorCorrectionLevel2(ErrorCorrectionLevelValues.M, "M", 0);
    ErrorCorrectionLevel2.Q = new ErrorCorrectionLevel2(ErrorCorrectionLevelValues.Q, "Q", 3);
    ErrorCorrectionLevel2.H = new ErrorCorrectionLevel2(ErrorCorrectionLevelValues.H, "H", 2);
    return ErrorCorrectionLevel2;
  })()
);
var __values$4 = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var FormatInformation = (
  /** @class */
  (function() {
    function FormatInformation2(formatInfo) {
      this.errorCorrectionLevel = ErrorCorrectionLevel.forBits(formatInfo >> 3 & 3);
      this.dataMask = /*(byte) */
      formatInfo & 7;
    }
    FormatInformation2.numBitsDiffering = function(a, b) {
      return Integer.bitCount(a ^ b);
    };
    FormatInformation2.decodeFormatInformation = function(maskedFormatInfo1, maskedFormatInfo2) {
      var formatInfo = FormatInformation2.doDecodeFormatInformation(maskedFormatInfo1, maskedFormatInfo2);
      if (formatInfo !== null) {
        return formatInfo;
      }
      return FormatInformation2.doDecodeFormatInformation(maskedFormatInfo1 ^ FormatInformation2.FORMAT_INFO_MASK_QR, maskedFormatInfo2 ^ FormatInformation2.FORMAT_INFO_MASK_QR);
    };
    FormatInformation2.doDecodeFormatInformation = function(maskedFormatInfo1, maskedFormatInfo2) {
      var e_1, _a;
      var bestDifference = Number.MAX_SAFE_INTEGER;
      var bestFormatInfo = 0;
      try {
        for (var _b = __values$4(FormatInformation2.FORMAT_INFO_DECODE_LOOKUP), _c = _b.next(); !_c.done; _c = _b.next()) {
          var decodeInfo = _c.value;
          var targetInfo = decodeInfo[0];
          if (targetInfo === maskedFormatInfo1 || targetInfo === maskedFormatInfo2) {
            return new FormatInformation2(decodeInfo[1]);
          }
          var bitsDifference = FormatInformation2.numBitsDiffering(maskedFormatInfo1, targetInfo);
          if (bitsDifference < bestDifference) {
            bestFormatInfo = decodeInfo[1];
            bestDifference = bitsDifference;
          }
          if (maskedFormatInfo1 !== maskedFormatInfo2) {
            bitsDifference = FormatInformation2.numBitsDiffering(maskedFormatInfo2, targetInfo);
            if (bitsDifference < bestDifference) {
              bestFormatInfo = decodeInfo[1];
              bestDifference = bitsDifference;
            }
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      if (bestDifference <= 3) {
        return new FormatInformation2(bestFormatInfo);
      }
      return null;
    };
    FormatInformation2.prototype.getErrorCorrectionLevel = function() {
      return this.errorCorrectionLevel;
    };
    FormatInformation2.prototype.getDataMask = function() {
      return this.dataMask;
    };
    FormatInformation2.prototype.hashCode = function() {
      return this.errorCorrectionLevel.getBits() << 3 | this.dataMask;
    };
    FormatInformation2.prototype.equals = function(o) {
      if (!(o instanceof FormatInformation2)) {
        return false;
      }
      var other = o;
      return this.errorCorrectionLevel === other.errorCorrectionLevel && this.dataMask === other.dataMask;
    };
    FormatInformation2.FORMAT_INFO_MASK_QR = 21522;
    FormatInformation2.FORMAT_INFO_DECODE_LOOKUP = [
      Int32Array.from([21522, 0]),
      Int32Array.from([20773, 1]),
      Int32Array.from([24188, 2]),
      Int32Array.from([23371, 3]),
      Int32Array.from([17913, 4]),
      Int32Array.from([16590, 5]),
      Int32Array.from([20375, 6]),
      Int32Array.from([19104, 7]),
      Int32Array.from([30660, 8]),
      Int32Array.from([29427, 9]),
      Int32Array.from([32170, 10]),
      Int32Array.from([30877, 11]),
      Int32Array.from([26159, 12]),
      Int32Array.from([25368, 13]),
      Int32Array.from([27713, 14]),
      Int32Array.from([26998, 15]),
      Int32Array.from([5769, 16]),
      Int32Array.from([5054, 17]),
      Int32Array.from([7399, 18]),
      Int32Array.from([6608, 19]),
      Int32Array.from([1890, 20]),
      Int32Array.from([597, 21]),
      Int32Array.from([3340, 22]),
      Int32Array.from([2107, 23]),
      Int32Array.from([13663, 24]),
      Int32Array.from([12392, 25]),
      Int32Array.from([16177, 26]),
      Int32Array.from([14854, 27]),
      Int32Array.from([9396, 28]),
      Int32Array.from([8579, 29]),
      Int32Array.from([11994, 30]),
      Int32Array.from([11245, 31])
    ];
    return FormatInformation2;
  })()
);
var __values$3 = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var ECBlocks = (
  /** @class */
  (function() {
    function ECBlocks2(ecCodewordsPerBlock) {
      var ecBlocks = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        ecBlocks[_i - 1] = arguments[_i];
      }
      this.ecCodewordsPerBlock = ecCodewordsPerBlock;
      this.ecBlocks = ecBlocks;
    }
    ECBlocks2.prototype.getECCodewordsPerBlock = function() {
      return this.ecCodewordsPerBlock;
    };
    ECBlocks2.prototype.getNumBlocks = function() {
      var e_1, _a;
      var total = 0;
      var ecBlocks = this.ecBlocks;
      try {
        for (var ecBlocks_1 = __values$3(ecBlocks), ecBlocks_1_1 = ecBlocks_1.next(); !ecBlocks_1_1.done; ecBlocks_1_1 = ecBlocks_1.next()) {
          var ecBlock = ecBlocks_1_1.value;
          total += ecBlock.getCount();
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (ecBlocks_1_1 && !ecBlocks_1_1.done && (_a = ecBlocks_1.return)) _a.call(ecBlocks_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return total;
    };
    ECBlocks2.prototype.getTotalECCodewords = function() {
      return this.ecCodewordsPerBlock * this.getNumBlocks();
    };
    ECBlocks2.prototype.getECBlocks = function() {
      return this.ecBlocks;
    };
    return ECBlocks2;
  })()
);
var ECB = (
  /** @class */
  (function() {
    function ECB2(count, dataCodewords) {
      this.count = count;
      this.dataCodewords = dataCodewords;
    }
    ECB2.prototype.getCount = function() {
      return this.count;
    };
    ECB2.prototype.getDataCodewords = function() {
      return this.dataCodewords;
    };
    return ECB2;
  })()
);
var __values$2 = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Version = (
  /** @class */
  (function() {
    function Version2(versionNumber, alignmentPatternCenters) {
      var e_1, _a;
      var ecBlocks = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        ecBlocks[_i - 2] = arguments[_i];
      }
      this.versionNumber = versionNumber;
      this.alignmentPatternCenters = alignmentPatternCenters;
      this.ecBlocks = ecBlocks;
      var total = 0;
      var ecCodewords = ecBlocks[0].getECCodewordsPerBlock();
      var ecbArray = ecBlocks[0].getECBlocks();
      try {
        for (var ecbArray_1 = __values$2(ecbArray), ecbArray_1_1 = ecbArray_1.next(); !ecbArray_1_1.done; ecbArray_1_1 = ecbArray_1.next()) {
          var ecBlock = ecbArray_1_1.value;
          total += ecBlock.getCount() * (ecBlock.getDataCodewords() + ecCodewords);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (ecbArray_1_1 && !ecbArray_1_1.done && (_a = ecbArray_1.return)) _a.call(ecbArray_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      this.totalCodewords = total;
    }
    Version2.prototype.getVersionNumber = function() {
      return this.versionNumber;
    };
    Version2.prototype.getAlignmentPatternCenters = function() {
      return this.alignmentPatternCenters;
    };
    Version2.prototype.getTotalCodewords = function() {
      return this.totalCodewords;
    };
    Version2.prototype.getDimensionForVersion = function() {
      return 17 + 4 * this.versionNumber;
    };
    Version2.prototype.getECBlocksForLevel = function(ecLevel) {
      return this.ecBlocks[ecLevel.getValue()];
    };
    Version2.getProvisionalVersionForDimension = function(dimension) {
      if (dimension % 4 !== 1) {
        throw new FormatException();
      }
      try {
        return this.getVersionForNumber((dimension - 17) / 4);
      } catch (ignored) {
        throw new FormatException();
      }
    };
    Version2.getVersionForNumber = function(versionNumber) {
      if (versionNumber < 1 || versionNumber > 40) {
        throw new IllegalArgumentException();
      }
      return Version2.VERSIONS[versionNumber - 1];
    };
    Version2.decodeVersionInformation = function(versionBits) {
      var bestDifference = Number.MAX_SAFE_INTEGER;
      var bestVersion = 0;
      for (var i = 0; i < Version2.VERSION_DECODE_INFO.length; i++) {
        var targetVersion = Version2.VERSION_DECODE_INFO[i];
        if (targetVersion === versionBits) {
          return Version2.getVersionForNumber(i + 7);
        }
        var bitsDifference = FormatInformation.numBitsDiffering(versionBits, targetVersion);
        if (bitsDifference < bestDifference) {
          bestVersion = i + 7;
          bestDifference = bitsDifference;
        }
      }
      if (bestDifference <= 3) {
        return Version2.getVersionForNumber(bestVersion);
      }
      return null;
    };
    Version2.prototype.buildFunctionPattern = function() {
      var dimension = this.getDimensionForVersion();
      var bitMatrix = new BitMatrix(dimension);
      bitMatrix.setRegion(0, 0, 9, 9);
      bitMatrix.setRegion(dimension - 8, 0, 8, 9);
      bitMatrix.setRegion(0, dimension - 8, 9, 8);
      var max = this.alignmentPatternCenters.length;
      for (var x = 0; x < max; x++) {
        var i = this.alignmentPatternCenters[x] - 2;
        for (var y = 0; y < max; y++) {
          if (x === 0 && (y === 0 || y === max - 1) || x === max - 1 && y === 0) {
            continue;
          }
          bitMatrix.setRegion(this.alignmentPatternCenters[y] - 2, i, 5, 5);
        }
      }
      bitMatrix.setRegion(6, 9, 1, dimension - 17);
      bitMatrix.setRegion(9, 6, dimension - 17, 1);
      if (this.versionNumber > 6) {
        bitMatrix.setRegion(dimension - 11, 0, 3, 6);
        bitMatrix.setRegion(0, dimension - 11, 6, 3);
      }
      return bitMatrix;
    };
    Version2.prototype.toString = function() {
      return "" + this.versionNumber;
    };
    Version2.VERSION_DECODE_INFO = Int32Array.from([
      31892,
      34236,
      39577,
      42195,
      48118,
      51042,
      55367,
      58893,
      63784,
      68472,
      70749,
      76311,
      79154,
      84390,
      87683,
      92361,
      96236,
      102084,
      102881,
      110507,
      110734,
      117786,
      119615,
      126325,
      127568,
      133589,
      136944,
      141498,
      145311,
      150283,
      152622,
      158308,
      161089,
      167017
    ]);
    Version2.VERSIONS = [
      new Version2(1, new Int32Array(0), new ECBlocks(7, new ECB(1, 19)), new ECBlocks(10, new ECB(1, 16)), new ECBlocks(13, new ECB(1, 13)), new ECBlocks(17, new ECB(1, 9))),
      new Version2(2, Int32Array.from([6, 18]), new ECBlocks(10, new ECB(1, 34)), new ECBlocks(16, new ECB(1, 28)), new ECBlocks(22, new ECB(1, 22)), new ECBlocks(28, new ECB(1, 16))),
      new Version2(3, Int32Array.from([6, 22]), new ECBlocks(15, new ECB(1, 55)), new ECBlocks(26, new ECB(1, 44)), new ECBlocks(18, new ECB(2, 17)), new ECBlocks(22, new ECB(2, 13))),
      new Version2(4, Int32Array.from([6, 26]), new ECBlocks(20, new ECB(1, 80)), new ECBlocks(18, new ECB(2, 32)), new ECBlocks(26, new ECB(2, 24)), new ECBlocks(16, new ECB(4, 9))),
      new Version2(5, Int32Array.from([6, 30]), new ECBlocks(26, new ECB(1, 108)), new ECBlocks(24, new ECB(2, 43)), new ECBlocks(18, new ECB(2, 15), new ECB(2, 16)), new ECBlocks(22, new ECB(2, 11), new ECB(2, 12))),
      new Version2(6, Int32Array.from([6, 34]), new ECBlocks(18, new ECB(2, 68)), new ECBlocks(16, new ECB(4, 27)), new ECBlocks(24, new ECB(4, 19)), new ECBlocks(28, new ECB(4, 15))),
      new Version2(7, Int32Array.from([6, 22, 38]), new ECBlocks(20, new ECB(2, 78)), new ECBlocks(18, new ECB(4, 31)), new ECBlocks(18, new ECB(2, 14), new ECB(4, 15)), new ECBlocks(26, new ECB(4, 13), new ECB(1, 14))),
      new Version2(8, Int32Array.from([6, 24, 42]), new ECBlocks(24, new ECB(2, 97)), new ECBlocks(22, new ECB(2, 38), new ECB(2, 39)), new ECBlocks(22, new ECB(4, 18), new ECB(2, 19)), new ECBlocks(26, new ECB(4, 14), new ECB(2, 15))),
      new Version2(9, Int32Array.from([6, 26, 46]), new ECBlocks(30, new ECB(2, 116)), new ECBlocks(22, new ECB(3, 36), new ECB(2, 37)), new ECBlocks(20, new ECB(4, 16), new ECB(4, 17)), new ECBlocks(24, new ECB(4, 12), new ECB(4, 13))),
      new Version2(10, Int32Array.from([6, 28, 50]), new ECBlocks(18, new ECB(2, 68), new ECB(2, 69)), new ECBlocks(26, new ECB(4, 43), new ECB(1, 44)), new ECBlocks(24, new ECB(6, 19), new ECB(2, 20)), new ECBlocks(28, new ECB(6, 15), new ECB(2, 16))),
      new Version2(11, Int32Array.from([6, 30, 54]), new ECBlocks(20, new ECB(4, 81)), new ECBlocks(30, new ECB(1, 50), new ECB(4, 51)), new ECBlocks(28, new ECB(4, 22), new ECB(4, 23)), new ECBlocks(24, new ECB(3, 12), new ECB(8, 13))),
      new Version2(12, Int32Array.from([6, 32, 58]), new ECBlocks(24, new ECB(2, 92), new ECB(2, 93)), new ECBlocks(22, new ECB(6, 36), new ECB(2, 37)), new ECBlocks(26, new ECB(4, 20), new ECB(6, 21)), new ECBlocks(28, new ECB(7, 14), new ECB(4, 15))),
      new Version2(13, Int32Array.from([6, 34, 62]), new ECBlocks(26, new ECB(4, 107)), new ECBlocks(22, new ECB(8, 37), new ECB(1, 38)), new ECBlocks(24, new ECB(8, 20), new ECB(4, 21)), new ECBlocks(22, new ECB(12, 11), new ECB(4, 12))),
      new Version2(14, Int32Array.from([6, 26, 46, 66]), new ECBlocks(30, new ECB(3, 115), new ECB(1, 116)), new ECBlocks(24, new ECB(4, 40), new ECB(5, 41)), new ECBlocks(20, new ECB(11, 16), new ECB(5, 17)), new ECBlocks(24, new ECB(11, 12), new ECB(5, 13))),
      new Version2(15, Int32Array.from([6, 26, 48, 70]), new ECBlocks(22, new ECB(5, 87), new ECB(1, 88)), new ECBlocks(24, new ECB(5, 41), new ECB(5, 42)), new ECBlocks(30, new ECB(5, 24), new ECB(7, 25)), new ECBlocks(24, new ECB(11, 12), new ECB(7, 13))),
      new Version2(16, Int32Array.from([6, 26, 50, 74]), new ECBlocks(24, new ECB(5, 98), new ECB(1, 99)), new ECBlocks(28, new ECB(7, 45), new ECB(3, 46)), new ECBlocks(24, new ECB(15, 19), new ECB(2, 20)), new ECBlocks(30, new ECB(3, 15), new ECB(13, 16))),
      new Version2(17, Int32Array.from([6, 30, 54, 78]), new ECBlocks(28, new ECB(1, 107), new ECB(5, 108)), new ECBlocks(28, new ECB(10, 46), new ECB(1, 47)), new ECBlocks(28, new ECB(1, 22), new ECB(15, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(17, 15))),
      new Version2(18, Int32Array.from([6, 30, 56, 82]), new ECBlocks(30, new ECB(5, 120), new ECB(1, 121)), new ECBlocks(26, new ECB(9, 43), new ECB(4, 44)), new ECBlocks(28, new ECB(17, 22), new ECB(1, 23)), new ECBlocks(28, new ECB(2, 14), new ECB(19, 15))),
      new Version2(19, Int32Array.from([6, 30, 58, 86]), new ECBlocks(28, new ECB(3, 113), new ECB(4, 114)), new ECBlocks(26, new ECB(3, 44), new ECB(11, 45)), new ECBlocks(26, new ECB(17, 21), new ECB(4, 22)), new ECBlocks(26, new ECB(9, 13), new ECB(16, 14))),
      new Version2(20, Int32Array.from([6, 34, 62, 90]), new ECBlocks(28, new ECB(3, 107), new ECB(5, 108)), new ECBlocks(26, new ECB(3, 41), new ECB(13, 42)), new ECBlocks(30, new ECB(15, 24), new ECB(5, 25)), new ECBlocks(28, new ECB(15, 15), new ECB(10, 16))),
      new Version2(21, Int32Array.from([6, 28, 50, 72, 94]), new ECBlocks(28, new ECB(4, 116), new ECB(4, 117)), new ECBlocks(26, new ECB(17, 42)), new ECBlocks(28, new ECB(17, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(19, 16), new ECB(6, 17))),
      new Version2(22, Int32Array.from([6, 26, 50, 74, 98]), new ECBlocks(28, new ECB(2, 111), new ECB(7, 112)), new ECBlocks(28, new ECB(17, 46)), new ECBlocks(30, new ECB(7, 24), new ECB(16, 25)), new ECBlocks(24, new ECB(34, 13))),
      new Version2(23, Int32Array.from([6, 30, 54, 78, 102]), new ECBlocks(30, new ECB(4, 121), new ECB(5, 122)), new ECBlocks(28, new ECB(4, 47), new ECB(14, 48)), new ECBlocks(30, new ECB(11, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(16, 15), new ECB(14, 16))),
      new Version2(24, Int32Array.from([6, 28, 54, 80, 106]), new ECBlocks(30, new ECB(6, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(6, 45), new ECB(14, 46)), new ECBlocks(30, new ECB(11, 24), new ECB(16, 25)), new ECBlocks(30, new ECB(30, 16), new ECB(2, 17))),
      new Version2(25, Int32Array.from([6, 32, 58, 84, 110]), new ECBlocks(26, new ECB(8, 106), new ECB(4, 107)), new ECBlocks(28, new ECB(8, 47), new ECB(13, 48)), new ECBlocks(30, new ECB(7, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(13, 16))),
      new Version2(26, Int32Array.from([6, 30, 58, 86, 114]), new ECBlocks(28, new ECB(10, 114), new ECB(2, 115)), new ECBlocks(28, new ECB(19, 46), new ECB(4, 47)), new ECBlocks(28, new ECB(28, 22), new ECB(6, 23)), new ECBlocks(30, new ECB(33, 16), new ECB(4, 17))),
      new Version2(27, Int32Array.from([6, 34, 62, 90, 118]), new ECBlocks(30, new ECB(8, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(22, 45), new ECB(3, 46)), new ECBlocks(30, new ECB(8, 23), new ECB(26, 24)), new ECBlocks(30, new ECB(12, 15), new ECB(28, 16))),
      new Version2(28, Int32Array.from([6, 26, 50, 74, 98, 122]), new ECBlocks(30, new ECB(3, 117), new ECB(10, 118)), new ECBlocks(28, new ECB(3, 45), new ECB(23, 46)), new ECBlocks(30, new ECB(4, 24), new ECB(31, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(31, 16))),
      new Version2(29, Int32Array.from([6, 30, 54, 78, 102, 126]), new ECBlocks(30, new ECB(7, 116), new ECB(7, 117)), new ECBlocks(28, new ECB(21, 45), new ECB(7, 46)), new ECBlocks(30, new ECB(1, 23), new ECB(37, 24)), new ECBlocks(30, new ECB(19, 15), new ECB(26, 16))),
      new Version2(30, Int32Array.from([6, 26, 52, 78, 104, 130]), new ECBlocks(30, new ECB(5, 115), new ECB(10, 116)), new ECBlocks(28, new ECB(19, 47), new ECB(10, 48)), new ECBlocks(30, new ECB(15, 24), new ECB(25, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(25, 16))),
      new Version2(31, Int32Array.from([6, 30, 56, 82, 108, 134]), new ECBlocks(30, new ECB(13, 115), new ECB(3, 116)), new ECBlocks(28, new ECB(2, 46), new ECB(29, 47)), new ECBlocks(30, new ECB(42, 24), new ECB(1, 25)), new ECBlocks(30, new ECB(23, 15), new ECB(28, 16))),
      new Version2(32, Int32Array.from([6, 34, 60, 86, 112, 138]), new ECBlocks(30, new ECB(17, 115)), new ECBlocks(28, new ECB(10, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(10, 24), new ECB(35, 25)), new ECBlocks(30, new ECB(19, 15), new ECB(35, 16))),
      new Version2(33, Int32Array.from([6, 30, 58, 86, 114, 142]), new ECBlocks(30, new ECB(17, 115), new ECB(1, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(21, 47)), new ECBlocks(30, new ECB(29, 24), new ECB(19, 25)), new ECBlocks(30, new ECB(11, 15), new ECB(46, 16))),
      new Version2(34, Int32Array.from([6, 34, 62, 90, 118, 146]), new ECBlocks(30, new ECB(13, 115), new ECB(6, 116)), new ECBlocks(28, new ECB(14, 46), new ECB(23, 47)), new ECBlocks(30, new ECB(44, 24), new ECB(7, 25)), new ECBlocks(30, new ECB(59, 16), new ECB(1, 17))),
      new Version2(35, Int32Array.from([6, 30, 54, 78, 102, 126, 150]), new ECBlocks(30, new ECB(12, 121), new ECB(7, 122)), new ECBlocks(28, new ECB(12, 47), new ECB(26, 48)), new ECBlocks(30, new ECB(39, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(22, 15), new ECB(41, 16))),
      new Version2(36, Int32Array.from([6, 24, 50, 76, 102, 128, 154]), new ECBlocks(30, new ECB(6, 121), new ECB(14, 122)), new ECBlocks(28, new ECB(6, 47), new ECB(34, 48)), new ECBlocks(30, new ECB(46, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(2, 15), new ECB(64, 16))),
      new Version2(37, Int32Array.from([6, 28, 54, 80, 106, 132, 158]), new ECBlocks(30, new ECB(17, 122), new ECB(4, 123)), new ECBlocks(28, new ECB(29, 46), new ECB(14, 47)), new ECBlocks(30, new ECB(49, 24), new ECB(10, 25)), new ECBlocks(30, new ECB(24, 15), new ECB(46, 16))),
      new Version2(38, Int32Array.from([6, 32, 58, 84, 110, 136, 162]), new ECBlocks(30, new ECB(4, 122), new ECB(18, 123)), new ECBlocks(28, new ECB(13, 46), new ECB(32, 47)), new ECBlocks(30, new ECB(48, 24), new ECB(14, 25)), new ECBlocks(30, new ECB(42, 15), new ECB(32, 16))),
      new Version2(39, Int32Array.from([6, 26, 54, 82, 110, 138, 166]), new ECBlocks(30, new ECB(20, 117), new ECB(4, 118)), new ECBlocks(28, new ECB(40, 47), new ECB(7, 48)), new ECBlocks(30, new ECB(43, 24), new ECB(22, 25)), new ECBlocks(30, new ECB(10, 15), new ECB(67, 16))),
      new Version2(40, Int32Array.from([6, 30, 58, 86, 114, 142, 170]), new ECBlocks(30, new ECB(19, 118), new ECB(6, 119)), new ECBlocks(28, new ECB(18, 47), new ECB(31, 48)), new ECBlocks(30, new ECB(34, 24), new ECB(34, 25)), new ECBlocks(30, new ECB(20, 15), new ECB(61, 16)))
    ];
    return Version2;
  })()
);
var __extends$1 = /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var AlignmentPattern = (
  /** @class */
  (function(_super) {
    __extends$1(AlignmentPattern2, _super);
    function AlignmentPattern2(posX, posY, estimatedModuleSize) {
      var _this = _super.call(this, posX, posY) || this;
      _this.estimatedModuleSize = estimatedModuleSize;
      return _this;
    }
    AlignmentPattern2.prototype.aboutEquals = function(moduleSize, i, j) {
      if (Math.abs(i - this.getY()) <= moduleSize && Math.abs(j - this.getX()) <= moduleSize) {
        var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
        return moduleSizeDiff <= 1 || moduleSizeDiff <= this.estimatedModuleSize;
      }
      return false;
    };
    AlignmentPattern2.prototype.combineEstimate = function(i, j, newModuleSize) {
      var combinedX = (this.getX() + j) / 2;
      var combinedY = (this.getY() + i) / 2;
      var combinedModuleSize = (this.estimatedModuleSize + newModuleSize) / 2;
      return new AlignmentPattern2(combinedX, combinedY, combinedModuleSize);
    };
    return AlignmentPattern2;
  })(ResultPoint)
);
var __values$1 = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var AlignmentPatternFinder = (
  /** @class */
  (function() {
    function AlignmentPatternFinder2(image, startX, startY, width, height, moduleSize, resultPointCallback) {
      this.image = image;
      this.startX = startX;
      this.startY = startY;
      this.width = width;
      this.height = height;
      this.moduleSize = moduleSize;
      this.resultPointCallback = resultPointCallback;
      this.possibleCenters = [];
      this.crossCheckStateCount = new Int32Array(3);
    }
    AlignmentPatternFinder2.prototype.find = function() {
      var startX = this.startX;
      var height = this.height;
      var width = this.width;
      var maxJ = startX + width;
      var middleI = this.startY + height / 2;
      var stateCount = new Int32Array(3);
      var image = this.image;
      for (var iGen = 0; iGen < height; iGen++) {
        var i = middleI + ((iGen & 1) === 0 ? Math.floor((iGen + 1) / 2) : -Math.floor((iGen + 1) / 2));
        stateCount[0] = 0;
        stateCount[1] = 0;
        stateCount[2] = 0;
        var j = startX;
        while (j < maxJ && !image.get(j, i)) {
          j++;
        }
        var currentState = 0;
        while (j < maxJ) {
          if (image.get(j, i)) {
            if (currentState === 1) {
              stateCount[1]++;
            } else {
              if (currentState === 2) {
                if (this.foundPatternCross(stateCount)) {
                  var confirmed = this.handlePossibleCenter(stateCount, i, j);
                  if (confirmed !== null) {
                    return confirmed;
                  }
                }
                stateCount[0] = stateCount[2];
                stateCount[1] = 1;
                stateCount[2] = 0;
                currentState = 1;
              } else {
                stateCount[++currentState]++;
              }
            }
          } else {
            if (currentState === 1) {
              currentState++;
            }
            stateCount[currentState]++;
          }
          j++;
        }
        if (this.foundPatternCross(stateCount)) {
          var confirmed = this.handlePossibleCenter(stateCount, i, maxJ);
          if (confirmed !== null) {
            return confirmed;
          }
        }
      }
      if (this.possibleCenters.length !== 0) {
        return this.possibleCenters[0];
      }
      throw new NotFoundException();
    };
    AlignmentPatternFinder2.centerFromEnd = function(stateCount, end) {
      return end - stateCount[2] - stateCount[1] / 2;
    };
    AlignmentPatternFinder2.prototype.foundPatternCross = function(stateCount) {
      var moduleSize = this.moduleSize;
      var maxVariance = moduleSize / 2;
      for (var i = 0; i < 3; i++) {
        if (Math.abs(moduleSize - stateCount[i]) >= maxVariance) {
          return false;
        }
      }
      return true;
    };
    AlignmentPatternFinder2.prototype.crossCheckVertical = function(startI, centerJ, maxCount, originalStateCountTotal) {
      var image = this.image;
      var maxI = image.getHeight();
      var stateCount = this.crossCheckStateCount;
      stateCount[0] = 0;
      stateCount[1] = 0;
      stateCount[2] = 0;
      var i = startI;
      while (i >= 0 && image.get(centerJ, i) && stateCount[1] <= maxCount) {
        stateCount[1]++;
        i--;
      }
      if (i < 0 || stateCount[1] > maxCount) {
        return NaN;
      }
      while (i >= 0 && !image.get(centerJ, i) && stateCount[0] <= maxCount) {
        stateCount[0]++;
        i--;
      }
      if (stateCount[0] > maxCount) {
        return NaN;
      }
      i = startI + 1;
      while (i < maxI && image.get(centerJ, i) && stateCount[1] <= maxCount) {
        stateCount[1]++;
        i++;
      }
      if (i === maxI || stateCount[1] > maxCount) {
        return NaN;
      }
      while (i < maxI && !image.get(centerJ, i) && stateCount[2] <= maxCount) {
        stateCount[2]++;
        i++;
      }
      if (stateCount[2] > maxCount) {
        return NaN;
      }
      var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
      if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
        return NaN;
      }
      return this.foundPatternCross(stateCount) ? AlignmentPatternFinder2.centerFromEnd(stateCount, i) : NaN;
    };
    AlignmentPatternFinder2.prototype.handlePossibleCenter = function(stateCount, i, j) {
      var e_1, _a;
      var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2];
      var centerJ = AlignmentPatternFinder2.centerFromEnd(stateCount, j);
      var centerI = this.crossCheckVertical(
        i,
        /*(int) */
        centerJ,
        2 * stateCount[1],
        stateCountTotal
      );
      if (!isNaN(centerI)) {
        var estimatedModuleSize = (stateCount[0] + stateCount[1] + stateCount[2]) / 3;
        try {
          for (var _b = __values$1(this.possibleCenters), _c = _b.next(); !_c.done; _c = _b.next()) {
            var center = _c.value;
            if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
              return center.combineEstimate(centerI, centerJ, estimatedModuleSize);
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        var point = new AlignmentPattern(centerJ, centerI, estimatedModuleSize);
        this.possibleCenters.push(point);
        if (this.resultPointCallback !== null && this.resultPointCallback !== void 0) {
          this.resultPointCallback.foundPossibleResultPoint(point);
        }
      }
      return null;
    };
    return AlignmentPatternFinder2;
  })()
);
var __extends = /* @__PURE__ */ (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var FinderPattern = (
  /** @class */
  (function(_super) {
    __extends(FinderPattern2, _super);
    function FinderPattern2(posX, posY, estimatedModuleSize, count) {
      var _this = _super.call(this, posX, posY) || this;
      _this.estimatedModuleSize = estimatedModuleSize;
      _this.count = count;
      if (void 0 === count) {
        _this.count = 1;
      }
      return _this;
    }
    FinderPattern2.prototype.getEstimatedModuleSize = function() {
      return this.estimatedModuleSize;
    };
    FinderPattern2.prototype.getCount = function() {
      return this.count;
    };
    FinderPattern2.prototype.aboutEquals = function(moduleSize, i, j) {
      if (Math.abs(i - this.getY()) <= moduleSize && Math.abs(j - this.getX()) <= moduleSize) {
        var moduleSizeDiff = Math.abs(moduleSize - this.estimatedModuleSize);
        return moduleSizeDiff <= 1 || moduleSizeDiff <= this.estimatedModuleSize;
      }
      return false;
    };
    FinderPattern2.prototype.combineEstimate = function(i, j, newModuleSize) {
      var combinedCount = this.count + 1;
      var combinedX = (this.count * this.getX() + j) / combinedCount;
      var combinedY = (this.count * this.getY() + i) / combinedCount;
      var combinedModuleSize = (this.count * this.estimatedModuleSize + newModuleSize) / combinedCount;
      return new FinderPattern2(combinedX, combinedY, combinedModuleSize, combinedCount);
    };
    return FinderPattern2;
  })(ResultPoint)
);
var FinderPatternInfo = (
  /** @class */
  (function() {
    function FinderPatternInfo2(patternCenters) {
      this.bottomLeft = patternCenters[0];
      this.topLeft = patternCenters[1];
      this.topRight = patternCenters[2];
    }
    FinderPatternInfo2.prototype.getBottomLeft = function() {
      return this.bottomLeft;
    };
    FinderPatternInfo2.prototype.getTopLeft = function() {
      return this.topLeft;
    };
    FinderPatternInfo2.prototype.getTopRight = function() {
      return this.topRight;
    };
    return FinderPatternInfo2;
  })()
);
var __values = function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var FinderPatternFinder = (
  /** @class */
  (function() {
    function FinderPatternFinder2(image, resultPointCallback) {
      this.image = image;
      this.resultPointCallback = resultPointCallback;
      this.possibleCenters = [];
      this.crossCheckStateCount = new Int32Array(5);
      this.resultPointCallback = resultPointCallback;
    }
    FinderPatternFinder2.prototype.getImage = function() {
      return this.image;
    };
    FinderPatternFinder2.prototype.getPossibleCenters = function() {
      return this.possibleCenters;
    };
    FinderPatternFinder2.prototype.find = function(hints) {
      var tryHarder = hints !== null && hints !== void 0 && void 0 !== hints.get(DecodeHintType$1.TRY_HARDER);
      var pureBarcode = hints !== null && hints !== void 0 && void 0 !== hints.get(DecodeHintType$1.PURE_BARCODE);
      var image = this.image;
      var maxI = image.getHeight();
      var maxJ = image.getWidth();
      var iSkip = Math.floor(3 * maxI / (4 * FinderPatternFinder2.MAX_MODULES));
      if (iSkip < FinderPatternFinder2.MIN_SKIP || tryHarder) {
        iSkip = FinderPatternFinder2.MIN_SKIP;
      }
      var done = false;
      var stateCount = new Int32Array(5);
      for (var i = iSkip - 1; i < maxI && !done; i += iSkip) {
        stateCount[0] = 0;
        stateCount[1] = 0;
        stateCount[2] = 0;
        stateCount[3] = 0;
        stateCount[4] = 0;
        var currentState = 0;
        for (var j = 0; j < maxJ; j++) {
          if (image.get(j, i)) {
            if ((currentState & 1) === 1) {
              currentState++;
            }
            stateCount[currentState]++;
          } else {
            if ((currentState & 1) === 0) {
              if (currentState === 4) {
                if (FinderPatternFinder2.foundPatternCross(stateCount)) {
                  var confirmed = this.handlePossibleCenter(stateCount, i, j, pureBarcode);
                  if (confirmed === true) {
                    iSkip = 2;
                    if (this.hasSkipped === true) {
                      done = this.haveMultiplyConfirmedCenters();
                    } else {
                      var rowSkip = this.findRowSkip();
                      if (rowSkip > stateCount[2]) {
                        i += rowSkip - stateCount[2] - iSkip;
                        j = maxJ - 1;
                      }
                    }
                  } else {
                    stateCount[0] = stateCount[2];
                    stateCount[1] = stateCount[3];
                    stateCount[2] = stateCount[4];
                    stateCount[3] = 1;
                    stateCount[4] = 0;
                    currentState = 3;
                    continue;
                  }
                  currentState = 0;
                  stateCount[0] = 0;
                  stateCount[1] = 0;
                  stateCount[2] = 0;
                  stateCount[3] = 0;
                  stateCount[4] = 0;
                } else {
                  stateCount[0] = stateCount[2];
                  stateCount[1] = stateCount[3];
                  stateCount[2] = stateCount[4];
                  stateCount[3] = 1;
                  stateCount[4] = 0;
                  currentState = 3;
                }
              } else {
                stateCount[++currentState]++;
              }
            } else {
              stateCount[currentState]++;
            }
          }
        }
        if (FinderPatternFinder2.foundPatternCross(stateCount)) {
          var confirmed = this.handlePossibleCenter(stateCount, i, maxJ, pureBarcode);
          if (confirmed === true) {
            iSkip = stateCount[0];
            if (this.hasSkipped) {
              done = this.haveMultiplyConfirmedCenters();
            }
          }
        }
      }
      var patternInfo = this.selectBestPatterns();
      ResultPoint.orderBestPatterns(patternInfo);
      return new FinderPatternInfo(patternInfo);
    };
    FinderPatternFinder2.centerFromEnd = function(stateCount, end) {
      return end - stateCount[4] - stateCount[3] - stateCount[2] / 2;
    };
    FinderPatternFinder2.foundPatternCross = function(stateCount) {
      var totalModuleSize = 0;
      for (var i = 0; i < 5; i++) {
        var count = stateCount[i];
        if (count === 0) {
          return false;
        }
        totalModuleSize += count;
      }
      if (totalModuleSize < 7) {
        return false;
      }
      var moduleSize = totalModuleSize / 7;
      var maxVariance = moduleSize / 2;
      return Math.abs(moduleSize - stateCount[0]) < maxVariance && Math.abs(moduleSize - stateCount[1]) < maxVariance && Math.abs(3 * moduleSize - stateCount[2]) < 3 * maxVariance && Math.abs(moduleSize - stateCount[3]) < maxVariance && Math.abs(moduleSize - stateCount[4]) < maxVariance;
    };
    FinderPatternFinder2.prototype.getCrossCheckStateCount = function() {
      var crossCheckStateCount = this.crossCheckStateCount;
      crossCheckStateCount[0] = 0;
      crossCheckStateCount[1] = 0;
      crossCheckStateCount[2] = 0;
      crossCheckStateCount[3] = 0;
      crossCheckStateCount[4] = 0;
      return crossCheckStateCount;
    };
    FinderPatternFinder2.prototype.crossCheckDiagonal = function(startI, centerJ, maxCount, originalStateCountTotal) {
      var stateCount = this.getCrossCheckStateCount();
      var i = 0;
      var image = this.image;
      while (startI >= i && centerJ >= i && image.get(centerJ - i, startI - i)) {
        stateCount[2]++;
        i++;
      }
      if (startI < i || centerJ < i) {
        return false;
      }
      while (startI >= i && centerJ >= i && !image.get(centerJ - i, startI - i) && stateCount[1] <= maxCount) {
        stateCount[1]++;
        i++;
      }
      if (startI < i || centerJ < i || stateCount[1] > maxCount) {
        return false;
      }
      while (startI >= i && centerJ >= i && image.get(centerJ - i, startI - i) && stateCount[0] <= maxCount) {
        stateCount[0]++;
        i++;
      }
      if (stateCount[0] > maxCount) {
        return false;
      }
      var maxI = image.getHeight();
      var maxJ = image.getWidth();
      i = 1;
      while (startI + i < maxI && centerJ + i < maxJ && image.get(centerJ + i, startI + i)) {
        stateCount[2]++;
        i++;
      }
      if (startI + i >= maxI || centerJ + i >= maxJ) {
        return false;
      }
      while (startI + i < maxI && centerJ + i < maxJ && !image.get(centerJ + i, startI + i) && stateCount[3] < maxCount) {
        stateCount[3]++;
        i++;
      }
      if (startI + i >= maxI || centerJ + i >= maxJ || stateCount[3] >= maxCount) {
        return false;
      }
      while (startI + i < maxI && centerJ + i < maxJ && image.get(centerJ + i, startI + i) && stateCount[4] < maxCount) {
        stateCount[4]++;
        i++;
      }
      if (stateCount[4] >= maxCount) {
        return false;
      }
      var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
      return Math.abs(stateCountTotal - originalStateCountTotal) < 2 * originalStateCountTotal && FinderPatternFinder2.foundPatternCross(stateCount);
    };
    FinderPatternFinder2.prototype.crossCheckVertical = function(startI, centerJ, maxCount, originalStateCountTotal) {
      var image = this.image;
      var maxI = image.getHeight();
      var stateCount = this.getCrossCheckStateCount();
      var i = startI;
      while (i >= 0 && image.get(centerJ, i)) {
        stateCount[2]++;
        i--;
      }
      if (i < 0) {
        return NaN;
      }
      while (i >= 0 && !image.get(centerJ, i) && stateCount[1] <= maxCount) {
        stateCount[1]++;
        i--;
      }
      if (i < 0 || stateCount[1] > maxCount) {
        return NaN;
      }
      while (i >= 0 && image.get(centerJ, i) && stateCount[0] <= maxCount) {
        stateCount[0]++;
        i--;
      }
      if (stateCount[0] > maxCount) {
        return NaN;
      }
      i = startI + 1;
      while (i < maxI && image.get(centerJ, i)) {
        stateCount[2]++;
        i++;
      }
      if (i === maxI) {
        return NaN;
      }
      while (i < maxI && !image.get(centerJ, i) && stateCount[3] < maxCount) {
        stateCount[3]++;
        i++;
      }
      if (i === maxI || stateCount[3] >= maxCount) {
        return NaN;
      }
      while (i < maxI && image.get(centerJ, i) && stateCount[4] < maxCount) {
        stateCount[4]++;
        i++;
      }
      if (stateCount[4] >= maxCount) {
        return NaN;
      }
      var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
      if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= 2 * originalStateCountTotal) {
        return NaN;
      }
      return FinderPatternFinder2.foundPatternCross(stateCount) ? FinderPatternFinder2.centerFromEnd(stateCount, i) : NaN;
    };
    FinderPatternFinder2.prototype.crossCheckHorizontal = function(startJ, centerI, maxCount, originalStateCountTotal) {
      var image = this.image;
      var maxJ = image.getWidth();
      var stateCount = this.getCrossCheckStateCount();
      var j = startJ;
      while (j >= 0 && image.get(j, centerI)) {
        stateCount[2]++;
        j--;
      }
      if (j < 0) {
        return NaN;
      }
      while (j >= 0 && !image.get(j, centerI) && stateCount[1] <= maxCount) {
        stateCount[1]++;
        j--;
      }
      if (j < 0 || stateCount[1] > maxCount) {
        return NaN;
      }
      while (j >= 0 && image.get(j, centerI) && stateCount[0] <= maxCount) {
        stateCount[0]++;
        j--;
      }
      if (stateCount[0] > maxCount) {
        return NaN;
      }
      j = startJ + 1;
      while (j < maxJ && image.get(j, centerI)) {
        stateCount[2]++;
        j++;
      }
      if (j === maxJ) {
        return NaN;
      }
      while (j < maxJ && !image.get(j, centerI) && stateCount[3] < maxCount) {
        stateCount[3]++;
        j++;
      }
      if (j === maxJ || stateCount[3] >= maxCount) {
        return NaN;
      }
      while (j < maxJ && image.get(j, centerI) && stateCount[4] < maxCount) {
        stateCount[4]++;
        j++;
      }
      if (stateCount[4] >= maxCount) {
        return NaN;
      }
      var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
      if (5 * Math.abs(stateCountTotal - originalStateCountTotal) >= originalStateCountTotal) {
        return NaN;
      }
      return FinderPatternFinder2.foundPatternCross(stateCount) ? FinderPatternFinder2.centerFromEnd(stateCount, j) : NaN;
    };
    FinderPatternFinder2.prototype.handlePossibleCenter = function(stateCount, i, j, pureBarcode) {
      var stateCountTotal = stateCount[0] + stateCount[1] + stateCount[2] + stateCount[3] + stateCount[4];
      var centerJ = FinderPatternFinder2.centerFromEnd(stateCount, j);
      var centerI = this.crossCheckVertical(
        i,
        /*(int) */
        Math.floor(centerJ),
        stateCount[2],
        stateCountTotal
      );
      if (!isNaN(centerI)) {
        centerJ = this.crossCheckHorizontal(
          /*(int) */
          Math.floor(centerJ),
          /*(int) */
          Math.floor(centerI),
          stateCount[2],
          stateCountTotal
        );
        if (!isNaN(centerJ) && (!pureBarcode || this.crossCheckDiagonal(
          /*(int) */
          Math.floor(centerI),
          /*(int) */
          Math.floor(centerJ),
          stateCount[2],
          stateCountTotal
        ))) {
          var estimatedModuleSize = stateCountTotal / 7;
          var found = false;
          var possibleCenters = this.possibleCenters;
          for (var index = 0, length_1 = possibleCenters.length; index < length_1; index++) {
            var center = possibleCenters[index];
            if (center.aboutEquals(estimatedModuleSize, centerI, centerJ)) {
              possibleCenters[index] = center.combineEstimate(centerI, centerJ, estimatedModuleSize);
              found = true;
              break;
            }
          }
          if (!found) {
            var point = new FinderPattern(centerJ, centerI, estimatedModuleSize);
            possibleCenters.push(point);
            if (this.resultPointCallback !== null && this.resultPointCallback !== void 0) {
              this.resultPointCallback.foundPossibleResultPoint(point);
            }
          }
          return true;
        }
      }
      return false;
    };
    FinderPatternFinder2.prototype.findRowSkip = function() {
      var e_1, _a;
      var max = this.possibleCenters.length;
      if (max <= 1) {
        return 0;
      }
      var firstConfirmedCenter = null;
      try {
        for (var _b = __values(this.possibleCenters), _c = _b.next(); !_c.done; _c = _b.next()) {
          var center = _c.value;
          if (center.getCount() >= FinderPatternFinder2.CENTER_QUORUM) {
            if (firstConfirmedCenter == null) {
              firstConfirmedCenter = center;
            } else {
              this.hasSkipped = true;
              return (
                /*(int) */
                Math.floor((Math.abs(firstConfirmedCenter.getX() - center.getX()) - Math.abs(firstConfirmedCenter.getY() - center.getY())) / 2)
              );
            }
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return 0;
    };
    FinderPatternFinder2.prototype.haveMultiplyConfirmedCenters = function() {
      var e_2, _a, e_3, _b;
      var confirmedCount = 0;
      var totalModuleSize = 0;
      var max = this.possibleCenters.length;
      try {
        for (var _c = __values(this.possibleCenters), _d = _c.next(); !_d.done; _d = _c.next()) {
          var pattern = _d.value;
          if (pattern.getCount() >= FinderPatternFinder2.CENTER_QUORUM) {
            confirmedCount++;
            totalModuleSize += pattern.getEstimatedModuleSize();
          }
        }
      } catch (e_2_1) {
        e_2 = { error: e_2_1 };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        } finally {
          if (e_2) throw e_2.error;
        }
      }
      if (confirmedCount < 3) {
        return false;
      }
      var average = totalModuleSize / max;
      var totalDeviation = 0;
      try {
        for (var _e = __values(this.possibleCenters), _f = _e.next(); !_f.done; _f = _e.next()) {
          var pattern = _f.value;
          totalDeviation += Math.abs(pattern.getEstimatedModuleSize() - average);
        }
      } catch (e_3_1) {
        e_3 = { error: e_3_1 };
      } finally {
        try {
          if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        } finally {
          if (e_3) throw e_3.error;
        }
      }
      return totalDeviation <= 0.05 * totalModuleSize;
    };
    FinderPatternFinder2.prototype.selectBestPatterns = function() {
      var e_4, _a, e_5, _b;
      var startSize = this.possibleCenters.length;
      if (startSize < 3) {
        throw new NotFoundException();
      }
      var possibleCenters = this.possibleCenters;
      var average;
      if (startSize > 3) {
        var totalModuleSize = 0;
        var square = 0;
        try {
          for (var _c = __values(this.possibleCenters), _d = _c.next(); !_d.done; _d = _c.next()) {
            var center = _d.value;
            var size = center.getEstimatedModuleSize();
            totalModuleSize += size;
            square += size * size;
          }
        } catch (e_4_1) {
          e_4 = { error: e_4_1 };
        } finally {
          try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
          } finally {
            if (e_4) throw e_4.error;
          }
        }
        average = totalModuleSize / startSize;
        var stdDev = Math.sqrt(square / startSize - average * average);
        possibleCenters.sort(
          /**
           * <p>Orders by furthest from average</p>
           */
          // FurthestFromAverageComparator implements Comparator<FinderPattern>
          function(center1, center2) {
            var dA = Math.abs(center2.getEstimatedModuleSize() - average);
            var dB = Math.abs(center1.getEstimatedModuleSize() - average);
            return dA < dB ? -1 : dA > dB ? 1 : 0;
          }
        );
        var limit = Math.max(0.2 * average, stdDev);
        for (var i = 0; i < possibleCenters.length && possibleCenters.length > 3; i++) {
          var pattern = possibleCenters[i];
          if (Math.abs(pattern.getEstimatedModuleSize() - average) > limit) {
            possibleCenters.splice(i, 1);
            i--;
          }
        }
      }
      if (possibleCenters.length > 3) {
        var totalModuleSize = 0;
        try {
          for (var possibleCenters_1 = __values(possibleCenters), possibleCenters_1_1 = possibleCenters_1.next(); !possibleCenters_1_1.done; possibleCenters_1_1 = possibleCenters_1.next()) {
            var possibleCenter = possibleCenters_1_1.value;
            totalModuleSize += possibleCenter.getEstimatedModuleSize();
          }
        } catch (e_5_1) {
          e_5 = { error: e_5_1 };
        } finally {
          try {
            if (possibleCenters_1_1 && !possibleCenters_1_1.done && (_b = possibleCenters_1.return)) _b.call(possibleCenters_1);
          } finally {
            if (e_5) throw e_5.error;
          }
        }
        average = totalModuleSize / possibleCenters.length;
        possibleCenters.sort(
          /**
           * <p>Orders by {@link FinderPattern#getCount()}, descending.</p>
           */
          // CenterComparator implements Comparator<FinderPattern>
          function(center1, center2) {
            if (center2.getCount() === center1.getCount()) {
              var dA = Math.abs(center2.getEstimatedModuleSize() - average);
              var dB = Math.abs(center1.getEstimatedModuleSize() - average);
              return dA < dB ? 1 : dA > dB ? -1 : 0;
            } else {
              return center2.getCount() - center1.getCount();
            }
          }
        );
        possibleCenters.splice(3);
      }
      return [
        possibleCenters[0],
        possibleCenters[1],
        possibleCenters[2]
      ];
    };
    FinderPatternFinder2.CENTER_QUORUM = 2;
    FinderPatternFinder2.MIN_SKIP = 3;
    FinderPatternFinder2.MAX_MODULES = 57;
    return FinderPatternFinder2;
  })()
);
var Detector = (
  /** @class */
  (function() {
    function Detector2(image) {
      this.image = image;
    }
    Detector2.prototype.getImage = function() {
      return this.image;
    };
    Detector2.prototype.getResultPointCallback = function() {
      return this.resultPointCallback;
    };
    Detector2.prototype.detect = function(hints) {
      this.resultPointCallback = hints === null || hints === void 0 ? null : (
        /*(ResultPointCallback) */
        hints.get(DecodeHintType$1.NEED_RESULT_POINT_CALLBACK)
      );
      var finder = new FinderPatternFinder(this.image, this.resultPointCallback);
      var info = finder.find(hints);
      return this.processFinderPatternInfo(info);
    };
    Detector2.prototype.processFinderPatternInfo = function(info) {
      var topLeft = info.getTopLeft();
      var topRight = info.getTopRight();
      var bottomLeft = info.getBottomLeft();
      var moduleSize = this.calculateModuleSize(topLeft, topRight, bottomLeft);
      if (moduleSize < 1) {
        throw new NotFoundException("No pattern found in proccess finder.");
      }
      var dimension = Detector2.computeDimension(topLeft, topRight, bottomLeft, moduleSize);
      var provisionalVersion = Version.getProvisionalVersionForDimension(dimension);
      var modulesBetweenFPCenters = provisionalVersion.getDimensionForVersion() - 7;
      var alignmentPattern = null;
      if (provisionalVersion.getAlignmentPatternCenters().length > 0) {
        var bottomRightX = topRight.getX() - topLeft.getX() + bottomLeft.getX();
        var bottomRightY = topRight.getY() - topLeft.getY() + bottomLeft.getY();
        var correctionToTopLeft = 1 - 3 / modulesBetweenFPCenters;
        var estAlignmentX = (
          /*(int) */
          Math.floor(topLeft.getX() + correctionToTopLeft * (bottomRightX - topLeft.getX()))
        );
        var estAlignmentY = (
          /*(int) */
          Math.floor(topLeft.getY() + correctionToTopLeft * (bottomRightY - topLeft.getY()))
        );
        for (var i = 4; i <= 16; i <<= 1) {
          try {
            alignmentPattern = this.findAlignmentInRegion(moduleSize, estAlignmentX, estAlignmentY, i);
            break;
          } catch (re) {
            if (!(re instanceof NotFoundException)) {
              throw re;
            }
          }
        }
      }
      var transform = Detector2.createTransform(topLeft, topRight, bottomLeft, alignmentPattern, dimension);
      var bits = Detector2.sampleGrid(this.image, transform, dimension);
      var points;
      if (alignmentPattern === null) {
        points = [bottomLeft, topLeft, topRight];
      } else {
        points = [bottomLeft, topLeft, topRight, alignmentPattern];
      }
      return new DetectorResult(bits, points);
    };
    Detector2.createTransform = function(topLeft, topRight, bottomLeft, alignmentPattern, dimension) {
      var dimMinusThree = dimension - 3.5;
      var bottomRightX;
      var bottomRightY;
      var sourceBottomRightX;
      var sourceBottomRightY;
      if (alignmentPattern !== null) {
        bottomRightX = alignmentPattern.getX();
        bottomRightY = alignmentPattern.getY();
        sourceBottomRightX = dimMinusThree - 3;
        sourceBottomRightY = sourceBottomRightX;
      } else {
        bottomRightX = topRight.getX() - topLeft.getX() + bottomLeft.getX();
        bottomRightY = topRight.getY() - topLeft.getY() + bottomLeft.getY();
        sourceBottomRightX = dimMinusThree;
        sourceBottomRightY = dimMinusThree;
      }
      return PerspectiveTransform.quadrilateralToQuadrilateral(3.5, 3.5, dimMinusThree, 3.5, sourceBottomRightX, sourceBottomRightY, 3.5, dimMinusThree, topLeft.getX(), topLeft.getY(), topRight.getX(), topRight.getY(), bottomRightX, bottomRightY, bottomLeft.getX(), bottomLeft.getY());
    };
    Detector2.sampleGrid = function(image, transform, dimension) {
      var sampler = GridSamplerInstance.getInstance();
      return sampler.sampleGridWithTransform(image, dimension, dimension, transform);
    };
    Detector2.computeDimension = function(topLeft, topRight, bottomLeft, moduleSize) {
      var tltrCentersDimension = MathUtils.round(ResultPoint.distance(topLeft, topRight) / moduleSize);
      var tlblCentersDimension = MathUtils.round(ResultPoint.distance(topLeft, bottomLeft) / moduleSize);
      var dimension = Math.floor((tltrCentersDimension + tlblCentersDimension) / 2) + 7;
      switch (dimension & 3) {
        // mod 4
        case 0:
          dimension++;
          break;
        // 1? do nothing
        case 2:
          dimension--;
          break;
        case 3:
          throw new NotFoundException("Dimensions could be not found.");
      }
      return dimension;
    };
    Detector2.prototype.calculateModuleSize = function(topLeft, topRight, bottomLeft) {
      return (this.calculateModuleSizeOneWay(topLeft, topRight) + this.calculateModuleSizeOneWay(topLeft, bottomLeft)) / 2;
    };
    Detector2.prototype.calculateModuleSizeOneWay = function(pattern, otherPattern) {
      var moduleSizeEst1 = this.sizeOfBlackWhiteBlackRunBothWays(
        /*(int) */
        Math.floor(pattern.getX()),
        /*(int) */
        Math.floor(pattern.getY()),
        /*(int) */
        Math.floor(otherPattern.getX()),
        /*(int) */
        Math.floor(otherPattern.getY())
      );
      var moduleSizeEst2 = this.sizeOfBlackWhiteBlackRunBothWays(
        /*(int) */
        Math.floor(otherPattern.getX()),
        /*(int) */
        Math.floor(otherPattern.getY()),
        /*(int) */
        Math.floor(pattern.getX()),
        /*(int) */
        Math.floor(pattern.getY())
      );
      if (isNaN(moduleSizeEst1)) {
        return moduleSizeEst2 / 7;
      }
      if (isNaN(moduleSizeEst2)) {
        return moduleSizeEst1 / 7;
      }
      return (moduleSizeEst1 + moduleSizeEst2) / 14;
    };
    Detector2.prototype.sizeOfBlackWhiteBlackRunBothWays = function(fromX, fromY, toX, toY) {
      var result = this.sizeOfBlackWhiteBlackRun(fromX, fromY, toX, toY);
      var scale = 1;
      var otherToX = fromX - (toX - fromX);
      if (otherToX < 0) {
        scale = fromX / /*(float) */
        (fromX - otherToX);
        otherToX = 0;
      } else if (otherToX >= this.image.getWidth()) {
        scale = (this.image.getWidth() - 1 - fromX) / /*(float) */
        (otherToX - fromX);
        otherToX = this.image.getWidth() - 1;
      }
      var otherToY = (
        /*(int) */
        Math.floor(fromY - (toY - fromY) * scale)
      );
      scale = 1;
      if (otherToY < 0) {
        scale = fromY / /*(float) */
        (fromY - otherToY);
        otherToY = 0;
      } else if (otherToY >= this.image.getHeight()) {
        scale = (this.image.getHeight() - 1 - fromY) / /*(float) */
        (otherToY - fromY);
        otherToY = this.image.getHeight() - 1;
      }
      otherToX = /*(int) */
      Math.floor(fromX + (otherToX - fromX) * scale);
      result += this.sizeOfBlackWhiteBlackRun(fromX, fromY, otherToX, otherToY);
      return result - 1;
    };
    Detector2.prototype.sizeOfBlackWhiteBlackRun = function(fromX, fromY, toX, toY) {
      var steep = Math.abs(toY - fromY) > Math.abs(toX - fromX);
      if (steep) {
        var temp = fromX;
        fromX = fromY;
        fromY = temp;
        temp = toX;
        toX = toY;
        toY = temp;
      }
      var dx = Math.abs(toX - fromX);
      var dy = Math.abs(toY - fromY);
      var error = -dx / 2;
      var xstep = fromX < toX ? 1 : -1;
      var ystep = fromY < toY ? 1 : -1;
      var state = 0;
      var xLimit = toX + xstep;
      for (var x = fromX, y = fromY; x !== xLimit; x += xstep) {
        var realX = steep ? y : x;
        var realY = steep ? x : y;
        if (state === 1 === this.image.get(realX, realY)) {
          if (state === 2) {
            return MathUtils.distance(x, y, fromX, fromY);
          }
          state++;
        }
        error += dy;
        if (error > 0) {
          if (y === toY) {
            break;
          }
          y += ystep;
          error -= dx;
        }
      }
      if (state === 2) {
        return MathUtils.distance(toX + xstep, toY, fromX, fromY);
      }
      return NaN;
    };
    Detector2.prototype.findAlignmentInRegion = function(overallEstModuleSize, estAlignmentX, estAlignmentY, allowanceFactor) {
      var allowance = (
        /*(int) */
        Math.floor(allowanceFactor * overallEstModuleSize)
      );
      var alignmentAreaLeftX = Math.max(0, estAlignmentX - allowance);
      var alignmentAreaRightX = Math.min(this.image.getWidth() - 1, estAlignmentX + allowance);
      if (alignmentAreaRightX - alignmentAreaLeftX < overallEstModuleSize * 3) {
        throw new NotFoundException("Alignment top exceeds estimated module size.");
      }
      var alignmentAreaTopY = Math.max(0, estAlignmentY - allowance);
      var alignmentAreaBottomY = Math.min(this.image.getHeight() - 1, estAlignmentY + allowance);
      if (alignmentAreaBottomY - alignmentAreaTopY < overallEstModuleSize * 3) {
        throw new NotFoundException("Alignment bottom exceeds estimated module size.");
      }
      var alignmentFinder = new AlignmentPatternFinder(this.image, alignmentAreaLeftX, alignmentAreaTopY, alignmentAreaRightX - alignmentAreaLeftX, alignmentAreaBottomY - alignmentAreaTopY, overallEstModuleSize, this.resultPointCallback);
      return alignmentFinder.find();
    };
    return Detector2;
  })()
);
const Detector$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Detector
}, Symbol.toStringTag, { value: "Module" }));
export {
  ArgumentException as A,
  BitArray as B,
  CharacterSetECI as C,
  DetectorResult as D,
  Exception as E,
  FormatException as F,
  GridSamplerInstance as G,
  IllegalArgumentException as I,
  MathUtils as M,
  NotFoundException as N,
  ResultPoint as R,
  StringBuilder as S,
  UnsupportedOperationException as U,
  Version as V,
  BitMatrix as a,
  System as b,
  Integer as c,
  StringUtils as d,
  DecodeHintType$1 as e,
  StringEncoding as f,
  FormatInformation as g,
  Detector as h,
  Arrays as i,
  Float as j,
  IndexOutOfBoundsException as k,
  Detector$1 as l
};
//# sourceMappingURL=Detector-CKDKy-C-.js.map
