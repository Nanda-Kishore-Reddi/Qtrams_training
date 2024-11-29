class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
  
  class Tree {
    constructor(array) {
      const sortedArray = [...new Set(array)].sort((a, b) => a - b);
      this.root = this.buildTree(sortedArray);
    }
  
    buildTree(array) {
      if (array.length === 0) return null;
  
      const mid = Math.floor(array.length / 2);
      const root = new Node(array[mid]);
  
      root.left = this.buildTree(array.slice(0, mid));
      root.right = this.buildTree(array.slice(mid + 1));
  
      return root;
    }
  
    insert(value, node = this.root) {
      if (!node) return new Node(value);
  
      if (value < node.data) {
        node.left = this.insert(value, node.left);
      } else if (value > node.data) {
        node.right = this.insert(value, node.right);
      }
  
      return node;
    }
  
    deleteItem(value, node = this.root) {
      if (!node) return node;
  
      if (value < node.data) {
        node.left = this.deleteItem(value, node.left);
      } else if (value > node.data) {
        node.right = this.deleteItem(value, node.right);
      } else {
        if (!node.left) return node.right;
        if (!node.right) return node.left;
  
        const minNode = this.findMin(node.right);
        node.data = minNode.data;
        node.right = this.deleteItem(minNode.data, node.right);
      }
      return node;
    }
  
    findMin(node) {
      while (node.left) {
        node = node.left;
      }
      return node;
    }
  
    levelOrder(callback) {
      const queue = [this.root];
      while (queue.length) {
        const current = queue.shift();
        callback(current);
  
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
  
    inOrder(callback, node = this.root) {
      if (node) {
        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
      }
    }
  
    preOrder(callback, node = this.root) {
      if (node) {
        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
      }
    }
  
    postOrder(callback, node = this.root) {
      if (node) {
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
      }
    }
  
    height(node) {
      if (!node) return -1;
      return 1 + Math.max(this.height(node.left), this.height(node.right));
    }
  
    isBalanced(node = this.root) {
      if (!node) return true;
  
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
  
      return (
        Math.abs(leftHeight - rightHeight) <= 1 &&
        this.isBalanced(node.left) &&
        this.isBalanced(node.right)
      );
    }
  
    rebalance() {
      const values = [];
      this.inOrder(node => values.push(node.data));
      this.root = this.buildTree(values);
    }
  
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (node === null) return "";
  
      let result = "";
      if (node.right !== null) {
        result += this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      result += `${prefix}${isLeft ? "└── " : "┌── "}${node.data}\n`;
      if (node.left !== null) {
        result += this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
      return result;
    }
  }
  
  let tree = null;
  
  function initializeTree() {
    const arrayInput = document.getElementById("array").value;
    const array = arrayInput
      .split(",")
      .map(Number)
      .filter(n => !isNaN(n));
  
    if (array.length > 0) {
      tree = new Tree(array);
      displayTree();
      showOutput(`Tree initialized with array: [${array.join(", ")}]`);
    } else {
      showOutput("Please enter a valid array of numbers.");
    }
  }
  
  function insertValue() {
    const value = parseInt(document.getElementById("value").value, 10);
    if (!isNaN(value) && tree) {
      tree.insert(value);
      displayTree();
      showOutput(`Inserted value: ${value}`);
    } else {
      showOutput("Please initialize the tree first or provide a valid number.");
    }
  }
  
  function deleteValue() {
    const value = parseInt(document.getElementById("value").value, 10);
    if (!isNaN(value) && tree) {
      tree.deleteItem(value);
      displayTree();
      showOutput(`Deleted value: ${value}`);
    } else {
      showOutput("Please initialize the tree first or provide a valid number.");
    }
  }
  
  function checkBalance() {
    if (tree) {
      const balanced = tree.isBalanced();
      showOutput(`Tree is ${balanced ? "balanced" : "not balanced"}`);
    } else {
      showOutput("Please initialize the tree first.");
    }
  }
  
  function rebalanceTree() {
    if (tree) {
      tree.rebalance();
      displayTree();
      showOutput("Tree rebalanced");
    } else {
      showOutput("Please initialize the tree first.");
    }
  }
  
  function displayTree() {
    if (tree) {
      const treeStructure = tree.prettyPrint();
      document.getElementById("tree").innerText = treeStructure;
    } else {
      document.getElementById("tree").innerText = "Tree is not initialized.";
    }
  }
  
  function traverseTree(order) {
    if (tree) {
      const values = [];
      tree[order](node => values.push(node.data));
      showOutput(`${order} traversal: ${values.join(", ")}`);
    } else {
      showOutput("Please initialize the tree first.");
    }
  }
  
  function showOutput(message) {
    document.getElementById("output").innerText = message;
  }
  