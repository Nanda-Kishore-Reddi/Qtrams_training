

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(){
        this.head = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;    
    }

    getSize() {
        return this.size;
    }

    append(value) {
        const node = new Node(value);
        if (this.isEmpty()) {
            this.head = node;

        }else {
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

        }else {
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }

    listHead() {
      return this.head;
    }

    tail() {
        let curr = this.head;
           while (curr.next) {
            curr = curr.next;
           }
        return curr;
    }

    at(index) {
        let current = this.head;
        let currentIndex = 0;

        while (current !== null) {
            if (currentIndex === index) {
                return current;  
            }
            current = current.next;
            currentIndex++;
        }
        return null;  
    }

    pop() {
        if (!this.head) {
            return null;  
        }

        if (!this.head.next) {
            const lastNode = this.head;  
            this.head = null;  
            return lastNode;  
        }

        let current = this.head;
        while (current.next && current.next.next) {
            current = current.next;  
        }

        const lastNode = current.next;  
        current.next = null;  
        this.size--; 
        return lastNode;  
    }

    contains(value) {
        if(this.isEmpty()) {
            return false;
        }
        let i = 0;
        let curr = this.head;
        while (curr) {
            if (curr.value === value) {
                return true;
            }
            curr = curr.next;
            i++;
        }
        return false;
    }

    find(value) {
        if(this.isEmpty()) {
            return null;
        }
        let i = 0;
        let curr = this.head;
        while (curr) {
            if (curr.value === value) {
                return i;
            }
            curr = curr.next;
            i++;
        }
        return null;
    }
    
    toString() {
        if (this.isEmpty()) {
            console.log("List is Empty!");
        }else {
            let curr = this.head;
            let listValues = "";
            while (curr) {
                listValues += `(${curr.value}) -> `;
                curr = curr.next;              

            }
            listValues += "null";
            console.log(listValues);
        }
    }

    insertAt(value, index){
        if(index < 0 || index > this.size) {
            return
        }

        if(index === 0){
            this.prepend(value)
        }else {
            const node = new Node(value)
            let prev = this.head
            for (let i = 0; i < index-1; i++) {
                prev = prev.next;                
            }
            node.next = prev.next;
            prev.next = node;
            this.size++;
        }        
    }

    removeAt(index){
        if(index < 0 || index >= this.size) {
            return null;
        }
        let removedNode
        if (index === 0) {
            removedNode = this.head;
            this.head = this.head.next
        }else {
            let prev = this.head
            for(let i = 0; i< index - 1; i++){
                prev = prev.next;
            }
            removedNode = prev.next;
            prev.next = removedNode.next;
        }
        this.size--;
        return removedNode.value;
    }

}


const list = new LinkedList();
console.log("Is list empty?", list.isEmpty());
console.log("Size of the List", list.getSize());

list.toString();
list.prepend("BOYEZ");
list.toString();
list.prepend("ANIL");
list.toString();
list.append("NANDAKISHORE");
list.toString();
list.removeAt(1);
list.toString();
list.append(40);
list.toString();
console.log("Size of the List", list.getSize());
list.insertAt("VINAY", 0);
list.insertAt("RAJU", 1);
list.insertAt("ALTERNATEPREPEND", -1)
list.toString();

list.insertAt("QTRAMS", 4)
list.toString();

list.insertAt(61, 2)
list.toString();

