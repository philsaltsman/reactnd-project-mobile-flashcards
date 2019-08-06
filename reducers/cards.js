import { RECEIVE_CARD, ADD_CARD } from '../actions/card'

function cards (state= {}, action) {
    switch (action.type) {
        case RECEIVE_CARD :
            return {
                ...state,
                ...action.card
            }
        case ADD_CARD:
            return {
                ...state,
                ...action.cardEntry,
            }
        default : 
            return state
    }
}

export default cards