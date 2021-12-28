
function Button({label, shuffleCards}) {
  return (
    <button onClick={() => shuffleCards()}>
    {label}
    </button>
  )
}

export default Button
