'use strict'

/**
 * Возвращает x, возведённое в степень n.
 *
 * @param {number} x возводимое в степень число.
 * @param {number} n степень.
 * @return {number} x ** n, результат возведения в степень n числа x.
 */

function pow(x, n) {
    return x ** n;
}

/**
 * Возвращает сумму чисел от 1 до n.
 *
 * @param {number} n супремум.
 * @return {number} sum, сумма чисел от 1 до n.
 */

function sumTo(n) {
   let sum = 0

   for (let i = 1; i <= n; i++) {
       sum += i
   }

   return sum;
}

/**
 * Возвращает факториал числа n.
 *
 * @param {number} n число, факториал которого должен быть вычисленным.
 * @return {number} result, факториал числа n.
 */

function factorial(n) {   
    if (n <= 1) {
        return 1n
    } else {
       let result = BigInt(n) * BigInt(factorial(n - 1))

       return result
    }  
}

/**
 * Возвращает n-е число Фибоначчи.
 *
 * @param {number} n порядковый номер числа Фибоначчи.
 * @return {number} b, n-е число Фибоначчи.
 */

 function fib(n) {
    let a = BigInt(1)
    let b = BigInt(1)
    let c

    if (n == BigInt(0)) {
        return BigInt(0)
    } else { 
        for (let i = BigInt(3); i <= n; i++) {
            c = a + b
            a = b
            b = c
        }

        return b
    }
}

/**
 * Возвращает результат сравнения значений x и y.
 *
 * @param {number} x первый аргумент.
 * @param {number} y второй аргумент.
 * @return {function} анонимная функция, которая возвращает true, false или null
 */

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

/**
 * Возвращает сумму всех своих аргументов.
 *
 * @param {number} список аргументов.
 * @return {number} result, сумма всех аргументов.
 */

function sum() {
   var result = 0

   for (var i = 0; i < arguments.length; i++) {
       result += arguments[i] 
   }

   return result;
}
