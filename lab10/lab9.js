'use strict'

/**
 * Возвращает n-е число Фибоначчи.
 *
 * @param {number} n порядковый номер числа Фибоначчи.
 * @return {number} b, n-е число Фибоначчи.
 */

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
