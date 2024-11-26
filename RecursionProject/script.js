
function fibs(n) {
    let result = [0, 1];
  
    if (n <= 1) {
      return result.slice(0, n);
    }
  
    for (let i = 2; i < n; i++) {
      result.push(result[i - 1] + result[i - 2]);
    }
  
    return result;
  }
  
  function fibsRec(n) {
    function calculateFib(num) {
      if (num <= 1) return num; 
      return calculateFib(num - 1) + calculateFib(num - 2); 
    }
  
    const sequence = [];
    for (let i = 0; i < n; i++) {
      sequence.push(calculateFib(i));
    }
  
    return sequence;
  }
  
  
  
  function displayFibonacci() {
    const fibInput = document.getElementById("fibInput").value;
    const n = parseInt(fibInput);
  
    if (isNaN(n) || n <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }
  
    const fibIterative = fibs(n);
    const fibRecursive = fibsRec(n);
  
    document.getElementById("fibResult").innerHTML = `
      <h3>Iterative Fibonacci:</h3> 
      <p>${fibIterative.join(", ")}</p>
      <h3>Recursive Fibonacci:</h3> 
      <p>${fibRecursive.join(", ")}</p>
    `;
  }

  function displayFibonaccibox(){
    document.getElementById("mergeSort").style.display = "none";
    document.getElementById("fibonacci").style.display = "block";
    document.getElementById("status").style.display = "none";
  }

  function displayMergesortbox(){
    document.getElementById("fibonacci").style.display = "none";
    document.getElementById("mergeSort").style.display = "block";
    document.getElementById("status").style.display = "none";
  }  
  
  
  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
  
    return merge(mergeSort(left), mergeSort(right));

  function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
}
  
  function displayMergeSort() {
    const sortInput = document.getElementById("sortInput").value;
    const arr = sortInput.split(",").map(num => parseInt(num.trim()));
  
    if (arr.some(isNaN)) {
      alert("Please enter valid numbers separated by commas.");
      return;
    }
  
    const sortedArray = mergeSort(arr);
  
    document.getElementById("mergeSortResult").innerHTML = `
      <h3>Sorted Array:</h3>
      <p>${sortedArray.join(", ")}</p>
    `;
  }
  

  document.addEventListener('DOMContentLoaded', function() {
    const main = document.getElementById("main")
    const status = document.createElement('p');  
    status.id = "status";
status.textContent = "Welcome to Recursive Function Programs";  // Set the text content
main.appendChild(status);
    document.getElementById("fibonacci").style.display = "none";
    document.getElementById("mergeSort").style.display = "none";
  });