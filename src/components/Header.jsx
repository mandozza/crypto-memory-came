import { Button, Counter, HighScore } from './';
function Header({ shuffleCards, turns, highScore }) {
  return (
    <div>
      <h1>Crypto Memory Game</h1>
      <p>Welcome to the cryto memory game. flip over 2 cards to begin!</p>
      <div className='header-options'>
        <Button shuffleCards={shuffleCards} label='Start New Game'/>
        <Counter turns={turns}/>
        <HighScore highScore={highScore}/>
      </div>
    </div>
  )
}

export default Header
