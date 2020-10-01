import React, { Component } from 'react'

export default class ActiveCollection extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards: this.props.cards,
      currentCard:this.props.cards[0],
      currentCardIndex: 0,
      displayWord: false
    }
  }
  renderWordOrDefinition(){
    if(this.state.displayWord === false){
      return (
        <p id= "word">{this.state.currentCard.word}</p>
      )
    }
    else{
      return(
        <p id= "definition">{this.state.currentCard.definition}</p>
      )
    }
  }
  render() {
    return (
      <div id="collection-container-active">
        <div id="card card-active-back"></div>
        <div id="card card-active-middle"></div>
        <div id="card card-active-front">
          {this.renderWordOrDefinition()}
        </div>
      </div>
    )
  }
}
