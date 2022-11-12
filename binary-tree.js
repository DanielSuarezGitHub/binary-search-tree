/* merge sort from previous project */
function mergesort(Arr) {
  if (Arr.length == 1) {
    return Arr;
  } else {
    let mid = Math.floor(Arr.length / 2);
    let arrL = Arr.slice(0, mid);
    let arrR = Arr.slice(mid);
    return merge(mergesort(arrL), mergesort(arrR));
  }
}

function merge(Arr1, Arr2) {
  let length = Arr1.length + Arr2.length;
  let merged = [];
  while (merged.length != length) {
    if (Arr1[0] <= Arr2[0] || Arr2.length == 0) {
      merged.push(Arr1[0]);
      Arr1.shift();
    } else {
      merged.push(Arr2[0]);
      Arr2.shift();
    }
  }
  return merged;
}

class Node {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }
}

class Tree {
  constructor(array) {
    this.array = mergesort([...new Set(array)]);
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;
    let mid = parseInt((start + end) / 2);
    let root = new Node(array[mid]);
    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);
    return root;
  }

  insertNode(data, root = this.root) {
    if (root == null) {
      root = new Node(data);
      return root;
    }

    if (data < root.data) {
      root.left = this.insertNode(data, root.left);
    } else if (data > root.data) {
      root.right = this.insertNode(data, root.right);
    }

    return root;
  }

  deletenode(data, root = this.root) {
    if (root == null) return root;

    if ( data < root.data) {
      root.left = this.deletenode(data, root.left);
      return root;
    } else if (data > root.data) {
      root.right = this.deletenode(data, root.right);
      return root;
    }

    if (root.left == null) {
      var temp = root.right;
      return temp;
    } else if (root.right == null) {
      var temp = root.left;
      return temp;
    } else {
      var succParent = root;

      // Find successor
      var succ = root.right;

      while (succ.left != null) {
        succParent = succ;
        succ = succ.left;
      }
      if (succParent != root) succParent.left = succ.right;
      else succParent.right = succ.right;

      // Copy Successor Data to root
      root.data = succ.data;

      return root;
    }
  }

  find(value, root = this.root) {
    if (root == null) return false
    if (root.data == value) return root

    if (value < root.data) {
      return  this.find(value, root.left);
    } else if (value > root.data) {
      return  this.find(value, root.right);
    }

    return root;
  }

  levelOrder() {
    let root = this.root
    if (root == null ) return []
    let queue = [this.root]
    let result = []

   while(queue.length != 0) {
    let current = queue.shift()

    if(current.left != null) {
      queue.push(current.left)
    }

    if (current.right != null) {
      queue.push(current.right)
    }
    result.push(current.data)
   }
   return result
  }

  inOrder(root = this.root, array = []) {
    if (root.left != null) {
      this.inOrder(root.left, array)
    }

    if (root.data != null) {
      array.push(root.data)
    }

    if (root.right != null) {
      this.inOrder(root.right, array)
    }

    return array
  }

  preOrder(root = this.root, array = []) {
    
    if (root.data != null) {
      array.push(root.data)
    }

    if (root.left != null) {
      this.preOrder(root.left, array)
    }



    if (root.right != null) {
      this.preOrder(root.right, array)
    }

    return array
  }

  postOrder(root = this.root, array = []) {
        


    if (root.left != null) {
      this.postOrder(root.left, array)
    }



    if (root.right != null) {
      this.postOrder(root.right, array)
    }

    if (root.data != null) {
      array.push(root.data)
    }

    return array
  }

  height(root = this.root) {
    if (root == null) {
        return 0
    }
    let leftheight = this.height(root.left)
    let rightheight = this.height(root.right)

    return Math.max(leftheight, rightheight) + 1

  }

  depth(x, root = this.root, depth = 0) {
    if (root == null) {
      return -1
    }
    if (root.data == x) return depth
    depth++
    let ld = this.depth(x, root.left, depth)
    let rd = this.depth(x, root.right, depth)


    return Math.max(ld, rd)
  }

  isBalanced(root = this.root) {
    let leftheight = this.height(root.left)
    let rightheight = this.height(root.right)
    if (Math.abs(rightheight - leftheight) > 1) {
      return false
    } else {
      return true
    }
  }

  rebalance() {
    let array = [...new Set(mergesort(this.postOrder()))]
    this.root = this.buildTree(array, 0, array.length -1)
  }
}

let myTree = new Tree([
  1, 2, 3,4,5,6,7,8,9,12,13,20,18,16,10,11]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};





myTree.insertNode(21)
myTree.insertNode(22)


prettyPrint(myTree.root)

console.log(myTree.postOrder());

console.log(myTree.height());

console.log(myTree.depth(5));

console.log(myTree.isBalanced());

myTree.rebalance()

console.log(myTree.isBalanced());

prettyPrint(myTree.root)



