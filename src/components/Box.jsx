import { useState } from 'react'

function Box({ isOpen, addFlag, hasMine, nAdjacent, onClick }) {
  const [flag, setFlag] = useState(addFlag)

  const handleFlag = () => {
    setFlag(!flag)
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
        //<td>{key[0]}</td>
      )}
    </>
  )
}

export default Box
