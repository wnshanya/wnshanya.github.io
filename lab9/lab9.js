'use strict'

function pow(x, n) {
    return x ** n;
}

function sumTo(n) {
   let sum = 0

   for (let i = 1; i <= n; i++) {
       sum += i
   }

   return sum;
}

function factorial(n) {   
    if (n <= 1) {
        return 1n
    } else {
       const result = BigInt(n) * BigInt(factorial(n - 1))

       return result
    }  
}

 function fib(n) {
    const a = BigInt(1)
    const b = BigInt(1)
    const c

    if (n == BigInt(0)) {
        return BigInt(0)
    } else { 
        for (i = BigInt(3); i <= n; i++) {
            c = a + b
            a = b
            b = c
        }

        return b
    }
}

function compare(x) {
    return function(y) {
        if (y > x) {
            return true
        } else if (y < x) {
            return false
        } else if (y == x) {
            return null
        }
    }
}

function sum() {
   var result = 0

   for (var i = 0; i < arguments.length; i++) {
       result += arguments[i] 
   }

   return result;
}
