import { AsyncStorage } from 'react-native'

export const STORAGE_KEY = 'MobileFlashCards:decks'

export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function getDecks () {
    return AsyncStorage.getAllKeys() 
}

export function getDeck () {   
    var item = AsyncStorage.getItem('MobileFlashCards:decks')
    if (item === undefined) {
        return 'cannot find deck'
    } else {
        return item
    }
}

export function saveDeck({ key }) { 
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: '',
    }))
}

export function saveDeckTitle ({ key, entry }) { 
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: entry,
    }))
}

export function addCardToDeck ({ key, entry }) { 
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: entry,
    }))
}
