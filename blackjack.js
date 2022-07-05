function shuffle(array, seed = 1) {
  let currentIndex = array.length
  let temporaryValue, randomIndex

  let random = () => {
    var x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }

  while (0 !== currentIndex) {
    randomIndex = Math.floor(random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

class Card {
  constructor(rank, suit) {
    this.rank = rank
    this.suit = suit.toUpperCase()
  }

  toString() {
    return this.rank + this.suit
  }

  get points() {
    switch (this.rank) {
      case 'K': {
        return 10
      }
      case 'Q': {
        return 10
      }
      case 'J': {
        return 10
      }
      case 'A': {
        return 11
      }
      default: {
        return parseInt(this.rank)
      }
    }
  }
}

class Hand {
  constructor(deck) {
    this.cards = [deck.draw(), deck.draw()] //deck
    console.log('length: ' + this.cards.length)
    if (this.cards.every((card) => card instanceof Card) === false) {
      throw new TypeError('A Hand can only contain Cards')
    }
  }

  get points() {
    let totalPoints = this.cards.reduce((total, currentCard) => {
      return parseInt(currentCard.points) + parseInt(total)
    }, 0)
    if (totalPoints == 22 && this.cards.length == 2) {
      totalPoints = 21
    }
    return totalPoints
  }
}

class Deck {
  constructor() {
    this.suits = ['S', 'D', 'C', 'H']
    this.ranks = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K'
    ]
    this.cards = this.generateDeck()
  }

  generateDeck() {
    const deckArray = []
    for (let i = 0; i < this.suits.length; i++) {
      for (let j = 0; j < this.ranks.length; j++) {
        const myCard = new Card(this.ranks[j], this.suits[i])
        deckArray.push(myCard)
      }
    }
    return deckArray
  }

  draw() {
    return this.cards.shift()
  }

  shuffle() {}

  get cardsInDeck() {
    return this.cards
  }
}

const deck = new Deck()
const hitButton = document.querySelector('#hitButton')
const stickButton = document.querySelector('#stickButton')
const playerHand = document.querySelector('.cards')
const dealerHand = document.querySelector('.dealerCards')
let playerHandPoints = 0
let dealerHandPoints = 0
const winLoseMessage = document.getElementById('winLoseMessage')
let participant = document.querySelector('.participant')
let pointsDisplay = document.querySelector('.points')

hitButton.addEventListener('click', function (e) {
  const newCard = document.createElement('DIV')
  playerHand.appendChild(newCard)

  const randomCard =
    deck.generateDeck()[
      Math.floor(Math.random() * (deck.generateDeck().length - 1))
    ]
  playerHandPoints += randomCard.points

  // Cards of rank 10 are named 0S, 0C, 0H, 0D
  if (randomCard.rank === '10') {
    newCard.innerHTML = `<img src = "https://deckofcardsapi.com/static/img/0${
      randomCard.toString()[2]
    }.png">`
  } else {
    newCard.innerHTML = `<img src = "https://deckofcardsapi.com/static/img/${randomCard.toString()}.png">`
  }
  newCard.style.marginRight = '1rem'

  pointsDisplay.innerText = `${playerHandPoints} points`

  if (playerHandPoints > 21) {
    pointsDisplay.style.color = 'red'
    winLoseMessage.innerText = 'You Lose!'
    winLoseMessage.classList.add('text')
    winLoseMessage.style.color = 'red'
  }
})

function dealerDraw() {
  const drawCard = document.createElement('DIV')
  dealerHand.appendChild(drawCard)

  const randomCard =
    deck.generateDeck()[
      Math.floor(Math.random() * (deck.generateDeck().length - 1))
    ]

  dealerHandPoints += randomCard.points

  // Cards of rank 10 are named 0S, 0C, 0H, 0D
  if (randomCard.rank === '10') {
    drawCard.innerHTML = `<img src = "https://deckofcardsapi.com/static/img/0${
      randomCard.toString()[2]
    }.png">`
  } else {
    drawCard.innerHTML = `<img src = "https://deckofcardsapi.com/static/img/${randomCard.toString()}.png">`
  }
  drawCard.style.marginRight = '1rem'
  pointsDisplay.innerText = `${dealerHandPoints} points`
}

stickButton.addEventListener('click', function (e) {
  participant.innerText = 'Dealer'
  dealerDraw()
  dealerDraw()
  dealerTurn()
})

function dealerTurn() {
  while (dealerHandPoints <= 17) {
    dealerDraw()
  }

  if (dealerHandPoints > 21) {
    winLoseMessage.innerText = 'You Win!'
    winLoseMessage.classList.add('text')
    winLoseMessage.style.color = 'green'
  } else if (dealerHandPoints > playerHandPoints) {
    pointsDisplay.style.color = 'red'
    winLoseMessage.innerText = 'You Lose!'
    winLoseMessage.classList.add('text')
    winLoseMessage.style.color = 'red'
  } else if (dealerHandPoints === playerHandPoints) {
    pointsDisplay.style.color = 'orange'
    winLoseMessage.innerText = 'Its a Draw!'
    winLoseMessage.classList.add('text')
    winLoseMessage.style.color = 'orange'
  } else {
    winLoseMessage.innerText = 'You Win!'
    winLoseMessage.classList.add('text')
    winLoseMessage.style.color = 'green'
  }
}

// The code below runs when the page is loaded

window.addEventListener('DOMContentLoaded', function () {
  const deck = new Deck()
  deck.shuffle()
  hitButton.click()
  hitButton.click()
  participant.innerText = 'Player'
})
