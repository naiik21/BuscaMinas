export default function setMines(boxes, mines) {
  let orderMines = []
  for (let n = 0; n < boxes; n++) {
    orderMines.push(0)
  }
  for (let i = 0; i < mines; i++) {
    orderMines.shift()
    orderMines.push(1)
  }
  shuffle(orderMines)
  return orderMines
}
//Función que decidira el ordre de las minas
function shuffle(orderMines) {
  let currentIndex = orderMines.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[orderMines[currentIndex], orderMines[randomIndex]] = [
      orderMines[randomIndex],
      orderMines[currentIndex]
    ]
  }

  return orderMines
}
