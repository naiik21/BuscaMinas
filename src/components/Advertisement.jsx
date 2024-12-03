import './advertisement.css'
function Advertisement({ onPlayAgain, onBackToMenu }) {
  return (
    <dialog>
      <p>Contenido</p>
      <form method='dialog'>
        <button onClick={onPlayAgain}>Jugar de nuevo</button>
        <button onClick={onBackToMenu}>Volver</button>
      </form>
    </dialog>
  )
}

export default Advertisement
