import React,  { Component } from 'react'
import { Text, View, Platform, StatusBar, ScrollView,FlatList } from 'react-native'
import { objSize,objSizeNoName,cardCount } from '../utils/helpers'
import { connect } from 'react-redux'
import { Container,Data,DeckButton,DeckButtonText,Message,SubMessage,CardCountText } from './Styles.js'
import { getDeck, getDecks } from '../utils/api'



class DeckList extends Component { 

    

    render() {
        const { decks } = this.props

        if (objSizeNoName(decks)===0) {
            return (
                <Container style={{flex:1,marginTop:'-30%',justifyContent:'center',alignitems:'center'}}>
                    <Message>No decks exist yet.</Message>
                    <SubMessage>Create one within Add Deck tab.</SubMessage>
                </Container>
            )
        } else {

            return (
                <Container>
                    <SubMessage>{( (objSizeNoName(decks)) ? ((objSizeNoName(decks)===1) ? objSizeNoName(decks)+' Deck' : objSizeNoName(decks)+' Decks') : null ) } </SubMessage>

                    <ScrollView style={{width:'100%'}}>
                    {
                        Object.keys(decks).map((key) => {
                            if (decks[key].name !== '' && decks[key].name !== undefined && decks[key].name !== null) {
                                return(
                                <DeckButton key={key} style={{marginTop:25}} onPress={(deck) => this.props.navigation.navigate(
                                    'Deck',
                                    { deckId: key, deckName: decks[key].name }
                                )}>
                                    <DeckButtonText>{decks[key].name}</DeckButtonText>
                                    <CardCountText>{cardCount(this.props.state.cards, key)} cards</CardCountText>
                                </DeckButton>
                                )
                            } else {
                                return (null)
                            }
                        })
                                            
                    }
                    </ScrollView>
                    

                    
                    
                </Container>

            )
         


        }
       
        
    }
}


function mapStateToProps (state, {navigation}) {

    return {
        state,
        decks: state.decks,
        navigation:navigation
    }
    
}

export default connect(mapStateToProps)(DeckList)