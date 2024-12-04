class HashMap {
  constructor(capacity = 8, loadFactor = 0.75) {
    this.capacity = capacity; // Maximum number of buckets
    this.loadFactor = loadFactor; // Threshold to resize
    this.size = 0; // Number of stored keys
    this.buckets = new Array(capacity).fill(null).map(() => []); // Array of buckets
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let [k] of bucket) {
      if (k === key) return true;
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keysArray = [];
    for (let bucket of this.buckets) {
      for (let [key] of bucket) {
        keysArray.push(key);
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];
    for (let bucket of this.buckets) {
      for (let [, value] of bucket) {
        valuesArray.push(value);
      }
    }
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    for (let bucket of this.buckets) {
      for (let [key, value] of bucket) {
        entriesArray.push([key, value]);
      }
    }
    return entriesArray;
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
}

// Create an instance of HashMap
const hashMap = new HashMap();

// UI Functions
function setKeyValue() {
  const key = document.getElementById('key').value;
  const value = document.getElementById('value').value;
  hashMap.set(key, value);
  showOutput(`Set key "${key}" with value "${value}"`);
}

function getKey() {
  const key = document.getElementById('key').value;
  const value = hashMap.get(key);
  showOutput(value !== null ? `Value for key "${key}" is "${value}"` : `Key "${key}" not found`);
}

function removeKey() {
  const key = document.getElementById('key').value;
  const result = hashMap.remove(key);
  showOutput(result ? `Key "${key}" removed successfully` : `Key "${key}" not found`);
}

function hasKey() {
  const key = document.getElementById('key').value;
  const result = hashMap.has(key);
  showOutput(result ? `HashMap contains key "${key}"` : `HashMap does not contain key "${key}"`);
}

function getKeys() {
  showOutput(`Keys: ${JSON.stringify(hashMap.keys())}`);
}

function getValues() {
  showOutput(`Values: ${JSON.stringify(hashMap.values())}`);
}

function getEntries() {
  showOutput(`Entries: ${JSON.stringify(hashMap.entries())}`);
}

function clearHashMap() {
  hashMap.clear();
  showOutput("HashMap cleared");
}

function getLength() {
  showOutput(`Length: ${hashMap.length()}`);
}

function showOutput(message) {
  const output = document.getElementById('output');
  output.innerText = message;
  output.style.padding = '20px';
}
