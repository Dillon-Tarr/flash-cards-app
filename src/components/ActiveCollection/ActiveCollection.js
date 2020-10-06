import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';

export default class ActiveCollection extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeCollection: this.props.activeCollection,
      currentCard: this.props.activeCollection.cards[0],
      currentCardNumber: 1,
      displayWord: true
    }
  }

  render() {
    return (
      <div id="active-collection">
        <div id="container-for-previous-and-next-buttons">
          <button onClick={this.getPreviousCard}>
            <div className="previous-or-next-button-holder"><img className="previous-or-next-button" src={require('../../images/previousCardArrow.png')} alt="Previous Button"/></div>
          </button>
          <div id="active-collection-cards">
            <button onClick={this.flipCard}>
              <div className="card" id="card-active-back"></div>
              <div className="card" id="card-active-middle"></div>
              <div className="card" id="card-active-front">
              {this.renderWordOrDefinition()}
                <div>
                  <p id="flip-card-image-holder"><img id="flip-card-image" src={require('../../images/flipArrow.png')} alt="Flip Card"/></p>
                  <p id="card-count-text">{this.state.currentCardNumber}/{this.props.activeCollection.cards.length}</p>
                </div>
              </div>
            </button>
          </div>
          <button onClick={this.getNextCard}>
            <div className="previous-or-next-button-holder"><img className="previous-or-next-button" src={require('../../images/nextCardArrow.png')} alt="Next Button"/></div>
          </button>
        </div>
        <Popup
        trigger={<button><p id="delete-card-modal-button">Delete this card</p></button>}
        modal
        nested
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Are you sure you want to delete your "{this.state.currentCard.word}" card? </div>
            <div className="content">
              <input id="delete-yes-button" type="button" value="YES, delete this card." onClick={() => {
                this.props.deleteCardFromActiveCollection(this.state.currentCard);
                close();
                setTimeout(function(){return 'Waited .5 second.'}, 500)
                this.updateAfterDelete();
                }}/>
              <input id="delete-no-button" type="button" value="No, get me outta here!" onClick={() => {
                close();
                }}/>

            </div>
          </div>
        )}
        </Popup>
        <Popup
        trigger={<button><p id="add-card-modal-button">Add a new card</p></button>}
        modal
        nested
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Add a new card to your "{this.state.activeCollection.title}" collection </div>
            <div className="content" id="add-card-form">
              <form>
                <label htmlFor="new-word-input">
                  <div>Word:&nbsp;<input type="text" name="new-word-input" id="new-word-input"></input></div>
                </label>
                <label htmlFor="new-definition-input">
                  <div>Definition:&nbsp;<input type="text" name="new-definition-input" id="new-definition-input"></input></div>
                </label>
                <label>
                  <input type="button" value="ADD CARD" onClick={() => {
                    this.getNewCardValues();
                    close();
                    }}></input>
                </label>
              </form>
            </div>
          </div>
        )}
      </Popup>
      </div>
    )
  }

  renderWordOrDefinition(){
    if(this.state.displayWord === true){
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
    let nextCardNumber;
    if(this.state.currentCardNumber === this.props.activeCollection.cards.length){
      nextCardNumber = 1;      
    }
    else{
      nextCardNumber = this.state.currentCardNumber + 1;
    }
    this.setState({
      currentCard: this.props.activeCollection.cards[nextCardNumber - 1],
      currentCardNumber: nextCardNumber
    })
  }

  getPreviousCard = () => {
    let previousCardNumber;
    if(this.state.currentCardNumber === 1){
      previousCardNumber = this.props.activeCollection.cards.length;
    }
    else{
      previousCardNumber = this.state.currentCardNumber - 1;
    }
    this.setState({
      currentCard: this.props.activeCollection.cards[previousCardNumber - 1],
      currentCardNumber: previousCardNumber
    })
  }

  flipCard = () => {
    let newDisplayState = !this.state.displayWord;
    this.setState({
      displayWord: newDisplayState
    });
  }
 
  getNewCardValues = () => {
    let newCard = {
      word: document.getElementById("new-word-input").value,
      definition: document.getElementById("new-definition-input").value
    }
    return this.props.addCardToActiveCollection(newCard);
  }

  updateAfterDelete = () => {
    let updatedCardNumber;
    if(this.state.currentCardNumber === this.props.activeCollection.cards.length){
      updatedCardNumber = this.state.currentCardNumber - 1;
    }
    else{
      updatedCardNumber = this.state.currentCardNumber;
    }
    let updatedCards = this.props.activeCollection.cards;
    this.setState({
      cards: updatedCards,
      currentCard: this.props.activeCollection.cards[updatedCardNumber - 1],
      currentCardNumber: updatedCardNumber
    })
  }

}
