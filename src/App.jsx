import './app.css'
import { useState } from 'react'
import ButtonBox from './components/ButtonBox'
import Board from './components/Board'

function App() {
  const [screen, setScreen] = useState('buttonBox')
  const [difficulty, setDifficulty] = useState('null')

  const handleDifficultySelect = (columns, rows) => {
    setDifficulty({ columns: columns, rows: rows })
    setScreen('board')
  }

  return (
    <>
      <header>
        <h1>PescaMinas</h1>
        <div className='container-logo'>
          <img
            className='logo'
            src='../public/bandera.jpg'
            alt='Banderas'
            height='50px'
          />
        </div>
      </header>
      <main>
        {screen === 'buttonBox' && (
          <ButtonBox onDifficultySelect={handleDifficultySelect} />
        )}
        {screen === 'board' && (
          <Board rows={difficulty.rows} columns={difficulty.columns} />
        )}
      </main>
    </>
  )
}

export default App
