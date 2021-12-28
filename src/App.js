import { useState, useEffect, useCallback } from 'react';
import { Header, GameBoard } from './components';
import './App.css';


const cardImages = [
  {
    label: 'Bitcoin',
    src: '/cards/bitcoin.png',
    matched: false,
  },
  {
    label: 'Ethereum',
    src: '/cards/ethereum.png',
    matched: false,
  },
  {
    label: 'Cardano',
    src: '/cards/cardano.png',
    matched: false,
  },
  {
    label: 'Chainlink',
    src: '/cards/chainlink.png',
    matched: false,
  },
  {
    label: 'Polkadot',
    src: '/cards/polkadot.png',
    matched: false,
  },
  {
    label: 'Uniswap',
    src: '/cards/uniswap.png',
    matched: false,
  }
];


function App() {
  // set up state
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const highScore = localStorage.getItem('highScore');
    return highScore ? parseInt(highScore) : 0;
  });

  // shuffle the cards
  const shuffleCards = useCallback(() => {
    const shuffledCards = [...cardImages,...cardImages]
      .sort(() => 0.5 - Math.random())
      .map((card, index) => ({ ...card, id: index }))

    setCards(shuffledCards)
    setTurns(0)
    setMatchCount(0)
    setChoiceOne(null)
    setChoiceTwo(null)
  }, [])

  // Kick of the game.

//Handle the click event on the card
const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

// Reset and increment Turn.
const resetTurn = useCallback(() => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(turns + 1)
  setDisabled(false)
},[turns])


// Compare the cards to see if they match.
useEffect(() => {
   // If both cards are selected, compare them.
  if (choiceOne && choiceTwo) {
    // if 2 cards are selected disable the option to prevent clicking other cards
    setDisabled(true)
    // If they match, disable the cards and reset the choices.
    if (choiceOne.label === choiceTwo.label) {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.label === choiceOne.label) {
            setMatchCount(matchCount + 1);
            return { ...card, matched: true }
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else {
      // If they don't match, flip them back over.
      setTimeout(() => {
       resetTurn()
      }, 1000)
    }
  }
}, [choiceOne, choiceTwo, resetTurn, matchCount])


// Start an new game on load.
useEffect(() => {
  shuffleCards()
}, [shuffleCards]);

// monitor if the game is over.

useEffect(() => {
  if (matchCount === 6) {
    alert(`You won in ${turns} turns!`)
    if (turns < highScore || highScore === 0) {
      setHighScore(turns)
      localStorage.setItem('highScore', turns)
    }
  }

},[turns,matchCount,highScore])



  return (
    <div className="App">
      <Header shuffleCards={shuffleCards} turns={turns} highScore={highScore}/>
      <GameBoard cards={cards} handleChoice={handleChoice} choiceOne={choiceOne} choiceTwo={choiceTwo} disabled={disabled}/>
    </div>
  );
}

export default App;
