var assert = require('chai').assert;

function isNumber(n) {
  return typeof n === "number";
}

function getNode(left, right, threshold) {
  var m = {};

  function memoized(name, F) {
    var output = m[name];
    if (output) {
      return output;
    }
    if (typeof F === "function") {
      m[name] = F();
    } else {
      m[name] = F;
    }

    return m[name];
  }

  return {
    name: "node",
    max: memoized("max", function() {
      if (isNumber(left.max) && isNumber(right.max)) {
        return Math.max(left.max, right.max);
      }

      if (isNumber(right.max)) {
        return Math.max(left.max(), right.max);
      }

      if (isNumber(left.max)) {
        return Math.max(left.max, right.max());
      }

      return Math.max(left.max(), right.max());
    }),
    getLeaves: function() {
      return left.getLeaves().concat(right.getLeaves());
    },
    left: left,
    right: right
  };
}

function getLeaf(A, start, end) {
  var subarray = A.slice(start, end);

  return {
    name: "leaf",
    max: function() {
      return Math.max(subarray);
    },
    getLeaves: function() {
      return subarray;
    },
    value: subarray
  };
}

function makeBinTree(A, start, end) {
  if (end - start === 1) {
    return getLeaf(A, start, end);
  }
  var mid = Math.floor((end - start)/2);
  return getNode(makeBinTree(A, start, start + mid), makeBinTree(A, start + mid, end));
}

var x = [1,7,9,4,6,4,3,4];
var r = [7,9,3,4,5,6,6];

var res = makeBinTree(x, 0, x.length);
var max = res.max;
var leaves = res.getLeaves();

assert.equal(max, 9, "max of "+x+"should be 9");
assert.deepEqual(leaves, x, "should be the same as array the tree was build from");

var leftMax = res.left.max;
var leftLeaves = res.left.getLeaves();
var rightMax = res.right.max;
var rightLeaves = res.right.getLeaves();

assert.equal(leftMax, 9, "left max is the max on the left side of the tree");
assert.equal(rightMax, 6, "right max is the max on the right side of the tree");

assert.deepEqual(leftLeaves, [1,7,9,4], "root's left leaves should be only those on the left side of the tree");
assert.deepEqual(rightLeaves, [6,4,3,4], "root's right leaves should be only those on the right side of the tree");
