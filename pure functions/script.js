// pure functions
// 1) same input gives same output

const add = (x, y) => x + y
console.log(add(2, 3))

const fullName = (first, last) => `${first} ${last}`
console.log(fullName('Hency', 'Dsouza'))

// 2) no side effects
const z = 5;
const sum = (x, y) => x + y + z;
console.log(sum(2, 2))

// impure example
let x = 1
const increment = () => x += 1
console.log(increment())
console.log(x)

// impure example 2
const myArray = [1, 2, 3]
const addToArray = (array, data) => {
    array.push(data)
    return array
}
console.log(addToArray(myArray, 4))
console.log(myArray)

// refactor example 1
const pureInrement = (num) => num += 1
console.log(pureInrement(x))
console.log(x)

// refactor example 2
const pureAddToArray = (array, data) => [...array, data]
console.log(pureAddToArray(myArray, 5))
console.log(myArray)

const oneToFive = [1, 2, 3, 4, 5]
const oddToFive = oneToFive.filter(elem => elem % 2 !== 0)
console.log(oddToFive)

const doubled = oneToFive.map(elem => elem * 2)
console.log(doubled)

const summed = oneToFive.reduce((acc, elem) => acc + elem)
console.log(summed)

console.log(oneToFive)