const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }
    let current = this.rootNode;
    while (true) {
      if (data < current.data) {
        current.left ? current = current.left : current.left = newNode;
      } else {
        current.right ? current = current.right : current.right = newNode;
      }
      if (current.left === newNode || current.right === newNode) break;
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let current = this.rootNode;
    while (current && current.data !== data) {
      current = data < current.data ? current.left : current.right;
    }
    return current;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
      } else {
        if (!node.left) return node.right
        if (!node.right) return node.left;
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;
        node.right = removeNode(node.right, minRight.data);
      }
      return node;
    };
    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    let current = this.rootNode;
    while (current && current.left) {
      current = current.left;
    }
    return current ? current.data : null;
  }

  max() {
    let current = this.rootNode;
    while (current && current.right) {
      current = current.right;
    }
    return current ? current.data : null;
  }
}

module.exports = {
  BinarySearchTree
};