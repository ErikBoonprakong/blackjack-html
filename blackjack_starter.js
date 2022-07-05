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
const button = document.querySelector('#buttonOne')

// The code below runs when the page is loaded

window.addEventListener('DOMContentLoaded', function () {
  const deck = new Deck()
  deck.shuffle()

  button.addEventListener('click', function (e) {
    let randomDisplay = document.querySelector('#randomCard')
    const randomCard =
      deck.generateDeck()[
        Math.floor(Math.random() * (deck.generateDeck().length - 1))
      ]
    const newLi = document.createElement('LI')
    const liContent = document.createTextNode(
      `${randomCard} (${randomCard.points} points)`
    )

    newLi.appendChild(liContent)
    console.log(randomCard.rank === 'A')
    if (randomCard.rank === 'A') {
      //newLi.classList.add('ace')
      newLi.style.color = 'red'
    }

    randomDisplay.appendChild(newLi)
    if (randomDisplay.childElementCount > 5) {
      randomDisplay.removeChild(randomDisplay.childNodes[0])
    }
  })
})
