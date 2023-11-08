function Node(value, left = null, right = null) {
  return { value, left, right };
}
function Tree(values) {
  let root = buildTree(values);
  let _valuesArray = [];
  function _buildTreeHelper(sortedValues, start, end) {
    /* returns root node of tree made with 
    the sorted values from index start to end */
    if (start > end) return null;
    const middle = Math.floor((end + start) / 2);
    const left = _buildTreeHelper(sortedValues, start, middle - 1),
      right = _buildTreeHelper(sortedValues, middle + 1, end),
      root = Node(sortedValues[middle], left, right);
    return root;
  }
  function buildTree(values) {
    values = values.sort((a, b) => a - b); // sort in ascending order
    values = values.filter((value, index, array) => value !== array[index - 1]); // remove duplicates
    const root = _buildTreeHelper(values, 0, values.length - 1);
    return root;
  }
  function prettyPrint(node = root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  function insert(value) {
    let currentNode = root;
    const newNode = Node(value);
    for (;;) {
      if (value === currentNode.value) {
        console.log("Cannot insert value that is already in tree");
        return;
      }
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          break;
        } else currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          break;
        } else currentNode = currentNode.right;
      }
    }
  }
  function remove(value) {
    let parrentOfNode = root,
      directionToNode, //whether node is on left or on the right side
      node;
    if (root.value === value) {
      parrentOfNode = null;
      node = root;
    } else {
      // we use this for loop to find the parent of the node we are searching for
      // as well as the direction from the parent to the node
      for (;;) {
        if (value < parrentOfNode.value) {
          if (parrentOfNode.left === null) {
            console.log("Cannot remove value that is not in tree");
            return;
          }
          if (parrentOfNode.left.value === value) {
            directionToNode = "left";
            break;
          }
          parrentOfNode = parrentOfNode.left;
        } else {
          if (parrentOfNode.right === null) {
            console.log("Cannot remove value that is not in tree");
            return;
          }
          if (parrentOfNode.right.value === value) {
            directionToNode = "right";
            break;
          }
          parrentOfNode = parrentOfNode.right;
        }
      }
      node = parrentOfNode[directionToNode];
    }
    // we separate the function into 3 cases:
    // whether no children, only one child or all children are present
    const nodeHasNoChildren = node.left === null && node.right === null,
      nodeHasAllChildren = node.left !== null && node.right !== null;
    if (nodeHasNoChildren) {
      // if node has no children
      // then just remove it from the parent
      if (node === root) root = null;
      else parrentOfNode[directionToNode] = null;
    } else if (nodeHasAllChildren) {
      // if node has all children
      // find the smallest bigger value node in the tree(most left node from right subtree)
      // and replace this node with that one
      let leftMostNode = node.right; // left most node in right subtree
      while (leftMostNode.left) leftMostNode = leftMostNode.left;
      const leftMostNodeValue = leftMostNode.value;
      remove(leftMostNodeValue);
      node.value = leftMostNodeValue;
    } else {
      // if node has exactly 1 child
      // replace the node with it's child
      const childNode = node.left !== null ? node.left : node.right;
      if (node === root) root = childNode;
      else parrentOfNode[directionToNode] = childNode;
    }
  }
  function find(value) {
    let currentNode = root;
    for (;;) {
      if (currentNode === null) return null;
      if (value === currentNode.value) return currentNode;
      if (value < currentNode.value) currentNode = currentNode.left;
      else currentNode = currentNode.right;
    }
  }
  function storeInArray(node) {
    _valuesArray.push(node.value);
  }
  function levelOrder(callback = storeInArray) {
    // if default callback, reset array
    const defaultCallback = callback === storeInArray;
    if (defaultCallback) _valuesArray = [];
    const queue = [];
    queue.push(root);
    while (queue.length > 0) {
      const node = queue[0];
      if (node === null) {
        queue.shift();
        continue;
      }
      callback(node);
      queue.push(node.left);
      queue.push(node.right);
      queue.shift();
    }
    if (defaultCallback) return _valuesArray;
  }
  function _inOrderHelper(callback, node) {
    if (node === null) return;
    _inOrderHelper(callback, node.left);
    callback(node);
    _inOrderHelper(callback, node.right);
  }
  function inOrder(callback = storeInArray) {
    // if default callback, reset array
    const defaultCallback = callback === storeInArray;
    if (defaultCallback) _valuesArray = [];
    _inOrderHelper(callback, root);
    if (defaultCallback) return _valuesArray;
  }
  function _preOrderHelper(callback, node) {
    if (node === null) return;
    callback(node);
    _preOrderHelper(callback, node.left);
    _preOrderHelper(callback, node.right);
  }
  function preOrder(callback = storeInArray) {
    // if default callback, reset array
    const defaultCallback = callback === storeInArray;
    if (defaultCallback) _valuesArray = [];
    _preOrderHelper(callback, root);
    if (defaultCallback) return _valuesArray;
  }
  function _postOrderHelper(callback, node) {
    if (node === null) return;
    _postOrderHelper(callback, node.left);
    _postOrderHelper(callback, node.right);
    callback(node);
  }
  function postOrder(callback = storeInArray) {
    // if default callback, reset array
    const defaultCallback = callback === storeInArray;
    if (defaultCallback) _valuesArray = [];
    _postOrderHelper(callback, root);
    if (defaultCallback) return _valuesArray;
  }
  function height(node) {
    // returns the number of edges in the longest path from a given node to a leaf node
    if (node === null) return -1; // leafs are height 0, so null is height -1
    return Math.max(height(node.left), height(node.right)) + 1;
  }
  function depth(node) {
    let currentNode = root,
      edgesPassed = 0;
    while (currentNode !== node) {
      if (node.value < currentNode.value) currentNode = currentNode.left;
      else currentNode = currentNode.right;
      edgesPassed++;
    }
    return edgesPassed;
  }
  function isBalanced() {
    let allNodesAreBalanced = true;
    function checkIfNodeIsBalanced(node) {
      if (Math.abs(height(node.left) - height(node.right)) > 1)
        allNodesAreBalanced = false;
    }
    levelOrder(checkIfNodeIsBalanced);
    return allNodesAreBalanced;
  }
  function rebalance() {
    //  takes the values array and creates a new balanced tree from it
    /*  we will use the default values array since it is 
        the one used by all tree traversal methods */
    levelOrder();
    root = buildTree(_valuesArray);
  }

  return {
    root,
    prettyPrint,
    insert,
    remove,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateRandomNumbersArray(length, min, max) {
  const array = [];
  for (let i = 1; i <= length; i++) array.push(generateRandomNumber(min, max));
  return array;
}

function script() {
  const tree = Tree(generateRandomNumbersArray(10, 0, 100)); // step 1
  tree.prettyPrint(); // step 2
  console.log(tree.isBalanced()); //step 3

  //step 4
  console.log(tree.levelOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());
  console.log(tree.inOrder());

  //step 5
  tree.insert(generateRandomNumber(101, 150));
  tree.insert(generateRandomNumber(101, 150));
  tree.insert(generateRandomNumber(101, 150));

  console.log(tree.isBalanced()); // step 6
  tree.rebalance(); // step 7
  console.log(tree.isBalanced()); // step 8

  // step 9
  console.log(tree.levelOrder());
  console.log(tree.preOrder());
  console.log(tree.postOrder());
  console.log(tree.inOrder());
}
script();
