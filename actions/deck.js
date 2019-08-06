export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const REMOVE_DECK = 'REMOVE_DECK'

export function addDeck (deckEntry) {
    return {
        type: ADD_DECK,
        deckEntry,
    }
}

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function removeDeck (deckEntry) {
    return {
        type: REMOVE_DECK,
        deckEntry,
    }
}