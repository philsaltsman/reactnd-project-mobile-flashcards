import React,  { Component } from 'react'
import { StyleSheet ,View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Container,Title,Data,Input,Button,SubmitText,DeckButton,DeckButtonText,CardCountText,LightButton,DarkButton,TextButton,WhiteText } from './Styles.js'
import {Constants } from 'expo'
import { removeDeck } from '../actions/deck'
import { white } from '../utils/colors'
import { saveDeck } from '../utils/api'
import { cardCount } from '../utils/helpers'

class Deck extends Component { 

    static navigationOptions = ({ navigation }) => {
        const { deckId, deckName } = navigation.state.params

        return {
            title: deckName
        }
    }

    deleteDeck = () => {
        const { dispatch, goToDeckList, deckId } = this.props

        dispatch(removeDeck(deckId))
        goToDeckList()
        saveDeck(deckId)

    }

    render() {
        //<Data>{JSON.stringify(this.props.deckName)}</Data>
        return (
            <Container style={{margin:0,padding:0,marginTop:(Constants.statusBarHeight+10)}}>
                
                <Title style={{margin:0,padding:0}}>Deck {this.props.deckName}</Title>
                <CardCountText style={{margin:0,padding:0}}>{this.props.count} cards</CardCountText>
                

                {/* just a bit of space */}
                <View style={{paddingTop:50}} />


                <LightButton style={{width:'65%'}} onPress={(deck) => this.props.navigation.navigate(
                    'AddCard',
                    { deckId: this.props.deckId, deckName: this.props.deckName, title: 'Add Card' }
                )}><Text>Add Card</Text></LightButton>
                {/* submit button if both question and answer are filled out */}
                {(this.props.count===0 || this.props.count === '' || this.props.count === null || this.props.count === undefined || this.props.count < 1)
                    ? null //<DisabledButton disabled={(this.state.question==='' && this.state.answer==='')}><SubmitText>Quiz - Not possible until atleast one card is added</SubmitText></DisabledButton>
                    : (//<Button onPress={this.submit} activeOpacity = { .5 } disabled={(this.state.question==='' && this.state.answer==='')}><SubmitText>Add Card!</SubmitText></Button>
                        <DarkButton style={{width:'65%'}} onPress={(deck) => this.props.navigation.navigate(
                            'Quiz',
                            { deckId: this.props.deckId, deckName: this.props.deckName }
                        )}><WhiteText style={{color:white}}>Start Quiz</WhiteText></DarkButton>
                        )
                    }
                
                <TextButton style={{width:'65%'}} onPress={this.deleteDeck}><Text>Delete Deck</Text></TextButton>
                

            </Container>
        )

        
    }
}


function mapStateToProps (state, { navigation }) {
    const { deckId } = navigation.state.params

    //var deck=deckId

    //get the card count
    var val = 0

    if (state.cards === undefined || state.cards === '' || state.cards === null) {
        //do nothing
    } else {
        //val = state.cards
        //val = (cardCount(state.cards,deckId))
        val = cardCount(state.cards, deckId)
    }

    //ensure if nothing worky, output a 0
    if (val === null || val === undefined || val === '') {
        val=0
    }

    return {
        deckId, 
        deck: state.decks[deckId],
        deckName: state.decks[deckId].name,
        count: val
    }
    
}


function mapDispatchToProps (dispatch, { navigation }) {
    const { entryId } = navigation.state.params
  
    return {
      /*remove: () => dispatch(addDeck({
        [entryId]: null
      })),
      */
     dispatch,
      goBack: () => navigation.goBack(),
      goToDeckList: () => navigation.navigate('Decks'),
    }
  }
  



export default connect(mapStateToProps,mapDispatchToProps)(Deck)