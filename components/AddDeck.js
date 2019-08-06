import React,  { Component } from 'react'
/*import { StyleSheet ,View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { timeToString } from '../utils/helpers'
import styled from 'styled-components'
*/
import { generateUID, saveDeck, saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions/deck'
import {Constants } from 'expo'
import { Container,Title,Data,Input,Button,DisabledButton,SubmitText,DeckButton,DeckButtonText,CardCountText } from './Styles.js'


class AddDeck extends Component { 
    state = {
        name: ''
    }
    submit = () => {
        const { dispatch, goBack, goToDeckList, goToDeck } = this.props

        //const key = timeToString()
        const key = generateUID()
        const deckEntry = this.state
        const deckName = this.state.name

        // Update Redux
        dispatch(addDeck({
            [key]: deckEntry
        }))

        // reset after updating
        this.setState(() => ({
            name: ''
        }))

        // Navigate to the created deck
        //goToDeckList()
        goToDeck(key,deckName)

        // Save to 'DB'
        saveDeck({ key, deckEntry })
        //title only: saveDeckTitle
    }
    render() {

        //<Data>{JSON.stringify(this.props)}</Data>
        return (
            <Container style={{marginTop:(Constants.statusBarHeight+10)}}>
                <Title>Add Deck</Title>
                
                
                
                <Input
                    placeholder="Enter the name for your new Deck"
                    value={this.state.name}
                    onChangeText={name => this.setState({name})}
                    style={{textAlign: 'center', marginBottom: 7, height: 50}}
                    />


                
                {/*<Data>{this.state.name}</Data>*/}
                {(this.state.name==='')
                ? <DisabledButton disabled={this.state.name===''}><SubmitText>Enter a deck name!</SubmitText></DisabledButton>
                : <Button onPress={this.submit} activeOpacity = { .5 } disabled={this.state.name===''}><SubmitText>Add Deck!</SubmitText></Button>
                }
                
                    
                
            </Container>
        )

    }
}

function mapStateToProps (state, { navigation }) {
  
    return {
    state,
    navigation,
    }
}

function mapDispatchToProps(dispatch, { navigation }) {

    return {
     dispatch,
      goBack: () => navigation.goBack(),
      goToDeckList: () => navigation.goToDeckList('Decks'),
      goToDeck: (key, name) => navigation.navigate('Deck',{deckId: key, deckName: name}),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AddDeck)