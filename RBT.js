/*
 *
 *
 * 2-3 trees, a node can have up to two keys before rearranging
 * on third key, rearrange
 * key order: less, between, greater
 *
 * if there's a between, less and greater get split off into the left
 * and right children of the between key
 */

//{
//  lesser: null,
//  between: null,
//  greater: null,
//}

function exists(ns) {
    for (var i=0; i<arguments.length; i++) {
        var n = arguments[i];
        if (typeof n !== "number") {
            return false
        }
    }
    return true;
}

function makeNode(lesser, greater, currValue) {
    return {
      value: currValue,
      lesser: lesser,
      greater: greater
    };
}

function updateNode(node, nextValue) {
    //if gain a between, rearrange tree
    if (exists(node.lesser, node.greater)) {
        //next between value must become the parent
        //lesser and greater become own nodes and children

        if (nextValue >= node.lesser && nextValue <= node.greater) {
            //nextValue is in the middle
            //var nextLesser = makeNode(node.lesser);
            //var nextGreater = makeNode(node.greater);
        }

        if (nextValue < node.lesser) {
            //lesser is next middle
        }

        if (nextValue > node.greater) {
            //greater is next middle
        }
    }

    if (exists(node.lesser)) {
        if (nextValue < node.lesser) {
            node.greater = node.lesser;
            node.lesser = nextValue;
        }

        if (nextValue >= node.lesser) {
            node.greater = nextValue;
        }
    }

    if (exists(node.greater)) {
        if (nextValue < node.greater) {
            node.lesser = nextValue;
        }

        if (nextValue >= node.greater) {
            node.lesser = node.greater;
            node.greater = nextValue;
        }
    }
}
