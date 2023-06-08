'use strict'

import fib from './lab9.js'

/**
 * Программа возвращает дробную часть числа num.
 *
 * @param {number} num число, дробную часть которого нужно вернуть.
 * @returns {function} результат выполнения методов, вычисляющие дробную часть числа num.
 */

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

/**
 * Функция  возвращает строку str с заглавным первым символом.
 *
 * @param {string} str строка, первый символ которой нужно вернуть.
 * @returns {string} возвращает строку str с заглавным первым символом.
 */

export function ucFirst(str) {
    if (!str) {
        return str
    } else {
        return str[0].toUpperCase() + str.slice(1)
    }
}

/**
 * Функция возвращает true, если строка str содержит 'viagra' или 'XXX', в противном случае false.
 *
 * @param {string} str строка, которую необходимо проверить на "лишние" слова.
 * @returns {bool} возвращает true, если строка str содержит 'viagra' или 'XXX', в противном случае false.
 */

export function checkSpam(str) {
    let new_str = str.toLowerCase()

    return new_str.includes('viagra') || new_str.includes('xxx')
}

/**
 * Функция проверяет длину строки str и, если она превосходит maxlength, заменяет конец str на символ многоточие "…".
 *
 * @param {string} str строка, которая проверяется на длину.
 * @param {number} maxlength длина строки, которую нельзя превысить.
 * @returns {string} результатом функции является отформатированная строка.
 */

export function truncate(str, max_length) {
    if (str.length < max_length) {
        return str
    } else {
        return str.slice(0, max_length - 1) + '…'
    }
}

/**
 *  Функция удаляет из строки символ девиса '-'.
 *
 * @param {string} str строка, из которой необходимо удалить символ дефиса.
 * @returns {string] new_str, строка без символа дефиса.
 */

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

/**
 * Функция возвращает массив, заполненный числами Фибоначчи до n члена последовательности итальянского математика.
 *
 * @param {number} n необходимое количество членов последовательности ФиБоначчи.
 * @returns {array}  mas, массив, заполненный члена последовательности итальянского математика.
 */

export function fibs(n){  
        let mas = []
        for (let i = 0; i < n; i++) {
          mas.push(fib(i))
        }

        return mas
}

/**
 * Функция возвращает отсортированный по убыванию массив.
 *
 * @param {array} arr массив, который необходимо отсортировать.
 * @returns {array} отсортированный по убыванию массив, полученный в результате выполнения анониманой функции.
 */

export function  arrReverseSorted(arr) {
    let arr_copy = arr.slice();
    
    return arr_copy.sort(function (a, b) {
        return b - a
    })
}

/**
 * Функция возвращает измененный массив, состоящий из уникальных значений (аналог set).
 *
 * @param {array} arr массив, из которого нужно сделать множество.
 * @returns {array} arr_copy, массив уникальных значений.
 */

export function unique(arr) {
    let arr_copy = arr
    
    return Array.from(new Set(arr_copy))
}
