import { Card } from './'

function GameBoard({ cards, handleChoice, choiceOne, choiceTwo, disabled }) {

  return (
    <div className='game-board'>
      <div className="card-grid">
        {cards.map(card => (
          <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}

export default GameBoard
