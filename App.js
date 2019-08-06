import React from 'react'
import { Text, View, Platform, StatusBar, ScrollView,FlatList } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { white,purple,gray } from './utils/colors';
import {Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'
//import { Container,Title,Data,Input,Button,SubmitText,DeckButton,DeckButtonText,CardCountText } from './components/Styles.js'


//NAME MobileFlashCards

function MobileFlashCardsStatusBar ({backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const IosTabs = createBottomTabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: <Ionicons name='ios-albums' size={40} color='rgba(0,0,0,0.24)' />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: <Ionicons name='ios-add' size={40} color='rgba(0,0,0,0.24)' />
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: 'purple',
    inactiveTintColor: 'gray',
    style: {
      height:50,
      backgroundColor: Platform.OS === 'ios' ? white: purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
});

const DroidTabs = createMaterialTopTabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: <Ionicons name='ios-albums' size={40} color='black' />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: <Ionicons name='ios-add' size={40} color='black' />
    },
  },
}, {
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    style: {
      height:50,
      backgroundColor: Platform.OS === 'ios' ? white: purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
});



const Stack = createStackNavigator({
  Tabs: {
      screen: (Platform.OS === 'ios' ? IosTabs : DroidTabs),
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          display: 'none',
          backgroundColor: purple,
        }
      }
  },
  Deck: {
      screen: Deck,
      navigationOptions: {
        headerTintColor: white,
        headerStyle: {
          height:40,
          backgroundColor: purple,
        }
      }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        height:40,
        backgroundColor: purple,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        height:40,
        backgroundColor: purple,
      }
    }
  },
})

const MainNavigator = createAppContainer(Stack)


export default class App extends React.Component {
  componentDidMount() {
    //NOTE:  notifications are cleared within Quiz.js if a quiz is completed
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
          <MobileFlashCardsStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
      </Provider>
    )
  }
}





