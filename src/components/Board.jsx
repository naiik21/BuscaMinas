import setMines from '../logic/setMines'
import openAdv from '../logic/openAdv'
import Box from './Box'
import Advertisement from './Advertisement'
import { useState, useEffect } from 'react'

function Board({ rows, columns }) {
  const [boardArray, setBoardArray] = useState([])
  const [flagCount, setFlagCount] = useState(0) // Estado para contar las banderas
  const [openBox, setOpenBox] = useState(0) // Estado para contar las banderas

  //const [boxFree, setBoxFree] = useState(rows * columns)

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

  const handleOpen = (rowIndex, columnIndex) => {
    const newBoard = [...boardArray]
    const box = newBoard[rowIndex][columnIndex]

    if (!box.isOpen) {
      box.isOpen = true

      if (box.hasMine) {
        for (let n = 0; n < rows; n++) {
          for (let i = 0; i < columns; i++) {
            if (newBoard[n][i].hasMine) {
              newBoard[n][i].isOpen = true
            }
          }
        }
        openAdv()
      } else {
        // Usa la forma con callback para actualizar correctamente el estado
        setOpenBox((prevOpenBox) => prevOpenBox - 1)
        console.log(openBox)
      }

      if (box.nAdjacent === 0) {
        for (let n = -1; n <= 1; n++) {
          for (let i = -1; i <= 1; i++) {
            const newRow = rowIndex + n
            const newColumn = columnIndex + i
            try {
              handleOpen(newRow, newColumn)
            } catch (e) {
              //Controla los bordes del tablero
            }
          }
        }
      }

      setBoardArray(newBoard)
    }
  }

  // Función que actualiza el contador de banderas
  const handleFlagChange = (flagAdded) => {
    setFlagCount(flagCount + (flagAdded ? -1 : 1))
  }

  //Función que crea el tablero de juego
  const createBoard = () => {
    let newBoardArray = []
    let boxes = rows * columns
    let mines = (boxes * 17) / 100
    setOpenBox(boxes - mines)
    setFlagCount(mines)
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
    setBoardArray(newBoardArray)
  }

  const handlePlayAgain = () => {
    createBoard()
  }

  const handleBackToMenu = () => {
    console.log('advertisement') // Vuelve al menú
  }

  return (
    <>
      <p>Banderas colocadas: {flagCount}</p>
      {/* Mostrar el contador de banderas */}
      <table>
        <tbody>
          {boardArray.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((box, columnIndex) => (
                <Box
                  key={`${rowIndex}-${columnIndex}`}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  hasMine={box.hasMine}
                  isOpen={box.isOpen}
                  addFlag={box.addFlag}
                  nAdjacent={box.nAdjacent}
                  onClick={() => handleOpen(rowIndex, columnIndex)}
                  onFlagChange={handleFlagChange} // Pasar la función para actualizar banderas
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Advertisement
        onPlayAgain={handlePlayAgain}
        onBackToMenu={handleBackToMenu}></Advertisement>
    </>
  )
}

export default Board
