export const RECEIVE_CARD = 'RECEIVE_CARD'
export const ADD_CARD = 'ADD_CARD'

export function receiveCard (card) {
    return {
        type: RECEIVE_CARD,
        card,
    }
}


export function addCard (cardEntry) {
    return {
        type: ADD_CARD,
        cardEntry,
    }
}
