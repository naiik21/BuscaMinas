import setMines from '../logic/setMines'
import Box from './Box'
import { useState, useEffect } from 'react'

function Board({ rows, columns }) {
  const [board, setBoard] = useState([])
  const [boardArray, setBoardArray] = useState([])

  useEffect(() => {
    createBoard()
  }, [rows, columns])

  const handleCalculateAdjacent = (boardArray, row, column) => {
    let mAdj = 0
    for (let n = -1; n <= 1; n++) {
      for (let i = -1; i <= 1; i++) {
        const newRow = row + n
        const newColumn = column + i
        try {
          if (boardArray[newRow][newColumn].hasMine) {
            mAdj += 1
          }
        } catch (e) {
          //Controla los bordes del tablero
        }
      }
    }
    return mAdj
  }
  //Función que crea el tablero de juego
  const createBoard = () => {
    let newBoardArray = []
    let newBoard = []
    let boxes = rows * columns
    let mines = (boxes * 17) / 100
    let flags = mines
    let orderMines = setMines(boxes, mines)
    let cont = 0

    // Inicializa el tablero con objetos
    for (let n = 0; n < rows; n++) {
      let row = []
      for (let i = 0; i < columns; i++) {
        const hasMine = orderMines[cont] === 1
        row.push({
          hasMine: hasMine,
          isOpen: false,
          addFlag: false,
          nAdjacent: 0 // Será calculado después
        })
        cont++
      }
      newBoardArray.push(row)
    }

    // Calcula el número de minas adyacentes para cada celda
    for (let n = 0; n < rows; n++) {
      for (let i = 0; i < columns; i++) {
        newBoardArray[n][i].nAdjacent = handleCalculateAdjacent(
          newBoardArray,
          n,
          i
        )
      }
    }

    //Tablero JSX
    for (let n = 0; n < rows; n++) {
      let row = []
      for (let i = 0; i < columns; i++) {
        row.push(
          <Box
            key={`${n}-${i}`}
            hasMine={newBoardArray[n][i].hasMine}
            isOpen={newBoardArray[n][i].isOpen}
            addFlag={newBoardArray[n][i].addFlag}
            nAdjacent={newBoardArray[n][i].nAdjacent}
          />
        )
        cont++
      }
      newBoard.push(<tr key={n}>{row}</tr>)
    }
    setBoardArray(newBoardArray)
    setBoard(newBoard)
  }

  return (
    <>
      <table>
        <tbody>{board}</tbody>
      </table>
    </>
  )
}

export default Board
