'use strict'

export default function fib(n) {
    let a = 1n;
    let b = 1n;
    if (n == 0n) {
        return 0n;
    }
    else {
        for (let i = 3n; i <= n; i++) {
            let c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}
