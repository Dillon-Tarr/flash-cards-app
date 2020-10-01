import React, { Component } from 'react'

export default class ActiveCollection extends Component {
  constructor(props){
    super(props);
    this.state = {
      cards: this.props.cards,
      currentCard:this.props.cards[0],
      currentCardNumber: 1,
      displayWord: false
    }
  }

  render() {
    return (
      <div id="container-for-previous-and-next-buttons">
        <div id="active-collection-cards">
          <button onClick={this.flipCard}>
            <div className="card" id="card-active-back"></div>
            <div className="card" id="card-active-middle"></div>
            <div className="card" id="card-active-front">
            {this.renderWordOrDefinition()}
              <div>
                <p id="flip-card-image-holder"><img id="flip-card-image" src={require('../../images/flipArrow.png')} alt="Flip Card"/></p>
                <p id="card-count-text">{this.state.currentCardNumber}/{this.state.cards.length}</p>
              </div>
            </div>
          </button>
        </div>
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

  getNextCard = () => {
    let nextCard;
    if(this.state.currentCardNumber === this.props.cards.length){
      nextCard = 1;      
    }
    else{
      nextCard = this.state.currentCardNumber + 1;
    }
    this.setState({
      currentCard: this.props.cards[nextCard - 1],
      currentCardNumber: nextCard
    })
  }
  getPreviousCard = () => {
    let nextCard;
    if(this.state.currentCardNumber === 1){
      nextCard = this.props.cards.length;      
    }
    else{
      nextCard = this.state.currentCardNumber - 1;
    }
    this.setState({
      currentCard: this.props.cards[nextCard + 1],
      currentCardNumber: nextCard

    })
  }
  flipCard = () => {
    let newDisplayState = !this.state.displayWord;
    this.setState({
      displayWord: newDisplayState
    });
  }

}
