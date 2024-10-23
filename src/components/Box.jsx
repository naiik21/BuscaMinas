import { useState } from 'react'

function Box({ isOpen, addFlag, hasMine, nAdjacent, onClick, onFlagChange }) {
  const [flag, setFlag] = useState(addFlag)

  const handleFlag = (e) => {
    e.preventDefault() // Prevenir el menú contextual
    setFlag(!flag)
    onFlagChange(!flag) // Llamar a la función para actualizar el contador
  }

  return (
    <>
      {isOpen == false ? (
        flag == false ? (
          <td onContextMenu={handleFlag} onClick={onClick}>
            <img src='/public/fons20px.jpg' alt='' />
          </td>
        ) : (
          <td onContextMenu={handleFlag} onClick={onClick}>
            <img src='/public/badera20px.jpg' alt='' />
          </td>
        )
      ) : hasMine ? (
        <td>
          <img src='/public/mina20px.jpg' alt='' />
        </td>
      ) : (
        <td>{nAdjacent}</td>
      )}
    </>
  )
}

export default Box
