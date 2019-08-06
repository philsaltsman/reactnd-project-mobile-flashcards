import React,  { Component } from 'react'
import { StyleSheet ,View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { timeToString } from '../utils/helpers'
import styled from 'styled-components'
import { generateUID, addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions/card'
import {Constants } from 'expo'
import { Container,Title,Data,Input,Button,DisabledButton,SubmitText,DeckButton,DeckButtonText,CardCountText } from './Styles.js'


class AddCard extends Component { 
    state = {
        question: '',
        answer: '',
        deckId: this.props.deckId,
    }
    
    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params

        return {
            title: title
        }
    }

    
    submit = () => {
        const { dispatch, goBack, deckId, goToDeckList, goToDeck } = this.props

        //const key = timeToString()

        /*
        this.setState(() => ({
            deckId: deckId,
        }))
        */

        const key = generateUID()
        const cardEntry = this.state
        

         
        // Update Redux
        dispatch(addCard({
            [key]: cardEntry
        }))

        // reset after updating
        this.setState(() => ({
            question: '',
            answer: ''
        }))

        // Navigate to the created deck
        //goToDeckList()
        //goToDeck(key,deckId)
        goBack()

        // Save to 'DB'
        addCardToDeck({ key, cardEntry })
    }
    render() {

        
        /*
        <ScrollView style={{flex:0,width:'100%',height:'20%'}}>
                    <Data>{JSON.stringify(this.props)}</Data>
                </ScrollView>
        */

        return (

            <Container style={{marginTop:(Constants.statusBarHeight+10)}}>

                


                
                    <Title>Add a card to {this.props.deckName}</Title>

                    
                    
                    <Input
                        placeholder="Question input"
                        value={this.state.question}
                        onChangeText={question => this.setState({question})}
                        style={{textAlign: 'center', marginBottom: 7, height: 50}}
                        />

                    <Input
                        placeholder="Answer input"
                        value={this.state.answer}
                        onChangeText={answer => this.setState({answer})}
                        style={{textAlign: 'center', marginBottom: 7, height: 50}}
                        />
                    
                    

                    {/* submit button if both question and answer are filled out */}
                    {(this.state.question==='' || this.state.answer==='')
                    ? <DisabledButton disabled={(this.state.question==='' && this.state.answer==='')}><SubmitText>Enter a question and answer!</SubmitText></DisabledButton>
                    : <Button onPress={this.submit} activeOpacity = { .5 } disabled={(this.state.question==='' && this.state.answer==='')}><SubmitText>Add Card!</SubmitText></Button>
                    }

                    

                
            </Container>

        )

    }
}

function mapStateToProps (state, { navigation }) {
    const { deckId, deckName } = navigation.state.params

    return {
        state,
        deckId,
        deckName,
        navigation
    }
}

function mapDispatchToProps(dispatch, { navigation }) {

    return {
     dispatch,
     //goToDeck: (key, name) => navigation.navigate('Deck',{deckId: key, deckName: name}),
      goBack: () => navigation.goBack()
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AddCard)