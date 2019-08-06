import { ADD_DECK, RECEIVE_DECKS, REMOVE_DECK } from '../actions/deck'

function decks (state= {}, action) {
    switch (action.type) {
        case ADD_DECK:
            return {
                ...state,
                ...action.deckEntry
            }
        case RECEIVE_DECKS :
            return {
                ...state,
                ...action.decks
            }
        case REMOVE_DECK :
            const deckId = action.deckEntry;
            

            return {
                ...state,
                [action.deckEntry]: {
                    name: ''
                }



                //...state,
                //decks: Object.keys(state).filter(elem => elem !== action.deckEntry)
                //[action.deckEntry]: 'removed'
                    
                    /*
                    {

                    ...state[action.deckEntry],
                    name: 'removed'

                    }
                    */
                
            }
        default : 
            return state
    }
}

export default decks