import './buttonBox.css'
import { useState } from 'react'

function ButtonBox({ onDifficultySelect }) {
  const [screen, setScreen] = useState('initial')

  const handleStartClick = () => {
    setScreen('difficulty')
  }

  const handleBackClick = () => {
    setScreen('initial')
  }

  const renderInitialScreen = () => (
    <>
      <button id="inici" onClick={handleStartClick}>
        Iniciar una partida
      </button>
      <button id="estats" onClick="estadistiques()">
        Estadístiques
      </button>
    </>
  )

  const renderDifficultyScreen = () => (
    <>
      <button onClick={() => onDifficultySelect(10, 10)}>Fácil</button>
      <button onClick={() => onDifficultySelect(20, 20)}>Medio</button>
      <button onClick={() => onDifficultySelect(30, 30)}>Difícil</button>
      <button onClick={handleBackClick}>Volver</button>
    </>
  )
  return (
    <div id="botons">
      {screen === 'initial' ? renderInitialScreen() : renderDifficultyScreen()}
    </div>
  )
}

export default ButtonBox
