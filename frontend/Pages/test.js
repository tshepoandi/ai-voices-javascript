// function TreeConstructor(strArr) {
//   const pairsArray = strArr.map((arr) => {
//     return arr.match(/\d+/g)
//   })
//   // console.log(pairsArray)
//   const tree = []
//   let pair = []
//   for (let i = 0; i < pairsArray.length; i++) {
//     for (let j = 0; j < pairsArray[i].length; j++) {
//       if (pair.length == 0) {
//         pair.push(pairsArray[i])
//       }
//       if (j % 2 == 0) {
//         console.log(pairsArray[j])
//       }
//     }
//   }
// }

// const t1 = ['(1,2)', '(2,4)', '(5,7)', '(7,2)', '(9,5)']
// const t2 = ['(1,2)', '(3,2)', '(2,12)', '(5,2)']

// TreeConstructor(t1)
// console.log(TreeConstructor(t2))
// keep this function call here
// console.log(TreeConstructor()

function FindIntersection(strArr) {
  const firstString = strArr[0].split(',')
  const secondString = strArr[1].split(',')
  let result = []
  for (let i = 0; i < firstString.length; i++) {
    if (secondString.includes(firstString[i])) {
      result.push(firstString[i])
    }
  }

  return result
}

console.log(FindIntersection(['1, 3, 4, 7, 13', '1, 2, 4, 13, 15']))
