import React, { Component } from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';

export default class ActiveCollection extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeCollection: this.props.activeCollection,
      cards: this.props.activeCollection.cards,
      currentCard: this.props.activeCollection.cards[0],
      currentCardNumber: 1,
      displayWord: false
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
                  <p id="card-count-text">{this.state.currentCardNumber}/{this.state.cards.length}</p>
                </div>
              </div>
            </button>
          </div>
          <button onClick={this.getNextCard}>
            <div className="previous-or-next-button-holder"><img className="previous-or-next-button" src={require('../../images/nextCardArrow.png')} alt="Next Button"/></div>
          </button>
        </div>
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
            <div className="content">
              <form>
                <label htmlFor="new-word-input">
                  Word:&nbsp;<input type="text" name="new-word-input" id="new-word-input"></input>
                </label>
                <label htmlFor="new-definition-input">
                  Definition:&nbsp;<input type="text" name="new-definition-input" id="new-definition-input"></input>
                </label>
                <label>
                  <input type="button" value="ADD CARD" onClick={this.getNewCardValues}></input>
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
    if(this.state.currentCardNumber === this.state.cards.length){
      nextCard = 1;      
    }
    else{
      nextCard = this.state.currentCardNumber + 1;
    }
    this.setState({
      currentCard: this.state.cards[nextCard - 1],
      currentCardNumber: nextCard
    })
  }
  getPreviousCard = () => {
    let nextCard;
    if(this.state.currentCardNumber === 1){
      nextCard = this.state.cards.length;      
    }
    else{
      nextCard = this.state.currentCardNumber - 1;
    }
    this.setState({
      currentCard: this.state.cards[nextCard - 1],
      currentCardNumber: nextCard

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
    return this.addCardToActiveCollection(newCard);
  }

  addCardToActiveCollection = (newCard) => {
    var collectionId = this.state.activeCollection._id;
    axios.post(`http://localhost:5000/api/collections/${collectionId}/cards`, newCard)
    .then((response) => {
      console.log(response.data);
      axios.get(`http://localhost:5000/api/collections/${collectionId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          activeCollection: response.data,
          cards: this.state.activeCollection.cards
        });
        this.forceUpdate(); //THIS ISN'T WORKING!!!
      })
      .catch((error) => {
        console.log(error);
      })
    })
    .catch((error) => {
      console.log(error);
      console.log(newCard, collectionId);
    })
  }

  deleteCardFromActiveCollection = () => {
    var collectionId = this.state.activeCollection._id;
    let cardToDeleteId = this.state.currentCard._id;
    axios.delete(`http://localhost:5000/api/collections/${collectionId}/cards/${cardToDeleteId}`)
    .then((response) => {
      console.log(response.data);
      
    })
    .catch((error) => {
      console.log(error);
    })
  }

}


