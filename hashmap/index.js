function createHashMap(loadFactor = 0.75, initialCapacity = 16) {
    let capacity = initialCapacity;
    let size = 0;
    let buckets = Array(capacity).fill(null).map(() => []);
  
    function hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
      }
      return hashCode;
    }
  
    function resize() {
      const oldBuckets = buckets;
      capacity *= 2;
      buckets = Array(capacity).fill(null).map(() => []);
      size = 0;
  
      for (const bucket of oldBuckets) {
        for (const [key, value] of bucket) {
          set(key, value);
        }
      }
    }
  
    function set(key, value) {
      const index = hash(key);
      const bucket = buckets[index];
  
      for (const pair of bucket) {
        if (pair[0] === key) {
          pair[1] = value; 
          return;
        }
      }
  
      bucket.push([key, value]); 
      size++;
  
      if (size / capacity > loadFactor) {
        resize();
      }
    }
  
    function get(key) {
      const index = hash(key);
      const bucket = buckets[index];
  
      for (const [storedKey, value] of bucket) {
        if (storedKey === key) {
          return value;
        }
      }
  
      return null; 
    }
  
    function has(key) {
      return get(key) !== null;
    }
  
    function remove(key) {
      const index = hash(key);
      const bucket = buckets[index];
  
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1); 
          size--;
          return true;
        }
      }
  
      return false; 
    }
  
    function length() {
      return size;
    }
  
    function clear() {
      buckets = Array(capacity).fill(null).map(() => []);
      size = 0;
    }
  
    function keys() {
      const allKeys = [];
      for (const bucket of buckets) {
        for (const [key] of bucket) {
          allKeys.push(key);
        }
      }
      return allKeys;
    }
  
    function values() {
      const allValues = [];
      for (const bucket of buckets) {
        for (const [, value] of bucket) {
          allValues.push(value);
        }
      }
      return allValues;
    }
  
    function entries() {
      const allEntries = [];
      for (const bucket of buckets) {
        for (const pair of bucket) {
          allEntries.push(pair);
        }
      }
      return allEntries;
    }
  
    return {
      set,
      get,
      has,
      remove,
      length,
      clear,
      keys,
      values,
      entries,
    };
  }
  
  const test = createHashMap(0.75);
  
  
  test.set('apple', 'red');
  test.set('banana', 'yellow');
  test.set('carrot', 'orange');
  test.set('dog', 'brown');
  test.set('elephant', 'gray');
  test.set('frog', 'green');
  test.set('grape', 'purple');
  test.set('hat', 'black');
  test.set('ice cream', 'white');
  test.set('jacket', 'blue');
  test.set('kite', 'pink');
  test.set('lion', 'golden');
  
  test.set('apple', 'green');
  console.log(test.get('apple')); 
  
  test.set('moon', 'silver');
  
  
  console.log(test.length()); 
  console.log(test.keys());
  console.log(test.values());
  console.log(test.entries());
  console.log(test.has('moon')); 
  console.log(test.remove('lion')); 
  console.log(test.get('lion')); 
  test.clear();
  console.log(test.length()); 
  