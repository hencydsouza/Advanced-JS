// functional programming

const add2 = (x) => x + 2
const subtract1 = (x) => x - 1
const multiplyBy5 = (x) => x * 5

const result = multiplyBy5(subtract1(add2(4)))
console.log(result)

// compose functions
const compose = (...fns) => val => fns.reduceRight((prev, fn) => fn(prev), val)

const compResult = compose(multiplyBy5, subtract1, add2)(4)
console.log(compResult)

// pipe
const pipe = (...fns) => (val) => fns.reduce((prev, fn) => fn(prev), val)

const pipeResult = pipe(add2, subtract1, multiplyBy5)(5)
console.log(pipeResult)

// separate lines
const pipeResult2 = pipe(
    add2,
    subtract1,
    multiplyBy5
)(6)
console.log(pipeResult2)

// example with a 2nd parameter
const divideBy = (divisor, num) => num / divisor;

const pipeResult3 = pipe(
    add2,
    subtract1,
    multiplyBy5,
    x => divideBy(2, x)
)(5)
console.log(pipeResult3)

// curry
const divBy = (divisor) => (num) => num / divisor
const divideBy2 = divBy(2)

const pipeResult4 = pipe(
    add2,
    subtract1,
    multiplyBy5,
    divideBy2
)(5)
console.log(pipeResult4)

// examples beyond math functions
const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum at elit eget lobortis. Morbi mollis dui nec turpis dapibus, non euismod metus euismod. Donec mauris ipsum, eleifend ac nisi nec, porttitor fermentum turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis elementum enim. Vivamus posuere egestas massa, sed accumsan felis varius sit amet. Donec vel hendrerit augue. In auctor sit amet augue id accumsan. Pellentesque nec magna egestas, posuere dolor hendrerit, consectetur erat."

const splitOnSpace = (string) => string.split(' ');
const count = (array) => array.length;

const wordCount = pipe(
    splitOnSpace,
    count
)

console.log(wordCount(lorem))

// resuable pipe function
const egbdf = "Every good boy does fine"
console.log(wordCount(egbdf))

// combining process
const pal1 = "taco cat"
const pal2 = "UFO tofu"
const pal3 = "Hency"

const split = (string) => string.split('')
const join = (string) => string.join('')
const lower = (string) => string.toLowerCase()
const reverse = (array) => array.reverse()

const fwd = pipe(
    splitOnSpace,
    join,
    lower
)

const rev = pipe(
    fwd,
    split,
    reverse,
    join
)

console.log(fwd(pal1) === rev(pal1))
console.log(fwd(pal2) === rev(pal2))
console.log(fwd(pal3) === rev(pal3))

// clone / copy functions within a pipe or compose function

// 1)clone object before an impure function mutates it
const scoreObj = { home: 0, away: 0 }

const shallowClone = (obj) => Array.isArray(obj) ? [...obj] : { ...obj }

const incrementHome = (obj) => {
    obj.home += 1
    return obj
}

const homeScore = pipe(
    shallowClone,
    incrementHome
)

console.log(homeScore(scoreObj))
console.log(scoreObj)
console.log(homeScore(scoreObj) === scoreObj)

// 2) curry the fucniton to create a partial that is unary
let incrementHomeB = (cloneFn) => (obj) => {
    const newObj = cloneFn(obj);
    newObj.home += 1
    return newObj
}

// create the partial by applying the first argument in advance
incrementHomeB = incrementHomeB(shallowClone)

const homeScoreB = pipe(
    incrementHomeB
)
console.log(homeScoreB(scoreObj))
console.log(scoreObj)

// 3) insert the clone functionas a dependency
const incrementHomeC = (obj, cloneFn) => {
    const newObj = cloneFn(obj);
    newObj.home += 1
    return newObj
}

const homeScoreC = pipe(
    x => incrementHomeC(x, shallowClone)
)

console.log(homeScoreC(scoreObj))
console.log(scoreObj)