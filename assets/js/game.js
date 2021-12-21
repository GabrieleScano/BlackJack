const myModule = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];

    const btnNewCard = document.querySelector('#btnNewCard'),
        btnStand = document.querySelector('#btnStand'),
        btnNew = document.querySelector('#btnNew');

    const divCardsPlayers = document.querySelectorAll('.divCards'),
        scoreHTML = document.querySelectorAll('small');

    const startGame = (numPlayers = 2) => {
        deck = createDeck();

        playersPoints = [];
        for (let i = 0; i < numPlayers; i++) {
            playersPoints.push(0);
        }

        scoreHTML.forEach(elem => elem.innerText = 0);
        divCardsPlayers.forEach(elem => elem.innerHTML = '');

        btnNewCard.disabled = false;
        btnStand.disabled = false;
    }

    const createDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let special of specials) {
                deck.push(special + tipo);
            }
        }
        return _.shuffle(deck);;
    }

    const getCard = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;
    }

    const getScore = (card, turn) => {
        playersPoints[turn] = playersPoints[turn] + cardValue(card);
        scoreHTML[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    }

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${card}.png`;
        imgCard.classList.add('card');
        divCardsPlayers[turn].append(imgCard);
    }

    const getWinner = () => {
        const [minPoint, computerScore] = playersPoints;

        setTimeout(() => {
            if (computerScore === minPoint) {
                alert('Nobody wins');
            } else if (minPoint > 21) {
                alert('Computer wins!');
            } else if (computerScore > 21) {
                alert('Player wins');
            } else {
                alert('Computer wins')
            }
        }, 100);

    }

    const computerTurn = (minPoint) => {
        let computerScore = 0;

        do {
            const card = getCard();
            computerScore = getScore(card, playersPoints.length - 1);
            createCard(card, playersPoints.length - 1);

        } while ((computerScore < minPoint) && (minPoint <= 21));

        getWinner();
    }

    // Events
    btnNewCard.addEventListener('click', () => {

        const card = getCard();
        const playerScore = getScore(card, 0);

        createCard(card, 0);

        if (playerScore > 21) {
            console.warn('Sorry, you lose');
            btnNewCard.disabled = true;
            btnStand.disabled = true;
            computerTurn(playerScore);

        } else if (playerScore === 21) {
            console.warn('21, perfect!');
            btnNewCard.disabled = true;
            btnStand.disabled = true;
            computerTurn(playerScore);
        }
    });


    btnStand.addEventListener('click', () => {
        btnNewCard.disabled = true;
        btnStand.disabled = true;
        computerTurn(playersPoints[0]);
    });

    return {
        newGame: startGame
    };
})();








