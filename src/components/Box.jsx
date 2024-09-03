import { useState } from 'react'

function Box({ isOpen, addFlag, hasMine, nAdjacent }) {
  const [open, setOpen] = useState(isOpen)
  const [flag, setFlag] = useState(addFlag)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleFlag = () => {
    setFlag(!flag)
  }

  return (
    <>
      {open == false ? (
        flag == false ? (
          <td onContextMenu={handleFlag} onClick={handleOpen}>
            <img src="/public/fons20px.jpg" alt="" />
          </td>
        ) : (
          <td onContextMenu={handleFlag} onClick={handleOpen}>
            <img src="/public/badera20px.jpg" alt="" />
          </td>
        )
      ) : hasMine ? (
        <td>
          <img src="/public/mina20px.jpg" alt="" />
        </td>
      ) : (
        <td>{nAdjacent}</td>
      )}
    </>
  )
}

export default Box
