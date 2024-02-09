// currying
const buildSandwich = (ingredient1) => {
    return (ingredient2) => {
        return (ingredient3) => {
            return `${ingredient1}, ${ingredient2}, ${ingredient3}`
        }
    }
}

const mySandwich = buildSandwich("Bacon")("Lattuce")("Tomato")
console.log(mySandwich)

// refactored
const buildSammy = ingred1 => ingred2 => ingred3 => `${ingred1}, ${ingred2}, ${ingred3}`

const mySammy = buildSammy("turkey")("Cheese")("bread")
console.log(mySammy)

// example
const multiply = (x, y) => x * y;

const curriedMultiply = x => y => x * y

console.log(multiply(2, 3))
console.log(curriedMultiply(2))
console.log(curriedMultiply(2)(3))

// partially applied
const timesTen = curriedMultiply(10)
console.log(timesTen)
console.log(timesTen(8))

// another example
const updateElenText = id => content => document.querySelector(`#${id}`).textContent = content
const updateHederText = updateElenText('header')
updateHederText('hello there!')

// function composition
const addCustomer = fn => (...args) => {
    console.log('saving customer info...')
    return fn(...args)
}

const processOrder = fn => (...args) => {
    console.log(`processing order #${args[0]}`)
    return fn(...args)
}

let completeOrder = (...args) => {
    console.log(`Order #${[...args].toString()} completed`)
}

completeOrder = (processOrder(completeOrder))
console.log(completeOrder)
completeOrder = (addCustomer(completeOrder))
completeOrder("1000")

function addCustomer1(...args) {
    return function processOrder(...args) {
        return function completeOrder(...args) {
            // end
        }
    }
}

// requres a function with a fixed number of parameters
const curry = (fn) => {
    // console.log(fn.length)
    return curried = (...args) => {
        // console.log(args.length)
        if (fn.length !== args.length) {
            console.log(...args)
            return curried.bind(null, ...args)
        }
        return fn(...args);
    }
}

const total = (x, y, z) => x + y + z;

const curriedTotal = curry(total)
console.log(curriedTotal(10)(20)(30))