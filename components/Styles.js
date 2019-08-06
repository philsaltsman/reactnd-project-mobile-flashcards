import styled from 'styled-components'

export const Container=styled.KeyboardAvoidingView`
    flex:1;
    justify-content:flex-start;
    align-items:center;
`
export const Title=styled.Text`
    padding:15px;
    font-size:30;
    align-items:center;
`
export const Data=styled.Text`
    padding:5px;
    color:#ffffff;
    background-color:#000000;
    font-size:15;
    align-items:center;
    opacity:.5;
    margin:10px;
`
export const Input=styled.TextInput`
    width:300px;
    height:100px;
    background-color:#f4f4f4;
`

export const Button=styled.TouchableOpacity`
    width:300px;
    height:100px;
    padding:0px;
    background-color:#66c64c;
    justify-content:center;
    align-items:center;
    borderRadius:5; 
`
export const DisabledButton=styled.TouchableOpacity`
    width:300px;
    height:100px;
    padding:0px;
    opacity:.8;
    background-color:#CCCCCC;
    justify-content:center;
    align-items:center;
    borderRadius:5; 
`

export const SubmitText=styled.Text`
    margin:0px;
    padding:0px;
    font-size:20;
    color:white;
`
export const DeckButton=styled.TouchableOpacity`
    height:100;
    padding:0px;
    justify-content:center;
    align-items:center;
    borderRadius:5; 
`
export const DeckButtonText=styled.Text`
    margin:0px;
    padding:0px;
    font-size:35;
    color:black;
`

export const Message=styled.Text`
    margin:20px;
    padding:20px;
    font-size:25;
    color:gray;
    align-items:center;
`

export const SubMessage=styled.Text`
    font-size:15;
    color:gray;
    align-items:center;
`

export const CardCountText=styled.Text`
    margin:0px;
    padding:0px;
    font-size:25;
    color:gray;
`

// Within Deck.js 

export const LightButton=styled.TouchableOpacity`
    width:250px;
    height:50px;
    margin:10px;
    margin-left:30;
    margin-right:30;
    padding:0px;
    border: 1px solid #000000;
    background-color:#ffffff;
    justify-content:center;
    align-items:center;
    borderRadius:5; 
`
export const DarkButton=styled.TouchableOpacity`
    width:250px;
    height:50px;
    margin:10px;
    margin-left:30;
    margin-right:30;
    padding:0px;
    color:#ffffff;
    background-color:#000000;
    justify-content:center;
    align-items:center;
    borderRadius:5; 
`
export const TextButton=styled.TouchableOpacity`
    width:250px;
    height:50px;
    margin:10px;
    margin-left:30;
    margin-right:30;
    padding:0px;
    border: 0px;
    background-color:#ffffff;
    justify-content:center;
    align-items:center;
`

export const WhiteText=styled.Text`
    color: white;
`

//export { Container,Title,Data,Input,Button,SubmitText,DeckButton,DeckButtonText,Message,SubMessage,CardCountText }