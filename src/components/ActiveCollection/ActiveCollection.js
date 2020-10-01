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

  render() {
    return (
      <div id="active-collection-cards">
        <button onClick={this.flipCard}>
          <div className="card" id="card-active-back"></div>
          <div className="card" id="card-active-middle"></div>
          <div className="card" id="card-active-front">
          {this.renderWordOrDefinition()}
          <p id="flip-card-button-holder">Flip Card</p>
        </div>
        </button>
      </div>
    )
  }

  renderWordOrDefinition(){
    if(this.state.displayWord === false){
      return (
        <p id="word">{this.state.currentCard.word}</p>
      )
    }
    else{
      return(
        <p id="definition">{this.state.currentCard.definition}</p>
      )
    }
  }

  flipCard = () => {
    let newDisplayState = !this.state.displayWord;
    this.setState({
      displayWord: newDisplayState
    });
  }

}
