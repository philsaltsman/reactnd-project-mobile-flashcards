// utils/helpers.js
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashCards:notifications'

export function isBetween (num, x, y) {
  if (num >= x && num <= y) {
    return true
  }

  return false
}

export function getRandomNumber (max) {
  return Math.floor(Math.random() * max) + 0
}

export function calculateDirection (heading) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}


// imput cards state and the deck id to count the cards
/*export function cardCount (cards,deckId) {
  var size = 0, key;
  for (key in cards) {
    //if ((obj.hasOwnProperty(key)) && (obj[key].deckId === deckId)) size++;
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}*/

export function cardCount (obj,deck) {
  var size = 0, key;
  for (key in obj) {
      if ((obj.hasOwnProperty(key)) && (obj[key].deckId === deck)) size++;
  }
  return size;
};

export function getCards (obj,deck) {

  var cardIds = Object.keys(obj).filter((key) => {
    return (obj[key].deckId === deck) 
  })
        
  /*
  for (key in obj) {
      if ((obj.hasOwnProperty(key)) && (obj[key].deckId === deck)) cardIds = obj[];
  }
  */

  return cardIds
};

// if name is property is '', don't count it
export function objSizeNoName (obj) {
  var size = 0, key;
  for (key in obj) {
      if ((obj.hasOwnProperty(key)) && (obj[key].name !== '')) size++;
  }
  return size;
};

// generic objsize
export function objSize (obj) {
  var size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

/*
export function getCardInfo () {
    const info = {
        question: 'Question',
        answer: 'Answer',
    }
}
*/



export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'MobileFlashCards',
    body: "👋 don't forget to answer a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}


export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}