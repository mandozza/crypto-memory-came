function Card({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className='card'>
      <div className={flipped ? 'flipped': ''}>
        <img src={card.src} alt='card' className='card-front' />
        <img src='cards/cardback.png'  alt='card' className='card-back' onClick={ handleClick } />
      </div>
    </div>
  )
}

export default Card


