class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    append(value) {
        const node = new Node(value);
        if (this.isEmpty()) {
            this.head = node;
        } else {
            let prev = this.head;
            while (prev.next) {
                prev = prev.next;
            }
            prev.next = node;
        }
        this.size++;
    }

    prepend(value) {
        const node = new Node(value);
        if (this.isEmpty()) {
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }

    insertAt(value, index) {
        if (index < 0 || index > this.size) {
            alert("Invalid index");
            return;
        }

        if (index === 0) {
            this.prepend(value);
        } else {
            const node = new Node(value);
            let prev = this.head;
            for (let i = 0; i < index - 1; i++) {
                prev = prev.next;
            }
            node.next = prev.next;
            prev.next = node;
            this.size++;
        }
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) {
            alert("Invalid index");
            return;
        }

        let removedNode;
        if (index === 0) {
            removedNode = this.head;
            this.head = this.head.next;
        } else {
            let prev = this.head;
            for (let i = 0; i < index - 1; i++) {
                prev = prev.next;
            }
            removedNode = prev.next;
            prev.next = removedNode.next;
        }
        this.size--;
        return removedNode.value;
    }

    pop() {
        if (this.isEmpty()) {
            alert("List is Empty! Cannot pop.");
            return null;
        }

        if (this.head.next === null) {
            const lastNode = this.head;
            this.head = null;
            this.size--;
            return lastNode.value;
        }

        let prev = null;
        let curr = this.head;

        while (curr.next !== null) {
            prev = curr;
            curr = curr.next;
        }

        prev.next = null;
        this.size--;
        return curr.value;
    }

    find(value) {
        let index = 0;
        let curr = this.head;
        while (curr) {
            if (curr.value === value) {
                return index;
            }
            curr = curr.next;
            index++;
        }
        return -1;
    }

    toString() {
        if (this.isEmpty()) {
            return "List is Empty!";
        } else {
            let curr = this.head;
            let listValues = "";
            while (curr) {
                listValues += `(${curr.value}) -> `;
                curr = curr.next;
            }
            listValues += "null";
            return listValues;
        }
    }
}

const list = new LinkedList();

function prependNode() {
    const value = document.getElementById("valueInput").value;
    if (value.trim() === "") {
        alert("Please enter a valid value");
        return;
    }
    list.prepend(value);
    // displayList();
}

function appendNode() {
    const value = document.getElementById("valueInput").value;
    if (value.trim() === "") {
        alert("Please enter a valid value");
        return;
    }
    list.append(value);
    // displayList();
}

function insertNode() {
    const value = document.getElementById("valueInput").value;
    const index = parseInt(document.getElementById("indexInput").value);
    if (value.trim() === "" || isNaN(index)) {
        alert("Please enter a valid value and index");
        return;
    }
    list.insertAt(value, index);
    // displayList();
}

function removeNode() {
    const index = parseInt(document.getElementById("indexInput").value);
    if (isNaN(index)) {
        alert("Please enter a valid index");
        return;
    }
    list.removeAt(index);
    // displayList();
}

function popNode() {
    const poppedValue = list.pop();
    const output = document.getElementById("output");
    if (poppedValue !== null) {
        output.innerHTML = `<strong>Popped Value:</strong> ${poppedValue}<br><strong>Linked List:</strong> ${list.toString()}`;
    }
}

function findNode() {
    const value = document.getElementById("valueInput").value;
    if (value.trim() === "") {
        alert("Please enter a valid value");
        return;
    }
    const index = list.find(value);
    const output = document.getElementById("output");
    if (index !== -1) {
        output.innerHTML = `Value "${value}" found at index: ${index}`;
    } else {
        output.innerHTML = `Value "${value}" not found in the list.`;
    }
}

function displayList() {
    const output = document.getElementById("output");
    output.innerHTML = `<strong>Linked List:</strong> ${list.toString()}`;
}

function setalert(message){
    const output = document.getElementById("output");
    output.innerHTML = `Element ${message} successfuly`;
}
