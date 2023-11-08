# Binary search tree

Implementation of a balanced binary search tree(BST) class in javascript. This is an assignment for [the odin project](https://www.theodinproject.com).

## Features

- A constructor that accepts an array of values and builds a balanced BST from them
- A `prettyPrint()` function that will show the tree in console
- `insert(value)` and `remove(value)` functions that take in a value and insert delete it from the tree. Inserting duplicates or removing values that are not in the tree will yield a console message
- A `find(value)` fuction that returns the node that has given value
- A `levelOrder(callback)` function that traverses the tree breadth-first and applies a callback to each node. By default this callback will store the nodes values in an array and then return it.
- `inOrder(callback)`, `preOrder(callback)` and `postOrder(callback)` functions that traverse the tree respective to their name and apply a callback to each node. This callback by default is the same as in `levelOrder(callback)`
- A `height(node)` function that accepts a node from the tree and returns it's height(distance in edges from the node to the farthest leaf)
- A `depth(node)` function that accepts a node from the tree and returns it's depth(distance in edges from the node to the root)
- An `isBalanced()` function that returns whether the tree is balanced or not
- A `rebalance()` function that rebalances the tree

### Script

The code also includes a small script that does the following:

1. Creates a binary search tree from an array of random numbers < 100.
2. Prints the tree in a structured format.
3. Confirms that the tree is balanced by calling `isBalanced`.
4. Prints out all elements in level, pre, post, and in order.
5. Unbalances the tree by adding several numbers > 100.
6. Confirms that the tree is unbalanced by calling `isBalanced`.
7. Balances the tree by calling `rebalance`.
8. Confirms that the tree is balanced by calling `isBalanced`.
9. Prints out all elements in level, pre, post, and in order again.
