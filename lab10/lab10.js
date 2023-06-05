'use strict'

import fib from './lab9.js'

export function getDecimal(num) {
    if (Math.trunc(num) == num) {
        return 0
    }
    else if (num < 0) {
        return num - (-Math.ceil(-num))
    }

    if (num > 1) {
        return +(num - Math.trunc(num)).toFixed(2)
    }
}

export function ucFirst(str) {
    if (!str) {
        return str
    } else {
        return str[0].toUpperCase() + str.slice(1)
    }
}

export function checkSpam(str) {
    let new_str = str.toLowerCase()

    return new_str.includes('viagra') || new_str.includes('xxx')
}

export function truncate(str, max_length) {
    if (str.length < max_length) {
        return str
    } else {
        return str.slice(0, max_length - 1) + '…'
    }
}

export function camelize(str){
    let buff_str = str.split("-")
    let new_str = ""

    for (let i = 0; i <= buff_str.length - 1; i++) {
        if (i == 0) {
            new_str = buff_str[0]
        } else {
            new_str += ucFirst(buff_str[i])
        }
    }

    return new_str
}

export function fibs(n){  
        let mas = []
        for (let i = 0; i < n; i++) {
          mas.push(fib(i))
        }

        return mas
}

export function  arrReverseSorted(arr) {
    let arr_copy = arr.slice();
    
    return arr_copy.sort(function (a, b) {
        return b - a
    })
}

export function unique(arr) {
    let arr_copy = arr
    
    return Array.from(new Set(arr_copy))
}
