import './App.css'
import React, { Component } from 'react'
import axios from 'axios'
import CollectionButton from './components/CollectionButton/CollectionButton';
import ActiveCollection from './components/ActiveCollection/ActiveCollection';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      allCollections: [],
      activeCollection: null
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/collections')
    .then((response) => {
      console.log(response.data);
      this.setState({
        allCollections: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div id="app">
        <div id="main-content">
          <h1 id="main-content-title">{this.getTitle()}</h1>
          {this.getMainContent()}
        </div>

        <div id="my-collections">

        </div>
      </div>
    )
  }

  getTitle = () => {
    let title;
    if(this.state.activeCollection === null){
      title = 'My Collections';
    }
    else if(typeof this.state.activeCollection == 'object'){
      title = this.state.activeCollection.title;
    }
    return title;
  }

  getMainContent = () => {
    let content;
    if(this.state.activeCollection === null){
      content = (
        <div id="all-collections" className="flex-container">
          {this.renderCollectionButtons()}
        </div>
      );
    }
    else if(typeof this.state.activeCollection == 'object'){
      content = (
        <ActiveCollection
        activeCollection={this.state.activeCollection}
        addCardToActiveCollection={this.addCardToActiveCollection}
        deleteCardFromActiveCollection={this.deleteCardFromActiveCollection}
        />
      );
    }
    else{
      content = (<h1>ya dun messed up</h1>);
    }
    return content;
  }

  renderCollectionButtons = () => {
    let buttons = [];
    for(let i = 0; i < this.state.allCollections.length; i++){
      buttons.push(this.renderCollectionButton(i));
    }
    return buttons;
  }

  renderCollectionButton = (i) => {
    return <CollectionButton
    key={`collection-button-index${i}`}
    collection={this.state.allCollections[i]}
    setActiveCollection={this.setActiveCollection}/>
  }

  setActiveCollection = (_id) => {
    let collection = this.state.allCollections.filter((el) => {
      return _id === el._id;
    });
    collection = collection[0];
    console.log(`setActiveCollection() ran with _id as: ${_id}`);
    this.setState({
      activeCollection: collection
    });
  }

  addCardToActiveCollection = (newCard) => {
    var collectionId = this.state.activeCollection._id;
    axios.post(`http://localhost:5000/api/collections/${collectionId}/cards`, newCard)
    .then((response) => {
      console.log(response.data);
      console.log('The line above here is the card returned from the server that you just posted.');

      let updatedCollection = this.state.activeCollection;
      updatedCollection.cards.push(response.data);

      let updatedCollections = this.state.allCollections;
      let collectionIndex = updatedCollections.findIndex((el) => el._id === collectionId);
      updatedCollections[collectionIndex].cards = updatedCollection.cards;

      this.setState({
        allCollections: updatedCollections,
        activeCollection: updatedCollection
      });
    })
    .catch((error) => {
      console.log(error);
      console.log(newCard, collectionId);
    })
  }

  deleteCardFromActiveCollection = (currentCard) => {
    var collectionId = this.state.activeCollection._id;
    let cardToDeleteId = currentCard._id;
    axios.delete(`http://localhost:5000/api/collections/${collectionId}/cards/${cardToDeleteId}`)
    .then((response) => {
      console.log(response.data);
      console.log('The line above here is the card returned from the server that you just DELETED.');

      let updatedCards = this.state.activeCollection.cards.filter((el) => el._id !== cardToDeleteId);
      let updatedCollection = this.state.activeCollection;
      updatedCollection.cards = updatedCards;

      let updatedCollections = this.state.allCollections;
      let collectionIndex = updatedCollections.findIndex((el) => el._id === collectionId);
      updatedCollections[collectionIndex].cards = updatedCards;

      this.setState({
        allCollections: updatedCollections,
        activeCollection: updatedCollection
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // `5f726d81879a6422645f5609`
  //super minor change
  
  
}

/* Known issues:

- Adding cards to a collection after deleting a card does not update the cards on the page.
- Words or definitions can overflow the space on the card. We are aware of that problem. There were higher priority things to address.

*/

