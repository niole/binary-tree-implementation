var assert = require('chai').assert;

function Node(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
}

Node.prototype.subnodes = function() {
  if (this.isLeaf()) {
    return [this.value];
  }

  if (this.right && this.left) {
    return this.left.subnodes().concat([this.value], this.right.subnodes());
  } else if (this.right) {
    return [this.value].concat(this.right.subnodes());
  } else if (this.left) {
    return this.left.subnodes().concat([this.value]);
  }
};

Node.prototype.isLeaf = function() {
  return !this.left && !this.right;
};

Node.prototype.median = function(nodes) {
  return Math.floor(nodes.length/2);
};

Node.prototype.balance = function() {
  //if even, pick left as median
  //in a balanced tree
  //this node should be the median
  //of the set of itself and its child nodes
  //if its own value is not the median,
  //move this node up or down accordingly
  if (this.isLeaf()) {
    return this;
  }

  var subnodes = this.subnodes();
  var medianIndex = this.median(subnodes);
  var median = subnodes[medianIndex];
  console.log('median', median);
  console.log('subnodes', subnodes);
  if (median !== this.value) {
    //must rebalance this part of the tree
    if (median > this.value) {
      //move this node left and move median up to
      //where this node is
      var newThis = new Node(this.value, this.left);
      this.right.addNode(newThis);

      if (this.right) {
        this.right = this.right.balance();
      }

      return this.right
    } else if (median < this.value) {
      //move this node right and move median up to
      //where this node is
      var newThis = new Node(this.value, undefined, this.right);
      this.left.addNode(newThis);

      if (this.left) {
        this.left = this.left.balance();
      }

      return this.left;
    }
  }
  //no rebalancing needed here
  //keep going down
  if (this.left) {
    this.left = this.left.balance();
  }

  if (this.right) {
    this.right = this.right.balance();
  }

  return this;
};

Node.prototype.min = function() {
  if (this.left) {
    return this.left.min();
  }
  return this.value;
}

Node.prototype.max = function() {
  if (this.right) {
    return this.right.max();
  }
  return this.value;
}

Node.prototype.isNumber = function(n) {
  return typeof n === "number";
}

Node.prototype.leaves = function() {
  var leaves = [];

  if (this.isLeaf()) {
    return [this.value];
  }

  if (this.left) {
    leaves = leaves.concat(this.left.leaves());
  }

  if (this.right) {
    leaves = leaves.concat(this.right.leaves());
  }

  return leaves;
}

Node.prototype.addNode = function(nextNode) {
  var nextValue = nextNode ? nextNode.value : null;
  var leftValue = this.left && this.left.value;
  var rightValue = this.right && this.right.value;

  if (nextValue && nextValue < this.value) {
    if (this.isNumber(leftValue)) {
        //recurse on the left
        this.left.addNode(nextNode);
    } else {
      this.left = nextNode;
    }
  } else if (nextValue  && nextValue >= this.value) {
    if (this.isNumber(rightValue)) {
      //recurse on the right
      this.right.addNode(nextNode);
    } else {
      this.right = nextNode;
    }
  }
};

Node.prototype.displayName = "Node";
Node.prototype.constructor = Node;

var unbalanced = new Node(5, new Node(4, new Node(3, new Node(2))));
var balanced = unbalanced.balance();
console.log('unbalanced', unbalanced);
console.log('balanced', balanced);
console.log('balanced.subnodes()', balanced.subnodes());
var subs = balanced.subnodes();
assert.equal(subs[balanced.median(subs)], balanced.value,
             "root node value is the median of the subnodes");

var node2 = new Node(2, new Node(1), new Node(4));
var node3 = new Node(3);
var node5 = new Node(5);

assert.equal(node2.value, 2, "root node is value 2");
assert.equal(node2.left.value, 1, "root node is value 1");
assert.equal(node2.right.value, 4, "root node is value 4");

node2.addNode(node3);

assert.equal(node2.right.left.value, 3, "newly added is of value 3");

node2.addNode(node5);

assert.equal(node2.right.right.value, 5, "newly added is of value 5");
assert.deepEqual(node2.leaves(), [1, 3, 5], "leaves should be [1, 3, 5]");
assert.equal(node2.leaves().length, 3, "leaves length is 3");
assert.equal(node2.min(), 1, "min is 1");
assert.equal(node2.max(), 5, "max is 5");
