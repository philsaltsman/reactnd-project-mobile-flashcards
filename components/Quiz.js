import React,  { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Container,Title,Data,SubMessage,LightButton,DarkButton,WhiteText } from './Styles.js'
import {Constants } from 'expo'
import { cardCount, getCards, getRandomNumber, clearLocalNotification } from '../utils/helpers'

class Quiz extends Component { 

    state = {
        showAnswer: 0,
        questionNum: getRandomNumber(this.props.count),
        questionTotal: this.props.count,
        correct: 0,
        answered: [],
        showScoreBoard: 0,
    }

    static navigationOptions = ({ navigation }) => {
        const { deckId, deckName } = navigation.state.params

        return {
            title: deckName
        }
    }

    shoAnsBtn = () => {
        this.setState(() => ({
            showAnswer: 1,
        }))
        return null

        
    }


    retryBtn = () => {
        this.setState(() => ({
            showAnswer: 0,
            questionNum: getRandomNumber(this.state.questionTotal),
            correct: 0,
            answered: [],
            showScoreBoard: 0
        }))

      
    }

    goToDeckBtn = () => {
        const { goToDeck } = this.props
        goToDeck(this.props.deckId,this.props.deckName)
    }

    correctBtn = () => {
        var correctCount = this.state.correct + 1
        this.questionProcess(correctCount)
    }

    incorrectBtn = () => {
        this.questionProcess(this.state.correct)
    }

    questionProcess = (correctCount) => {
        this.state.answered.push(this.state.questionNum)
     

        // determine whether to keep asking or show scoreboard
        if (this.state.answered.length >= this.state.questionTotal) {
            //display scoreboard
            this.setState(() => ({
                correct: correctCount,
                showScoreBoard: 1,

            }))
            //completed quiz, clear notifications
            clearLocalNotification()
        } else {
            //continue
            var loop=1
            var rand=0
            var found=0       
            while (loop===1) {
    
                rand = getRandomNumber(this.state.questionTotal),

                found = this.state.answered.find(function(element) {
                    return element === rand;
                });
                
                if (found === undefined) {
                    //if nothing found in the array, exit loop
                    loop=0
                } 
            }
            var nextQuestion = rand


            this.setState(() => ({
                correct: correctCount,
                questionNum: nextQuestion,
                showAnswer: 0,
            }))
        }
    }


    render() {

        const { cards, cardIds } = this.props
        
        if (this.state.showScoreBoard === 0) {
            //<Data>{JSON.stringify(this.props)}</Data>   
            return (
                <Container style={{margin:0,padding:0,marginTop:(Constants.statusBarHeight+10)}}>
                    <SubMessage>{( this.state.questionTotal-this.state.answered.length )+' remaining'} </SubMessage>

                    <Title style={{margin:0,padding:0}}>Quiz {this.props.deckName}</Title>
                    
                    
    
                    {/* Show a question, maybe randomize it later 
                    
                    <Title>{this.state.questionNum}</Title>
                    
                    */}     
    
                    { 
                        (this.state.showAnswer === 0)
                        ? (<View style={{width:'100%',alignItems:'center'}}>
                            
                            <Title>{cards[cardIds[this.state.questionNum]].question}</Title>
                            <LightButton style={{width:'65%'}} onPress={this.shoAnsBtn}><Text>Show Answer</Text></LightButton>
                            </View>)
                        : (<View style={{width:'100%',alignItems:'center'}}>
                            <Title>{cards[cardIds[this.state.questionNum]].answer}</Title>
                            <LightButton style={{width:'65%'}} onPress={this.correctBtn}><Text>Correct</Text></LightButton>
                            <DarkButton style={{width:'65%'}} onPress={this.incorrectBtn}><WhiteText>Incorrect</WhiteText></DarkButton>
                            </View>)
                        }
    
                    
    
                </Container>
            )

        } else {

            //<Data>{JSON.stringify(this.props)}</Data> 
            return (
                <Container style={{margin:0,padding:0,marginTop:(Constants.statusBarHeight+10)}}>
                    
                    <Title style={{margin:0,padding:0}}>Quiz {this.props.deckName} Results</Title>
                    
                      
    
                    <Title>{this.state.correct} out of {this.state.questionTotal}</Title>

                    <Title>{Math.round((this.state.correct/this.state.questionTotal)*100)+'%'}</Title>

                    <LightButton style={{width:'65%'}} onPress={this.retryBtn}><Text>Retry</Text></LightButton>
                    <DarkButton style={{width:'65%'}} onPress={this.goToDeckBtn}><WhiteText>Back to Deck</WhiteText></DarkButton>
                  
    
                </Container>
            )

        }

        

        
    }
}


function mapStateToProps (state, { navigation }) {
    const { deckId } = navigation.state.params

    //get the card count
    var val = 0
    var cardIds = ''

    if (state.cards === undefined || state.cards === '' || state.cards === null) {
        //do nothing
    } else {
        val = cardCount(state.cards, deckId)
    }

    //ensure if nothing worky, output a 0
    if (val === null || val === undefined || val === '' || val < 1) {
        val=0
    } else {
        cardIds = getCards(state.cards, deckId)
    }

    return {
        deckId, 
        deck: state.decks[deckId],
        deckName: state.decks[deckId].name,
        count: val,
        cardIds: cardIds,
        cards: state.cards,
    }
    
}


function mapDispatchToProps (dispatch, { navigation }) {
    const { entryId } = navigation.state.params
  
    return {
     dispatch,
      goBack: () => navigation.goBack(),
      goToDeck: (key, name) => navigation.navigate('Deck',{deckId: key, deckName: name}),
      //goToDeckList: () => navigation.navigate('Decks'),
    }
  }
  



export default connect(mapStateToProps,mapDispatchToProps)(Quiz)